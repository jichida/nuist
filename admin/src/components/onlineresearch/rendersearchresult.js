import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import EditTable from './material-ui-table-edit.js';
import { Fields } from 'redux-form';
import Divider from 'material-ui/Divider';
import _ from 'lodash';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label }  from "bizcharts";
import DataSet from '@antv/data-set';

const rendersearchresult = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }) =>{
  const {record} = props;
  console.log(record);

  const { DataView } = DataSet;

  let data = [];
  _.map(record.answeroptions,(v)=>{
    data.push({
      item:`${v.optionname}、${v.answername}`,
      count:0
    });
  });
  _.map(record.researchresult,(v,index)=>{
    data[index].count = v;
  });
  // const data = [
  //   { item: '事例一', count: 40 },
  //   { item: '事例二', count: 21 },
  //   { item: '事例三', count: 17 },
  //   { item: '事例四', count: 13 },
  //   { item: '事例五', count: 9 }
  // ];
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  });
  const cols = {
    percent: {
      formatter: val => {
        val = (val * 100) ;
        val = val.toFixed(2) + '%';
        return val;
      }
    }
  }

  return (
    <Chart height={window.innerHeight/2} data={dv} scale={cols} padding={[ 80, 80, 80, 80 ]} forceFit>
           <Coord type='theta' radius={0.75} />
           <Axis name="percent" />
           <Legend position='right' offsetY={-window.innerHeight / 4 + 120} offsetX={-100} />
           <Tooltip
             showTitle={false}
             itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
             />
           <Geom
             type="intervalStack"
             position="percent"
             color='item'
             tooltip={['item*percent',(item, percent) => {
               percent = percent * 100 + '%';
               return {
                 name: item,
                 value: percent
               };
             }]}
             style={{lineWidth: 1,stroke: '#fff'}}
             >
             <Label content='percent' formatter={(val, item) => {
                 return item.point.item + ': ' + val;}} />
           </Geom>
         </Chart>
  );
};

export default rendersearchresult;
