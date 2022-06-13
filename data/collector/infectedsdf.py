""" infeceds dataframe maker """

import datetime
import re
from pathlib import Path
import numpy as np
import tabula

CSV_COLUMNS = [
    "NO",
    "公表日",
    "居住地",
    "年代",
    "性別",
]

FIRST_NUMBER_OF_2021 = 690
FIRST_NUMBER_OF_2022 = 8193

MONTH_DAY_FINDER = re.compile(r"(\d+)月(\d+)日")

def make_date_serial(year, month_day_jp):
    """ make date serial"""
    found = MONTH_DAY_FINDER.search(month_day_jp)
    date_serial = datetime.date(
        year=year,
        month=int(found.group(1)),
        day=int(found.group(2))
    )
    return date_serial

def fix_release_date(table):
    """ add year info to date """
    for i in range(0, len(table)):
        month_day_jp = table.iat[i, 1]
        if month_day_jp is np.nan:
            continue
        number = int(table.iat[i, 0])
        if number < FIRST_NUMBER_OF_2021:
            year = 2020
        elif number < FIRST_NUMBER_OF_2022:
            year = 2021
        else:
            year = 2022
        release_date = make_date_serial(year, month_day_jp)
        table.iat[i, 1] = release_date

def get_table_in_pdf(pdf_path):
    """ extract table from pdf """
    tables = tabula.read_pdf(pdf_path, multiple_tables=False, lattice=True, pages="all")
    table = tables[0]
    table.columns = CSV_COLUMNS
    fix_release_date(table)
    return table

def select_takada_infecteds(infecteds_df):
    return infecteds_df.query(
        "居住地 == '豊後高田市'"
    )
def select_himeshima_infecteds(infecteds_df):
    return infecteds_df.query(
        "居住地 == '姫島村'"
    )
def select_kunisaki_infecteds(infecteds_df):
    return infecteds_df.query(
        "居住地 == '国東市'"
    )
def select_kitsuki_infecteds(infecteds_df):
    return infecteds_df.query(
        "居住地 == '杵築市'"
    )

def select_last7days_infecteds(infecteds_df):
    begin_date = datetime.date.today() - datetime.timedelta(days=6)
    return infecteds_df.query(
        "公表日 >= @begin_date",
        engine="numexpr"
    )

def _test():
    df = get_table_in_pdf(Path(__file__).parent.parent.joinpath("infecteds.pdf"))
    print(df)
    kunisaki_df = select_kunisaki_infecteds(df)
    print(kunisaki_df)
    last7_df = select_last7days_infecteds(df)

    print(last7_df)

if __name__ == "__main__":
    _test()