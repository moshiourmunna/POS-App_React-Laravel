import React, {useEffect} from "react";
import SelectOption from "../../forms/selectOption";
import Button from "../../button/Button";
import {useStateValue} from "../../../states/StateProvider";

const CardPay = () => {

    const [{modal,basket},dispatch] =useStateValue()

    useEffect(() => {
        console.log(basket)
    }, []);


    return (
        <div className='cardPay'>

            <p>Cardholder Name</p>
            <input type='text' placeholder='Cardholder..'/>

            <p>Card Number</p>
            <input type='text' placeholder='Card Number..'/>

            <div className='flex-cardInfo'>
                <div className='flex-columnPay'>
                    <p>Expiration Date</p>
                    <input type='text' placeholder='format-11/2/22'/>
                </div>
                <div className='flex-columnPay'>
                    <p>CVV</p>
                    <input type='text' placeholder='CVV'/>
                </div>
            </div>
            <br/>
            <hr/>
            <p style={{padding:'10px',marginLeft:'5px'}}>Order Type</p>

            <div style={{margin:'0% 0 10px 25%'}}>
                <SelectOption/>
            </div>

            <div className='confirmPay'>
                <div   onClick={()=>dispatch({type:'SetModal',item:false})}
                >
                    <Button
                        order={true}
                        name={'Cancel'}
                        cancel={false}
                    />
                </div>

                <div onClick={()=>console.log('damn')}>
                    <Button
                        order={true}
                        name={'Confirm Payment'}
                        cancel={false}
                    />
                </div>

             </div>
        </div>
    )
}

export default CardPay
