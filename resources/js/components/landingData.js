import React, {useCallback, useEffect, useState} from "react";
import TopSection from "./topSection";
import SelectOption from "./forms/selectOption";
import {BeatLoader} from "react-spinners";
import CentralData from "../views/home/partial/centralData";
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import PropTypes from "prop-types";

const LandingData = (props) => {

    const [{category, state}] = useStateValue();
    const [loading, setLoading] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [data, setData] = useState([])

    const getProducts = useCallback(
        async () => {
            setLoading(true)
            await Api().get(`/products/` + category.title)
                .then((response) => {
                    console.log('data',response.data)
                    setData(response.data.products)
                    setDiscount(response.data.discount)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        [category.title, state],
    );


    useEffect(() => {
        getProducts().then(r => r)
    }, [getProducts]);


    return (
        <div>
            <TopSection admin={props.admin}/>
            <hr/>
            {
                (!props.admin) &&
                <div className='flex-split'>
                    <h2>Choose Dishes</h2>
                    <li><SelectOption admin={props.admin}/></li>
                </div>
            }

            {
                (loading) ?
                    <div style={{marginTop: '20%', width:'56vw'}}>
                        <BeatLoader size={30} color={'#a2a2a2'}/>
                    </div>
                    :
                    <CentralData data={data} admin={props.admin}/>
            }
        </div>
    )
}

export default LandingData

LandingData.prototype = {
    admin: PropTypes.bool
}
