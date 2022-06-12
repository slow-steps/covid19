export function getTimelessDate(dateSerial) {
  return new Date(
    dateSerial.getFullYear(), 
    dateSerial.getMonth(),
    dateSerial.getDate(),
    9,
    0,
    0
  )
}
export function getDateKanji(dateSerial) {
  const reiwa = dateSerial.getFullYear() - 2018;
  const month = dateSerial.getMonth() + 1;
  const day = dateSerial.getDate();
  return `令和${reiwa}年${month}月${day}日`;
}
export function getTimeKanji(dateSerial) {
  const hours = dateSerial.getHours();
  const minutes = dateSerial.getMinutes();
  return `${hours}時${to00(minutes)}分`;
}
export function getDateTimeKanji(dateSerial) {
  return `${getDateKanji(dateSerial)} ${getTimeKanji(dateSerial)}`;
}
function to00(value) {
  return String(value).padStart(2, "0")
}