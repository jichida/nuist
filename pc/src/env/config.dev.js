const islocalhost = true;
const serverurl = islocalhost?'http://localhost:6011':'http://api.nuistiot.com:50000';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

const config = {
    ispopalarm:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.2.5',
    sendlocationinterval:20000,
    softmode:'pc'
};


export default config;
