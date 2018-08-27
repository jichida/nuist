import { select,put,call,take,takeLatest,cancel,fork,} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import get from 'lodash.get';
import lodashmap from 'lodash.map';
import lodashshuffle from 'lodash.shuffle';
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
  mapmain_showpopinfo,
  mapmain_drawgatewaypath,
  getgatewaylist_result,
  getgatewaylist_result_4reducer,
  serverpush_device,
  serverpush_gateway
  } from '../actions';
import config from '../env/config.js';
import store from '../env/store';

const divmapid_mapmain = 'mapmain';
// const maxzoom = config.softmode === 'pc'?18:19;
let infoWindow;

//=====数据部分=====
let markCluster;
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

          //启动页面
          //创建组件实例
      tmppathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              map: window.amapmain, //所属的地图实例
              getPath: function(pathData, pathIndex) {
                  //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
                  return pathData.path;
              },
              autoSetFitView:false,
              getHoverTitle: function(pathData, pathIndex, pointIndex) {
                  //返回鼠标悬停时显示的信息
                  if (pointIndex >= 0) {
                      //鼠标悬停在某个轨迹节点上
                      return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
                  }
                  //鼠标悬停在节点之间的连线上
                  return pathData.name + '，点数量' + pathData.path.length;
              },
              renderOptions: {
                  //轨迹线的样式
                  pathLineStyle: {
                      strokeStyle: 'red',
                      lineWidth: 6,
                      dirArrowStyle: true
                  }
              }
          });
          console.log(`created--->gpathSimplifierIns--->gPathSimplifier`)
          resolve({
            gpathSimplifierIns:tmppathSimplifierIns,
            gPathSimplifier:tmpPathSimplifier
          })
    });
  });
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

  const getMarkCluster_recreateMarks = (SettingOfflineMinutes,g_devicesdb,viewtype,gateways)=>{
    if(markCluster.getMarkers().length > 0){
      markCluster.clearMarkers();
    }
    getMarkCluster_createMarks(SettingOfflineMinutes,g_devicesdb,viewtype,gateways);
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
const getGatewayPath = (gateways,g_devicesdb)=>{
  let lineArrayList = [];
  lodashmap(gateways,(gw)=>{
    let lineArr = [];
    lodashmap(gw.devicepath,(did)=>{
      const item = g_devicesdb[did];
      if(!!item){
        lineArr.push([item.Longitude,item.Latitude]);
      }
    });
    lineArr.push([gw.Longitude,gw.Latitude]);
    lineArrayList.push({
       name:gw.name,
       path:lineArr
     });
  });
  return lineArrayList;
};

let navgz = []; ;
const drawgGatewayPath = (lineArrayList,{gpathSimplifierIns,gPathSimplifier})=>{
  return new Promise((resolve,reject) => {

        for(let i = 0; i < navgz.length; i++){
          navgz[i].stop();
          navgz[i].destroy();
        }
        navgz = [];

        gpathSimplifierIns.setData(lineArrayList);
        //创建一个巡航器
        for(let i = 0 ;i < lineArrayList.length ;i ++){
          const navg0 = gpathSimplifierIns.createPathNavigator(i, //关联第1条轨迹
              {
                  loop: true, //循环播放
                  speed: 1000
              });

          navgz.push(navg0);
        }
        for(let i = 0; i < navgz.length; i++){
          navgz[i].start();
        }

        console.log(`drawgGatewayPath`)
        resolve();
    });

}

  const getMarkCluster_createMarks = (SettingOfflineMinutes,g_devicesdb,viewtype,gateways)=>{
    let markers = [];
    lodashmap(g_devicesdb,(item,key)=>{
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
             offset: new window.AMap.Pixel(0, 0),//-113, -140
             extData:{type:'device',key}
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

    lodashmap(gateways,(item,key)=>{
      if(!!item){//AMap.LngLat(lng:Number,lat:Number)
          const pos = new window.AMap.LngLat(item.Longitude,item.Latitude);
          const marker = new window.AMap.Marker({
             position:pos,
             icon: new window.AMap.Icon({
                size: new window.AMap.Size(32, 32),
                imageSize: new window.AMap.Size(24, 32),  //图标大小
                image: `${process.env.PUBLIC_URL}/images/base_normal.png`,
                imageOffset: new window.AMap.Pixel(0, 0)
            }),
             angle:get(item,'angle',0),
            //  content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
             offset: new window.AMap.Pixel(0, 0),//-113, -140
             extData:{type:'gateway',key}
          });
          markers.push(marker);

          //化纤
          store.dispatch(mapmain_drawgatewaypath({gateways,g_devicesdb}));
        }
    });
    console.log(`markers===>${markers.length}`)
    markCluster.setMarkers(markers);


  }

  const getMarkCluster_updateMarks = (g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,viewtype,gateways)=>{
    const allmarks = markCluster.getMarkers();
    lodashmap(allmarks,(mark)=>{
      const {type,key} = mark.getExtData();
      if(type === 'device'){
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
               imageOffset: new window.AMap.Pixel(0, 0)
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
            const zoomlevel = 16;
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


        yield takeLatest(`${getgatewaylist_result}`, function*(deviceresult) {
          let {payload} = deviceresult;
          try{
              yield put.resolve(getgatewaylist_result_4reducer(payload));

              const {g_devicesdb,viewtype,gateways} = yield select((state)=>{
                const {devices,viewtype,gateways} = state.device;
                return {g_devicesdb:devices,viewtype,gateways};
              });

              // const data = [];
              // lodashmap(devicelistresult,(deviceitem)=>{
              //   if(!!deviceitem.Longitude && deviceitem.Longitude !==0){
              //     data.push(deviceitem);
              //   }
              //   g_devicesdb[deviceitem.DeviceId] = deviceitem;
              // });

              //等待地图创建
              while(!markCluster){
                yield delay(500);
              }

              const SettingOfflineMinutes =yield select((state)=>{
                return get(state,'app.SettingOfflineMinutes',20);
              });
              getMarkCluster_recreateMarks(SettingOfflineMinutes,g_devicesdb,viewtype,gateways);
              yield call(getMarkCluster_showMarks,{isshow:true,SettingOfflineMinutes,g_devicesdb,viewtype,gateways});

              //选中一个默认节点
              const {usersettings} = yield select((state)=>{
                const {usersettings} = state.userlogin;
                return {usersettings};
              });
              const indexdeviceid = get(usersettings,'indexdeviceid','');
              if(!!g_devicesdb[indexdeviceid]){
                yield put(ui_mycar_selcurdevice(indexdeviceid));
              }
            }
            catch(e){
              console.log(e);
            }

        });

        yield takeLatest(`${serverpush_device}`, function*(action) {
          const {payload:deviceitem} = action;
          const {g_devicesdb,gateways,viewtype} = yield select((state)=>{
            const {devices,viewtype,gateways} = state.device;
            return {g_devicesdb:devices,gateways,viewtype};
          });
          g_devicesdb[deviceitem._id] = deviceitem;
          const SettingOfflineMinutes =yield select((state)=>{
            return get(state,'app.SettingOfflineMinutes',20);
          });
          let g_devicesdb_updated = {};
          g_devicesdb_updated[deviceitem._id] = deviceitem;
          getMarkCluster_updateMarks(g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,viewtype,gateways);
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
        const {gateways,g_devicesdb} = action.payload;
        const lineArrayList = getGatewayPath(gateways,g_devicesdb);
        if(!isEqualArray(lineArrayList,CachedlineArrayList)){
          console.log(`why call gpathSimplifierIns:${!!gpathSimplifierIns},gPathSimplifier:${!!gPathSimplifier}`)
          if(!gpathSimplifierIns && !gPathSimplifier){
            const result  =   yield call(Create_PathSimplifier);
            gpathSimplifierIns = result.gpathSimplifierIns;
            gPathSimplifier = result.gPathSimplifier;
          }
          yield call(drawgGatewayPath,lineArrayList,{gpathSimplifierIns,gPathSimplifier});
        }
      });

      yield takeLatest(`${serverpush_gateway}`, function*(action) {
        const {gateways} = action.payload;
        const {g_devicesdb} = yield select((state)=>{
          return {
            g_devicesdb:state.device.devices
          }
        });
        yield put(mapmain_drawgatewaypath({gateways,g_devicesdb}));
      });
//<------模拟
  yield fork(function*(){
    while (true) {
        yield call(delay, 10000);
        let {gateways} = yield select((state)=>{
          return {
            gateways:state.device.gateways
          }
        });
        lodashmap(gateways,(gw)=>{
          gw.devicepath = lodashshuffle(gw.devicepath);
        });
        yield put(serverpush_gateway({gateways}));
    }
  });

}
