import React, {useEffect, useState} from "react";
import {useStateValue} from "../../states/StateProvider";
import {useLocation, Link} from "react-router-dom";

const PaymentMethodList = (props) => {

    const [{},dispatch] = useStateValue();
    const url=useLocation()
    const path=url.pathname.split('/').pop()

    function handleChange(){
        dispatch({
            type:"SetPayMethod",
            item:path
        })
    }

    return (
        <div>
            <Link to={props.route}>
            <li
                className={(url.pathname!==props.route)?'payIcon':'activePayIcon'}
                onClick={handleChange}
            >
                {props.icon}
            </li>
            </Link>
        </div>
    )
}

export default PaymentMethodList