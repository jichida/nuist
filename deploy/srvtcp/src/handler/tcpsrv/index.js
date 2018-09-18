const net = require('net');
const config = require('../../config.js');
const debug = require('debug')('srvtcp:data')
const getbuf = require('./protocol');
const winston = require('../../log/log.js');
const util = require('../../util/util.js');
const PubSub = require('pubsub-js');
const moment = require('moment');
// const mongoose = require('mongoose');

const magiclen=2;
const idoffset = magiclen;
const idlen = 2;
const snlen = 4;
const timestamplen = 4;
const lengthlen = 2;
const protocollen = 1;
const cmdlen = 1;
const checksumlen=1;
const lengthoffset = magiclen + idlen + snlen + timestamplen ;
const cmdoffset = lengthoffset + lengthlen + protocollen;
const data_headlen = cmdoffset + cmdlen + checksumlen;

debug(`lengthoffset==>${lengthoffset}`);

const tcpsocksmap = new Map();

let getsocketfrommac = (mac)=>{
  let obj = tcpsocksmap.get(mac);
  if(!!obj){
    return obj.socket;
  }
  return null;
}

const getpureIp = (ip) => {
    return ip.indexOf('::ffff:') == 0 ? ip.substring(ip.indexOf('::ffff:') + 7) : ip;
};
//订阅设备id,接收到消息时触发
//插入设备数据库,定时更新（历史数据）,publish给最新的用户
starttcpsrv = (settings)=> {
  net.createServer((socket)=> {
      let curid = undefined;
      let curaddress = {
        isget:false,
        provice:'',
        city:'',
        county:''
      };
      const remoteip = getpureIp(socket.remoteAddress);
      let fromsock = remoteip + ':' + socket.remotePort;
      debug(`${fromsock}接受一个socket`);
      const ipaddr = getpureIp(remoteip);
      util.getIpInfo(ipaddr,(err,result)=>{
           let curaddress = {
             ipaddr,
             provice:'未知',
             city:'未知',
             county:'未知'
           }
           if(!err && !!result){
             if(result.code === 0 && !!result.data){
               curaddress = {
                 ipaddr,
                 provice:result.data.region,
                 city:result.data.city,
                 county:result.data.county
               };
             }
           }
           winston.getlog().info(`来自ip:${ipaddr},provice:${curaddress.provice},city:${curaddress.city},county:${curaddress.county}`);
      });
      let recvbuf = new Buffer('','binary');

      socket.on("error", (err) =>{
        debug(`发生错误【${curid}】连接关闭`);
        //winston.getlog().error(err.stack);
        if(!!curid){
          tcpsocksmap.delete(curid);
        }

      });
      socket.on("close", (err) =>{
        //winston.getlog().info(err.stack);
        debug(`===>【${curid}】连接关闭`);
        if(!!curid){
          tcpsocksmap.delete(curid);
        }
      });
      socket.on('data',(data)=> {
        //下面3行为测试程序！！！

          let indatabuf = new Buffer(data,'binary');
          let totalLength = recvbuf.length + indatabuf.length;
          recvbuf = Buffer.concat([recvbuf, indatabuf],totalLength);
          debug(`待处理数据:${recvbuf.toString('hex')}`);
          winston.getlog().info(`待处理数据:${recvbuf.toString('hex')}`);
           while(recvbuf.length >= data_headlen){
               if(recvbuf[0] === 0x59 && recvbuf[1]===0x47 ){
                 let datalen = (recvbuf[lengthoffset] << 8) + recvbuf[lengthoffset+1];
                 let newbufid = Buffer.allocUnsafe(idlen);
                 console.log(`recvbuf1:${recvbuf.toString('hex')}`);
                 recvbuf.copy(newbufid, 0, idoffset, idoffset+idlen);
                 let gwid = newbufid.toString('hex');//
                 //转为大写
                 gwid = gwid.toUpperCase();
                 if(!curid){
                   curid = gwid;
                   tcpsocksmap.set(gwid,{
                       socket,
                       remoteip
                      }
                    );
                 }
                 const cmd = recvbuf[cmdoffset];

                 debug(`获取到id:${gwid},命令号:${cmd},长度:${datalen}`);
                 winston.getlog().info(`获取到id:${gwid},命令号:${cmd},长度:${datalen}`);
                 let newbuflen = data_headlen + datalen;
                 if(recvbuf.length >= newbuflen){
                       //parse data.
                       let bodybuf = Buffer.allocUnsafe(datalen);
                       recvbuf.copy(bodybuf, 0, data_headlen, data_headlen+datalen);
                       debug(`获取到数据部分:${bodybuf.toString('hex')}`);
                       debug(`获取到数据部分:${bodybuf.toString('hex')}`);
                       if(bodybuf.length >= datalen){
                         getbuf({cmd,recvbuf,bodybuf},(err,result)=>{
                           if(!err){
                             if(cmd === 2 && result.amtype === '0B'){
                               //<----publish data==========
                                 const publishdata = {
                                   "gwid" :`${gwid}`,
                                   "deviceid":`${result.deviceid}`,
                                   "amtype":`${result.amtype}`,
                                   realtimedata:result.resultdata
                                 }
                                 publishdata.realtimedata.datatime = moment().format('YYYY-MM-DD HH:mm:ss');
                                 PubSub.publish(`nuistdata`,publishdata);
                                 debug(`get data--->${JSON.stringify(result.resultdata)}`);
                             }
                             else if(cmd === 2 && result.amtype === '03'){
                               const publishdata = {
                                 "gwid" :`${gwid}`,
                                 "deviceid":`${result.deviceid}`,
                                 "amtype":`${result.amtype}`,
                                 'nextdeviceid':result.nextdeviceid
                               }
                               PubSub.publish(`nuistdata`,publishdata);
                             }

                             if(!!result.replybuf){
                               //reply---->
                              socket.write(result.replybuf);
                             }
                           }
                           else{
                             //error--->
                             debug(`【${curid}】连接关闭`);
                             socket.end();
                             socket.destroy();
                             if(!!curid){
                               tcpsocksmap.delete(curid);
                             }
                           }

                         });
                       }

                       //<----------------
                       let leftbuf = Buffer.allocUnsafe(recvbuf.length - newbuflen);
                       recvbuf.copy(leftbuf, 0, newbuflen,recvbuf.length);

                       recvbuf = leftbuf;
                        //renew buffer
                       continue;
                  }
               }//必须magic开头
               else{
                  //error
                  debug(`【${curid}】连接关闭`);
                  socket.end();
                  socket.destroy();
                  if(!!curid){
                    tcpsocksmap.delete(curid);
                  }
                }
                break;//不符协议
            }
      });
  }).listen(config.listenport, (socket)=> {
      debug(`listenport:${config.listenport}`);
  });
};

exports.getsocketfromid = getsocketfrommac;
exports.starttcpsrv= starttcpsrv;
