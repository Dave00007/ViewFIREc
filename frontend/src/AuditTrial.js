import React from 'react'
import './App.css';
import 'antd/dist/antd.css';
import {Table, Form} from 'antd';
import {getAuditTrialList} from './ListFunctions';
import axios from 'axios'


const columns = [{
    title: 'Full Name',
    dataIndex: 'fullName',
    filters: [{
      text: 'Joe',
      value: 'Joe',
    }, {
      text: 'Jim',
      value: 'Jim',
    }],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.fullName.indexOf(value) === 0,
    sorter: (a, b) => a.fullName.length - b.fullName.length,
    sortDirections: ['descend'],
  }, {
    title: 'Date and Time',
    dataIndex: 'dateAndTime',
    defaultSortOrder: 'descend',
    sorter: (a, b) => (new Date(a.dateAndTime).getTime()) - (new Date(b.dateAndTime).getTime()),
  }, {
    title: 'Accuracy [%]',
    dataIndex: 'accuracy',
    filters: [{
      text: 'London',
      value: 'London',
    }, {
      text: 'New York',
      value: 'New York',
    }],
    dataIndex: 'accuracy',
    sorter: (a, b) => a.accuracy - b.accuracy,
    defaultSortOrder: 'descend',
  }];

  const data = [{
    key: '1',
    fullName: 'John Brown',
    dateAndTime: '2019-04-11T17:47:09.124Z',
    accuracy: 82,
  }, {
    key: '2',
    fullName
    : 'Jim Green',
    dateAndTime: '2019-04-11T17:52:01.341Z',
    accuracy: 69,
  }, {
    key: '3',
    fullName: 'John Brown',
    dateAndTime: '2019-05-05T12:33:35.321Z',
    accuracy: 70,
  }, {
    key: '4',
    fullName: 'Jim Red',
    dateAndTime: '2019-05-17T14:02:57.455Z',
    accuracy: 59,
  }];

  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }


class AuditTrial extends React.Component {


    constructor(props) {
        super(props);
        this.title = "Users";
        // this.users = this.getUsers(); // THIS IS WRONG
        this.state = {
            users: []
        }
    }

        componentDidMount() {
        this.getUsers();
    }

  getUsers = () => {
        axios.get('/auditTrial1', {
            headers: { 'Content-type': 'application/json' }
        }).then( (response) => {
                this.setState({users: response.data});
            })
            .catch( (error) => {
                console.log(error);
            });
    }


  render() {
        var aa= this.state.users[1]
        console.log(aa.dateAndTime);  //TODO !!!
    return (

        <div>
          <Table columns={columns} size='middle' dataSource={data} onChange={onChange} bordered="true" style={{
            marginLeft:15,
            marginRight:15,
            background:'white',
            fontWeight:'bold',
            textIndent:'15px'}}/>
        </div>
    );
          }
}

const AuditTrialForm = Form.create()(AuditTrial)
export default AuditTrialForm;