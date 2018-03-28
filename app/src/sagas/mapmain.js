import { select,put,call,take,takeEvery,takeLatest,cancel,fork,} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import get from 'lodash.get';
import lodashmap from 'lodash.map';
import {
  getpopinfowindowstyle,
  getlistpopinfowindowstyle,
  getimageicon
} from './getmapstyle';
import {
  map_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  ui_mycar_selcurdevice,
  mapmain_showpopinfo_list,
  mapmain_seldistrict,
  getdevicelist_result,
  ui_showdistcluster,
  ui_showhugepoints
  } from '../actions';
  import config from '../env/config.js';
  import store from '../env/store';

  const divmapid_mapmain = 'mapmain';
  const maxzoom = config.softmode === 'pc'?18:19;
  let infoWindow;
  // const loczero = L.latLng(0,0);
  //=====数据部分=====
  let g_devicesdb = {};
  let distCluster,markCluster;
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
        markCluster.on('click',({cluster,lnglat,target,markers})=>{
          let itemdevicelist = [];
          lodashmap(markers,(mark)=>{
            itemdevicelist.push(g_devicesdb[mark.getExtData()]);
          });
          const curzoom = markCluster.getMap().getZoom();
          // 在PC上，默认为[3,18]，取值范围[3-18]；
          // 在移动设备上，默认为[3,19],取值范围[3-19]
          if(curzoom === maxzoom ){
              store.dispatch(mapmain_showpopinfo_list({itemdevicelist,lnglat}));
            //弹框
          }
          //console.log(`click device list:${JSON.stringify(itemdevicelist)},curzoom:${curzoom}`);
        });

        resolve();
    });
  }

  const getMarkCluster_showMarks = ({isshow,SettingOfflineMinutes})=>{
    return new Promise((resolve,reject) => {
      if(isshow){
        let markers = [];
        lodashmap(g_devicesdb,(item,key)=>{
          if(!!item){//AMap.LngLat(lng:Number,lat:Number)
            if(!!item.locz){
              const pos = !!item.locz?new window.AMap.LngLat(item.locz[0],item.locz[1]):window.amapmain.getCenter();
              const marker = new window.AMap.Marker({
                 position:pos,
                 icon: new window.AMap.Icon({
                     size: new window.AMap.Size(34, 34),  //图标大小
                     image: getimageicon(item,SettingOfflineMinutes),
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

                      store.dispatch(ui_mycar_selcurdevice(item.DeviceId));
                    // store.dispatch(mapmain_showpopinfo({DeviceId:item.DeviceId}));
                });
              });
              markers.push(marker);
            }
          }
        });
        markCluster.setMarkers(markers);
      }
      else{
        markCluster.clearMarkers();
      }
      resolve();
    });
  }

  //新建行政区域
  const CreateMapUI_DistrictCluster =  (map)=>{
    return new Promise((resolve,reject) => {
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }
        window.AMapUI.load(['ui/geo/DistrictCluster',
        'lib/utils',
        'lib/dom.utils',
        'ui/geo/DistrictCluster/lib/DistMgr',
      ],(DistrictCluster,utils, domUtils, DistMgr)=> {
             //<------------获取某个地点的Marker----------------
             const defaultgetClusterMarker = (feature, dataItems, recycledMarker)=> {
                 //行政区域
                 try{
                   let container, title, body;
                   const nodeClassNames = {
                				title: 'amap-ui-district-cluster-marker-title',
                				body: 'amap-ui-district-cluster-marker-body',
                				container: 'amap-ui-district-cluster-marker'
                			};
                			if (recycledMarker) {
                				container = recycledMarker.getContent();
                				title = domUtils.getElementsByClassName(nodeClassNames.title, 'span', container)[0];
                				body = domUtils.getElementsByClassName(nodeClassNames.body, 'span', container)[0];
                			} else {
                        container = document.createElement('div');
                				title = document.createElement('span');
                				title.className = nodeClassNames.title;
                				body = document.createElement('span');
                				body.className = nodeClassNames.body;
                				container.appendChild(title);
                				container.appendChild(body);
                			}

                			const props = feature.properties,
                			routeNames = [];
                			const classNameList = [nodeClassNames.container, 'level_' + props.level, 'adcode_' + props.adcode];
                			if (props.acroutes) {
                				const acroutes = props.acroutes;
                				for (let i = 0, len = acroutes.length; i < len; i++) {
                					classNameList.push('descendant_of_' + acroutes[i]);
                					if (i === len - 1) {
                						classNameList.push('child_of_' + acroutes[i]);
                					}
                					if (i > 0) {
                						routeNames.push(DistMgr.getNodeByAdcode(acroutes[i]).name);
                					}
                				}
                			}
                			container.className = classNameList.join(' ');
                			if (routeNames.length > 0) {
                				routeNames.push(props.name);
                				container.setAttribute('title', routeNames.join('>'));
                			} else {
                				container.removeAttribute('title');
                			}
                      if(!!title){
                        title.innerHTML = utils.escapeHtml(props.name);
                      }
                			if(!!body){
                        body.innerHTML = dataItems.length;
                      }

                			const resultMarker = recycledMarker || new window.AMap.Marker({
                				topWhenClick: true,
                				offset: new window.AMap.Pixel(-20, -30),
                				content: container
                			});
                			return resultMarker;
                 }
                 catch(e){

                 }
            	    return null;
          		}
              //重写行政区域,避免来回刷新时的闪烁
              //  utils.extend(DistrictCluster.prototype,
              //    {//重新设置数据时不刷新Marker
              //        setDataWithoutClear: function(data) {
              //           //
              //           data || (data = []);
              //           this.trigger("willBuildData", data);
              //           this._data.source = data;
              //           //  this._data.bounds = BoundsItem.getBoundsItemToExpand();
              //           this._buildDataItems(data);
              //           this._buildKDTree();
              //           this._distCounter.setData(this._data.list);
              //           this.trigger("didBuildData", data);
              //           this.renderLater(10);
              //           data.length && this._opts.autoSetFitView && this.setFitView();
              //         },
              //   });
               distCluster = new DistrictCluster({
                   zIndex: 100,
                   map: map, //所属的地图实例
                   autoSetFitView:false,
                   getPosition: (deviceitem)=> {
                       if(!!deviceitem.locz){
                         return deviceitem.locz;
                       }
                       console.log(`err----->=====>======>${JSON.stringify(deviceitem)}`);
                       return deviceitem.locz;
                   },
                   renderOptions:{
                     featureStyleByLevel:{
                        country: {
                          fillStyle: 'rgba(169, 217, 85, 0.8)'
                        },
                        province: {
                          fillStyle: 'rgba(116, 196, 118, 0.7)'
                        },
                        city: {
                          fillStyle: 'rgba(161, 217, 155, 0.6)'
                        },
                        district: {
                          fillStyle: 'rgba(199, 233, 192, 0.5)'
                        }
                    },
                     featureClickToShowSub:true,
                     clusterMarkerRecycleLimit:100000,
                     clusterMarkerKeepConsistent:true,
                     getClusterMarker : (feature, dataItems, recycledMarker)=> {
                        if(dataItems.length > 0){
                          return defaultgetClusterMarker(feature, dataItems, recycledMarker);
                        }
                        return null;
                      }
                   }
               });
               resolve(distCluster);
         });

     });
  }

  //新建地图
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

  //监听标记事件
  // const listenmarkclickevent = (eventname)=>{
  //   return new Promise(resolve => {
  //     pointSimplifierIns.on(eventname, (e,record)=> {
  //         resolve(record);
  //     });
  //   });
  // }

  //监听弹框事件
  const listenwindowinfoevent = (eventname)=>{
    return new Promise(resolve => {
      infoWindow.on(eventname, (e)=> {
          resolve(eventname);
      });
    });
  }

  //监听行政事件,clusterMarkerClick
  const listenclusterevent = (eventname)=>{
    return new Promise(resolve => {
      distCluster.on(eventname, (e,record)=> {
          distCluster.getClusterRecord(record.adcode,(err,result)=>{
            if(!err){
              const {dataItems} = result;
              if(!!dataItems){
                if(dataItems.length > 0){
                    resolve({adcodetop:record.adcode,forcetoggled:true});
                    return;
                }
              }
            }
            resolve();
          });
      });
    });
  }

  //获取reduce


  //显示弹框
  const showinfowindow = (deviceitem)=>{
    return new Promise((resolve,reject) =>{
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }
        let locz = deviceitem.locz;
        infoWindow = new window.AMap.InfoWindow(getpopinfowindowstyle(deviceitem));
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

  const showinfowindow_cluster = ({itemdevicelist,lnglat,SettingOfflineMinutes})=>{
    return new Promise((resolve,reject) =>{
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }
        infoWindow = new window.AMap.InfoWindow(getlistpopinfowindowstyle(itemdevicelist,SettingOfflineMinutes));
        window.amapmain.setCenter(lnglat);
        infoWindow.open(window.amapmain, lnglat);
        resolve(infoWindow);
    });
  }



  //地图主流程
  export function* createmapmainflow(){

      //创建地图
      yield takeEvery(`${carmapshow_createmap}`, function*(action_createmap) {
        try{
          let {payload:{divmapid}} = action_createmap;
          if(divmapid === divmapid_mapmain){
            //wait js script loaded
            // while(!window.AMap){
            //   //console.log(`wait here...${!!window.AMap},ui:${!!window.AMapUI}`);
            //   yield call(delay,500);
            // }
            //console.log(`js script init`);
            //take
            let mapcarprops = yield select((state) => {
              const {carmap} = state;
              return {...carmap};
            });
            if(!mapcarprops.isMapInited){//仅在第一次加载页面初始化时进入
              //等待地图初始化
              //console.log(`wait for mapcarprops.isMapInited`);
              yield take(`${map_setmapinited}`);
            }

            //console.log(`start create map`);
            // let {mapcenterlocation,zoomlevel} = mapcarprops;
            // if(mapcenterlocation.equals(loczero)){//仅在第一次加载页面初始化时进入
            //   const centerpos = yield call(getcurrentpos);
            //   mapcenterlocation = L.latLng(centerpos.lat, centerpos.lng);
            // }
            //32.2030600000,118.7190900000
            const mapcenterlocation = {
              lng:118.7190900000,
              lat:32.2030600000
            };
            const zoomlevel = 3;
            yield call(CreateMap,{mapcenterlocation,zoomlevel});//创建地图

            // yield call(CreateMapUI_PointSimplifier,window.amapmain);
            yield call(CreateMapUI_MarkCluster,window.amapmain);
            yield call(CreateMapUI_DistrictCluster,window.amapmain);

            let listentask =  yield fork(function*(eventname){
              while(true){
                let result = yield call(listenclusterevent,eventname);
                if(!!result){
                  yield put(mapmain_seldistrict(result));
                }
                // yield put(clusterMarkerClick(result));
              }
            },'clusterMarkerClick');

            // let task_dragend =  yield fork(function*(eventname){
            //   while(true){
            //     yield call(listenmapevent,eventname);
            //     let centerlocation = window.amapmain.getCenter();
            //     let centerlatlng = {
            //       lat:centerlocation.lat,
            //       lng:centerlocation.lng
            //     };
            //     // yield put(mapmain_setmapcenter(centerlatlng));
            //   }
            // },'dragend');

            let task_zoomend =  yield fork(function*(eventname){
              while(true){
                yield call(listenmapevent,eventname);
                // let centerlocation = window.amapmain.getCenter();
                // let centerlatlng = L.latLng(centerlocation.lat, centerlocation.lng);
                // yield put(md_mapmain_setzoomlevel(window.amapmain.getZoom()));
                const zoomlevel = window.amapmain.getZoom();
                if(zoomlevel > 12){
                  yield put(ui_showhugepoints(true));
                  yield put(ui_showdistcluster(false));
                }
                else{
                  yield put(ui_showhugepoints(false));
                  yield put(ui_showdistcluster(true));
                }
              }
            },'zoomend');

            // let task_markclick = yield fork(function*(eventname){
            //   while(true){
            //       const dataitem = yield call(listenmarkclickevent,eventname);
            //       if(!!dataitem){
            //         let deviceitem = dataitem.data;
            //
            //         if(!!deviceitem){
            //           yield put(ui_selcurdevice_request({DeviceId:deviceitem.DeviceId,deviceitem}));
            //         }
            //       }
            //     //
            //   }
            // },'pointClick');//'pointClick pointMouseover pointMouseout'

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

            //如果已经登录,并且有数据了！，重新加载数据
            let deivcelist = [];
            lodashmap(g_devicesdb,(v)=>{
              deivcelist.push(v);
            });
            if(deivcelist.length > 0){
              yield put(getdevicelist_result({list:deivcelist}));
            }
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
            yield cancel(listentask);
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
              distCluster=null;
            }
            resolve();
          });
        }
        yield call(destorymap,divmapid);

      });
}
