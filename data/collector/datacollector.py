""" collect covid19 oita data """

from datetime import datetime
from pathlib import Path
import requests

from covidoitapage import CovidOitaPage
import commentsdf
import infectedsdf
import releasemark

DATA_DIRECTORY = Path(__file__).parent.parent
def get_path(file_name):
    return DATA_DIRECTORY.joinpath(file_name)

COMMENTS_CSV_PATH = get_path("comments.csv")
INFECTEDS_CSV_PATH = get_path("infecteds.csv")

COMMENTS_7DAYS_JSON_PATH = get_path("comments7days.json")
INFECTEDS_7DAYS_JSON_PATH = get_path("infecteds7days.json")
TAKADA_JSON_PATH = get_path("takada.json")
HIMESHIMA_JSON_PATH = get_path("himeshima.json")
KUNISAKI_JSON_PATH = get_path("kunisaki.json")
KITSUKI_JSON_PATH = get_path("kitsuki.json")
INFECTEDS_PDF_PATH = get_path("infecteds.pdf")

COMMENTS_RENAME_COLUMNS = {
    "更新日時" : "releaseDate",
    "コメント" : "commentBody",  
}
INFECTEDS_RENAME_COLULMNS = {
    "NO" : "number",
    "公表日" : "releaseDate",
    "居住地" : "residence",
    "年代" : "ageRange",
    "性別" : "gender",   
}

def download_pdf(pdf_uri, destination):
    """ pdf をダウンロードする """
    response = requests.get(pdf_uri)
    with open(destination, "wb") as dl_file:
        dl_file.write(response.content)
    response.close()

def save_df_as_json(json_path, df, rename_columns, date_column_index = -1):
    """ df to json """
    renamed_df = df.rename(columns=rename_columns)
    if date_column_index >= 0:
        for i in range(0, len(renamed_df)):
            naive_datetime = renamed_df.iat[i, date_column_index]
            aware_datetime = naive_datetime.tz_localize("Asia/Tokyo")
            renamed_df.iat[i, date_column_index] = aware_datetime
    renamed_df.to_json(
        json_path, 
        orient="records", 
        date_format="iso")

def save_local_df_as_json(json_path, df):
    """ local df to json """
    save_df_as_json(
        json_path=json_path,
        df=df,
        rename_columns=INFECTEDS_RENAME_COLULMNS
    )
 
def collect_comment(oita_page):
    comments_df = commentsdf.make_latest_comments_table(
        csv_path=COMMENTS_CSV_PATH,
        comment_datetime=oita_page.release_datetime,
        comment_text=oita_page.comment
    )
    yield "コメントのリストに最新コメントを追加しました。"

    comments_df.to_csv(COMMENTS_CSV_PATH, index=False, encoding="utf_8_sig")
    yield "コメントのリストをCSVに保存しました。"

    comments7days_df = commentsdf.select_last7days_comments(comments_df)
    save_df_as_json(
        json_path=COMMENTS_7DAYS_JSON_PATH,
        df=comments7days_df,
        rename_columns=COMMENTS_RENAME_COLUMNS,
        date_column_index=0)
    yield "コメントのリスト（7日分）をJSONに保存しました。"

def collect_infecteds():
    yield "陽性者リストのデータを読み取ります..."
    infecteds_df = infectedsdf.get_table_in_pdf(
        pdf_path= INFECTEDS_PDF_PATH
    )
    yield "陽性者リストをデータとして読み込みました。"

    infecteds_df.to_csv(INFECTEDS_CSV_PATH, index=False, encoding="utf_8_sig")
    yield "陽性者リストをCSVに保存しました。"

    infected7days_df = infectedsdf.select_last7days_infecteds(infecteds_df)
    save_df_as_json(
        json_path=INFECTEDS_7DAYS_JSON_PATH,
        df=infected7days_df,
        rename_columns=INFECTEDS_RENAME_COLULMNS
    )
    yield "陽性者リスト（7日分）をJSONに保存しました。"

    takada_df = infectedsdf.select_takada_infecteds(infecteds_df)
    save_local_df_as_json(TAKADA_JSON_PATH,takada_df)
    yield "陽性者リスト（髙田）をJSONに保存しました。"

    himeshima_df = infectedsdf.select_himeshima_infecteds(infecteds_df)
    save_local_df_as_json(HIMESHIMA_JSON_PATH, himeshima_df)
    yield "陽性者リスト（姫島）をJSONに保存しました。"

    kunisaki_df = infectedsdf.select_kunisaki_infecteds(infecteds_df)
    save_local_df_as_json(KUNISAKI_JSON_PATH, kunisaki_df)
    yield "陽性者リスト（国東）をJSONに保存しました。"

    kitsuki_df = infectedsdf.select_kitsuki_infecteds(infecteds_df)
    save_local_df_as_json(KITSUKI_JSON_PATH, kitsuki_df)
    yield "陽性者リスト（杵築）をJSONに保存しました。"

def collect_new_data_with_report():
    """ check oita page and collect data if it is new """
    oita_page = CovidOitaPage()
    if not releasemark.is_newer_than_marked(oita_page.release_datetime):
        yield "Webページが更新されていませんでした。"
        return

    for comment_report in collect_comment(oita_page):
        yield comment_report
    yield "コメントの保存が完了しました。"

    yield "陽性者リストのPDFをダウンロードします..."
    download_pdf(
        pdf_uri=oita_page.infecteds_list_link,
        destination=INFECTEDS_PDF_PATH
    )
    yield "陽性者リストのPDFをダウンロードしました。"

    for infecteds_report in collect_infecteds():
        yield infecteds_report
    yield "陽性者リストの保存が完了しました。"

    releasemark.update_mark(oita_page.release_datetime)

    yield "更新の取得が完了しました。"

def main():
    """ main """
    for report in collect_new_data_with_report():
        print(report)

if __name__ == "__main__":
    main()
