import React from "react";
import '../style/forms.scss';
import {useStateValue} from "../states/StateProvider";
import {DeliveryMethods} from "../data/deliveryMethods";

const DeliveryMethod = (props) => {

    const [{deliveryMethod,filterDay}, dispatch] = useStateValue();

    return (
        <div className='selectOption'>
            {
                (!props.admin) ?
                    <select
                        value={deliveryMethod.deliveryMethod}
                        onChange={(e) =>
                            dispatch(
                                {
                                    type: "SetDeliveryMethod",
                                    item:
                                        {
                                            deliveryMethod: e.target.value
                                        }
                                    ,
                                })}
                    >
                        <option style={{display: 'none'}}>*Delivery Method</option>
                        {
                            DeliveryMethods.map((a) => (
                                <option
                                    key={a.id}
                                    value={a.title}
                                >
                                    {a.title}
                                </option>
                            ))
                        }

                    </select>
                    :
                    <select
                        value={filterDay.filterDay}
                        onChange={(e) =>
                            dispatch(
                                {
                                    type: "SetFilterMethod",
                                    item:
                                        {
                                            filterDay: e.target.value
                                        }
                                    ,
                                })}

                    >
                        <option value='Today'>
                            Today
                        </option>
                        <option value='all'>
                            All
                        </option>
                    </select>
            }


        </div>
    )
}
export default DeliveryMethod
