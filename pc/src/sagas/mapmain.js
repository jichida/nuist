import { select,put,call,take,takeLatest,cancel,fork,} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {getRandomLocation} from './geo.js';
import get from 'lodash.get';
import lodashmap from 'lodash.map';
import {
  // lodashshuffle_gwpath,
  // getdevicestatus,
  setshuffledevices} from '../util';
import {
  getpopinfowindowstyle,
  // getlistpopinfowindowstyle,
  getimageicon
} from './getmapstyle';
import {
  map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  ui_mycar_selcurdevice,
  saveusersettings_request,
  saveusersettings_result,
  mapmain_showpopinfo,
  mapmain_drawgatewaypath,
  getdevicelist_request,
  getdevicelist_result,
  getgatewaylist_result,
  getgatewaylist_result_4reducer,
  ui_selectgateway4draw,
  serverpush_device_list,
  serverpush_gateway
  } from '../actions';
import config from '../env/config.js';
import store from '../env/store';

const divmapid_mapmain = 'mapmain';
// const maxzoom = config.softmode === 'pc'?18:19;
let infoWindow;

//=====数据部分=====
let markCluster;
// let endIdx;
let CachedlineArrayList = [];
let gpathSimplifierIns,gPathSimplifier;
const Create_PathSimplifier = (callbackfn)=>{
  return new Promise((resolve,reject) => {
  let tmppathSimplifierIns;
  let tmpPathSimplifier;
    window.AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
      tmpPathSimplifier = PathSimplifier;
      if (!tmpPathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！');
          return;
      }
      tmppathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              autoSetFitView: false,
              map: window.amapmain, //所属的地图实例
              getPath: function(pathData, pathIndex) {
                  // debugger;
                  // console.log(pathData);
                  // console.log(pathIndex);
                  return pathData.path;
              },
              getHoverTitle: function(pathData, pathIndex, pointIndex) {
                  if (pointIndex >= 0) {
                        return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                  }
                  return pathData.name + '，点数量' + pathData.path.length;
              },
              renderOptions: {
                  renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
              }
          });
          resolve({
            gpathSimplifierIns:tmppathSimplifierIns,
            gPathSimplifier:tmpPathSimplifier
          });

  });
      });
          //启动页面
          //创建组件实例
  //     tmppathSimplifierIns = new PathSimplifier({
  //             zIndex: 100,
  //             map: window.amapmain, //所属的地图实例
  //             getPath: function(pathData, pathIndex) {
  //                 //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
  //                 return pathData.path;
  //             },
  //             autoSetFitView:false,
  //             getHoverTitle: function(pathData, pathIndex, pointIndex) {
  //                 //返回鼠标悬停时显示的信息
  //                 if (pointIndex >= 0) {
  //                     //鼠标悬停在某个轨迹节点上
  //                     return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
  //                 }
  //                 //鼠标悬停在节点之间的连线上
  //                 return pathData.name + '，点数量' + pathData.path.length;
  //             },
  //             renderOptions: {
  //                 //轨迹线的样式
  //                 pathLineStyle: {
  //                     strokeStyle: 'red',
  //                     lineWidth: 5,
  //                     dirArrowStyle: true
  //                 }
  //             }
  //         });
  //         console.log(`created--->gpathSimplifierIns--->gPathSimplifier`)
  //         resolve({
  //           gpathSimplifierIns:tmppathSimplifierIns,
  //           gPathSimplifier:tmpPathSimplifier
  //         })
  //   });
  // });
}


  //新建聚合点
  const CreateMapUI_MarkCluster = (map)=>{
    return new Promise((resolve,reject) => {
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }

        if(!!markCluster){
          markCluster.clearMarkers();
          markCluster.setMap(null);
          markCluster = null;
        }

        markCluster = new window.AMap.MarkerClusterer(map, [],{
          maxZoom:12,
          gridSize:80,
        });
        resolve();
    });
  }

  const getMarkCluster_recreateMarks = (SettingOfflineMinutes,g_devicesdb,viewtype,gateways,indexgatewayid)=>{
    if(markCluster.getMarkers().length > 0){
      markCluster.clearMarkers();
    }
    getMarkCluster_createMarks(SettingOfflineMinutes,g_devicesdb,viewtype,gateways,indexgatewayid);
  }

const isEqualArray = (array1,array2)=>{
  if(array1.length !== array2.length){
    return false;
  }
  let isequal = true;
  for(let i = 0 ;i < array1.length ; i++){
    const item1 = array1[i];
    const item2 = array2[2];
    if(JSON.stringify(item1) !== JSON.stringify(item2)){
      isequal = false;
      break;
    }
  }
  return isequal;
}

const getCurGatewayPath = (curgw,curdevicesdb)=>{
  //当前网关&联系的所有设备
  let lineArrayList = [];

  let device2id_db = {};
  // let matcheddevice = {};
  lodashmap(curdevicesdb,(cur)=>{
    device2id_db[cur.DeviceId] = cur;
  });

  lodashmap(curdevicesdb,(cur)=>{
    let curArray = [];
    curArray.push([cur.Longitude,cur.Latitude]);
    let nextdevice = device2id_db[cur.nextdeviceid];
    let i = 0;
    while(!!nextdevice){
      i = i + 1;
      // console.log(`curdeviceid:${nextdevice.DeviceId},nextdevice->${nextdevice.nextdeviceid},${i}`);

      curArray.push([nextdevice.Longitude,nextdevice.Latitude]);
      nextdevice = device2id_db[nextdevice.nextdeviceid];
      if(i > 5){
        break;
      }
    }
    curArray.push([curgw.Longitude,curgw.Latitude]);
    lineArrayList.push({
       name:cur.name,
       path:curArray
     });
  });
  console.log(`lineArrayList->${lineArrayList.length}`)
  return lineArrayList;
}
const getGatewayPath = (gateways,g_devicesdb)=>{
  //输入：一个网关／所有设备
  let curgw;
  let curdevicesdb = {};
  lodashmap(gateways,(gw)=>{
    lodashmap(g_devicesdb,(curdevice)=>{
      if(curdevice.gatewayid === gw._id){
        curdevicesdb[curdevice._id] = curdevice;
      }
    });
    curgw = gw;
  });
  let lineArrayList = [];
  if(!!curgw){
    lineArrayList = getCurGatewayPath(curgw,curdevicesdb);
  }
  return lineArrayList;
  // let lineArrayList = [];
  // lodashmap(gateways,(gw)=>{
  //   let lineArr = [];
  //   if(!gw.devicepath){
  //     gw.devicepath = gw.devicelist;
  //   }
  //   if(!!gw.devicepath){
  //     lodashmap(gw.devicepath,(did)=>{
  //       const item = g_devicesdb[did];
  //       const firstLetter = getdevicestatus(did);
  //       if(!!item && firstLetter==='N'){
  //         lineArr.push([item.Longitude,item.Latitude]);
  //       }
  //     });
  //   }
  //   lineArr.push([gw.Longitude,gw.Latitude]);
  //   lineArrayList.push({
  //      name:gw.name,
  //      path:lineArr
  //    });
  // });
  // return lineArrayList;
};

// let navgz = [];
let gnav_z = [];
let myPath_z =[];
let data_z = [];
let endInx_z = [];
const drawgGatewayPath = (lineArrayList,{gpathSimplifierIns,gPathSimplifier})=>{
  gnav_z = [];
  myPath_z =[];
  data_z = [];
  endInx_z = [];
  for(let i = 0 ;i < lineArrayList.length;i++){
    myPath_z.push(lineArrayList[i].path);
    // console.log(myPath);
    data_z.push({
                 name: lineArrayList[i].name,
                 path: myPath_z[i].slice(0, 1)
             });
    endInx_z.push(0);
  }
  gpathSimplifierIns.setData(data_z); //延展路径
  return new Promise((resolve,reject) => {
    const expandPath = (i,gnav)=> {
        const doExpand = (i,gnav)=> {
            endInx_z[i]++;
            if (endInx_z[i] >= myPath_z[i].length) {
                return false;
            }
            const cursor = gnav.getCursor().clone(), //保存巡航器的位置
                status = gnav.getNaviStatus();
            data_z[i].path = myPath_z[i].slice(0, endInx_z[i] + 1);
            gpathSimplifierIns.setData(data_z); //延展路径
            // console.log(data);
            //重新建立一个巡航器
            gnav = gpathSimplifierIns.createPathNavigator(0, {
                //loop: true, //循环播放
                speed: 600000 //巡航速度，单位千米/小时
            });

            if (status !== 'stop') {
                gnav.start();
            }
            //恢复巡航器的位置
            if (cursor.idx >= 0) {
                gnav.moveToPoint(cursor.idx, cursor.tail);
            }
            return true;
        }

        if (doExpand(i,gnav)) {
            setTimeout(()=>{
              expandPath(i,gnav)
            }, 2000);
        }
    }

    for(let i = 0;i < lineArrayList.length; i++){
        if(!!gnav_z[i]){
          gnav_z[i].stop();
          gnav_z[i].destroy();
        }

        // console.log(`gpathSimplifierIns->i->${i}`)
        const gnav = gpathSimplifierIns.createPathNavigator(i, {
                 loop: true, //循环播放
                 speed: 1000 //巡航速度，单位千米/小时
        });
        gnav.start();

        gnav_z.push(gnav);
        expandPath(i,gnav);
      }

      resolve();
    });
        // for(let i = 0; i < navgz.length; i++){
        //   navgz[i].stop();
        //   navgz[i].destroy();
        // }
        // navgz = [];
        //
        // gpathSimplifierIns.setData(lineArrayList);
        // //创建一个巡航器
        // for(let i = 0 ;i < lineArrayList.length ;i ++){
        //   const navg0 = gpathSimplifierIns.createPathNavigator(i, //关联第1条轨迹
        //       {
        //           loop: true, //循环播放
        //           speed: 1000
        //       });
        //
        //   navgz.push(navg0);
        // }
        // for(let i = 0; i < navgz.length; i++){
        //   navgz[i].start();
        // }
        //
        // console.log(`drawgGatewayPath`)
        // resolve();
    // });

}

  const getMarkCluster_createMarks = (SettingOfflineMinutes,g_devicesdb,viewtype,gateways,indexgatewayid)=>{
    let markers = [];
    const gw = gateways[indexgatewayid];
    if(!!gw){
          lodashmap(gw.devicelist,(deviceid)=>{
            const item = g_devicesdb[deviceid];
      if(!!item){//AMap.LngLat(lng:Number,lat:Number)
          const pos = new window.AMap.LngLat(item.Longitude,item.Latitude);
          const marker = new window.AMap.Marker({
             position:pos,
             icon: new window.AMap.Icon({
                size: new window.AMap.Size(24, 24),
                imageSize: new window.AMap.Size(16, 24),  //图标大小
                image: getimageicon(item,SettingOfflineMinutes,viewtype),
                imageOffset: new window.AMap.Pixel(0, 0)
            }),
             angle:get(item,'angle',0),
            //  content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
             offset: new window.AMap.Pixel(-12,-24),//-113, -140
                   extData:{type:'device',deviceid}
          });
          marker.on('click',()=>{
            //console.log(`click marker ${key}`);
            window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                store.dispatch(ui_mycar_selcurdevice(item._id));
            });
          });
          markers.push(marker);
        }
    });

        const item = gw;
      if(!!item){//AMap.LngLat(lng:Number,lat:Number)
          const pos = new window.AMap.LngLat(item.Longitude,item.Latitude);
          const marker = new window.AMap.Marker({
             position:pos,
             icon: new window.AMap.Icon({
                size: new window.AMap.Size(32, 32),
                imageSize: new window.AMap.Size(24, 32),  //图标大小
                image: `${process.env.PUBLIC_URL}/images/base_normal.png`,
                imageOffset: new window.AMap.Pixel(0, 0),
            }),
             angle:get(item,'angle',0),
            //  content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
             offset: new window.AMap.Pixel(-12,-32),//-113, -140
               extData:{type:'gateway',indexgatewayid}
          });
          markers.push(marker);

          //化纤
            let out = {};
            if(!!gw){
              out[indexgatewayid] = gw
              store.dispatch(mapmain_drawgatewaypath({gateways:out,g_devicesdb}));
            }
        }

    console.log(`markers===>${markers.length}`)
    markCluster.setMarkers(markers);
    }
  }

  const getMarkCluster_updateMarks = (g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,viewtype)=>{
    if(!!markCluster){
      const allmarks = markCluster.getMarkers();
      lodashmap(allmarks,(mark)=>{
        const {type,key} = mark.getExtData();
        if(type === 'device' && !!g_devicesdb[key]){
          const deviceitem = g_devicesdb[key];
          const deviceitemnew = g_devicesdb_updated[deviceitem._id];
          if(!!deviceitemnew){
            if(!!deviceitemnew.Longitude){
              const pos = new window.AMap.LngLat(deviceitemnew.Longitude,deviceitemnew.Latitude);
              mark.setPosition(pos);
              const newIcon = new window.AMap.Icon({
                 size: new window.AMap.Size(24, 24),
                 imageSize: new window.AMap.Size(16, 24),  //图标大小
                 image: getimageicon(deviceitemnew,SettingOfflineMinutes,viewtype),
                 imageOffset: new window.AMap.Pixel(0, 0),
             });
              mark.setIcon(newIcon);
            }
            else{
              markCluster.removeMarker(mark);
            }
          }
        }
      });
    }
  }

  const getMarkCluster_showMarks = ({isshow,SettingOfflineMinutes,g_devicesdb,viewtype,gateways})=>{
    return new Promise((resolve,reject) => {
      if(isshow){
        markCluster.setMap(window.amapmain);
        if(markCluster.getMarkers().length === 0){
          getMarkCluster_createMarks(SettingOfflineMinutes,g_devicesdb,viewtype,gateways);
        }
      }
      else{
        markCluster.setMap(null);
        // markCluster.clearMarkers();
      }
      resolve();
    });
  }

  let CreateMap =({mapcenterlocation,zoomlevel})=> {

    return new Promise((resolve,reject) => {
       if( !window.amapmain ){
        let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
        window.amapmain = new window.AMap.Map(divmapid_mapmain, {
              center: center,
              zoom:zoomlevel,
              zooms:[9,17],
              lang:"zh-cn",
              dragEnable:true,
              zoomEnable:true,
              touchZoom:true,
              // mapStyle: 'amap://styles/macaron'//样式URL
          });
          // http://lbs.amap.com/api/javascript-api/example/personalized-map/set-theme-style
          // http://lbs.amap.com/api/javascript-api/guide/create-map/mapstye/
          window.AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
          ()=>{
            const scale = new window.AMap.Scale({
                  visible: true
              });
            const  toolBar = new window.AMap.ToolBar({
                  position:config.softmode === 'app'?'RT':'LT',
                  liteStyle:config.softmode === 'app'?true:false,
                  visible: true
              });
            const  overView = new window.AMap.OverView({
                  visible: true
              });
              window.amapmain.addControl(scale);
              window.amapmain.addControl(toolBar);
              window.amapmain.addControl(overView);


              resolve(window.amapmain);
          });

        }
        else{
          if(!!window.amapmain){
            resolve(window.amapmain);
            return;
          }
          reject(`地图参数${mapcenterlocation.lng},${mapcenterlocation.lat},amap:${!!window.amapmain}`);
        }
    });
  }

  //监听地图事件
  const listenmapevent = (eventname)=>{
    return new Promise(resolve => {
      if(!!window.amapmain){
        window.amapmain.on(eventname, (e)=> {
            resolve(eventname);
        });
      }
    });
  }


  //监听弹框事件
  const listenwindowinfoevent = (eventname)=>{
    return new Promise(resolve => {
      infoWindow.on(eventname, (e)=> {
          resolve(eventname);
      });
    });
  }

  //显示弹框
  const showinfowindow = (deviceitem,viewtype)=>{
    return new Promise((resolve,reject) =>{
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }
        // console.log(deviceitem)
        const locz = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
        infoWindow = new window.AMap.InfoWindow(getpopinfowindowstyle(deviceitem,viewtype));
        if(!!locz){
          window.amapmain.setCenter(locz);
          infoWindow.open(window.amapmain, locz);
        }
        else{
          infoWindow.open(window.amapmain, window.amapmain.getCenter());
        }
        resolve(infoWindow);
    });
  }

  // const showinfowindow_cluster = ({itemdevicelist,lnglat,SettingOfflineMinutes})=>{
  //   return new Promise((resolve,reject) =>{
  //       if(!window.AMapUI){
  //         alert('未加载到AMapUI！');
  //         reject();
  //         return;
  //       }
  //       infoWindow = new window.AMap.InfoWindow(getlistpopinfowindowstyle(itemdevicelist,SettingOfflineMinutes));
  //       window.amapmain.setCenter(lnglat);
  //       infoWindow.open(window.amapmain, lnglat);
  //       resolve(infoWindow);
  //   });
  // }



  //地图主流程
  export function* createmapmainflow(){

      //创建地图
      yield takeLatest(`${carmapshow_createmap}`, function*(action_createmap) {
        try{
          let {payload:{divmapid}} = action_createmap;
          if(divmapid === divmapid_mapmain){
            const mapcarprops = yield select((state) => {
              const {carmap} = state;
              return {...carmap};
            });
            if(!mapcarprops.isMapInited){//仅在第一次加载页面初始化时进入
              //等待地图初始化
              //console.log(`wait for mapcarprops.isMapInited`);
              yield take(`${map_setmapinited}`);
            }

            const mapcenterlocation = {
              lng:118.7190900000,
              lat:32.2030600000
            };
            const zoomlevel = 13;
            yield call(CreateMap,{mapcenterlocation,zoomlevel});//创建地图

            // yield call(CreateMapUI_PointSimplifier,window.amapmain);
            yield call(CreateMapUI_MarkCluster,window.amapmain);

            let task_zoomend =  yield fork(function*(eventname){
              while(true){
                yield call(listenmapevent,eventname);
              }
            },'zoomend');

            let task_mapclick = yield fork(function*(eventname){
              while(true){
                yield call(listenmapevent,eventname);
                //console.log(`click map!!!${!!infoWindow}`);
                if(!!infoWindow){
                  infoWindow.close();
                  infoWindow = null;
                }
              }
            },'click');//'click'

            // yield delay(3000);
            // //如果已经登录,并且有数据了！，重新加载数据
            // let deivcelist = [];
            // lodashmap(g_devicesdb,(v)=>{
            //   deivcelist.push(v);
            // });
            // if(deivcelist.length > 0){
            //   yield put(getgatewaylist_result({list:deivcelist}));
            // }
            //
            // const {usersettings,devices} = yield select((state)=>{
            //   const {usersettings} = state.userlogin;
            //   const {devices} = state.device;
            //   return {usersettings,devices};
            // });
            // const indexdeviceid = get(usersettings,'indexdeviceid','');
            // if(!!devices[indexdeviceid]){
            //   yield put(ui_mycar_selcurdevice(devices[indexdeviceid].DeviceId));
            // }

            //监听事件
            //  pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function(e, record) {
            //listentask task_dragend task_zoomend task_markclick task_mapclick
            //  })
            while(true){
              let {payload:{divmapid}} = yield take(`${carmapshow_destorymap}`);
              if(divmapid === divmapid_mapmain){
                break;
              }
            }
            // yield cancel(listentask);
            // yield cancel(task_dragend);
            yield cancel(task_zoomend);
            // yield cancel(task_markclick);
            yield cancel(task_mapclick);
          }
        }
        catch(e){
          console.log(e);
        }

      });


      //销毁地图
      yield takeLatest(`${carmapshow_destorymap}`, function*(action_destorymap) {
        try{
        let {payload:{divmapid}} = action_destorymap;
        const destorymap = (divmapid)=>{
          return new Promise((resolve) => {
            if(divmapid === divmapid_mapmain){
              window.amapmain = null;
              infoWindow=null;
              // distCluster=null;
            }
            resolve();
          });
        }
        yield call(destorymap,divmapid);
        }
        catch(e){
          console.log(e);
        }
      });

      //单个设备弹框
      yield takeLatest(`${mapmain_showpopinfo}`, function*(actiondevice) {
        //显示弹框
        try{
          const {payload:_id} = actiondevice;
          const {g_devicesdb,viewtype} = yield select((state)=>{
            const {devices,viewtype} = state.device;
            return {g_devicesdb:devices,viewtype:viewtype};
          });

            //1
            //弹框
            yield call(showinfowindow,g_devicesdb[_id],viewtype);

            yield fork(function*(eventname){
             //while(true){//关闭时触发的事件
              yield call(listenwindowinfoevent,eventname);//触发一次
              if(!!infoWindow){
                  infoWindow.close();
                  infoWindow = null;
              }
            });


        }
        catch(e){
          console.log(e);
        }
      });
      //多个设备弹出框
      // yield takeLatest(`${mapmain_showpopinfo_list}`, function*(actiondevice) {
      //   //显示弹框
      //   try{
      //     const {payload:{itemdevicelist,lnglat}} = actiondevice;
      //     //获取该车辆信息
      //     // let deviceids = [];
      //     // lodashmap(itemdevicelist,(item)=>{
      //     //   deviceids.push(item.DeviceId);
      //     // });
      //     // yield put(querydeviceinfo_list_request({query:{DeviceId:{'$in':deviceids}}}));
      //     // const {payload:{list}} = yield take(`${querydeviceinfo_list_result}`);
      //     //
      //     const listitem = itemdevicelist;//yield call(getgatewaylist,list);
      //     //
      //     // lodashmap(listitem,(item)=>{
      //     //   g_devicesdb[item.DeviceId] = item;
      //     // });
      //
      //     //地图缩放到最大
      //     //yield put(md_mapmain_setzoomlevel(maxzoom));
      //     const SettingOfflineMinutes =yield select((state)=>{
      //       return get(state,'app.SettingOfflineMinutes',20);
      //     });
      //     //弹框
      //     yield call(showinfowindow_cluster,{itemdevicelist:listitem,lnglat,SettingOfflineMinutes});
      //
      //     yield fork(function*(eventname){
      //      //while(true){//关闭时触发的事件
      //        yield call(listenwindowinfoevent,eventname);//触发一次
      //       //  yield put(ui_showmenu("showdevice_no"));
      //        if(!!infoWindow){
      //           infoWindow.close();
      //           infoWindow = null;
      //        }
      //      //}
      //     },'close');
      //
      //   }
      //   catch(e){
      //     console.log(e);
      //   }
      // });
        yield takeLatest(`${ui_selectgateway4draw}`, function*(action) {
          try{
            let {payload} = action;
            const indexgatewayid = payload;
            const {g_devicesdb,viewtype,gateways} = yield select((state)=>{
              const {devices,viewtype,gateways} = state.device;
              return {g_devicesdb:devices,viewtype,gateways};
            });
            //等待地图创建
            while(!markCluster){
              yield delay(500);
            }

            const SettingOfflineMinutes =yield select((state)=>{
              return get(state,'app.SettingOfflineMinutes',20);
            });
            getMarkCluster_recreateMarks(SettingOfflineMinutes,g_devicesdb,viewtype,gateways,indexgatewayid);
            yield call(getMarkCluster_showMarks,{isshow:true,SettingOfflineMinutes,g_devicesdb,viewtype,gateways});
          }
          catch(e){
            console.log(e);
          }
        });

        yield takeLatest(`${getgatewaylist_result}`, function*(deviceresult) {
          let {payload} = deviceresult;
          try{

              yield put.resolve(getgatewaylist_result_4reducer(payload));

              const {g_devicesdb,gateways} = yield select((state)=>{
                const {devices,viewtype,gateways} = state.device;
                return {g_devicesdb:devices,viewtype,gateways};
              });
              //选中一个默认节点
              let {usersettings} = yield select((state)=>{
                const {usersettings} = state.userlogin;
                return {usersettings};
              });
              let indexdeviceid = get(usersettings,'indexdeviceid','');
              let indexgatewayid = get(usersettings,'indexgatewayid','');
              if(!g_devicesdb[indexdeviceid]){
                lodashmap(g_devicesdb,(cur)=>{
                  if(!g_devicesdb[indexdeviceid]){
                    indexdeviceid = cur._id;
                    usersettings.indexdeviceid = indexdeviceid;
                  }
                });
              }
              if(indexgatewayid === ''){
                indexgatewayid = g_devicesdb[indexdeviceid].gatewayid;
                usersettings.indexgatewayid = indexgatewayid;
              }
              // yield put(saveusersettings_request({usersettings}));
              yield put.resolve(saveusersettings_result({usersettings}));

              lodashmap(g_devicesdb,(curdevice)=>{
                const curgw = gateways[curdevice.gatewayid];
                let devicelist = curgw.devicelist || [];
                devicelist.push(curdevice._id);
                curgw.devicelist = devicelist;
                //getRandomLocation
                if(!curdevice.Longitude){
                  const pz = getRandomLocation(curgw.Latitude, curgw.Longitude, 3000);
                  curdevice.Longitude = pz[0];
                  curdevice.Latitude = pz[1];
                }
              });

              lodashmap(gateways,(gw)=>{
                if(!gw.devicepath){
                  gw.devicepath = gw.devicelist;
                  setshuffledevices(gw.devicepath);
                }
              });
              // const data = [];
              // lodashmap(devicelistresult,(deviceitem)=>{
              //   if(!!deviceitem.Longitude && deviceitem.Longitude !==0){
              //     data.push(deviceitem);
              //   }
              //   g_devicesdb[deviceitem.DeviceId] = deviceitem;
              // });



              yield put(ui_selectgateway4draw(indexgatewayid));

              if(!!g_devicesdb[indexdeviceid]){
                yield put(ui_mycar_selcurdevice(indexdeviceid));
              }


            }
            catch(e){
              console.log(e);
            }

        });

        //serverpush_device_list需要顺带gateways
        yield takeLatest(`${serverpush_device_list}`, function*(action) {
          try{
          const {payload:{devicelist}} = action;
          let i = 0;
          const {g_devicesdb,gateways,viewtype} = yield select((state)=>{
            const {devices,viewtype,gateways} = state.device;
            return {g_devicesdb:devices,gateways,viewtype};
          });
          // console.log(`devicelist->${JSON.stringify(devicelist)}`);
          for( i=0;i<devicelist.length;i++){
              let curdevice = devicelist[i];
              if(!curdevice.Longitude){
                const curgw = gateways[curdevice.gatewayid];
                if(!!curgw){
                  const pz = getRandomLocation(curgw.Latitude, curgw.Longitude, 3000);
                  curdevice.Longitude = pz[0];
                  curdevice.Latitude = pz[1];
                }
                else{
                  continue;
                }
              }
              g_devicesdb[devicelist[i]._id] = curdevice;
            }

          const SettingOfflineMinutes =yield select((state)=>{
            return get(state,'app.SettingOfflineMinutes',20);
          });
          let g_devicesdb_updated = {};
          for( i=0;i<devicelist.length;i++){
            g_devicesdb_updated[devicelist[i]._id] = devicelist[i];
          }
          // console.log(`${JSON.stringify(g_devicesdb_updated)}`);
          getMarkCluster_updateMarks(g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,viewtype);

          const {usersettings} = yield select((state)=>{
            const {usersettings} = state.userlogin;
            return {usersettings};
          });
          const indexdeviceid = get(usersettings,'indexdeviceid','');

          for( i=0;i<devicelist.length;i++){
            // console.log(`${devicelist[i]._id}==>${devicelist[i]._id === indexdeviceid}`);

            if(!!infoWindow && devicelist[i]._id === indexdeviceid){//如果正在弹窗并且是选中的item，则更新弹窗内容{
              const {content} = getpopinfowindowstyle(devicelist[i],viewtype);
              infoWindow.setContent(content);
            }
          }
          }
          catch(e){
            console.log(e);
          }
        });

          //ui_mycarselcurdevice_request
          yield takeLatest(`${ui_mycar_selcurdevice}`, function*(action) {
            //地图模式选择车辆
            try{
              const {payload:_id} = action;
              const {g_devicesdb} = yield select((state)=>{
                const {devices,viewtype} = state.device;
                return {g_devicesdb:devices,viewtype:viewtype};
              });
              if(!!infoWindow){
                  infoWindow.close();
                  infoWindow = null;
              }
              //先定位到地图模式,然后选择车辆
              const deviceitem = g_devicesdb[_id];
              if(!!deviceitem){
                let usersettings = yield select((state)=>{
                  return state.userlogin.usersettings;
                });
                usersettings.indexdeviceid = deviceitem._id;
                yield put(saveusersettings_request(usersettings));
                yield put(mapmain_showpopinfo(_id));
              }

            }
            catch(e){
              console.log(e);
            }
          });

      yield takeLatest(`${mapmain_drawgatewaypath}`, function*(action) {
        try{
        const {gateways,g_devicesdb} = action.payload;
        const lineArrayList = getGatewayPath(gateways,g_devicesdb);
        if(!isEqualArray(lineArrayList,CachedlineArrayList)){
          // console.log(`why call gpathSimplifierIns:${!!gpathSimplifierIns},gPathSimplifier:${!!gPathSimplifier}`)
          if(!gpathSimplifierIns && !gPathSimplifier){
            const result  =   yield call(Create_PathSimplifier);
            gpathSimplifierIns = result.gpathSimplifierIns;
            gPathSimplifier = result.gPathSimplifier;
          }
          yield call(drawgGatewayPath,lineArrayList,{gpathSimplifierIns,gPathSimplifier});
        }
        }
        catch(e){
          console.log(e);
        }
      });

      yield takeLatest(`${serverpush_gateway}`, function*(action) {
        try{

        const {g_devicesdb,gateways} = yield select((state)=>{
          const {g_devicesdb,gateways}  = state.device;
          return {g_devicesdb,gateways};
        });
          const usersettings = yield select((state)=>{
            return state.userlogin.usersettings;
          });
          const indexgatewayid = usersettings.indexgatewayid;
          let out = {};
          if(!!gateways[indexgatewayid]){
            out[indexgatewayid] = gateways[indexgatewayid];
          }

          yield put(mapmain_drawgatewaypath({
            gateways:out,
            g_devicesdb}));
          }
          catch(e){
            console.log(e);
          }
      });

      yield takeLatest(`${getdevicelist_result}`, function*(action) {
        let {payload} = action;
        try{
          const {list} = payload;
          // //更新所有图标
          const {g_devicesdb,viewtype} = yield select((state)=>{
            const {devices,viewtype} = state.device;
            return {g_devicesdb:devices,viewtype};
          });
          const SettingOfflineMinutes =yield select((state)=>{
            return get(state,'app.SettingOfflineMinutes',20);
          });
          let g_devicesdb_updated = {};

          for(let i = 0 ;i < list.length;i++){
            g_devicesdb_updated[list[i]._id] = list[i];
          }
          getMarkCluster_updateMarks(g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,viewtype);
          //---------------------------------------------
          yield put(serverpush_gateway({}));
        }
        catch(e){
          console.log(e);
        }
      });
      //<------模拟
      yield fork(function*(){
        while (true) {
            yield call(delay, 30000);
            //发送当前 getdevicelist_request
            const usersettings = yield select((state)=>{
              return state.userlogin.usersettings;
            });
            const indexgatewayid = usersettings.indexgatewayid;
            if(indexgatewayid !== ''){
              yield put(getdevicelist_request({
                query:{
                  "gatewayid":indexgatewayid
                }
             }));
            }
            // let {gateways,devices} = yield select((state)=>{
            //   return {
            //     gateways:state.device.gateways,
            //     devices:state.device.devices
            //   }
            // });
            // lodashmap(gateways,(gw)=>{
            //   if(!gw.devicepath){
            //     gw.devicepath = gw.devicelist;
            //   }
            //   if(!!gw.devicepath){
            //     gw.devicepath = lodashshuffle_gwpath(gw.devicepath,devices);
            //     setshuffledevices(gw.devicepath);
            //   }
            // });
            // //---------------------------------------------
            // //更新所有图标
            // const {g_devicesdb,viewtype} = yield select((state)=>{
            //   const {devices,viewtype,gateways} = state.device;
            //   return {g_devicesdb:devices,gateways,viewtype};
            // });
            // const SettingOfflineMinutes =yield select((state)=>{
            //   return get(state,'app.SettingOfflineMinutes',20);
            // });
            // let g_devicesdb_updated = g_devicesdb;
            // getMarkCluster_updateMarks(g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,viewtype,gateways);
            // //---------------------------------------------
            // yield put(serverpush_gateway({gateways}));
        }
      });

}
