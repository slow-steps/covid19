""" infeceds dataframe maker """

from copyreg import constructor
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

def select_last7days_infecteds(infecteds_df):
    begin_date = datetime.date.today() - datetime.timedelta(days=7)
    return infecteds_df.query(
        "公表日 >= @begin_date",
        engine="numexpr"
    )

def get_infececteds_one_date(infecteds_df, target_date):
    return infecteds_df.query(
        "公表日 == @target_date",
        engine="numexpr"
    )
def select_local(infecteds_df, area_name):
       return infecteds_df.query(f"居住地 == '{area_name}'")
   
class CovidInfecteds:
    def __init__(self, pdf_path):
        self.all = get_table_in_pdf(pdf_path)
        self.last7days = select_last7days_infecteds(self.all)
        self.takada = select_local(self.all, "豊後高田市")
        self.himeshima = select_local(self.all, "姫島村")
        self.kunisaki = select_local(self.all, "国東市")
        self.kitsuki = select_local(self.all, "杵築市")

def _test():
    covid_infecteds = CovidInfecteds(Path(__file__).parent.parent.joinpath("infecteds.pdf"))
    print(covid_infecteds.all)
    print(covid_infecteds.last7days)
    print(covid_infecteds.kunisaki)

if __name__ == "__main__":
    _test()