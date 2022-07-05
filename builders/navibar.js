export class CovidNaviBar {
  #refreshers;
  constructor(refreshers) {
    this.#refreshers = refreshers;
  }
  refreshView(region) {
    region.empty();
    region.append(naviBar(
      naviBarContents(this.#refreshers)
    ));
  }
}
function naviBarContents(refreshers) {
  return [
    {
      "label" : "県コメント（1週間）",
      "changeContent" : () => refreshers["comments"](),
    },
    {
      "label" : "県陽性者（1週間）",
      "changeContent" : () => refreshers["infecteds"](),
    },
    {
      "label" : "高田",
      "changeContent" : () => refreshers["takada"](),
    },
    {
      "label" : "姫島",
      "changeContent" : () => refreshers["himeshima"](),
    },
    {
      "label" : "国東",
      "changeContent" : () => refreshers["kunisaki"](),
    },    
    {
      "label" : "杵築",
      "changeContent" : () => refreshers["kitsuki"](),
    },
    {
      "label" : "ダウンロード",
      "changeContent" : () => refreshers["download"](),
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
      setting["changeContent"]
    ));
  }
  bar.append($("<div>", { css : { "clear" : "both" } }))
  return bar;
}
let buttonMap = {};
const selectedButton = "btn-floating orange darken-1 child-module";
const deselectedButton = "btn-floating orange lighten-3 orange-text text-darken-4 child-module";
function naviButton(label, changeContent) {
  const button = $("<Button>", {
    "class" : deselectedButton,
    css : {
      "float" : "left",
      "width" : "auto",
      "margin" : "4px 6px",
      "padding" : "0px 10px",
    },
    text : label,
  })
  .on("click", () =>
  {
    changeContent();
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