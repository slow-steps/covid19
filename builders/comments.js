import { Grid, html } from "../common/gridjs/gridjs.module.js"
import Enumerable from "../common/linq/linq.min.js";
import { TableBuilder } from "./tablebuilder.js";
import * as covidDate from "./coviddatetime.js";

export class OitaComments extends TableBuilder{
  constructor(covidData) {
    super(x => covidData.commentsPromise.then(x), commentsGrid);
  }
}

const commentsGrid = data => {
  return new Grid({
    columns: [
      {
        name : "更新日時",
        formatter : x => html(datetimeHtml(x)),
        attributes : {
          "style" : {
            "min-width" : "110px",
            "text-align" : "center"
          },
        }
      },
      {
        name : "コメント",
        formatter : x => html(commentHtml(x)),
      }],
    data: Enumerable
      .from(data)
      .select(x => [
        x.releaseDate,
        x.commentBody
      ])
      .toArray(),
  });
}
function datetimeHtml(dateString) {
  const dateSerial = new Date(dateString);
  const date = covidDate.getDateKanji(dateSerial);
  const time = covidDate.getTimeKanji(dateSerial);
  return `${date}<br>${time}`;
}
function commentHtml(commentText) {
  return commentText.replace(/[\r\n]/g, "<br>");
}