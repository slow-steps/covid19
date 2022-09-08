"""" covidinfo.py """

from cmath import inf
import re
from datetime import date

FIRST_PARAGRAPH_FINDER = re.compile(r"[^\r\n]+")

IGNORE_PARAGRAPHS = "|".join([
    "家庭内感染が続いています",
    "職場内での感染が増えています",
    "会食での感染が増えています",
    "マスクについては、熱中症が心配される",
    "オミクロン株の亜種であっても",
    "特に、ワクチン接種率が低い若い世代の感染",
    "県営接種センターでは",
    "なお、大分市民の方は",
    "マスク着用の取り扱いについては",
    "中和抗体薬や経口薬など早期の治療",
    "感染が急速に拡大しています",
    "感染対策についてはこちらをご覧ください",
    "オミクロン株亜種BA.5の流行については",
    "新型コロナウイルスはエアロゾル感染",
    "軽症の方でも一時的に高熱",
    "ご家族やご友人のためにも",
    "重症化しにくいとされるBA.5",
    "身近に感染者がいてもおかしくありません。",
    "本日から、有症状者の療養期間が10日間から7日間に短縮",
    r"\s",
])

INDEPENDENT_COMMENT_FINDER = re.compile(rf"^(?!({IGNORE_PARAGRAPHS}))[^\r\n]+", re.MULTILINE)

def get_1st_paragraph(text):
    return FIRST_PARAGRAPH_FINDER.match(text).group(0)

def get_independent_comment(text):
    independents = INDEPENDENT_COMMENT_FINDER.finditer(text)
    return "\n".join([x.group(0) for x in independents])

def get_local_count(df, area_name):
    series = df["居住地"]
    bool_series = (series == area_name)
    return int(bool_series.sum())

def get_covid_summary(summary_date, comment_record, infecteds_df):
    return {
        "date" : summary_date.isoformat(),
        "comment" : get_independent_comment(comment_record["コメント"]),
        "oita" : len(infecteds_df),
        "takada" : get_local_count(infecteds_df, "豊後高田市"),
        "himeshima" : get_local_count(infecteds_df, "姫島村"),
        "kunisaki" : get_local_count(infecteds_df, "国東市"),
        "kitsuki" : get_local_count(infecteds_df, "杵築市"),     
    }

def generate_summaries(comments_df, infecteds_df):
    for _, comment in comments_df.iterrows():
        release_datetime = comment["更新日時"]
        info_date = date(release_datetime.year, release_datetime.month, release_datetime.day)
        infecteds = infecteds_df.query(
            "公表日 == @info_date",
            engine="numexpr"
        )
        yield get_covid_summary(info_date, comment, infecteds)  
 
def test():
    print(IGNORE_PARAGRAPHS)    

if __name__ == "__main__":
    test()