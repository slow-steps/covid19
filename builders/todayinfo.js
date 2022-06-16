import Enumerable from "../common/linq/linq.min.js";
import * as covidDateTime from "./coviddatetime.js";

export class CovidTodayInfo {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    
    const div = $("<div>", {
      "class" : "orange lighten-3 main-module",
    });

    this.#covidData.commentsPromise.then(comments  => {
      const latestComment = Enumerable
        .from(comments)
        .orderByDescending(x => new Date(x.releaseDate))
        .first();
      
      const latestDate = new Date(latestComment.releaseDate);

      div
        .append(commentTitle(latestDate))
        .append(commentMain(latestComment.commentBody));      
      
      this.#covidData.infectedsPromise.then(infecteds =>{
        div.append(
          countsIndicator(countMembers(
            infecteds,
            latestDate
          )));

        region.append(div);
      });
    });
  }
}
function commentTitle(commentDate) {
  return $("<h6>", {
    "class" : "orange-text text-darken-3",
    css : {
      "margin" : "0px",
      "padding" : "3px",
    },
    text : `県コメント（${covidDateTime.getDateKanji(commentDate)}発表）冒頭部`,
  });
}
function commentMain(commentText) {
  return $("<div>", {
      "class" : "white child-module",
    })
    .append(
      $("<p>", {
        css : {
          "margin" : "5px",
        },
        text : commentText.match(/([^\r\n]*)[\r\n]/)[0],
      }));
}
function countMembers(infecteds, latestDate) {
  const dateCriteria = covidDateTime
    .getTimelessDate(latestDate)
    .toISOString();        
  let oita = 0;
  let himeshima = 0;
  let kunisaki = 0;
  let kitsuki = 0;
  for (let infected of infecteds) {
    if (infected.releaseDate == dateCriteria) {
      oita++;
      switch (infected.residence) {
        case "姫島村":
          himeshima++;
          break;
        case "国東市":
          kunisaki++;
          break;
        case "杵築市":
          kitsuki++;
          break;
      }
    }
  }
  return {
    "oita" : oita,
    "himeshima" : himeshima,
    "kunisaki" : kunisaki,
    "kitsuki" : kitsuki,
  };
}
function countsIndicator(countMembers) {
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
      .append(countElement("県", countMembers["oita"]))
      .append(countElement("姫島", countMembers["himeshima"]))
      .append(countElement("国東", countMembers["kunisaki"]))
      .append(countElement("杵築", countMembers["kitsuki"])))
    .append(floatReseter());
}
function floatReseter() {
  return $("<div>", { css : { "clear" : "both" } });
}
function countElement(label, count) {
  return $("<div>", {
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
    }))
    .append($("<div>", {
      "class" : "text-white",
      css : {
        "float" : "left",
        "font-weight" : "bold",
      },
      text : `${count} 名`,
    }));
}

