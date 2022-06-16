export class CovidFooter {
  #covidData;
  constructor(covidData) {
    this.#covidData = covidData;
  }
  refreshView(region) {
    region.empty();
    this.#covidData.handleUpdatedTime(updatedTime => {
      region.append($("<p>", {
        css : {
          "text-align" : "right",
          "font-size" : "small",
        },
        text : updatedText(updatedTime),
      }));
    }); 
  }
}
function updatedText(updatedTime) {
  return `取得日時： ${updatedTime}`;
}