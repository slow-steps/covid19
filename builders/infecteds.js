import { Grid, html } from "../common/gridjs/gridjs.module.js"
import Enumerable from "../common/linq/linq.min.js";import * as covidDate from "./coviddatetime.js";
import { TableBuilder } from "./tablebuilder.js";

export class OitaInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.infectedsPromise.then(x), infectesGrid);
  }
}

export class TakadaInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.takadaPromise.then(x), infectesGrid);
  }
}

export class HimeshimaInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.himeshimaPromise.then(x), infectesGrid);
  }
}
export class KunisakiInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.kunisakiPromise.then(x), infectesGrid);
  }
}

export class KitsukiInfecteds extends TableBuilder {
  constructor(covidData) {
    super(x => covidData.kitsukiPromise.then(x), infectesGrid);
  }
}

const infectesGrid = data => {
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
