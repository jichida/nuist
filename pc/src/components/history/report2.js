import React from 'react';
import lodashmap from 'lodash.map';
import { Chart, Geom, Axis, Tooltip, } from "bizcharts";
const geomcolors = ['rgb(24,144,255)','rgb(47,194,91)'];
class App extends React.Component {

    render() {
        let {title,ticktimestring,fields,retlist,
          indextype,fieldslist_brief} = this.props;


        let vlistlist = [];
        lodashmap(fieldslist_brief,(fieldname)=>{
          const fieldsprops = fields[fieldname];
          if(!!fieldsprops && ticktimestring.length>0){
            vlistlist.push(retlist[fieldname]);
          }
        });
        let GeomList = [];
        ticktimestring = ticktimestring || [];
        let data = [];
        for(let i=0 ;i < ticktimestring.length; i++){
          let dataitem = {
            ticktimestring:ticktimestring[i]
          };
          for(let j=0 ;j< vlistlist.length;j++){
            const vlist = vlistlist[j];
            dataitem[`value${j}`] = vlist[i];
          }
          data.push(dataitem);

        }//vlistlist.length
        for(let j=0 ;j< vlistlist.length;j++){
          if(indextype === 0){
            GeomList.push(<Geom
                key={`point_${j}`}
                type="point"
                position={`ticktimestring*value${j}`}
                size={4}
                shape={"circle"}
                style={{
                 stroke: "#fff",
                 lineWidth: 1
               }}
            />);
            GeomList.push(<Geom
                key={`line_${j}`}
                type="line"
                position={`ticktimestring*value${j}`}
                size={2}
                color={geomcolors[j]}
                shape={"smooth"}
            />);
          }
          if(indextype === 1){
            GeomList.push(<Geom
              key={`interval_${j}`}
              type="interval"
              position={`ticktimestring*value${j}`}
              />);
              GeomList.push(<Geom
                  key={`line_${j}`}
                  type="line"
                  position={`ticktimestring*value${j}`}
                  size={2}
                  color={geomcolors[j]}
                  shape={"smooth"}
              />);
          }
          if(indextype === 2){
            GeomList.push(<Geom
              key={`area_${j}`}
              type="area"
              position={`ticktimestring*value${j}`}
              />);
              GeomList.push(<Geom
                  key={`line_${j}`}
                  type="line"
                  position={`ticktimestring*value${j}`}
                  size={2}
                  color={geomcolors[j]}
                  shape={"smooth"}
              />);
          }
        }

        const cols = {
            ticktimestring: { alias: '时间' },
            value: { alias: '值' },

        };

        const grid = {
            type: 'line' || 'polygon', // 网格的类型
            lineStyle: {
                stroke: '#d9d9d9', // 网格线的颜色
                lineWidth: 1, // 网格线的宽度复制代码
                lineDash: [0, 0] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
            }, // 网格线的样式配置，原有属性为 line
        }
        let chartvisiable = data.length > 1;
        return (
            <div className="monitorreport">
                <div className="li">
                    <div className="tit">{title}</div>
                    <div className="chartcontent">
                      {
                        chartvisiable && (
                          <Chart
                              height={200}
                              data={data}
                              scale={cols}
                              forceFit={true}
                              padding={[ 15, 10, 30, 40]}
                              >
                              <Axis name="ticktimestring" grid={grid} tickLine={true} line={{ stroke: '#EEEEEE'}} />
                              <Axis
                                  name="value"
                                  grid={grid}
                                  line={{stroke: '#DDD'}}
                                  tickLine={null}
                                  title={null}
                                  />
                              <Tooltip />
                              {GeomList}
                          </Chart>
                        )
                      }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
