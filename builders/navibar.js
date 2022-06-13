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
      "label" : "県陽性者（1週間）",
      "callback" : () => changer.showInfecteds(),
    },
    {
      "label" : "髙田",
      "callback" : () => changer.showTakada(),
    },
    {
      "label" : "国東",
      "callback" : () => changer.showKunisaki(),
    },    {
      "label" : "杵築",
      "callback" : () => changer.showKitsuki(),
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
let buttonMap = {};
const selectedButton = "btn-floating orange darken-1 child-module";
const deselectedButton = "btn-floating orange lighten-3 orange-text text-darken-4 child-module";
function naviButton(label, callback) {
  const button = $("<Button>", {
    "class" : deselectedButton,
    css : {
      "float" : "left",
      "width" : "auto",
      "margin" : "4px 10px",
      "padding" : "0px 10px",
    },
    text : label,
  })
  .on("click", () =>
  {
    callback();
    setIndicatorColor(label);
  }); 
  buttonMap[label] = button;
  return button;
}
function setIndicatorColor(targetLabel) {
  for (let label in buttonMap) {
    buttonMap[label].attr({
      "class" : label == targetLabel ? selectedButton : deselectedButton,
    })
  }
}