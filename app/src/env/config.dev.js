let islocalhost = true;
const serverurl = islocalhost?'http://localhost:6011':'http://api.nuistiot.com';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.2.3',
    sendlocationinterval:20000,
    softmode:'app'
};


export default config;
