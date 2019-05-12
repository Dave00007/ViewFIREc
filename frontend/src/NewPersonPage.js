import React from 'react'
import './App.css'
import 'antd/dist/antd.css';
import NewPersonForms from './NewPersonForms';
import CapturePhotos from './CapturePhotos';
import {Row, Col} from 'antd';


function NewPersonPage() {
    return (
        <div>
            <Row>
            <Col span={15} push={9}> <CapturePhotos /> </Col>
            <Col span={9} pull={15}> <NewPersonForms /> </Col>
            </Row>
        </div>
    );
}
export default NewPersonPage;