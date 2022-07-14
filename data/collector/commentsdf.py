""" comment dataframe maker """

from bisect import insort_right
import datetime
import pandas as pd

def make_comment_row(new_datetime, new_text):
    return pd.DataFrame(
    {
        "更新日時" : [new_datetime],
        "コメント" : [new_text],
    })

def make_latest_comments_table(csv_path, new_datetime, new_text):
    inserting_df = None
    if not new_datetime is None:
        inserting_df = make_comment_row(new_datetime, new_text)
    saved_df = None
    if (not csv_path is None) or csv_path.exists():
        saved_df = pd.read_csv(csv_path, parse_dates=["更新日時"])
    latest_df = None
    if inserting_df is None:
        latest_df = saved_df
    else:
        if saved_df is None:
            latest_df = inserting_df
        else:
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
    def __init__(self, csv_path, new_datetime=None, new_text=None):
        self.all = make_latest_comments_table(csv_path, new_datetime, new_text)
        self.last7days = select_last7days_comments(self.all)

def _test():
    comments = CovidComments(
        csv_path= None,
        new_datetime=datetime.datetime.now(),
        new_text="test comment."
    )
    print(comments.all)
    print(comments.last7days)

if __name__ == "__main__":
    _test()
