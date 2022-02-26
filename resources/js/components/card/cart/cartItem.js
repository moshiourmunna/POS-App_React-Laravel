import React, {useEffect, useState} from "react";
import '../../../style/items.scss';
import '../../../style/forms.scss';
import OrderNote from "../../forms/orderNote";
import DeleteIcon from '../../../assets/icons/Delete.png';
import PropTypes from "prop-types";
import {useStateValue} from "../../../states/StateProvider";
import orderNote from "../../forms/orderNote";

const CartItem = (props) => {

    const [{basket, deliveryMethod, orderNote}, dispatch] = useStateValue();
    const [updatedQuantity, setUpdatedQuantity] = useState(props.data.quantity)

    function RemoveItem() {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            quantity: props.data.quantity,
            id: props.data.productId
        });
    }

    useEffect(() => {
        update().then(r => r)
    }, []);

    useEffect(() => {
        dispatch({
            type: "updateCart",
            id: props.data.productId,
            method: deliveryMethod.deliveryMethod,
            note: orderNote.orderNote
        });

    }, [deliveryMethod, orderNote]);

    useEffect(() => {
        setUpdatedQuantity(props.data.quantity)
    }, [basket]);


    async function update() {
        dispatch({
            type: "INCREMENT_QUANTITY",
            id: props.data.productId,
            value: updatedQuantity
        });
    }


    function Increase() {
        if (props.data.stock > updatedQuantity) {
            setUpdatedQuantity(updatedQuantity + 1)
        } else {
            alert('Out Of Stock!!!')
        }
    }

    function Decrease() {
        if (props.data.stock > 0 && updatedQuantity > 1) {
            setUpdatedQuantity(updatedQuantity - 1)
        }
    }


    return (
        <div className='cartItems'>
            <div className='cartItemsContainer'>

                <div className='left'>
                    <div style={{display: 'flex'}}>
                        <img src={props.data.image}/>
                        <div>
                            <p>{props.data.title}</p>
                            <h1>${props.data.price.toFixed(2)}</h1>
                        </div>
                    </div>
                </div>

                <div className='flex-sum-row-right'>
                    <div style={{display: 'flex'}}>
                        <h5>
                            <span className='minus' onClick={Decrease}>-</span>
                            {updatedQuantity}
                            <span className='plus' onClick={Increase}>+</span>
                        </h5>
                        <h2>${(props.data.quantity * props.data.price).toFixed(2)}</h2>
                    </div>
                </div>
            </div>

            <div className='flex-row-form'>
                <OrderNote placeholder='Order Note...'/>
                <img onClick={() => RemoveItem()} src={DeleteIcon} alt='DeleteIcon'/>
            </div>
        </div>
    )
}

export default CartItem

CartItem.propTypes = {
    data: PropTypes.object,
}
