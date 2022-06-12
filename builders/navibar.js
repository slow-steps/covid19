export class CovidNaviBar {
  #contentChanger;
  constructor(contentChanger) {
    this.#contentChanger = contentChanger;
  }
  refreshView(region) {
    region.empty();
    region.append(naviBar(
      naviBarContents(this.#contentChanger)
    ));
  }
}
function naviBarContents(changer) {
  return [
    {
      "label" : "県コメント（1週間）",
      "callback" : () => changer.showComments(),
    },
    {
      "label" : "陽性者リスト（1週間）",
      "callback" : () => changer.showInfecteds(),
    },
    {
      "label" : "陽性者リスト（国東）",
      "callback" : () => changer.showKunisaki(),
    },
    {
      "label" : "ダウンロード",
      "callback" : () => changer.showDownload(),
    }  
  ];
}
function naviBar(settings) {
  const bar = $("<div>")
    .css({
      "margin" : "auto",
      "overflow" : "hidden",
    });
  for (let setting of settings) {
    bar.append(naviButton(
      setting["label"],
      setting["callback"]
    ));
  }
  bar.append($("<div>", { css : { "clear" : "both" } }))
  return bar;
} 
function naviButton(label, callback) {
  return $("<Button>")
    .attr({
      "class" : "btn-floating orange darken-1 child-module",
    })
    .css({
      "float" : "left",
      "width" : "auto",
      "margin" : "4px 10px",
      "padding" : "0px 10px",
    })
    .text(label)
    .on("click", callback);
}