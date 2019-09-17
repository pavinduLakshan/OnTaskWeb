import React from 'react';
import QR from '../../../assets/img/qr.png'
import './styles.css'

const QRDisplay = () => {
    return (
        <div className="image">
            <img src={QR} alt="qr code" height="300" width="300"/>
        </div>  
    );
};

export default QRDisplay;