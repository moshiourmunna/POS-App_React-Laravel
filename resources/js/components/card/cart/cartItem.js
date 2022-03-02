import React, {useEffect, useState} from "react";
import '../../../style/items.scss';
import '../../../style/forms.scss';
import OrderNote from "../../forms/orderNote";
import DeleteIcon from '../../../assets/icons/Delete.png';
import PropTypes from "prop-types";
import {useStateValue} from "../../../states/StateProvider";
import orderNote from "../../forms/orderNote";
import {toast} from "react-toastify";

const CartItem = (props) => {

    const [{basket, deliveryMethod, orderNote}, dispatch] = useStateValue();
    const [updatedQuantity, setUpdatedQuantity] = useState(props.quantity)
    const [note, setNote] = useState('')

    function RemoveItem() {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            quantity: props.quantity,
            id: props.productId
        });
    }

    useEffect(() => {
        update().then(r => r)
    }, []);

    async function updateCart(){
        dispatch({
            type: "updateCart",
            id: props.productId,
            method: deliveryMethod.deliveryMethod,
        });
    }

    useEffect(() => {
        updateCart().then(r=>{
            console.log(props.orderNote,basket)
        })
    }, [deliveryMethod]);

    useEffect(() => {
        setUpdatedQuantity(props.quantity)
    }, [basket]);


    async function update() {
        dispatch({
            type: "INCREMENT_QUANTITY",
            id: props.productId,
            value: updatedQuantity
        });
    }


    function Increase() {
        if (props.stock > updatedQuantity) {
            setUpdatedQuantity(updatedQuantity + 1)
        } else {
            toast.error('Out Of Stock!!!')
        }
    }

    function Decrease() {
        if (props.stock > 0 && updatedQuantity > 1) {
            setUpdatedQuantity(updatedQuantity - 1)
        }
    }


    return (
        <div className='cartItems'>
            <div className='cartItemsContainer'>

                <div className='left'>
                    <div style={{display: 'flex'}}>
                        <img src={props.image}/>
                        <div>
                            <p>{props.title}</p>
                            <h1>${props.price.toFixed(2)}</h1>
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
                        <h2>${(updatedQuantity * props.price).toFixed(2)}</h2>
                    </div>
                </div>
            </div>

            <div className='flex-row-form'>
                <input
                    type="text"
                    value={props.orderNote}
                    placeholder='Order Note...'
                    onChange={(e) =>
                        dispatch(
                            {
                                type: "setOrderNote",
                                id:props.productId,
                                note: e.target.value
                            })}
                />
                <img onClick={() => RemoveItem()} src={DeleteIcon} alt='DeleteIcon'/>
            </div>
        </div>
    )
}

export default CartItem

CartItem.propTypes = {
    data: PropTypes.object,
}
