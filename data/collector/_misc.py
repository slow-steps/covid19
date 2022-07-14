""" _misc """

import json

from commentsdf import CovidComments
from infectedsdf import CovidInfecteds
from covidsummary import *
from datacollector import *

def make_summary_file_name(summary):
    summary_date = summary["date"]
    return  summary_date + ".json"

def make_summaries(comments_csv_path, infecteds_pdf_path, summary_folder_path):
    comments_df = CovidComments(comments_csv_path).all
    infecteds_df = CovidInfecteds(infecteds_pdf_path).all
    summaries = covidsummary.generate_summaries(comments_df, infecteds_df)
    for summary in summaries:
        json_path = summary_folder_path.joinpath(make_summary_file_name(summary))
        with open(json_path, "w") as summary_json:
            json.dump(summary, summary_json)

if __name__ == "__main__":
    make_summaries(COMMENTS_CSV_PATH, INFECTEDS_PDF_PATH, SUMMARY_FOLDER_PATH)