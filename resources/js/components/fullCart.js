import React, {useEffect, useState} from "react";
import CartItem from "./card/cart/cartItem";
import {getBasketDiscount, getBasketTotal} from "../states/reducer";
import Button from "./button/Button";
import {useStateValue} from "../states/StateProvider";
import PropTypes from "prop-types";
import Tabs from "./tabs";
import '../style/cart/fullCart.scss';
import {DeliveryMethods} from "../data/deliveryMethods";

const FullCart = (props) => {

    const [{deliveryMethod, basket}] = useStateValue()
    const [subTotal, setSubTotal] = useState('')
    const [discount, setDiscount] = useState('')

    useEffect(() => {
        let percentage = getBasketDiscount(basket)
        let sum = getBasketTotal(basket)
        let res = sum - (percentage / 100)
        setSubTotal(res)
        setDiscount(percentage / 100)
    }, [basket]);


    return (
        <div className='homeRightSide'>
            {
                (props.isThisForConfirmPayment) ?
                    <div style={{padding: '0 0 10px 20px'}}>
                        <h1>Confirmation</h1>
                        <p> Order #31212</p>
                    </div>
                    :
                    <h2>Orders #31212 </h2>
            }
            <div className='flex-row-home'>
                {
                    DeliveryMethods.map((method) => (
                        <li key={method.id}>
                            <Tabs title={method.title} condition={deliveryMethod.deliveryMethod}/>
                        </li>
                    ))
                }
            </div>

            <div className='flex-row-list'>
                <li>Item</li>
                <div className='toRight'>
                    <li>Quantity</li>
                    <li>Price</li>
                </div>
            </div>

            <hr/>
            <br/>

            <div className='orderList'>
                {
                    basket.map((item) => (
                        <CartItem
                            key={item.title}
                            orderNote={item.orderNote}
                            price={item.price}
                            title={item.title}
                            image={item.image}
                            stock={item.stock}
                            productId={item.productId}
                            quantity={item.quantity}
                        />
                    ))
                }
            </div>
            <hr/>

            <div className='orderSubmitTab'>
                <p>Discount <span>${parseFloat(discount).toFixed(2)}</span></p>
                <p>SubTotal <span>${parseFloat(subTotal).toFixed(2)}</span></p>
            </div>

            <div style={{padding: '20px 0 0 0 '}}>
                {
                    (!props.isThisForConfirmPayment) &&
                    <Button name={'Continue To Payment'} cancel={false} admin={false}/>
                }
            </div>

        </div>
    )
}

export default FullCart

FullCart.propTypes = {
    isThisForConfirmPayment: PropTypes.bool
}
