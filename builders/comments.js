import * as covidDate from "./coviddatetime.js";

export class OitaComments {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    this.#covidData.handleComments(comments => {
      region.empty();
      region.append(commentTable(comments))
    });
  }
}
function commentTable(comments) {
  const table = $("<table>");
  $("<thead>")
    .append($("<tr>")
      .append($("<th>").text("更新日時").css({ "min-width" : "120px" }))
      .append($("<th>").text("コメント")))
    .appendTo(table);
  const tbody = $("<tbody>", {
      "class" : "white",
    })
    .appendTo(table)
  for (let comment of comments) {
    $("<tr>")
      .append($("<td>").html(datetimeHtml(comment.releaseDate)))
      .append($("<td>").html(comment.commentBody.replace(/[\r\n]/g, "<br>")))
      .appendTo(tbody);
  }
  return table;  
}
function datetimeHtml(dateString) {
  const dateSerial = new Date(dateString);
  const date = covidDate.getDateKanji(dateSerial);
  const time = covidDate.getTimeKanji(dateSerial);
  return `${date}<br>${time}`;
}