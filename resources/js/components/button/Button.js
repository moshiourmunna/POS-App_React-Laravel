import React from "react";
import PropTypes from "prop-types";
import '../../style/button.scss';
import {useStateValue} from "../../states/StateProvider";

const Button = (props) => {

    const disabled = '';
    const [{deliveryMethod,basket}, dispatch] = useStateValue();

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
                 (props.order) ?
                <button
                disabled={!props.cancel ? disabled : !disabled}
                className={!props.cancel ? 'button-glow' : 'button-dim'}
                >
            {props.name}
                </button>:
                (!props.admin) ?
                    <button
                        disabled={basket.length > 0 ? disabled : !disabled}
                        className={basket.length > 0 && deliveryMethod[0].deliveryMethod && !props.cancel ? 'button-glow' : 'button-dim'}
                        onClick={submit}
                    >
                        {props.name}
                    </button>
                    : (!props.addProduct) ?
                    <button
                        disabled={!props.cancel ? disabled : !disabled}
                        className={!props.cancel ? 'button-glow' : 'button-dim'}
                        onClick={submit}
                    >
                        {props.name}
                    </button>
                        :
                    ''
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
