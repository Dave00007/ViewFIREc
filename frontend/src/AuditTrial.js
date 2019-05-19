import React from 'react'
import './App.css';
import 'antd/dist/antd.css';
import {Table, Form} from 'antd';
import {getAuditTrialData} from './ListFunctions';
import axios from 'axios'


const columns = [{
    title: 'Full Name',
    dataIndex: 'fullName',
   /* filters: [{
        text: 'Joe',
        value: 'Joe',
    }, {
        text: 'Jim',
        value: 'Jim',
    }],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.fullName.indexOf(value) === 0, */
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
    sorter: (a, b) => a.accuracy - b.accuracy,
    defaultSortOrder: 'descend',
}];


function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
}


class AuditTrial extends React.Component {

    constructor() {
        super()
        this.state = {
            auditTrials: []
        };
    }

    componentDidMount() {
        this.getAll()
    }

    getAll = () => {
        getAuditTrialData().then(data => {
            const auditTrials = data
            this.setState({auditTrials})
        })
    };

    render() {

        return (
            <div>

                <Table columns={columns} dataSource={this.state.auditTrials} onChange={onChange}  size='middle' bordered="true" style={{
                    marginLeft: 15,
                    marginRight: 15,
                    background: 'white',
                    fontWeight: 'bold',
                    textIndent: '15px'
                }}/>

            </div>
        );
    }
}

const AuditTrialForm = Form.create()(AuditTrial)
export default AuditTrialForm;