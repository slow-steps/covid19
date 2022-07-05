import * as covidDateTime from "./coviddatetime.js";

export class CovidSummary {
  #covidData;
  #summaries;
  #valueChangers = [];
  #currentIndex = 0;
  #lastIndex = 0;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    
    const div = $("<div>", {
      "class" : "orange lighten-3 main-module",
    });

    this.#covidData.summariesPromise.then(summaries => {
      this.#summaries = summaries;
      this.#lastIndex = this.#summaries.length - 1;
      this.#currentIndex = this.#lastIndex;
      
      div
        .append(commentTitle(
          this.#valueChangers,
          () => new Date(this.#currentSummary()["date"]),
          () => this.#goPrev(),
          () => this.#goNext(),
          () => this.#isFirst(),
          () => this.#isLast()))
        .append(commentMain(
          this.#valueChangers, 
          () => this.#currentSummary()["comment"]))
        .append(
          countsIndicator(
            this.#valueChangers, 
            {
              "oita" : () => this.#currentSummary()["oita"],
              "takada" : () => this.#currentSummary()["takada"],
              "himeshima" : () => this.#currentSummary()["himeshima"],
              "kunisaki" : () => this.#currentSummary()["kunisaki"],
              "kitsuki" : () => this.#currentSummary()["kitsuki"],
            }));

        region.append(div);

        this.#changeValue();
      });
  }
  #currentSummary() {
    return this.#summaries[this.#currentIndex];
  }
  #goPrev() {
    if (this.#currentIndex > 0) {
      this.#currentIndex = this.#currentIndex - 1;
      this.#changeValue();
    }
  }
  #goNext() {
    if (this.#currentIndex < this.#lastIndex) {
      this.#currentIndex = Math.min(this.#lastIndex, this.#currentIndex + 1);
      this.#changeValue();
    }
  }
  #isFirst() {
    return (this.#currentIndex == 0);
  }
  #isLast() {
    return (this.#currentIndex == this.#lastIndex);
  }
  #changeValue() {
    for (let changer of this.#valueChangers) {
      changer();
    }
  }
}
function commentTitle(valueChangers, dateProvider, goPrev, goNext, isFirst, isLast) {
  const buttonClass = "btn-flat orange-text text-darken-4";
  const divBase = $("<div>");
  const prevDiv = $("<button>", {
    "class" : buttonClass,
    css :{
      "float" : "left",
    },
    text : "◀",
  })
  .appendTo(divBase);

  const summaryTitle = $("<div>", {
    "class" : "orange-text text-darken-3",
    css : {
      "float" : "left",
      "margin" : "0px",
      "padding" : "3px",
      "font-size" : "larger",
      // "font-weight" : "bold",
    },
  })
  .appendTo(divBase);

  valueChangers.push(() => summaryTitle.text(
    `県コメント（${covidDateTime.getDateKanji(dateProvider())}発表）冒頭部`))

  const nextDiv = $("<button>", {
    "class" : buttonClass,
    css :{
      "float" : "right",
    },
    text : "▶",
    disabled : "true",
  })
  .appendTo(divBase);

  divBase.append(floatReseter());

  const buttonEnabledChanger = () =>{
    if (isFirst()) {
      prevDiv[0].disabled = true;
    } else {
      prevDiv[0].disabled = false;
    }
    if (isLast()) {
      nextDiv[0].disabled = true;
    } else {
      nextDiv[0].disabled = false;
    }
  };
  prevDiv.on("click", () => {
    goPrev();
    buttonEnabledChanger();
  });
  nextDiv.on("click", () => {
    goNext();
    buttonEnabledChanger();
  });

  return divBase;
}
function commentMain(valueChangers, textProvider) {
  const divBase = $("<div>", {
      "class" : "white child-module",
    });
  const textDiv = $("<p>", {
      css : {
        "margin" : "5px",
      },
    })
    .appendTo(divBase);
  
  valueChangers.push(() => textDiv.text(textProvider()));

  return divBase;
}
function countsIndicator(valueChangers, countMembers) {
  return $("<div>")
    .append(floatReseter())
    .append(
      $("<div>", {
        css : {
          "float" : "right",
          "overflow" : "hidden",
        }
      })
      .append(
        $("<div>", {
          "class" : "orange-text text-darken-3",
          css : {
            "float" : "left",
            "margin-right" : "12px"
          },
          text : "新規感染者数"
        })
      )
      .append(countElement("県", valueChangers, countMembers["oita"]))
      .append(countElement("高田", valueChangers, countMembers["takada"]))
      .append(countElement("姫島", valueChangers, countMembers["himeshima"]))
      .append(countElement("国東", valueChangers, countMembers["kunisaki"]))
      .append(countElement("杵築", valueChangers, countMembers["kitsuki"])))
    .append(floatReseter());
}
function floatReseter() {
  return $("<div>", { css : { "clear" : "both" } });
}
function countElement(label, valueChangers, valueProvider) {
  const divBase = $("<div>", {
      css : {
        "float" : "left",
        "overflow" : "hidden",
        "margin" : "0px 2px 0px 14px"
      }
    })
    .append($("<div>", {
      "class" : "orange-text text-darken-3",
      css : {
        "float" : "left",
      },
      text : `${label}：`,
    }));
  
  const textDiv = $("<div>", {
      "class" : "text-white",
      css : {
        "float" : "left",
        "font-weight" : "bold",
      }
    })
    .appendTo(divBase);
  
  valueChangers.push(() => textDiv.text(`${valueProvider()} 名`));

  return divBase;
}

