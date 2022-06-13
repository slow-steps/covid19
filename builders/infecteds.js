import * as covidDate from "./coviddatetime.js";

export class OitaInfecteds {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleInfecteds(infecteds => {
      region.append(infectedsTable(infecteds));
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
      region.append(infectedsTable(takada));
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
      region.append(infectedsTable(himeshima));
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
      region.append(infectedsTable(kunisaki));
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
      region.append(infectedsTable(kitsuki));
    });
  }  
}
function infectedsTable(data) {
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
