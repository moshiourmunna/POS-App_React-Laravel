import React, {useEffect, useState} from "react";
import '../../style/home.scss';
import {useStateValue} from "../../states/StateProvider";
import ModalContent from "../../components/modal";
import FullCart from "../../components/contents/fullCart";
import '../../style/rowColumnStyle.scss';
import PropTypes from "prop-types";
import LandingData from "../../components/landingData";

const Home = () => {

    const [state, setState] = useState(false)
    const [{basket}] = useStateValue();

    useEffect(() => {
        setState(!state)
    }, [basket]);

    return (
        <div className='home-Container'>
            <div className='home'>
                <LandingData admin={false}/>
            </div>
            <FullCart isThisForConfirmPayment={false}/>
            <ModalContent/>
        </div>
    )
}

export default Home

Home.propTypes = {
    page: PropTypes.string
}
