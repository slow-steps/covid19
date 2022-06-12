import * as covidData from "./data/coviddata.js";
import * as covidTopTitle from "./builders/toptitle.js";
import * as covidTodayInfo from "./builders/todayinfo.js";
import * as oitaComments from "./builders/comments.js";
import * as covidInfecteds from "./builders/infecteds.js";
import * as covidDownload from "./builders/download.js";
import * as covidContentChanger from "./builders/conentchanger.js";
import * as covidNaviBar from "./builders/navibar.js";

const title = "大分県コロナ情報取得ページ ";

$(() => {
  const data = new covidData.CovidData({
    "comments" : "data/comments7days.json",
    "infecteds" : "data/infecteds7days.json",
    "kunisaki" : "data/kunisaki.json",
  });
  document.title = title;
  
  const topTitle = new covidTopTitle.CovidTopTitle(title);
  topTitle.refreshView($("#topTitle"));
  
  const todayInfo = new covidTodayInfo.CovidTodayInfo(data);
  todayInfo.refreshView($("#todayInfo"))

  const comments = new oitaComments.OitaComments(data);
  const infecteds = new covidInfecteds.OitaInfecteds(data);
  const kunisaki = new covidInfecteds.KunisakiInfecteds(data);
  const download = new covidDownload.CovidDownload();

  const contentRegion = $("#pageContent");

  const contentChanger = new covidContentChanger.CovidContentChanger(
    () => comments.refreshView(contentRegion), 
    () => infecteds.refreshView(contentRegion), 
    () => kunisaki.refreshView(contentRegion),
    () => download.refreshView(contentRegion));

  const naviBar = new covidNaviBar.CovidNaviBar(contentChanger);
  naviBar.refreshView($("#naviBar"));
});

