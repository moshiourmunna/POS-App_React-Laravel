import React from "react";
import '../../style/forms.scss';
import {useStateValue} from "../../states/StateProvider";
import {DeliveryMethod} from "../../data/deliveryMethods";

const SelectOption = (props) => {

    const [{deliveryMethod}, dispatch] = useStateValue();

    return (
        <div className='dineIn'>
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
                            DeliveryMethod.map((a) => (
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
                        value={deliveryMethod.deliveryMethod}
                        onChange={(e) => console.log('admin selected:',e.target.value)}
                    >
                        <option value='Today'>
                            Today
                        </option>
                        <option value='All'>
                            All
                        </option>
                    </select>
            }


        </div>
    )
}
export default SelectOption
