const config = require('../../config.js');
const DBModels = require('../../db/models.js');
const mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const _ = require('lodash');
const moment = require('moment');

exports.getvotelist = (actiondata,ctx,callback)=>{
  const voteModel = DBModels.OnlineResearchModel;
  const queryexec = voteModel.find({}).select().lean();
  queryexec.exec((err,result)=>{
    if(!err && !!result){
       let list = [];
       _.map(result,(vote)=>{
         let researchrecords = _.get(vote,'researchrecords',[]);
         let isfilled = false;
         let selectedoption = null;
         _.map(researchrecords,(rc)=>{
           if(rc.creator.toString() === ctx.userid.toString()){
             isfilled = true;
             selectedoption = rc.voteresult;
           }
         })
         if(isfilled){
           vote.isfilled = true;
           vote.selectedoption = selectedoption;
         }
         list.push(vote);
       });

        callback({
          cmd:'getvotelist_result',
          payload:{list}
        });
      }
      else{
        callback({
          cmd:'common_err',
          payload:{errmsg:err.message,type:'getvotelist'}
        });
      }
  });
};



exports.setvote = (actiondata,ctx,callback)=>{
  const voteModel = DBModels.OnlineResearchModel;
  const {voteid,voteresult} = actiondata;
  voteModel.findOne({_id:mongoose.Types.ObjectId(voteid)}).lean().exec((err,result)=>{
    if(!err && !!result){
      let researchrecords = _.get(result,'researchrecords',[]);
      researchrecords.push({
        creator:mongoose.Types.ObjectId(ctx.userid),
        created_at:moment().format('YYYY-MM-DD HH:mm:ss'),
        voteresult
      });
      let researchresult = _.get(result,'researchresult',[]);
      while(researchresult.length < result.answeroptions.length){
        researchresult.push(0);
      }
      _.map(result.answeroptions,(option,index)=>{
        if(option.optionname === voteresult){
          researchresult[index] = researchresult[index]+1;
        }
      });

      voteModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(voteid)},{$set:{researchrecords,researchresult}},{new:true}).
      lean().exec((err,vote)=>{
        if(!err && !!vote){
          vote.isfilled = true;
          vote.selectedoption = voteresult;
          callback({
            cmd:'setvote_result',
            payload:vote
          });
        }
        else{
          callback({
            cmd:'common_err',
            payload:{errmsg:err.message,type:'setvote'}
          });
        }
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'setvote'}
      });
    }
  });
};
