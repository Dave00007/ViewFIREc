import React from 'react'
import './App.css';
import 'antd/dist/antd.css';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;

function CustomMenu() {

    const textStyle = {
        color: 'white'
    };

    return (
        <Menu
            className="menu-text"
            style={{width: 285}}
            defaultSelectedKeys={['sub1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
        >
            <Menu.Item key="homeKey">
                <Link to="/">
                    <span style={{fontSize:20}}>
                        <Icon type="home" theme="twoTone" style={{fontSize:'120%'}}/>
                        <span >Home</span>
                    </span>
                </Link>
            </Menu.Item>
            <SubMenu key="trainingKey" title={
                <span style={{fontSize:20}}>
                    <Icon type="interation" theme="twoTone" style={{fontSize:'120%'}}/>
                    <span>Training</span>
                </span>}>
                <Menu.Item key="trainKey">
                    <Link style={textStyle} to="/training/train">
                        <span style={{fontSize:17}}>
                            Train
                        </span>
                    </Link>
                </Menu.Item>
                <SubMenu key="gainTrainingKey" title={
                    <span style={{fontSize:20}}>
                        <Icon type="hdd" theme="twoTone" />
                        <span>Gain training data</span>
                    </span>}>
                    <Menu.Item key="newPersonKey">
                        <Link style={textStyle} to="/train/gaindata/newPerson">
                            <span style={{fontSize:17}}>
                                New person
                            </span>
                        </Link>
                        </Menu.Item>
                    <Menu.Item key="updatePersonKey">
                        <Link style={textStyle} to="/train/gaindata/udpatePerson">
                            <span style={{fontSize:17}}>
                                Update existing dataset
                            </span>
                        </Link>
                        </Menu.Item>
                </SubMenu>
            </SubMenu>
            <Menu.Item key="auditTrialKey">
                <Link to="/auditTrial">
                    <span style={{fontSize:20}}>
                        <Icon Icon type="info-circle" theme="twoTone" style={{fontSize:'120%'}}/>
                        <span>Audit Trail</span>
                    </span>
                </Link>
            </Menu.Item>
            <SubMenu key="helpKey" title={
                <span style={{fontSize:20}}>
                    <Icon type="question-circle" theme="twoTone" style={{fontSize:'120%'}}/>
                    <span>Help</span>
                </span>}>
                <Menu.Item key="?helpKey">
                    <Link style={textStyle} to="/help/?help">
                        <span style={{fontSize:17}}>
                            ? Help
                        </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="aboutKey">
                    <Link style={textStyle} to="/help/about">
                        <span style={{fontSize:17}}>
                            About
                        </span>
                    </Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}

export default CustomMenu;