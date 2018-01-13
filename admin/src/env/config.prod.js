let islocalhost = false;
let serverurl = islocalhost?'http://localhost:5011':'http://daba.czjcd.com';

export default {
    restserverurl:`${serverurl}/adminapi/v1`,
    adminauthserverurl:`${serverurl}/adminauth/v1`,
    admincustomapi:`${serverurl}/admincustomapi/v1`,
    serverurl:`${serverurl}`,
    appversion:'1.1.1'
};
