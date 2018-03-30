import { select,put,call,take,takeLatest,cancel,fork,} from 'redux-saga/effects';
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
  saveusersettings_request,
  mapmain_showpopinfo,
  mapmain_showpopinfo_list,
  // mapmain_seldistrict,
  getdevicelist_result,
  // ui_showdistcluster,
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
        lodashmap(g_devicesdb,(deviceitem,key)=>{
          if(!!deviceitem){//AMap.LngLat(lng:Number,lat:Number)
            if(!!deviceitem.Longitude){
              const pos = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
              const marker = new window.AMap.Marker({
                 position:pos,
                 icon: new window.AMap.Icon({
                     size: new window.AMap.Size(50, 50), 
                     imageSize: new window.AMap.Size(34, 34),  //图标大小
                     image: getimageicon(deviceitem,SettingOfflineMinutes),
                     imageOffset: new window.AMap.Pixel(0, 0)
                 }),
                 angle:get(deviceitem,'angle',0),
                //  content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                 offset: new window.AMap.Pixel(-17, -17),//-113, -140
                 extData:key
              });
              marker.on('click',()=>{
                //console.log(`click marker ${key}`);
                window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {

                      store.dispatch(ui_mycar_selcurdevice(deviceitem.DeviceId));
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
  // const CreateMapUI_DistrictCluster =  (map)=>{
  //   return new Promise((resolve,reject) => {
  //       if(!window.AMapUI){
  //         alert('未加载到AMapUI！');
  //         reject();
  //         return;
  //       }
  //       window.AMapUI.load(['ui/geo/DistrictCluster',
  //       'lib/utils',
  //       'lib/dom.utils',
  //       'ui/geo/DistrictCluster/lib/DistMgr',
  //     ],(DistrictCluster,utils, domUtils, DistMgr)=> {
  //            //<------------获取某个地点的Marker----------------
  //           //  const defaultgetClusterMarker = (feature, dataItems, recycledMarker)=> {
  //           //      //行政区域
  //           //      try{
  //           //        let container, title, body;
  //           //        const nodeClassNames = {
  //           //     				title: 'amap-ui-district-cluster-marker-title',
  //           //     				body: 'amap-ui-district-cluster-marker-body',
  //           //     				container: 'amap-ui-district-cluster-marker'
  //           //     			};
  //           //     			if (recycledMarker) {
  //           //     				container = recycledMarker.getContent();
  //           //     				title = domUtils.getElementsByClassName(nodeClassNames.title, 'span', container)[0];
  //           //     				body = domUtils.getElementsByClassName(nodeClassNames.body, 'span', container)[0];
  //           //     			} else {
  //           //             container = document.createElement('div');
  //           //     				title = document.createElement('span');
  //           //     				title.className = nodeClassNames.title;
  //           //     				body = document.createElement('span');
  //           //     				body.className = nodeClassNames.body;
  //           //     				container.appendChild(title);
  //           //     				container.appendChild(body);
  //           //     			}
  //            //
  //           //     			const props = feature.properties,
  //           //     			routeNames = [];
  //           //     			const classNameList = [nodeClassNames.container, 'level_' + props.level, 'adcode_' + props.adcode];
  //           //     			if (props.acroutes) {
  //           //     				const acroutes = props.acroutes;
  //           //     				for (let i = 0, len = acroutes.length; i < len; i++) {
  //           //     					classNameList.push('descendant_of_' + acroutes[i]);
  //           //     					if (i === len - 1) {
  //           //     						classNameList.push('child_of_' + acroutes[i]);
  //           //     					}
  //           //     					if (i > 0) {
  //           //     						routeNames.push(DistMgr.getNodeByAdcode(acroutes[i]).name);
  //           //     					}
  //           //     				}
  //           //     			}
  //           //     			container.className = classNameList.join(' ');
  //           //     			if (routeNames.length > 0) {
  //           //     				routeNames.push(props.name);
  //           //     				container.setAttribute('title', routeNames.join('>'));
  //           //     			} else {
  //           //     				container.removeAttribute('title');
  //           //     			}
  //           //           if(!!title){
  //           //             title.innerHTML = utils.escapeHtml(props.name);
  //           //           }
  //           //     			if(!!body){
  //           //             body.innerHTML = dataItems.length;
  //           //           }
  //            //
  //           //     			const resultMarker = recycledMarker || new window.AMap.Marker({
  //           //     				topWhenClick: true,
  //           //     				offset: new window.AMap.Pixel(-20, -30),
  //           //     				content: container
  //           //     			});
  //           //     			return resultMarker;
  //           //      }
  //           //      catch(e){
  //            //
  //           //      }
  //           // 	    return null;
  //         	// 	}
  //             //重写行政区域,避免来回刷新时的闪烁
  //             //  utils.extend(DistrictCluster.prototype,
  //             //    {//重新设置数据时不刷新Marker
  //             //        setDataWithoutClear: function(data) {
  //             //           //
  //             //           data || (data = []);
  //             //           this.trigger("willBuildData", data);
  //             //           this._data.source = data;
  //             //           //  this._data.bounds = BoundsItem.getBoundsItemToExpand();
  //             //           this._buildDataItems(data);
  //             //           this._buildKDTree();
  //             //           this._distCounter.setData(this._data.list);
  //             //           this.trigger("didBuildData", data);
  //             //           this.renderLater(10);
  //             //           data.length && this._opts.autoSetFitView && this.setFitView();
  //             //         },
  //             //   });
  //              distCluster = new DistrictCluster({
  //                  zIndex: 100,
  //                  map: map, //所属的地图实例
  //                  autoSetFitView:false,
  //                  getPosition: (deviceitem)=> {
  //                      let locz;
  //                      if(!!deviceitem.Longitude){
  //                        locz = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
  //                      }
  //
  //                      console.log(`err----->=====>======>${JSON.stringify(deviceitem)}`);
  //                      return locz;
  //                  },
  //                  renderOptions:{
  //                    featureStyleByLevel:{
  //                       country: {
  //                         fillStyle: 'rgba(169, 217, 85, 0.8)'
  //                       },
  //                       province: {
  //                         fillStyle: 'rgba(116, 196, 118, 0.7)'
  //                       },
  //                       city: {
  //                         fillStyle: 'rgba(161, 217, 155, 0.6)'
  //                       },
  //                       district: {
  //                         fillStyle: 'rgba(199, 233, 192, 0.5)'
  //                       }
  //                   },
  //                    featureClickToShowSub:true,
  //                    clusterMarkerRecycleLimit:100000,
  //                    clusterMarkerKeepConsistent:true,
  //                    getClusterMarker : (feature, dataItems, recycledMarker)=> {
  //                       // if(dataItems.length > 0){
  //                       //   return defaultgetClusterMarker(feature, dataItems, recycledMarker);
  //                       // }
  //                       return null;
  //                     }
  //                  }
  //              });
  //              resolve(distCluster);
  //        });
  //
  //    });
  // }

  //获取根结点的数据
  // const getclustertree_root =(SettingOfflineMinutes)=>{
  //   const adcodetop=100000;
  //   return new Promise((resolve,reject) => {
  //     if(!distCluster){
  //       console.log(`distCluster is empty`);
  //       reject(`distCluster is empty`);
  //       return;
  //     }
  //     distCluster.getClusterRecord(adcodetop,(err,result)=>{
  //       if(!err){
  //         const {children,dataItems} = result;
  //         if(!children || children.length === 0){
  //           reject(`children or children.length is empty,${adcodetop}`);
  //         }
  //         if(!dataItems || dataItems.length === 0){
  //           reject(`dataItems or dataItems.length is empty,${adcodetop}`);
  //           return;
  //         }
  //
  //
  //         let childadcodelist = [];
  //         lodashmap(children,(child)=>{
  //           if(child.dataItems.length > 0){
  //             childadcodelist.push(child.adcode);
  //           }
  //         });
  //         resolve(childadcodelist);
  //       }
  //       else{
  //         reject(err);
  //       }
  //     });
  //   });
  // }
  //获取某个行政区域的数据
  // const getclustertree_one =(adcode,SettingOfflineMinutes)=>{
  //   return new Promise((resolve,reject) => {
  //     if(!distCluster){
  //       reject();
  //       return;
  //     }
  //     distCluster.getClusterRecord(adcode,(err,result)=>{
  //       if(!err){
  //         const {dataItems,children} = result;
  //         if(!children || children.length === 0){
  //           //device
  //           let deviceids = [];
  //           if(!!dataItems){
  //             lodashmap(dataItems,(deviceitem)=>{
  //               if(!!deviceitem.dataItem){
  //                 deviceids.push(deviceitem.dataItem.DeviceId);
  //               }
  //             });
  //           }
  //           let center;
  //           if(deviceids.length > 0){
  //             const pickone = deviceids[0];
  //             const deviceitem = g_devicesdb[pickone];
  //             if(!!deviceitem){
  //               if(!!deviceitem.Longitude){
  //                 center = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
  //               }
  //               else{
  //                 console.log(deviceitem);
  //               }
  //             }
  //           }
  //
  //           resolve({
  //             type:'device',
  //             deviceids,
  //             center
  //           });
  //         }
  //         else{
  //           //group
  //           let center;
  //           let childadcodelist = [];
  //           if(!dataItems || dataItems.length === 0){
  //             resolve({
  //               type:'group',
  //               childadcodelist
  //             });
  //             return;
  //           }
  //           lodashmap(dataItems,(di)=>{
  //             const deviceitem = di.dataItem;
  //             if(!!deviceitem && !center){
  //               if(!!deviceitem.Longitude){
  //                 center = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
  //               }
  //               else{
  //                 console.log(deviceitem);
  //               }
  //             }
  //           });
  //
  //           lodashmap(children,(child)=>{
  //               if(child.dataItems.length > 0){
  //                 childadcodelist.push(child.adcode);
  //               }
  //           });
  //           resolve({
  //             type:'group',
  //             childadcodelist,
  //             center
  //           });
  //         }
  //       }
  //       else{
  //         reject(err);
  //       }
  //     });
  //   });
  // }
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
  // const listenclusterevent = (eventname)=>{
  //   return new Promise(resolve => {
  //     distCluster.on(eventname, (e,record)=> {
  //         distCluster.getClusterRecord(record.adcode,(err,result)=>{
  //           if(!err){
  //             const {dataItems} = result;
  //             if(!!dataItems){
  //               if(dataItems.length > 0){
  //                   resolve({adcodetop:record.adcode,forcetoggled:true});
  //                   return;
  //               }
  //             }
  //           }
  //           resolve();
  //         });
  //     });
  //   });
  // }

  //获取reduce


  //显示弹框
  const showinfowindow = (deviceitem)=>{
    return new Promise((resolve,reject) =>{
        if(!window.AMapUI){
          alert('未加载到AMapUI！');
          reject();
          return;
        }
        // console.log(deviceitem)
        const locz = new window.AMap.LngLat(deviceitem.Longitude,deviceitem.Latitude);
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
      yield takeLatest(`${carmapshow_createmap}`, function*(action_createmap) {
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
            const mapcarprops = yield select((state) => {
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
            const zoomlevel = 13;
            yield call(CreateMap,{mapcenterlocation,zoomlevel});//创建地图

            // yield call(CreateMapUI_PointSimplifier,window.amapmain);
            yield call(CreateMapUI_MarkCluster,window.amapmain);
            // yield call(CreateMapUI_DistrictCluster,window.amapmain);

            // let listentask =  yield fork(function*(eventname){
            //   while(true){
            //     let result = yield call(listenclusterevent,eventname);
            //     if(!!result){
            //       yield put(mapmain_seldistrict(result));
            //     }
            //     // yield put(clusterMarkerClick(result));
            //   }
            // },'clusterMarkerClick');

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
                // const zoomlevel = window.amapmain.getZoom();
                // if(zoomlevel > 12){
                //   yield put(ui_showhugepoints(true));
                //   yield put(ui_showdistcluster(false));
                // }
                // else{
                //   yield put(ui_showhugepoints(false));
                //   yield put(ui_showdistcluster(true));
                // }
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

            yield delay(3000);
            //如果已经登录,并且有数据了！，重新加载数据
            let deivcelist = [];
            lodashmap(g_devicesdb,(v)=>{
              deivcelist.push(v);
            });
            if(deivcelist.length > 0){
              yield put(getdevicelist_result({list:deivcelist}));
            }

            const {usersettings,devices} = yield select((state)=>{
              const {usersettings} = state.userlogin;
              const {devices} = state.device;
              return {usersettings,devices};
            });
            const indexdeviceid = get(usersettings,'indexdeviceid','');
            if(!!devices[indexdeviceid]){
              yield put(ui_mycar_selcurdevice(devices[indexdeviceid].DeviceId));
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
          const {payload:{DeviceId}} = actiondevice;
          const listitem = [g_devicesdb[DeviceId]];
          if(listitem.length === 1){
            //1
            //弹框
            yield call(showinfowindow,listitem[0]);

            yield fork(function*(eventname){
             //while(true){//关闭时触发的事件
              yield call(listenwindowinfoevent,eventname);//触发一次
              if(!!infoWindow){
                  infoWindow.close();
                  infoWindow = null;
              }

            },'close');
          }

        }
        catch(e){
          console.log(e);
        }
      });
      //多个设备弹出框
      yield takeLatest(`${mapmain_showpopinfo_list}`, function*(actiondevice) {
        //显示弹框
        try{
          const {payload:{itemdevicelist,lnglat}} = actiondevice;
          //获取该车辆信息
          // let deviceids = [];
          // lodashmap(itemdevicelist,(item)=>{
          //   deviceids.push(item.DeviceId);
          // });
          // yield put(querydeviceinfo_list_request({query:{DeviceId:{'$in':deviceids}}}));
          // const {payload:{list}} = yield take(`${querydeviceinfo_list_result}`);
          //
          const listitem = itemdevicelist;//yield call(getdevicelist,list);
          //
          // lodashmap(listitem,(item)=>{
          //   g_devicesdb[item.DeviceId] = item;
          // });

          //地图缩放到最大
          //yield put(md_mapmain_setzoomlevel(maxzoom));
          const SettingOfflineMinutes =yield select((state)=>{
            return get(state,'app.SettingOfflineMinutes',20);
          });
          //弹框
          yield call(showinfowindow_cluster,{itemdevicelist:listitem,lnglat,SettingOfflineMinutes});

          yield fork(function*(eventname){
           //while(true){//关闭时触发的事件
             yield call(listenwindowinfoevent,eventname);//触发一次
            //  yield put(ui_showmenu("showdevice_no"));
             if(!!infoWindow){
                infoWindow.close();
                infoWindow = null;
             }
           //}
          },'close');

        }
        catch(e){
          console.log(e);
        }
      });

      //查询所有车辆返回
      yield takeLatest(`${getdevicelist_result}`, function*(deviceresult) {
        let {payload:{list:devicelistresult}} = deviceresult;
        try{
            // while( !distCluster){
            //   console.log(`wait for discluster`);
            //   yield call(delay,2500);
            // }
            // const SettingOfflineMinutes =yield select((state)=>{
            //   return get(state,'app.SettingOfflineMinutes',20);
            // });
            //批量转换一次
            g_devicesdb = {};//清空，重新初始化
            // console.log(`clear g_devicesdb...restart g_devicesdb...`)
            // let devicelistresult = yield call(getgeodatabatch,devicelist);

            const data = [];
            lodashmap(devicelistresult,(deviceitem)=>{
              if(!!deviceitem.Longitude && deviceitem.Longitude !==0){
                data.push(deviceitem);
              }
              g_devicesdb[deviceitem.DeviceId] = deviceitem;
            });
            // console.log(`clear g_devicesdb...restart g_devicesdb...${data.length}`)
            // distCluster.setData(data);
            // pointSimplifierIns.setData(data);




            // yield call(getclustertree_root,SettingOfflineMinutes);
            // gmap_acode_treecount[1] = {//所有
            //   count_total:devicelistresult.length,
            //   count_online:deviceidonlines_loc.length,
            // };
            //
            // gmap_acode_devices[2] = datanolocate;
            // gmap_acode_treecount[2] = {
            //   count_total:datanolocate.length,
            //   count_online:deviceidonlines_locno.length,
            // }
            //
            // yield put(mapmain_init_device({g_devicesdb,gmap_acode_devices,gmap_acode_treecount}));

            // if(window.amapmain.getZoom() > 12){
            //   yield put(ui_showhugepoints(true));
            //   yield put(ui_showdistcluster(false));
            // }
            // else{
            //   yield put(ui_showhugepoints(false));
            //   yield put(ui_showdistcluster(true));
            // }
            // yield put(ui_showdistcluster(false));
            yield put(ui_showhugepoints(true));
          }
          catch(e){
            console.log(e);
          }

      });

          // yield takeLatest(`${ui_showdistcluster}`, function*(action_showflag) {
          //     let {payload:isshow} = action_showflag;
          //     const showdistclusterfn = (isshow)=>{
          //       return new Promise((resolve) => {
          //         try{
          //           if(!!distCluster){
          //             if(isshow !== distCluster.isHidden()){
          //               if(isshow){
          //                 distCluster.show();
          //                 distCluster.render();
          //               }
          //               else{
          //                 distCluster.hide();
          //               }
          //             }
          //           }
          //         }
          //         catch(e){
          //           console.log(e);
          //         }
          //         resolve();
          //       });
          //     }
          //
          //     yield call(showdistclusterfn,isshow);
          //
          // });
          //显示海量点
          yield takeLatest(`${ui_showhugepoints}`, function*(action_showflag) {
              let {payload:isshow} = action_showflag;
              try{
                // if(!!distCluster){
                //   if(isshow){
                //     pointSimplifierIns.show();
                //   }
                //   else{
                //     pointSimplifierIns.hide();
                //   }
                // pointSimplifierIns.hide();
                //   pointSimplifierIns.render();
                // }
                const SettingOfflineMinutes =yield select((state)=>{
                  return get(state,'app.SettingOfflineMinutes',20);
                });
                yield call(getMarkCluster_showMarks,{isshow,SettingOfflineMinutes});
              }
              catch(e){
                console.log(e);
              }
          });

          //选中某个区域
          // yield takeLatest(`${mapmain_seldistrict}`, function*(action_district) {
          //     let {payload:{adcodetop}} = action_district;
          //     try{
          //       const SettingOfflineMinutes =yield select((state)=>{
          //         return get(state,'app.SettingOfflineMinutes',20);
          //       });
          //       if(!!adcodetop && adcodetop !==1 && adcodetop!==2){
          //         //========================================================================================
          //         let isarea = false;
          //         //获取该区域的数据
          //         const result = yield call(getclustertree_one,adcodetop,SettingOfflineMinutes);
          //         if(!!result){
          //           isarea = result.type === 'device';
          //         }
          //
          //         // if(!!distCluster){//放大到该区域
          //         //   if(isarea){
          //         //     if(!!result.center){
          //         //       const targetzoom = window.amapmain.getZoom() > 13?window.amapmain.getZoom():13;
          //         //       window.amapmain.setZoomAndCenter(targetzoom,result.center);//fixed window.amapmain.getZoom()+1
          //         //     }
          //         //   }
          //         //   else{
          //         //     //获得该区域下最多结点的数量，找出中心点
          //         //     distCluster.zoomToShowSubFeatures(adcodetop,result.center);
          //         //   }
          //         // }
          //       }
          //     }
          //     catch(e){
          //       console.log(e);
          //     }
          // });

          //ui_mycarselcurdevice_request
          yield takeLatest(`${ui_mycar_selcurdevice}`, function*(action) {
            //地图模式选择车辆
            try{
              const {payload:DeviceId} = action;

              if(!!infoWindow){
                  infoWindow.close();
                  infoWindow = null;
              }
              //先定位到地图模式,然后选择车辆
              const deviceitem = g_devicesdb[DeviceId];
              if(!!deviceitem){
                let usersettings = yield select((state)=>{
                  return state.userlogin.usersettings;
                });
                usersettings.indexdeviceid = deviceitem._id;
                yield put(saveusersettings_request(usersettings));
                yield put(mapmain_showpopinfo({DeviceId}));
              }

            }
            catch(e){
              console.log(e);
            }
          });


}
