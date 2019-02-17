// let hexreply = '';
// for(let i=0;i<4+17+17;i++){
//   hexreply+='00';
// }
// const bodybuf = Buffer.from(hexreply,'hex');
// bodybuf[0] = 129;
// bodybuf[1] = 134;
// bodybuf[2] = 0;
// bodybuf[3] = 0;
// bodybuf[4] = 255;
// bodybuf[5] = 15;
// bodybuf[6] = 15;
// bodybuf[7] = 0;
// bodybuf[8] = 0;
// bodybuf[9] = 0;
// bodybuf[10] = 0;
// bodybuf[11] = 0;
// bodybuf[12] = 0;
// bodybuf[13] = 0;
// bodybuf[14] = 0;
// bodybuf[15] = 0;
// bodybuf[16] = 255;
// bodybuf[17] = 15;
// bodybuf[18] = 0;
// bodybuf[19] = 0;
// bodybuf[20] = 0;
// bodybuf[21] = 0;
// bodybuf[22] = 0;
// bodybuf[23] = 0;
// bodybuf[24] = 0;
// bodybuf[25] = 0;
// bodybuf[26] = 0;
// bodybuf[27] = 0;
// bodybuf[28] = 0;
// bodybuf[29] = 0;
// bodybuf[30] = 0;
// bodybuf[31] = 0;
// bodybuf[32] = 0;
// bodybuf[33] = 0;
// bodybuf[35] = 0;
// bodybuf[36] = 92;
// bodybuf[37] = 23;
// // bodybuf[38] = 109;
// // bodybuf[39] = 6;
// // bodybuf[40] = 62;
// // bodybuf[41] = 13;
//
// const ZigbeeData = bodybuf.toString('hex');//
// console.log(`getcmd2====>${ZigbeeData},节点数据长度为:${ZigbeeData.length/2}`);
//
// const newheader4hex = ZigbeeData.substr(0,2);
// const newheader4 = newheader4hex.toUpperCase();
// // if(newheader4 === '6B' || newheader4 === '6C'){
//   console.log(`接收到新协议:${ZigbeeData},节点数据长度为:${ZigbeeData.length/2}`);
//   let jsonData = {};
//   const channelnum = (ZigbeeData.length - 8)/34;
//   for(let i = 0; i < channelnum; i++){
//     const channelhex = ZigbeeData.substr(8+i*2,17*2);
//     const hzhex = channelhex.substr(0,16);
//     const wdhex = channelhex.substr(16,32);
//     const cyhex = channelhex.substr(32,2);
//     console.log(`channelnum${i},hzhex:${hzhex},wdhex:${wdhex},cyhex:${cyhex}`);
//   }
// }
const hzhex_sample =  Buffer.from('012101FF');
const sample =  Buffer.from('+1838.67E5000000');
