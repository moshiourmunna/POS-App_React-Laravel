import React, {useState, useEffect} from "react";
import '../../style/tabs.scss';
import {useStateValue} from "../../states/StateProvider";

const Index = (props) => {
    const [{}, dispatch] = useStateValue();

    return (
        <div className='tabs'>
            <button
                onClick={(e) =>
                    dispatch(
                        {
                            type: "SetDeliveryMethod",
                            item: [
                                {
                                    deliveryMethod: props.title
                                }
                            ],
                        })}
                className={(props.condition === props.title) ? 'activeStyle' : 'normalStyle'}
            >
                {props.title}
            </button>
        </div>
    )
}

export default Index
