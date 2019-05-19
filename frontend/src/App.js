import React, {Component} from 'react';
import animated_logo from './camera_lens.png';
import name_logo from './coollogo.png'
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import CustomMenu from './CustomMenu';
import Home from './Home';
import AuditTrial from './AuditTrial';
import NewPersonPage from './NewPersonPage';
import UpdatePersonsPage from './UpdatePersonsPage';
import UpdatePerson from './UpdatePerson';
import Help from './Help';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const {
    Header, Content, Footer, Sider,
} = Layout;

class App extends Component {

    constructor() {

        super();
      /*  //var socket = io.connect('http://' + document.domain + ':' + location.port)
        var socket = require('socket.io-client')('http://localhost:5000');
        socket.on('connect', function () {
            socket.emit('client_connected', {data: 'New client'});
            });*/
        }


    render() {

        return (
            <Router>
                <Layout>
                    <Sider style={{overflow: 'auto', height: '120vh', position: 'fixed', left: 0}} width={285}>
                        <img src={name_logo} className="name-logo" alt="logo_name"/>
                        <CustomMenu/>
                        <img src={animated_logo} className="animated-logo" alt="logo_animated"/>
                    </Sider>

                    <Layout style={{marginLeft: 285, background: "lightgray"}}>

                        <Header style={{background: "lightgray", padding: 0, height: 30}}/>

                        <Content style={{margin: '0 0 0', overflow: 'initial', background: "lightgray", minHeight:400}}>
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <Route path="/help" component={Help}/>
                                <Route path="/train/gaindata/newPerson" component={NewPersonPage}/>
                                <Route path="/auditTrial" component={AuditTrial}/>
                                <Route path="/train/gaindata/updatePerson" component={UpdatePersonsPage}/>
                                <Route path="/train/gaindata/updatePerson1" component={UpdatePerson}/>
                            </Switch>
                        </Content>

                        <Footer style={{ bottom: 0, background: "lightgray", position:"fixed", right:0, left:285, height:'5vh'}}>
                            <p className="footer-text">Electronic Viewfinder 2019 Created by Dawid Balicki </p>
                        </Footer>

                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default App;