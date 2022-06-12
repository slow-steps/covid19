""" operate _relesemark file """

import datetime
from pathlib import Path

RELEASE_MARK_PATH = Path(__file__).parent.joinpath("_releasemark")
MARK_FORMAT = "%Y-%m-%d %X"

def get_marked_datetime():
    if RELEASE_MARK_PATH.exists():
        with open(RELEASE_MARK_PATH, "r") as mark_file:
            timepstamp_str = mark_file.read()
        last_marked = datetime.datetime.strptime(timepstamp_str, MARK_FORMAT)
    else:
        last_marked = datetime.datetime.min
    return last_marked

def is_newer_than_marked(target_datetime):
    """ check given page is newer than ever """
    if target_datetime > get_marked_datetime():
        return True
    else:
        return False
def is_today_marked():
    """  check if today marked """
    today_date = datetime.date.today()
    marked_date = get_marked_datetime().date()
    if marked_date >= today_date:
        return True
    else:
        return False

def update_mark(marking_datetime):
    with open(RELEASE_MARK_PATH, "w") as mark_file:
        mark_str = datetime.datetime.strftime(marking_datetime, MARK_FORMAT)
        mark_file.write(mark_str)