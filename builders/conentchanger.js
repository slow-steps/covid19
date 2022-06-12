export class CovidContentChanger {
  #commentsShower;
  #infectedsShower;
  #kunisakiShower;
  #downloadShower;
  constructor(commentShower , infectedsShower, kunisakiShower, downloadShower) {
    this.#commentsShower = commentShower;
    this.#infectedsShower = infectedsShower;
    this.#kunisakiShower = kunisakiShower;
    this.#downloadShower = downloadShower;
  }
  showComments() {
    this.#commentsShower();
  }
  showInfecteds() {
    this.#infectedsShower();
  }
  showKunisaki() {
    this.#kunisakiShower();
  }
  showDownload() {
    this.#downloadShower();
  }
}