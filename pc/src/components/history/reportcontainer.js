import React from 'react';
// import lodashmap from 'lodash.map';
import Report from './report2';
import './report.css';

class App extends React.Component {

    render() {
        let {ticktimestring,fields,retlist,fieldslist_brief,splitcount} = this.props;
        let fieldslist_brief_list = [];
        for(let i=0;i<fieldslist_brief.length;i+=splitcount){
          let fieldslist_brief_item = [];
          for(let j=0;j<splitcount;j++){
            if(i+j < fieldslist_brief.length){
              fieldslist_brief_item.push(fieldslist_brief[i+j]);
            }
          }
          fieldslist_brief_list.push(fieldslist_brief_item);
        }

        let ReportList = [];
        let title = '';
        for(let i=0;i < fieldslist_brief_list.length; i++){
          if(splitcount === 1){
            title = `历史${fields[fieldslist_brief_list[i]].showname}曲线`;
          }
          ReportList.push(<li key={`report${i}`}>
            <Report
              title={title}
              fieldslist_brief={fieldslist_brief_list[i]}
              ticktimestring={ticktimestring}
              fields={fields}
              retlist={retlist}
              indextype={splitcount===1?0:i}
                    />
          </li>)
        }
        return (
          <ul>
            {ReportList}
          </ul>
        );
    }
}

export default App;
