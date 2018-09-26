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
                  // '594700010000000850e22962003701023d427e 00 0b7d31000061 0000003381860000390800000000000000000000ef070000000000000000000000000000000000007619f7093a0f"';
  //const bufhex1 = '594700010000000650e2280e0037010250427e000b7d3100000100000033818600009c00f103d0066008e903b306f80763091b2f333b04050607f903004800001300371c54080001';
   // const bufhex2 = '594700010000001a50e22eb8003701029f427e000b7d310000010000003381860000c6007c046e06a807180452059006bd07193c613b04050607f6030041000000006e1a97090001';

  const bufhex2 = '594700010000017050e238bc0008010238427e00fd7d024900';//sd.getdatahex2_raw(255,'427e00037d1d00000100000003f10101090011001300230094002100008100007d0007');
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
