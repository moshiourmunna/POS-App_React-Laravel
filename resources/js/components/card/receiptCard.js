import React, {useState, useEffect} from "react";
import {getBasketTotal} from "../../states/reducer";
import Button from "../button/Button";
import {useStateValue} from "../../states/StateProvider";
import {useNavigate} from "react-router";

const ReceiptCard = (props) => {


    let basket= JSON.parse(localStorage.getItem('cart'))

    return (
        <div className='receiptBox'>
            <h2>TOKEN #{basket?.slice(0, 1).map(b => b.orderID)}</h2>
            <div  className='products'>
                {
                    basket?.map((cart,index) => (
                        <ul key={index}>
                            <li>
                                <span className='index'>{index+1}: </span>
                                {cart.title}
                                <span className='quantity'> ({ cart.quantity})</span>
                            </li>
                        </ul>
                    ))
                }
            </div>
            <p>TOTAL: ${getBasketTotal(basket?basket:[]).toFixed(2)}</p>
        </div>
    )
}

export default ReceiptCard
