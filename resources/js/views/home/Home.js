import React, {useEffect, useState} from "react";
import '../../style/home.scss';
import TopSection from "../../components/topSection";
import SelectOption from "../../components/forms/selectOption";
import {useStateValue} from "../../states/StateProvider";
import CentralData from "./partial/centralData";
import ModalContent from "../../components/modal";
import FullCart from "../../components/contents/fullCart";
import '../../style/rowColumnStyle.scss';
import PropTypes from "prop-types";
import RecipeData from "../../data/Recipe";

const Home = (props) => {


    const [{basket, category, modal}] = useStateValue();
    const [state, setState] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setState(!state)
        //callback function for the api call for all data
        setData(RecipeData)
    }, [basket, category]);


    return (
        <div className='home-Container'>
            <div className='home'>
                <TopSection admin={false}/>
                <hr/>
                <div className='flex-split'>
                    <h2>Choose Dishes</h2>
                    <li><SelectOption admin={false}/></li>
                </div>
                {
                    (props.page === 'home') ?
                        <CentralData data={data} admin={false}/>
                        :
                        <CentralData data={props.data} admin={false}/>
                }
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
