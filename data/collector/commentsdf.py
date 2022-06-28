""" comment dataframe maker """

import datetime
import pandas as pd

def make_comment_row(comment_datetime, comment_text):
    return pd.DataFrame(
    {
        "更新日時" : [comment_datetime],
        "コメント" : [comment_text],
    })

def make_latest_comments_table(csv_path, comment_datetime, comment_text):
    inserting_df = make_comment_row(comment_datetime, comment_text)
    if csv_path is None or not csv_path.exists():
        latest_df = inserting_df
    else:
        saved_df = pd.read_csv(csv_path, parse_dates=["更新日時"])
        latest_df = pd.concat([
            saved_df,
            inserting_df,
        ])
    return latest_df
 
def select_last7days_comments(comments_df):
    begin_date = datetime.datetime.today() - datetime.timedelta(7)
    return comments_df.query(
        '更新日時 >= @begin_date',
        engine="numexpr"
    )

class CovidComments:
    def __init__(self, csv_path, comment_datetime, comment_text):
        self.all = make_latest_comments_table(csv_path, comment_datetime, comment_text)
        self.last7days = select_last7days_comments(self.all)

def _test():
    comments = CovidComments(
        csv_path= None,
        comment_datetime=datetime.datetime.now(),
        comment_text="test comment."
    )
    print(comments.all)
    print(comments.last7days)

if __name__ == "__main__":
    _test()
