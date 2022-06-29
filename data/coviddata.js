const summariesJson = "data/summaries7days.json";
const commentsJson =  "data/comments7days.json";
const infectedsJson = "data/infecteds7days.json";
const takadaJson = "data/takada.json";
const himeshimaJson = "data/himeshima.json";
const kunisakiJson = "data/kunisaki.json";
const kitsukiJson = "data/kitsuki.json";
const updatedJson = "data/update.json";

function uniqeUrl(url) {
  return url + "?" + new Date().getTime();
}

export class CovidData {
  #summaries = null;
  #comments = null;
  #infecteds = null;
  #takada = null;
  #himeshima = null;
  #kunisaki = null;
  #kitsuki = null;
  #updatedTime = null;

  get summariesPromise() {
    return new Promise(resolve => {
      if (this.#summaries == null) {
        $.getJSON(uniqeUrl(summariesJson), data =>{
          this.#summaries = data;
          resolve(this.#summaries);
        })
      } else {
        resolve(this.#summaries);
      }
    });  
  }
  get commentsPromise() {
    return new Promise(resolve => {
      if (this.#comments == null) {
        $.getJSON(uniqeUrl(commentsJson), data =>{
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
        $.getJSON(uniqeUrl(infectedsJson), data =>{
          this.#infecteds = data;
          resolve(this.#infecteds);
        });
      } else {
        resolve(this.#infecteds);
      }
    });
  }
  get takadaPromise() {
    return new Promise(resolve => {
      if (this.#takada == null) {
        $.getJSON(uniqeUrl(takadaJson), data =>{
          this.#takada = data;
          resolve(this.#takada);
        });
      } else {
        resolve(this.#takada);
      }
    });
  }
  get himeshimaPromise() {
    return new Promise(resolve => {
      if (this.#himeshima == null) {
        $.getJSON(uniqeUrl(himeshimaJson), data =>{
          this.#himeshima = data;
          resolve(this.#himeshima);
        });
      } else {
        resolve(this.#himeshima);
      }
    });
  }  get kunisakiPromise() {
    return new Promise(resolve => {
      if (this.#kunisaki == null) {
        $.getJSON(uniqeUrl(kunisakiJson), data =>{
          this.#kunisaki = data;
          resolve(this.#kunisaki);
        });
      } else {
        resolve(this.#kunisaki);
      }
    });
  }
  get kitsukiPromise() {
    return new Promise(resolve => {
      if (this.#kitsuki == null) {
        $.getJSON(uniqeUrl(kitsukiJson), data =>{
          this.#kitsuki = data;
          resolve(this.#kitsuki);
        });
      } else {
        resolve(this.#kitsuki);
      }
    });
  }
  get updatedTimePromise() {
    return new Promise(resolve => {
      if (this.#kitsuki == null) {
        $.getJSON(uniqeUrl(updatedJson), data =>{
          this.#updatedTime = data["updated"];
          resolve(this.#updatedTime);
        });
      } else {
        resolve(this.#updatedTime);
      }
    });   
  }
}

