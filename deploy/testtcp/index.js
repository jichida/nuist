const net=require('net');
const sd = require('./sd');
const config = require('./config');
const ip=process.env.targetip||'127.0.0.1';//'47.97.174.215';//47.97.174.215 //目标ip
const port=50000;//目标端口
let timer;
const getsimulatordata = ()=>{

}

const client= net.connect({port:port,host:ip},()=>{
  timer = setInterval(()=>{
    const bufhex = sd.getdatahex2(config.deviceid);
    const buf_cmd2 = Buffer.from(bufhex,'hex');
    client.write(buf_cmd2);
  },config.senddatainterval)

  // const bufstr_cmd1='594700010000000653B832F0000001012A';
  // const buf_cmd1=Buffer.from(bufstr_cmd1,'hex');
  // let bufstr_cmd2='594700010000000453B832C50037010207';
  // console.log(`bufstr_cmd2-->${bufstr_cmd2.length}`);
  // bufstr_cmd2+='427E000B7D310000560000003381860000F7090000000000000000000032080000000000000000000000000000000000005B1A2508082211';
  // console.log(`bufstr_cmd2-->${bufstr_cmd2.length}`);
  //
  // const buf_cmd2=Buffer.from(bufstr_cmd2,'hex');
  // const bufstr_cmd3='594700010000000553B832E100340103FF562000B4A2E64C304257809DB1C93615C142B820000676C8A727BD927456A512200002AB1176453A486765DE310AF31D840DFFFF';
  // const buf_cmd3=Buffer.from(bufstr_cmd3,'hex');
  //
  // let payload = '427E000B7D3100000100000033818600';
  // payload+='00DE09E10A660B030BFC002E056606AC';
  // payload+='071538306004050607FC030015000000';
  // payload+='002B18D0050001299D';
  // console.log(`payload-->${payload.length}`);
  //
  // payload = `427E000B7D3100000100000033818600002c01E10A660B030BFC002E056606AC072459200904050607fc030015170000002B18D0050001299D`
  // const buf_cmd_payload = '594700010000000453B832C50039010202'+payload;
  // const buf_cmd4=Buffer.from(buf_cmd_payload,'hex');
  //
  // const sendbuf = buf_cmd4;
  //
  // let bufstring=sendbuf.toString()//'aa3c2c9422b9e300130000360000009d00090006000600060006000600';//buf.toString('hex');
  // console.log(`连接上服务器【${ip}:${port}】,发送数据${bufstring}`);
  // client.write(sendbuf);
  // },process.env.sendinterval*1000||1000);
});

client.on('data',(data)=>{
  console.log(`接收到数据为${data.toString('hex')}`);
//client.end();
});

client.on('end',()=>{
  console.log(`和服务器断开`);
  clearInterval(timer);
});
