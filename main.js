import * as covidData from "./data/coviddata.js";
import * as covidTopTitle from "./builders/toptitle.js";
import * as covidSummary from "./builders/summary.js";
import * as oitaComments from "./builders/comments.js";
import * as covidInfecteds from "./builders/infecteds.js";
import * as covidDownload from "./builders/download.js";
import * as covidNaviBar from "./builders/navibar.js";
import * as covidFooter from "./builders/footer.js";

const title = "大分県コロナ情報取得ページ（高田・姫島・国東・杵築版）";

$(() => {
  document.title = title;
  
  const topTitle = new covidTopTitle.CovidTopTitle(title);
  topTitle.refreshView($("#topTitle"));
  
  const data = new covidData.CovidData();
  
  const summary = new covidSummary.CovidSummary(data);
  summary.refreshView($("#todayInfo"))

  const comments = new oitaComments.OitaComments(data);
  const infecteds = new covidInfecteds.OitaInfecteds(data);
  const takada = new covidInfecteds.TakadaInfecteds(data);
  const himeshima = new covidInfecteds.HimeshimaInfecteds(data);
  const kunisaki = new covidInfecteds.KunisakiInfecteds(data);
  const kitsuki = new covidInfecteds.KitsukiInfecteds(data);
  const download = new covidDownload.CovidDownload();

  const contentRegion = $("#pageContent");

  const naviBar = new covidNaviBar.CovidNaviBar({
    "comments" : () => comments.refreshView(contentRegion), 
    "infecteds" : () => infecteds.refreshView(contentRegion),
    "takada" : () => takada.refreshView(contentRegion),
    "himeshima" : () => himeshima.refreshView(contentRegion),
    "kunisaki" : () => kunisaki.refreshView(contentRegion),
    "kitsuki" : () => kitsuki.refreshView(contentRegion),
    "download" : () => download.refreshView(contentRegion),   
  });
  naviBar.refreshView($("#naviBar"));

  const footer = new covidFooter.CovidFooter(data);
  footer.refreshView($("#pageFooter"));
});

