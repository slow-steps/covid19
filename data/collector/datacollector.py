""" collect covid19 oita data """

from datetime import date, datetime
from pathlib import Path
import requests
import json

from covidoitapage import CovidOitaPage
import commentsdf
import infectedsdf
import covidinfo
import releasemark

DATA_DIRECTORY = Path(__file__).parent.parent
def get_path(file_name):
    return DATA_DIRECTORY.joinpath(file_name)

COMMENTS_CSV_PATH = get_path("comments.csv")
INFECTEDS_CSV_PATH = get_path("infecteds.csv")

COMMENTS_7DAYS_JSON_PATH = get_path("comments7days.json")
INFECTEDS_7DAYS_JSON_PATH = get_path("infecteds7days.json")
INFO_7DAYS_JSON_PATH = get_path("info7days.json")
TAKADA_JSON_PATH = get_path("takada.json")
HIMESHIMA_JSON_PATH = get_path("himeshima.json")
KUNISAKI_JSON_PATH = get_path("kunisaki.json")
KITSUKI_JSON_PATH = get_path("kitsuki.json")
UPDATE_JSON_PATH = get_path("update.json")

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

def save_infecteds_df_as_json(json_path, df):
    """ infecteds df to json """
    save_df_as_json(
        json_path=json_path,
        df=df,
        rename_columns=INFECTEDS_RENAME_COLULMNS
    )

def save_comments(covid_comments):
    covid_comments.all.to_csv(COMMENTS_CSV_PATH, index=False, encoding="utf_8_sig")
    yield "コメントのリストのCSVを保存しました。"

    save_df_as_json(
        json_path=COMMENTS_7DAYS_JSON_PATH,
        df=covid_comments.last7days,
        rename_columns=COMMENTS_RENAME_COLUMNS,
        date_column_index=0)
    yield "コメントのリスト（7日分）のJSONを保存しました。"

def save_infecteds(covid_infecteds):
    covid_infecteds.all.to_csv(INFECTEDS_CSV_PATH, index=False, encoding="utf_8_sig")
    yield "陽性者リストのCSVを保存しました。"

    save_infecteds_df_as_json(INFECTEDS_7DAYS_JSON_PATH, covid_infecteds.last7days)
    yield "陽性者リスト（7日分）のJSONを保存しました。"

    save_infecteds_df_as_json(TAKADA_JSON_PATH, covid_infecteds.takada)
    yield "陽性者リスト（髙田）のJSONを保存しました。"

    save_infecteds_df_as_json(HIMESHIMA_JSON_PATH, covid_infecteds.himeshima)
    yield "陽性者リスト（姫島）のJSONを保存しました。"

    save_infecteds_df_as_json(KUNISAKI_JSON_PATH, covid_infecteds.kunisaki)
    yield "陽性者リスト（国東）のJSONを保存しました。"

    save_infecteds_df_as_json(KITSUKI_JSON_PATH, covid_infecteds.kitsuki)
    yield "陽性者リスト（杵築）のJSONを保存しました。"

def save_top_infos(comments_df, infecteds_df):
    """ save top infos """
    infos = []
    for index, comment in comments_df.iterrows():
        release_datetime = comment["更新日時"]
        info_date = date(release_datetime.year, release_datetime.month, release_datetime.day)
        infecteds = infecteds_df.query(
            "公表日 == @info_date",
            engine="numexpr"
        )
        covid_info = covidinfo.get_covid_info(comment, infecteds)
        infos.append(covid_info)
    with open(INFO_7DAYS_JSON_PATH, "w") as info_json:
        json.dump(infos, info_json)

def save_update_time():
    """ write update time to json """
    data = {
        "updated" : datetime.now().strftime(releasemark.MARK_FORMAT),
    }
    with open(UPDATE_JSON_PATH, "w") as update_json:
        json.dump(data, update_json)

def collect_new_data_with_report():
    """ check oita page and collect data if it is new """
    oita_page = CovidOitaPage()
    if not releasemark.is_newer_than_marked(oita_page.release_datetime):
        yield "Webページが更新されていませんでした。"
        return

    covid_comments = commentsdf.CovidComments(
        csv_path=COMMENTS_CSV_PATH,
        comment_datetime=oita_page.release_datetime,
        comment_text=oita_page.comment
    )
    yield "コメントのリストに最新コメントを追加しました。"
    
    for comment_report in save_comments(covid_comments):
        yield comment_report
    yield "コメントの保存が完了しました。"

    yield "陽性者リストのPDFをダウンロードします..."
    download_pdf(
        pdf_uri=oita_page.infecteds_list_link,
        destination=INFECTEDS_PDF_PATH
    )
    yield "陽性者リストのPDFをダウンロードしました。"

    yield "陽性者リストのデータを読み取ります..."
    covid_infecteds = infectedsdf.CovidInfecteds(pdf_path=INFECTEDS_PDF_PATH)
    yield "陽性者リストをデータとして読み込みました。"
    
    for infecteds_report in save_infecteds(covid_infecteds):
        yield infecteds_report
    yield "陽性者リストの保存が完了しました。"

    save_top_infos(covid_comments.last7days, covid_infecteds.last7days)
    yield "トップ情報（7日分）の保存が完了しました。"

    releasemark.update_mark(oita_page.release_datetime)

    save_update_time()

    yield "更新の取得が完了しました。"

def main():
    """ main """
    for report in collect_new_data_with_report():
        print(report)

if __name__ == "__main__":
    main()
