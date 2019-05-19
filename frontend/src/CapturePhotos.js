import React from 'react'
import daw from './daw.png';
import './App.css';
import 'antd/dist/antd.css';
import {Button, Statistic, Alert, Form} from 'antd';

const instructionAndTipsMessage = [<ul>
    You are able to add new person with necessary image dataset. Dataset is important for face recognition funcionality.
    Here you have possibility to create one only go through below steps.<br></br>
    Steps:<ol>
        <li>Fill the form</li>
        <li>Click on button 'Start gathering photos'</li>
        <li>Stay in front of camera (This is alghoritm for face detection face and automatic photo taking</li>
        <li>Try to pose (different facial distance from camera, face positions, face rotations)</li>
        <li>Click on button 'Stop gathering photos'</li>
        <li>Click on button 'Save'</li>
    </ol>
    <hr></hr>
<li>Try to take as many photos as you can</li>
<li>For well performance the minimum is 15 photos</li>
</ul> ];

class CapturePhotos extends React.Component {

    constructor() {
        super()
        this.state = {
            buttonStartDisabled: false,
            buttonStopDisabled: true
        }
    }

    render() {
        return (
            <div>
                <img src={daw} className="video-live-view-smaller" alt="video_smaller"/>
                <div className="button-group">
                    <Button disabled={this.state.buttonStartDisabled} type="primary" shape="round" icon="eye"
                            size="large">Start live preview</Button>
                    <Statistic title="Counter" value={0} groupSeparator=""
                               style={{marginLeft: 20, fontWeight: "bold", color: '#40a9ff'}}
                               valueStyle={{textAlign: "center"}}/>
                    <Button disabled={this.state.buttonStopDisabled} type="primary" shape="round" icon="eye-invisible"
                            size="large" style={{marginLeft: 20}}>Stop
                        live preview</Button>
                </div>
                <Alert
                    message="Instruction and Tips"
                    description={instructionAndTipsMessage}
                    type="success"
                    showIcon
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: 50,
                        display: 'block',
                        width: '70%',
                        marginTop: 15,
                        fontWeight: 'bold',
                        border: '6px solid #40a9ff'
                    }}
                />
            </div>
        );
    }
}

const CapturePhotosForm = Form.create()(CapturePhotos);
export default CapturePhotosForm;