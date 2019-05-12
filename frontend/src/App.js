import React, {Component} from 'react';
import animated_logo from './camera_lens.png';
import name_logo from './coollogo.png'
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import CustomMenu from './CustomMenu';
import Home from './Home';
import About from './About';
import AuditTrial from './AuditTrial';
import NewPersonPage from './NewPersonPage';
import UpdatePersonsPage from './UpdatePersonsPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const {
    Header, Content, Footer, Sider,
} = Layout;

class App extends Component {

    constructor() {
        super();
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

                        <Content style={{margin: '0 0 0', overflow: 'initial', background: "lightgray"}}>
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <Route path="/help/about" component={About}/>
                                <Route path="/train/gaindata/newPerson" component={NewPersonPage}/>
                                <Route path="/auditTrial" component={AuditTrial}/>
                                <Route path="/train/gaindata/udpatePerson" component={UpdatePersonsPage}/>
                            </Switch>
                        </Content>

                        <Footer style={{textAlign: 'center', bottom: 0, background: "lightgray"}}>
                            Electronic Viewfinder 2019 Created by Dawid Balicki
                        </Footer>

                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default App;