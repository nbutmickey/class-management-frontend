export function formateTime(date,showDetail=false) {
  let data = new Date(date);
  let YYYY = data.getFullYear();
  let month = data.getMonth() + 1;
  let MM = month < 10 ? "0" + month : month;
  let day = data.getDate();
  let DD = day < 10 ? "0" + day : day;
  let HH=data.getHours();
  let mm=data.getMinutes();
  if(showDetail){
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}`;
  }else{
    return `${YYYY}-${MM}-${DD}`;
  }
}
