export class CovidData {
  #getUrl;
  #comments = null;
  #infecteds = null;
  #takada = null;
  #himeshima = null;
  #kunisaki = null;
  #kitsuki = null;
  #updatedTime = null;
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
  get takadaPromise() {
    return new Promise(resolve => {
      if (this.#takada == null) {
        $.getJSON(this.#getUrl("takada"), data =>{
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
        $.getJSON(this.#getUrl("himeshima"), data =>{
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
        $.getJSON(this.#getUrl("kunisaki"), data =>{
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
        $.getJSON(this.#getUrl("kitsuki"), data =>{
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
        $.getJSON(this.#getUrl("updated"), data =>{
          this.#updatedTime = data["updated"];
          resolve(this.#updatedTime);
        });
      } else {
        resolve(this.#updatedTime);
      }
    });   
  }
}

