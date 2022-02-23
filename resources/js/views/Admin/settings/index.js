import React from "react";
import '../../../style/settings.scss';
import '../../../style/rowColumnStyle.scss';
import LandingData from "../../../components/landingData";
import ModalContent from "../../../components/modal";
import SettingsOptions from "./partial/settingsOptions";


const Settings = () => {
    return (
        <div className='settingsContainer'>
            <h2>Settings</h2>
            <div className='settings'>
                <div style={{background: '#1F1D2BFF', borderRadius: '10px'}}>
                    <SettingsOptions/>
                </div>
                <div className='settingsRightSide'>
                    <LandingData admin={true}/>
                </div>
                <ModalContent addProducts={true}/>
            </div>
        </div>
    )
}

export default Settings
