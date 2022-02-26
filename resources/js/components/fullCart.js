import React from "react";
import {DeliveryMethod} from "../data/deliveryMethods";
import CartItem from "./card/cart/cartItem";
import {getBasketTotal} from "../states/reducer";
import Button from "./button/Button";
import {useStateValue} from "../states/StateProvider";
import PropTypes from "prop-types";
import Tabs from "./tabs";

const FullCart = (props) => {

    const [{deliveryMethod,basket}] = useStateValue();

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
                    DeliveryMethod.map((method) => (
                        <li key={method.id}>
                            <Tabs title={method.title} condition={deliveryMethod.deliveryMethod}/>
                        </li>
                    ))
                }
            </div>

            <div className='flex-row-list'>
                <li>
                    Item
                </li>
                <div className='toRight'>
                    <li>
                        Qty
                    </li>
                    <li>
                        Price
                    </li>
                </div>
            </div>
            <hr/>
            <br/>
            <div className='orderList'>
                {
                    basket.map((item) => (
                        <CartItem key={item.title} data={item}/>
                    ))
                }
            </div>
            <hr/>
            <div className='orderSubmitTab'>
                <p>Discount <span>$0</span></p>
                <p>SubTotal <span>${getBasketTotal(basket).toFixed(2)}</span></p>
            </div>
            <div style={{padding: '20px 0 0 0 '}}>
                {
                    (!props.isThisForConfirmPayment) &&
                        <Button
                            name={'Continue To Payment'}
                            cancel={false}
                            admin={false}
                        />
                }
            </div>
        </div>
    )
}

export default FullCart

FullCart.propTypes={
    isThisForConfirmPayment:PropTypes.bool
}
