import React from "react";
import {getBasketTotal} from "../../states/reducer";
import {useStateValue} from "../../states/StateProvider";
import '../../style/userPages/receipt.scss';

const ReceiptCard = (props) => {

    const [{basket}, dispatch] = useStateValue()

    return (
        <div className='receipt'>
            <div className='receiptBox'>
                <h2>TOKEN #{basket?.slice(0, 1).map(b => b.orderID)}</h2>
                <div className='products'>
                    {
                        basket?.map((cart, index) => (
                            <ul key={index}>
                                <li>
                                    <span className='index'>{index + 1}: </span>
                                    {cart.title}
                                    <span className='quantity'> ({cart.quantity})</span>
                                </li>
                            </ul>
                        ))
                    }
                </div>
                <p>TOTAL: ${getBasketTotal(basket ? basket : []).toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ReceiptCard
