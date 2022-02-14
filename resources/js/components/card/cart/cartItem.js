import React, {useEffect} from "react";
import '../../../style/items.scss';
import '../../../style/forms.scss';
import TextField from "../../forms/TextField";
import DeleteIcon from '../../../assets/icons/Delete.png';
import PropTypes from "prop-types";
import {useStateValue} from "../../../states/StateProvider";

const CartItem = (props) => {

    const [{}, dispatch] = useStateValue();

    function RemoveItem() {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            quantity: props.data.quantity,
            id: props.data.productId
        });
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
                    <div style={{display:'flex'}}>
                        <h5>{props.data.quantity}</h5>
                        <h2>${(props.data.quantity * props.data.price).toFixed(2)}</h2>
                    </div>
                </div>
            </div>

            <div className='flex-row-form'>
                <TextField placeholder='Order Note...'/>
                <img onClick={() => RemoveItem()} src={DeleteIcon} alt='DeleteIcon'/>
            </div>
        </div>
    )
}

export default CartItem

CartItem.propTypes = {
    data: PropTypes.object,
}
