export class CovidData {
  #getUrl;
  #comments = null;
  #infecteds = null;
  #kunisaki = null;
  constructor(jsonUrlDict) {
    this.#getUrl = key => 
      jsonUrlDict[key] + "?" + new Date().getTime();
  }
  get commentsPromise() {
    return new Promise(resolve => {
      if (this.#comments == null) {
        $.getJSON(this.#getUrl("comments"), data =>{
          data.reverse();
          this.#comments = data;
          resolve(this.#comments);
        })
      } else {
        resolve(this.#comments);
      }
    });
  }
  get infectedsPromise() {
    return new Promise(resolve => {
      if (this.#infecteds == null) {
        $.getJSON(this.#getUrl("infecteds"), data =>{
          this.#infecteds = data;
          resolve(this.#infecteds);
        });
      } else {
        resolve(this.#infecteds);
      }
    });
  }
  get kunisakiPromise() {
    return new Promise(resolve => {
      if (this.#kunisaki == null) {
        $.getJSON(this.#getUrl("kunisaki"), data =>{
          this.#kunisaki = data;
          resolve(this.#kunisaki);
        });
      } else {
        resolve(this.#kunisaki);
      }
    });
  }
  handleComments(commentsHandler) {
    return this.commentsPromise.then(commentsHandler);
  }
  handleInfecteds(infetedsHandler) {
    return this.infectedsPromise.then(infetedsHandler);
  }
  handleKunisaki(kunisakiHandler) {
    return this.kunisakiPromise.then(kunisakiHandler);
  } 
}

