const net=require('net');
const ip=process.env.targetip||'127.0.0.1';//'114.55.89.241';//'114.55.89.241';//'127.0.0.1';//'114.55.89.241';//目标ip
const port=50000;//目标端口

const client=net.connect({port:port,host:ip},()=>{
  const bufstr_cmd1='594700010000000653B832F0000001012A';
  const buf_cmd1=Buffer.from(bufstr_cmd1,'hex');
  const bufstr_cmd2='594700010000000453B832C50037010207427E000B7D310000560000003381860000F7090000000000000000000032080000000000000000000000000000000000005B1A2508082211';
  const buf_cmd2=Buffer.from(bufstr_cmd2,'hex');
  const bufstr_cmd3='594700010000000553B832E100340103FF562000B4A2E64C304257809DB1C93615C142B820000676C8A727BD927456A512200002AB1176453A486765DE310AF31D840DFFFF';
  const buf_cmd3=Buffer.from(bufstr_cmd3,'hex');

  const sendbuf = bufstr_cmd3;
  let bufstring=sendbuf.toString()//'aa3c2c9422b9e300130000360000009d00090006000600060006000600';//buf.toString('hex');
  console.log(`连接上服务器【${ip}:${port}】,发送数据${bufstring}`);
  client.write(sendbuf);
  //},process.env.sendinterval*1000||1000);
});

client.on('data',(data)=>{
  console.log(`接收到数据为${data.toString('hex')}`);
//client.end();
});

client.on('end',()=>{
  console.log(`和服务器断开`);
});
