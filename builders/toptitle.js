export class CovidTopTitle {
  #title;
  constructor(title) {
    this.#title = title;
  }
  refreshView(region) {
    region
      .append(titleBar(this.#title))
      .append(sourceLink());
  }
}
function titleBar(title) {
  return $("<h5>")
    .attr({
      "class" : "orange darken-4 orange-text text-lighten-5 main-module",
    })
    .css({
      "margin" : "0px",
      "padding" : "10px 16px",
      "border-radius" : "4px",
    })
    .text(title);
}
function sourceLink() {
  return $("<div>", {
    "class" : "grey-text text-darken-1",
    css : {
      "margin-top" : "5px",
      "text-align" : "right",
      "font-size" : "small",
    }})
    .append(
      $("<a>", {
        href : "https://www.pref.oita.jp/site/covid19-oita/covid19-pcr.html",
        text : "大分県におけるPCR等検査実施人数及び患者状況",
      }))
    .append(
      $("<span>", {
        css : {
          "font-size" : "x-small",
        },
        text : " より",
      }));
}