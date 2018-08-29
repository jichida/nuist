import React from 'react';
// import lodashmap from 'lodash.map';
import { Chart, Geom, Axis, Tooltip, } from "bizcharts";

class App extends React.Component {

    render() {
        let {title,ticktimestring,vlist} = this.props;
        ticktimestring = ticktimestring || [];
        vlist = vlist || [];
        const data = [];
        for(let i=0 ;i < ticktimestring.length; i++){
          data.push({
            ticktimestring:ticktimestring[i],
            value:vlist[i]
          })
        }
        // const data = [
        //     { month: '01-01', acc: 84.0 },
        //     { month: '02-01', acc: 14.9 },
        //     { month: '03-01', acc: 17.0 },
        //     { month: '04-01', acc: 20.2 },
        //     { month: '05-01', acc: 55.6 },
        //     { month: '06-01', acc: 56.7 },
        // ];

        const cols = {
            ticktimestring: { alias: '月份' },
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

        return (
            <div className="monitorreport">
                <div className="li">
                    <div className="tit">{title}</div>
                    <div className="chartcontent">
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

                            <Geom
                               type="point"
                               position="ticktimestring*value"
                               size={4}
                               shape={"circle"}
                               style={{
                                 stroke: "#fff",
                                 lineWidth: 1
                               }}
                             />
                            <Geom
                                type="line"
                                position="ticktimestring*value"
                                size={1}
                                shape="smooth"
                            />
                        </Chart>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
