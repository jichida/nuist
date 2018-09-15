let islocalhost = false;
const serverurl = islocalhost?'http://localhost:5011':'http://api.nuistiot.com:50000';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.2.5',
    sendlocationinterval:20000,
    softmode:'app'
};


export default config;
