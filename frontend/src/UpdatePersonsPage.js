import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import {Table, Form, message} from 'antd';
import {getUserList, updateUser, deleteUser} from './ListFunctions'
import { Link } from 'react-router-dom';


const EditableContext = React.createContext();

const successMessage = () => {
  message.success('The person deleted successfully');
};

const errorMessage = () => {
  message.error('Something goes wrong!');
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       users: []
       };

    this.columns = [
      {
        title: 'Full name',
        dataIndex: 'fullName',
        width: '25%',
        
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '25%',
     
      },
      {
        title: 'Phone Number',
        dataIndex: 'phone',        
        width: '18%',
     
      },
      {
        title: 'Company',
        dataIndex: 'company',
        width: '20%',

      },
      {
        title: 'operation',
        width: '10%',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <div>
              {<a onClick={() => {console.log(record.name)}}>
                  <Link to={{
                    pathname: "/train/gaindata/updatePerson1",
                    state: {
                      personToUpdate: record
                    }
                  }}>
                  Edit
                  </Link>
                  </a>}
               { <a className="update-table-buttons" 
               onClick={() => {this.onDelete(record.fullName)
              this.getAll()
              window.location.reload();
                }}
               >Delete</a>}
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.getAll();
}

  getAll = () => {
    getUserList().then(data => {
      const users = data;
      this.setState({users});
    })
}

  onDelete (val) {
    deleteUser(val)
  }

  render() {

    const columns = this.columns.map((col) => {

      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    return (
        
      <EditableContext.Provider value={this.props.form}>
        <Table
          style={{background:'white', marginLeft:20, marginRight:20, fontWeight:'bold'}}
          bordered
          dataSource={this.state.users}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.onDelete,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;