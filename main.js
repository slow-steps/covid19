import * as covidData from "./data/coviddata.js";
import * as covidTopTitle from "./builders/toptitle.js";
import * as covidTodayInfo from "./builders/todayinfo.js";
import * as oitaComments from "./builders/comments.js";
import * as covidInfecteds from "./builders/infecteds.js";
import * as covidDownload from "./builders/download.js";
import * as covidContentChanger from "./builders/conentchanger.js";
import * as covidNaviBar from "./builders/navibar.js";

const title = "大分県コロナ情報取得ページ（姫島・国東・杵築版）";

$(() => {
  const data = new covidData.CovidData({
    "comments" : "data/comments7days.json",
    "infecteds" : "data/infecteds7days.json",
    "takada" : "data/takada.json",
    "himeshima" : "data/himeshima.json",
    "kunisaki" : "data/kunisaki.json",
    "kitsuki" : "data/kitsuki.json",
  });
  document.title = title;
  
  const topTitle = new covidTopTitle.CovidTopTitle(title);
  topTitle.refreshView($("#topTitle"));
  
  const todayInfo = new covidTodayInfo.CovidTodayInfo(data);
  todayInfo.refreshView($("#todayInfo"))

  const comments = new oitaComments.OitaComments(data);
  const infecteds = new covidInfecteds.OitaInfecteds(data);
  const takada = new covidInfecteds.TakadaInfecteds(data);
  const himeshima = new covidInfecteds.HimeshimaInfecteds(data);
  const kunisaki = new covidInfecteds.KunisakiInfecteds(data);
  const kitsuki = new covidInfecteds.KitsukiInfecteds(data);
  const download = new covidDownload.CovidDownload();

  const contentRegion = $("#pageContent");

  const contentChanger = new covidContentChanger.CovidContentChanger(
    () => comments.refreshView(contentRegion), 
    () => infecteds.refreshView(contentRegion),
    () => takada.refreshView(contentRegion),
    () => himeshima.refreshView(contentRegion),
    () => kunisaki.refreshView(contentRegion),
    () => kitsuki.refreshView(contentRegion),
    () => download.refreshView(contentRegion));

  const naviBar = new covidNaviBar.CovidNaviBar(contentChanger);
  naviBar.refreshView($("#naviBar"));
});

