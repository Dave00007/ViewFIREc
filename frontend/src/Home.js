import React from 'react'
import daw from './daw.png';
import './App.css';
import 'antd/dist/antd.css';
import {Button, Progress, Form} from 'antd';


class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            sock:  require('socket.io-client')('http://localhost:5000')
        }

    }
getAll = () => {
        var socket
        this.state.sock.on('connect', function () {
            this.state.sock.emit('client_connected', {data: 'New client111111'});
            });
}


gee=() =>{

    this.state.sock.emit('client_connected', {data: 'New client2222'});
}
    render() {
        return (
            <div>
                <div className="progress-bar">
                    <a>Józek</a>
                    <Progress className="progress-text" strokeWidth={12}
                              strokeColor={{'0%': '#ffffff', '100%': '#40a9ff'}} percent={10.9}/>
                </div>
                <img src="http://localhost:5000/video_viewer" className="video-live-view" alt="video_live"/>
                <div className="button-group">
                    <Button type="primary" shape="round" icon="eye" size="large" onClick={this.gee}>Start Live
                        View</Button>
                    <Button type="primary" shape="round" icon="camera" size="large" style={{marginLeft: 20}}>Take a
                        photo</Button>
                    <Button type="primary" shape="round" icon="eye-invisible" size="large" style={{marginLeft: 20}}>Stop
                        Live View</Button>
                </div>
            </div>
        );
    }
}

const HomeForm = Form.create()(Home)
export default HomeForm;