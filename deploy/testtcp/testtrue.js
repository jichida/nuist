const net=require('net');
const debug = require('debug')('testtcp:start');
const sd = require('./src/sd/sd.js');
const config = require('./src/config');
const ip = '127.0.0.1';//'47.97.174.215';//47.97.174.215 //目标ip
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
  // const bufhex1 = '594700010000000650e2280e0037010250427e000b7d3100000100000033818600009c00f103d0066008e903b306f80763091b2f333b04050607f903004800001300371c54080001';
  const bufhex2 = '594700010000000850e2285c00370102c9427e000b7d3100007f0000003381860000ff0900000000000000000000b006000000000000000000000000000000000000f71bee059c0d';
  const buf_cmd2 = Buffer.from(bufhex2,'hex');
  client.write(buf_cmd2);
  // timerTimeout = setTimeout(()=>{
  //   const bufhex = sd.getdatahex2(parseInt(config.deviceid));
  //   const buf_cmd2 = Buffer.from(bufhex,'hex');
  //   client.write(buf_cmd2);
  //   clearTimeout(timerTimeout);
  // },parseInt(config.senddatainterval))
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
