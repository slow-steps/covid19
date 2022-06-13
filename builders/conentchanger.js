export class CovidContentChanger {
  #commentsShower;
  #infectedsShower;
  #takadaShower;
  #kunisakiShower;
  #kitsukiShower;
  #downloadShower;
  constructor(commentShower , infectedsShower, takadaShower, kunisakiShower, kitsukiShower, downloadShower) {
    this.#commentsShower = commentShower;
    this.#infectedsShower = infectedsShower;
    this.#takadaShower = takadaShower;
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