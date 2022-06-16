import { Grid, html } from "../common/gridjs/gridjs.module.js"
import Enumerable from "../common/linq/linq.min.js";import * as covidDate from "./coviddatetime.js";
import { TableBuilder } from "./tablebuilder.js";

export class OitaInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.handleInfecteds(x), infectesGrid);
  }
}

export class TakadaInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.handleTakada(x), infectesGrid);
  }
}

export class HimeshimaInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.handleHimeshima(x), infectesGrid);
  }
}
export class KunisakiInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.handleKunisaki(x), infectesGrid);
  }
}

export class KitsukiInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.handleKitsuki(x), infectesGrid);
  }
}

function infectesGrid(data) {
  return new Grid({
    columns: [
      "NO", 
      "公表日",
      "居住地",
      "年代",
      "性別"
    ],
    data: Enumerable
      .from(data)
      .select(x => [
        x.number,
        covidDate.getDateKanji(
          new Date(x.releaseDate)),
        x.residence,
        x.ageRange,
        x.gender
      ])
      .toArray(),
  });
}
