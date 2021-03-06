const mongoose     = require('mongoose');
const _ = require('lodash');
const DBModels = require('../db/models.js');

const startmodule = (app)=>{

  app.get('/video/:gwid/:videoindex',(req,res)=>{
    const videoModel = DBModels.VideoModel;
    const gatewayid = req.params.gwid;
    const videoindex = req.params.videoindex;
    videoModel.findOne({gatewayid}).lean().exec((err,videoinfo)=>{
      console.log(videoinfo);
      const srcrtmp = _.get(videoinfo,`srcrtmp${videoindex}`,"rtmp://rtmp.open.ys7.com/openlive/55d1551091d548dbbae3d78d0990008b.hd");
      const srchttp = _.get(videoinfo,`srchttp${videoindex}`,"http://hls.open.ys7.com/openlive/55d1551091d548dbbae3d78d0990008b.hd.m3u8");
      res.render('video', {srcrtmp,srchttp});
    });
  });

};

module.exports=  startmodule;
