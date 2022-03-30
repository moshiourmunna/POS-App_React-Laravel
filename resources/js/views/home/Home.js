import React, {useEffect, useState} from "react";
import '../../style/userPages/home.scss';
import {useStateValue} from "../../states/StateProvider";
import ModalContent from "../../components/modal";
import FullCart from "../../components/cart/fullCart";
import '../../style/rowColumnStyle.scss';
import PropTypes from "prop-types";
import LandingData from "../../components/landingData";
import Api from "../../api/api";
import {toast} from "react-toastify";

const Home = () => {

    const [state, setState] = useState(false)
    const [{basket,quantity}] = useStateValue();

    useEffect(() => {
        setState(!state)
    }, [basket,quantity]);


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
