import lodashshuffle from 'lodash.shuffle';
let mapdevicestatus = {};
export const getdomposition = (divid)=> {
    const el = document.getElementById(divid);
    if(!!el){
      const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: `${rect.top + scrollTop}px`,
        left:`${rect.left + scrollLeft}px`,
        height:`${rect.height}px`,
        width:`${rect.width}px`,
        display:'block'
      };
    }
    return {  display:'none' };
}

export const getCoureName = (course)=> {
    var name = "";
    if(typeof course === 'string'){
      course = parseFloat(course);
    }

    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
    {
        name = "正北";
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        name = "东北";
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        name = "正东";
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        name = "东南";
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        name = "正南";
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        name = "西南";
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        name = "正西";
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        name = "西北";
    }
    else {
        name = "未知.";
    }
    return name;
}

export const getindexstring = (index,length)=>{
  index = ''+index;
  while(index.length < length){
    index = '0'+index;
  }
  return index;
}
//
// const getdeviceLatlng = (deviceId,devices)=>{
//   if(!!devices[deviceId].Longitude){
//     return new window.AMap.LngLat(devices[deviceId].Longitude,devices[deviceId].Latitude);
//   }
//   return;
// }
//
//
// const getshortestpath = (baseDeviceId,restpath,devices)=>{
//   let selectedDeviceId;
//   let retpath = [];
//   if(restpath.length > 0){
//      const p1 = getdeviceLatlng(baseDeviceId,devices);
//      let p2 = getdeviceLatlng(restpath[0],devices);
//      selectedDeviceId = restpath[0];
//      let shortestlength = window.AMap.GeometryUtil.distance(p1,p2);
//      for(let i=1;i<restpath.length;i++){
//        p2 = getdeviceLatlng(restpath[i],devices);
//        let distance = window.AMap.GeometryUtil.distance(p1,p2);
//        if(shortestlength > distance){
//           shortestlength = distance;
//           selectedDeviceId = restpath[i];
//        }
//      }
//   }
//
//   for(let i = 0; i <restpath.length;i++){
//     if(restpath[i] !== selectedDeviceId){
//       retpath.push(restpath[i]);
//     }
//   }
//   return {
//     selectedDeviceId,
//     retpath
//   };
// }

export const lodashshuffle_gwpath = (devicepath,devices)=>{
  let retpath = [];
  const startpath = lodashshuffle(devicepath);
  retpath = startpath;
  // if(startpath.length > 0){
  //   retpath.push(startpath[0]);
  // }
  // let restpath = [];
  // for(let i=1;i<startpath.length;i++){
  //   restpath.push(startpath[i]);
  // }
  //
  // while(restpath.length > 0){
  //    const result = getshortestpath(retpath[retpath.length-1],restpath,devices);
  //    retpath.push(result.selectedDeviceId);
  //    restpath = result.retpath;
  // }

  return retpath;
}

export const setshuffledevices = (devicepath)=>{
  for(let i = 0 ;i < devicepath.length; i++){
    const r = Math.random()*10;
    if(r < 1){
      mapdevicestatus[devicepath[i]] = 'E';
    }
    else if(r > 8){
      mapdevicestatus[devicepath[i]] = 'A';
    }
    else{
      mapdevicestatus[devicepath[i]] = 'N';
    }
  }
}

export const getdevicestatus = (deviceid)=>{
  return mapdevicestatus[deviceid];
}
