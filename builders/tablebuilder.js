export class TableBuilder {
  #dataHandler;
  #gridMaker;
  #tableDiv;
  constructor(dataHandler, gridMaker) {
    this.#dataHandler = dataHandler;
    this.#gridMaker = gridMaker;
  }
  refreshView(region) {
    region.empty();
    this.#dataHandler(data =>{
      if (this.#tableDiv == null) {
        this.#tableDiv = $("<div>");
        this.#gridMaker(data).render(this.#tableDiv[0]);
      }
      region.append(this.#tableDiv);
    })
  }
}