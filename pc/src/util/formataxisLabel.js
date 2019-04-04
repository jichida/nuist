import moment from 'moment';

//copy from https://github.com/grafana/grafana/blob/master/public/app/core/utils/ticks.ts
/**
 * Format timestamp similar to Grafana graph panel.
 * @param ticks Number of ticks
 * @param min Time from (in milliseconds)
 * @param max Time to (in milliseconds)
 */
const grafanaTimeFormat = (ticks, minticktime, maxticktime)=> {
  const maxticktime_m = moment(maxticktime);
  const minticktime_m = moment(minticktime);
  const max = maxticktime_m.valueOf();
  const min = minticktime_m.valueOf();
  if (min && max && ticks) {
    const range = max - min;
    const secPerTick = range / ticks / 150;
    const oneDay = 86400000;
    const oneYear = 31536000000;
    // //debugger;
    if (secPerTick <= 45 && range <= oneDay) {
      return 'HH:mm:ss';
    }
    if (range <= oneDay) {
      return 'HH:mm';
    }
    if (secPerTick <= 80000) {
      return 'MM/DD HH:mm';
    }
    if (secPerTick <= 2419200 || range <= oneYear) {
      return 'MM/DD';
    }
    return 'YY-MM';
  }

  return 'HH:mm';
}

const gettickformats = (ticktimestring)=>{
  if(ticktimestring.length < 2){
    return 'HH:mm:ss';
  }
  return grafanaTimeFormat(ticktimestring.length,ticktimestring[0],ticktimestring[ticktimestring.length-1]);
}

// const formatterAxisLabel = (ticktime,index,tickformat)=>{
//   const ticktimestring = moment(ticktime).format(tickformat);
//   //debugger;
//   return ticktimestring;
// }

const getformatticktimestring = (ticktimestring)=>{
  let tickstrings = [];
  const formatter = gettickformats(ticktimestring);
  for(let i = 0 ;i < ticktimestring.length; i++){
    const timeformatted = moment(ticktimestring[i]).format(formatter);
    tickstrings.push(timeformatted);
  }
  return tickstrings;
}
export {getformatticktimestring};
