export class CovidContentChanger {
  #commentsShower;
  #infectedsShower;
  #takadaShower;
  #himeshimaShower;
  #kunisakiShower;
  #kitsukiShower;
  #downloadShower;
  constructor(commentShower , infectedsShower, takadaShower, himeshimaShower, kunisakiShower, kitsukiShower, downloadShower) {
    this.#commentsShower = commentShower;
    this.#infectedsShower = infectedsShower;
    this.#takadaShower = takadaShower;
    this.#himeshimaShower = himeshimaShower;
    this.#kunisakiShower = kunisakiShower;
    this.#kitsukiShower = kitsukiShower;
    this.#downloadShower = downloadShower;
  }
  showComments() {
    this.#commentsShower();
  }
  showInfecteds() {
    this.#infectedsShower();
  }
  showTakada() {
    this.#takadaShower();
  }
  showHimeshima() {
    this.#himeshimaShower();
  }
  showKunisaki() {
    this.#kunisakiShower();
  }
  showKitsuki() {
    this.#kitsukiShower();
  }
  showDownload() {
    this.#downloadShower();
  }
}