
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import {Form, Input, Tooltip, Icon, Select, Button, message} from 'antd';
import {addPersonToList} from './ListFunctions'

const { Option } = Select;

const successMessage = () => {
  message.success('The person added successfully');
};

const errorMessage = () => {
  message.error('Problem occurred during adding record');
};

class NewPersonForms extends React.Component {
  /*
  state = {
    confirmDirty: false,
  };*/
/*
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
*/


handleSubmit = (e) => {
  e.preventDefault();
  this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
      console.log('Received values of form: ', values);
      addPersonToList(values).then(resp => {
          resp==201 ? successMessage() : errorMessage();
      });
      this.props.form.resetFields();
    }
  });
}

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '48',
    })(
      <Select style={{ width: 80 }}>
        <Option value="48">+48</Option>
        <Option value="87">+87</Option>
        <Option value="61">+61</Option>
        <Option value="32">+32</Option>
        <Option value="86">+86</Option>
        <Option value="358">+358</Option>
        <Option value="33">+33</Option>
        <Option value="34">+34</Option>
        <Option value="49">+49</Option>
        <Option value=""></Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit} style={{marginLeft:'70px', marginRight:'auto', display:'block', width:'70%', marginTop: 20}}>
        <Form.Item
          label={(
            <span>
              Full name&nbsp;
              <Tooltip title="Please enter first name and last name.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )} 
          className="form-item"
        >
          {getFieldDecorator('fullName', {
            rules: [{
              required: true, message: 'Please input your Full name!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="E-mail" className="form-item"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Company" className="form-item"
        >
          {getFieldDecorator('company')(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Department" className="form-item"
        >
          {getFieldDecorator('department')(
            <Input />
          )}
        </Form.Item>
        {/*<Form.Item
          label="Password" className="form-item"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
          </Form.Item> 
         <Form.Item
          label="Confirm Password" className="form-item"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )} className="form-item"
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </Form.Item>*/}
        <Form.Item
          label="Phone Number" className="form-item"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} />
          )}
        </Form.Item>
        <Form.Item
          label="Notes" className="form-item"
        >
          {getFieldDecorator('notes')(
            <Input />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape="round" size="large" icon="plus-circle" htmlType="submit" style={{marginLeft:'auto', marginRight:'auto', display:'block', width:'50%', marginTop: 20}}>Save</Button>
        </Form.Item>
      </Form>

    );
  }
}
const WrappedRegistrationForm = Form.create()(NewPersonForms);
export default WrappedRegistrationForm;


          