import React, {useCallback, useEffect, useState} from "react";
import TopSection from "./topSection";
import DeliveryMethod from "./deliveryMethod";
import {BeatLoader} from "react-spinners";
import CentralData from "../views/home/partial/centralData";
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import PropTypes from "prop-types";
import {toast} from "react-toastify";

const LandingData = (props) => {

    const [{category, state, query}] = useStateValue();
    const [loading, setLoading] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [data, setData] = useState([])
    let key = 'all'

    if (query) {
        key = query
    }
    if (!/\S/.test(query)) {
        key = 'all'
    }

    useEffect(() => {
        const delayQuery = setTimeout(async () => {
            setLoading(true)
            if (key.match(/^ *$/) === null) {
                await Api().get(`/products/${category.title}/${key}`)
                    .then((response) => {
                        console.log('query', query)
                        setData(response.data.products)
                        setDiscount(response.data.discount)
                        setLoading(false)
                    })
                    .catch((error) => {
                        toast.error('OOPS! something went wrong')
                    })
            }
        }, (query!=='all')?700:0)

        return () => clearTimeout(delayQuery)

    }, [query,category.title])

    return (
        <div>
            <TopSection admin={props.admin}/>
            <hr/>
            {
                (!props.admin) &&
                <div className='flex-split'>
                    <h2>Choose Dishes</h2>
                    <li><DeliveryMethod admin={props.admin}/></li>
                </div>
            }

            {
                (loading) ?
                    <div style={{marginTop: '20%', width: '56vw'}}>
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
