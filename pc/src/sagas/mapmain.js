import { select,put,call,take,takeLatest,cancel,fork,} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import get from 'lodash.get';
import lodashmap from 'lodash.map';
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
  // mapmain_showpopinfo_list,
  getdevicelist_result,
  getdevicelist_result_4reducer,
  serverpush_device
  } from '../actions';
  import config from '../env/config.js';
  import store from '../env/store';

  const divmapid_mapmain = 'mapmain';
  const maxzoom = config.softmode === 'pc'?18:19;
  let infoWindow;

  //=====数据部分=====
  let markCluster;
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
          maxZoom:maxzoom,
          gridSize:80,
        });
        // markCluster.on('click',({cluster,lnglat,target,markers})=>{
        //   let itemdevicelist = [];
        //   lodashmap(markers,(mark)=>{
        //     itemdevicelist.push(g_devicesdb[mark.getExtData()]);
        //   });
        //   const curzoom = markCluster.getMap().getZoom();
        //   // 在PC上，默认为[3,18]，取值范围[3-18]；
        //   // 在移动设备上，默认为[3,19],取值范围[3-19]
        //   if(curzoom === maxzoom ){
        //       store.dispatch(mapmain_showpopinfo_list({itemdevicelist,lnglat}));
        //     //弹框
        //   }
        //   //console.log(`click device list:${JSON.stringify(itemdevicelist)},curzoom:${curzoom}`);
        // });

        resolve();
    });
  }

  const getMarkCluster_recreateMarks = (SettingOfflineMinutes,g_devicesdb,g_devicetype)=>{
    if(markCluster.getMarkers().length > 0){
      markCluster.clearMarkers();
    }
    getMarkCluster_createMarks(SettingOfflineMinutes,g_devicesdb,g_devicetype);
  }

  const getMarkCluster_createMarks = (SettingOfflineMinutes,g_devicesdb,g_devicetype)=>{
    let markers = [];
    lodashmap(g_devicesdb,(item,key)=>{
      if(!!item){//AMap.LngLat(lng:Number,lat:Number)
          const pos = new window.AMap.LngLat(item.Longitude,item.Latitude);
          const marker = new window.AMap.Marker({
             position:pos,
             icon: new window.AMap.Icon({
                size: new window.AMap.Size(68, 68),
                imageSize: new window.AMap.Size(43, 64),  //图标大小
                image: getimageicon(item,SettingOfflineMinutes,g_devicetype),
                imageOffset: new window.AMap.Pixel(0, 0)
            }),
             angle:get(item,'angle',0),
            //  content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
             offset: new window.AMap.Pixel(0, 0),//-113, -140
             extData:key
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
    markCluster.setMarkers(markers);
  }

  const getMarkCluster_updateMarks = (g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,g_devicetype)=>{
    const allmarks = markCluster.getMarkers();
    lodashmap(allmarks,(mark)=>{
      const deviceitem = g_devicesdb[mark.getExtData()];
      const deviceitemnew = g_devicesdb_updated[deviceitem._id];
      if(!!deviceitemnew){
        if(!!deviceitemnew.Longitude){
          const pos = new window.AMap.LngLat(deviceitemnew.Longitude,deviceitemnew.Latitude);
          mark.setPosition(pos);
          const newIcon = new window.AMap.Icon({
             size: new window.AMap.Size(68, 68),
             imageSize: new window.AMap.Size(43, 64),  //图标大小
             image: getimageicon(deviceitemnew,SettingOfflineMinutes,g_devicetype),
             imageOffset: new window.AMap.Pixel(0, 0)
         });
          mark.setIcon(newIcon);
        }
        else{
          markCluster.removeMarker(mark);
        }
      }
    });
  }

  const getMarkCluster_showMarks = ({isshow,SettingOfflineMinutes,g_devicesdb,g_devicetype})=>{
    return new Promise((resolve,reject) => {
      if(isshow){
        markCluster.setMap(window.amapmain);
        if(markCluster.getMarkers().length === 0){
          getMarkCluster_createMarks(SettingOfflineMinutes,g_devicesdb,g_devicetype);
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
  const showinfowindow = (deviceitem,g_devicetype)=>{
    return new Promise((resolve,reject) =>{
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }
        // console.log(deviceitem)
        const locz = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
        infoWindow = new window.AMap.InfoWindow(getpopinfowindowstyle(deviceitem,g_devicetype));
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
            //   yield put(getdevicelist_result({list:deivcelist}));
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
          const {g_devicesdb,g_devicetype} = yield select((state)=>{
            const {devices,devicetype} = state.device;
            return {g_devicesdb:devices,g_devicetype:devicetype};
          });

            //1
            //弹框
            yield call(showinfowindow,g_devicesdb[_id],g_devicetype);

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
      //     const listitem = itemdevicelist;//yield call(getdevicelist,list);
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


        yield takeLatest(`${getdevicelist_result}`, function*(deviceresult) {
          let {payload} = deviceresult;
          try{
              yield put.resolve(getdevicelist_result_4reducer(payload));

              const {g_devicesdb,g_devicetype} = yield select((state)=>{
                const {devices,devicetype} = state.device;
                return {g_devicesdb:devices,g_devicetype:devicetype};
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
              getMarkCluster_recreateMarks(SettingOfflineMinutes,g_devicesdb,g_devicetype);
              yield call(getMarkCluster_showMarks,{isshow:true,SettingOfflineMinutes,g_devicesdb,g_devicetype});

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
          const {g_devicesdb,g_devicetype} = yield select((state)=>{
            const {devices,devicetype} = state.device;
            return {g_devicesdb:devices,g_devicetype:devicetype};
          });
          g_devicesdb[deviceitem._id] = deviceitem;
          const SettingOfflineMinutes =yield select((state)=>{
            return get(state,'app.SettingOfflineMinutes',20);
          });
          let g_devicesdb_updated = {};
          g_devicesdb_updated[deviceitem._id] = deviceitem;
          getMarkCluster_updateMarks(g_devicesdb_updated,SettingOfflineMinutes,g_devicesdb,g_devicetype);
        });

          //ui_mycarselcurdevice_request
          yield takeLatest(`${ui_mycar_selcurdevice}`, function*(action) {
            //地图模式选择车辆
            try{
              const {payload:_id} = action;
              const {g_devicesdb} = yield select((state)=>{
                const {devices,devicetype} = state.device;
                return {g_devicesdb:devices,g_devicetype:devicetype};
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

}
