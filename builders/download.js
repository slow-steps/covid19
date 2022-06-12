export class CovidDownload {
  refreshView(region) {
    region.empty(); 
    downloadBoard()
      .append(downloadList())
      .appendTo(region);
  }
}
function downloadBoard() {
  return  $("<div>", {
    class : "white",
    css : {
      "padding" : "10px",
    }
  });
}
function downloadList() {
  return $("<ul>")
    .append(linkItem(
      "大分県コメントのCSV（令和4年5月22日以降）", 
      "./data/comments.csv",
      "大分県コメント.csv"))
    .append(linkItem(
      "陽性者一覧のCSV（県発表全陽性者：令和2年3月3日以降）",
      "./data/infecteds.csv",
      "陽性者一覧.csv"));
}
function linkItem(text, path, name) {
  return $("<li>", {
    css : {
      "margin" : "18px",
      "font-size" : "medium",
    }
   })
    .append($("<a>", {
      href : path,
      text : text,
      download : name,
    }));
}