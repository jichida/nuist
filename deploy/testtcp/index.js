const net=require('net');
const debug = require('debug')('testtcp:start');
const sd = require('./src/sd/sd.js');
const config = require('./src/config');
const ip = config.targetip;//'47.97.174.215';//47.97.174.215 //目标ip
const port = parseInt(config.targetport);//目标端口
let timerInterval;
let timerTimeout;

const typeofdeviceid = typeof process.env.deviceid;
debug(`typeofdeviceid->${typeofdeviceid}`)
debug(`----------->${parseInt(config.deviceid)}->${parseInt(config.senddatainterval)}`);

const client= net.connect({port:port,host:ip},()=>{
  const sendcmd1 = ()=>{
    const bufhex = sd.getdatahex1(parseInt(config.deviceid));
    const buf_cmd1 = Buffer.from(bufhex,'hex');
    client.write(buf_cmd1);
  }

  sendcmd1();//ping
  timerInterval = setInterval(()=>{
    sendcmd1();
  },parseInt(config.sendpinginterval));
});

client.on('data',(data)=>{
  console.log(`接收到数据为${data.toString('hex')}`);
  timerTimeout = setTimeout(()=>{
    const bufhex = sd.getdatahex2(parseInt(config.deviceid));
    const buf_cmd2 = Buffer.from(bufhex,'hex');
    client.write(buf_cmd2);
    clearTimeout(timerTimeout);
  },parseInt(config.senddatainterval))
});

client.on('end',()=>{
  console.log(`和服务器断开`);
  if(!!timerInterval){
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if(!!timerTimeout){
    clearTimeout(timerTimeout);
    timerTimeout = null;
  }
});
