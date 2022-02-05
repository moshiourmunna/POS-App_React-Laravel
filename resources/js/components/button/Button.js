import React from "react";
import PropTypes from "prop-types";
import '../../style/button.scss';
import {Cart} from "../../helpers/cleanBasket";
import {useStateValue} from "../../states/StateProvider";

const Button = (props) => {

    const disabled = '';
    const [{deliveryMethod}, dispatch] = useStateValue();

    function submit() {
        dispatch(
            {
                type: "SetModal",
                item: true
            })

        console.log('clicked')
    }

    return (
        <div className='button'>
            {
                (!props.admin) ?
                    <button
                        disabled={Cart.length > 0 ? disabled : !disabled}
                        className={Cart.length > 0 && deliveryMethod.title && !props.cancel ? 'button-glow' : 'button-dim'}
                        onClick={submit}
                    >
                        {props.name}
                    </button>
                    :
                    <button
                        disabled={!props.cancel ? disabled : !disabled}
                        className={!props.cancel ? 'button-glow' : 'button-dim'}
                        onClick={submit}
                    >
                        {props.name}
                    </button>
            }
        </div>
    )
}
export default Button

Button.propTypes = {
    name: PropTypes.string,
    cancel: PropTypes.bool,
    admin: PropTypes.bool
}
