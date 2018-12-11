const DBModels = require('../db/models.js');
const jpush = require('../smspush/push.js');
const pwd = require('../util/pwd');
const moment = require('moment');

/*
在操作数据库以前调用，相当于操作数据的前置钩子
*/
const preaction =(actionname,collectionname,doc,fnresult)=>{
  //console.log(`preaction doc:${JSON.stringify(doc)}`);
  if(actionname === 'save' && collectionname === 'user'){
    //新建用户,hashpassword
    let retdoc = doc;
    let passwordsalt = pwd.getsalt();
    pwd.hashPassword(retdoc.password,passwordsalt,(err,passwordhash)=>{
      retdoc.passwordsalt = passwordsalt;
      retdoc.passwordhash = passwordhash;
      fnresult(null,true);
    });
    return;
  }

  if(actionname == 'save' || actionname === 'findByIdAndUpdate'){
    if(collectionname === 'onlineresearch'){
      doc.publishdate = moment().format('YYYY-MM-DD');
    }
  }
  fnresult(null,true);
};

/*
在操作数据库后调用，相当于操作数据的后置钩子
*/
const postaction =(actionname,collectionname,doc)=>{

};

exports.preaction = preaction;
exports.postaction = postaction;
