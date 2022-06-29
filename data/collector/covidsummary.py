"""" covidinfo.py """

from cmath import inf
import re

FIRST_PARAGRAPH_FINDER = re.compile(r"[^\r\n]+")

def get_1st_paragraph(text):
    return FIRST_PARAGRAPH_FINDER.match(text).group(0)

def get_local_count(df, area_name):
    series = df["居住地"]
    bool_series = (series == area_name)
    return int(bool_series.sum())

def get_covid_summary(comment_record, infecteds_df):
    return {
        "date" : infecteds_df.iloc[0]["公表日"].isoformat(),
        "comment" : get_1st_paragraph(comment_record["コメント"]),
        "oita" : len(infecteds_df),
        "takada" : get_local_count(infecteds_df, "豊後高田市"),
        "himeshima" : get_local_count(infecteds_df, "姫島村"),
        "kunisaki" : get_local_count(infecteds_df, "国東市"),
        "kitsuki" : get_local_count(infecteds_df, "杵築市"),     
    }

