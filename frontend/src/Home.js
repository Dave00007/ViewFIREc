import React from 'react'
import daw from './daw.png';
import './App.css';
import 'antd/dist/antd.css';
import {Button} from 'antd';

function Home() {

    return (
        <div>
            <img src={daw} className="video-live-view" alt="video_live"/>
            <div className="button-group">
                <Button type="primary" shape="round" icon="eye" size="large" >Start Live View</Button>
                <Button type="primary" shape="round" icon="camera" size="large" style={{marginLeft: 20}}>Take a photo</Button>
                <Button type="primary" shape="round" icon="eye-invisible" size="large" style={{marginLeft: 20}}>Stop Live View</Button>
            </div>
        </div>
    );
}
export default Home;