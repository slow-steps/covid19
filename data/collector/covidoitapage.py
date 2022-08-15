""" covidoitapage.py """

from datetime import datetime
import re
import requests
from bs4 import BeautifulSoup

# 大分県 Webページ
BASE_URI = r"https://www.pref.oita.jp"
# PCR等検査実施結果ページ
PAGE_SUB_URI = r"/site/covid19-oita/covid19-pcr.html"

DATETIME_FINDER = r"<title>.+（R(\d+)\.(\d+)\.(\d+)　(\d+)時(\d+)分更新）"
COMMENT_FINDER = r"<h2>ＰＣＲ等検査実施結果[^<]+</h2><div[^>]+>(.*?)</div>"
LIST_CURRENT_FINDER = r'<a href="([^"]+)">陽性者一覧（７波 R4\.7\.1～）についてはこちらからご覧ください。 \s*</a>'
LIST_LAST1_FINDER = r'<a href="([^"]+)">１波から６波（R2\.3\.3～R4\.6\.30）についてはこちらからご覧ください。\s*</a>'

class CovidOitaPage:
    """ 大分県コロナページ """
    _html = ""
    _release_datetime = None
    _comment = ""
    _infecteds_link_current = ""
    _infecteds_link_last1 = ""

    def __init__(self):
        self._html = get_covidpage_html()
        self._release_datetime = get_release_datetime(self._html)

    @property
    def html(self):
        """ return html """
        return self._html

    @property
    def release_datetime(self):
        """ return datetime of released """
        return self._release_datetime

    @property
    def comment(self):
        """ return tody comment """
        if self._comment == "":
            self._comment = get_today_comment(self._html)
        return self._comment

    @property
    def infecteds_link_current(self):
        """ return link of infecteds' list """
        if self._infecteds_link_current == "":
            self._infecteds_link_current = get_infecteds_link(self._html, LIST_CURRENT_FINDER)
        return self._infecteds_link_current

    @property
    def infecteds_link_last1(self):
        """ return link of infecteds' list """
        if self._infecteds_link_last1 == "":
            self._infecteds_link_last1 = get_infecteds_link(self._html, LIST_LAST1_FINDER)
        return self._infecteds_link_last1

def get_covidpage_html():
    """ return html of today's covid19 page """
    response = requests.get(BASE_URI + PAGE_SUB_URI)
    response.encoding = response.apparent_encoding
    html = response.text
    response.close()
    return html

def get_release_datetime(html):
    """ return datetime of html released """
    found = re.search(DATETIME_FINDER, html)
    datetime_value = datetime(
        year=int(found.group(1)) + 2018,
        month=int(found.group(2)),
        day=int(found.group(3)),
        hour=int(found.group(4)),
        minute=int(found.group(5)))
    return datetime_value

def get_today_comment(html):
    """ return today comment """
    found = re.search(COMMENT_FINDER, html, re.DOTALL)
    soup = BeautifulSoup(found.group(1), "html.parser")
    comment = soup.text.strip()
    return comment

def get_infecteds_link(html, finder):
    """ return infecteds list link """
    found = re.search(finder, html)
    list_link = BASE_URI + found.group(1)
    return list_link

def test():
    """ test """
    page = CovidOitaPage()
    print(page.html)
    print(page.release_datetime)
    print(page.comment)
    print(page.infecteds_link_current)

if __name__ == "__main__":
    test()
