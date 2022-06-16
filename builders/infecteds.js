import { Grid, html } from "../common/gridjs/gridjs.module.js"
import Enumerable from "../common/linq/linq.min.js";import * as covidDate from "./coviddatetime.js";

export class OitaInfecteds {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleInfecteds(infecteds => {
      infectedsTable(infecteds).render(region[0]);
    });
  }
}
export class TakadaInfecteds {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleTakada(takada => {
      infectedsTable(takada).render(region[0]);
    });
  }  
}
export class HimeshimaInfecteds {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleHimeshima(himeshima => {
      infectedsTable(himeshima).render(region[0]);
    });
  }  
}
export class KunisakiInfecteds {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleKunisaki(kunisaki => {
      infectedsTable(kunisaki).render(region[0]);
    });
  }  
}
export class KitsukiInfecteds {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleKitsuki(kitsuki => {
      infectedsTable(kitsuki).render(region[0]);
    });
  }  
}
function infectedsTable(data) {
  return new Grid({
    columns: ['名前', 'ジャンル', '素晴らしさ'],
    data: [
      ['Vue', 'Frontend Framework', '★★★★★'],
      ['Vuetify', 'UI Framework', '★★★★★'],
      ['React', 'Frontend Framework', '★★★★★'],
      ['Gatsby', 'Static Site Genarator', '★★★★★'],
      ['Grid', 'Great Table Library', '★★★★★']
    ],
  });
}
function infectedsTableOld(data) {
  const table = $("<table>")
    .append(
      $("<thead>").append(
        $("<tr>")
        .append($("<th>").text("NO"))
        .append($("<th>").text("公表日"))
        .append($("<th>").text("居住地"))
        .append($("<th>").text("年代"))
        .append($("<th>").text("性別"))));    
  
  const tbody = $("<tbody>")
    .appendTo(table, {
      "class" : "white",
    });
  for (let record of data) {
    $("<tr>")
      .append($("<td>").text(record.number))
      .append($("<td>").text(covidDate.getDateKanji(
          new Date(record.releaseDate))))
      .append($("<td>").text(record.residence))
      .append($("<td>").text(record.ageRange))
      .append($("<td>").text(record.gender))
      .appendTo(tbody);
  }
  return table;
}
