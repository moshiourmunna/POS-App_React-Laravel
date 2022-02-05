import React from "react";
import SelectOption from "../../forms/selectOption";
import Button from "../../button/Button";

const CardPay = () => {
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
            <p style={{padding:'10px'}}>Order Type</p>

            <div style={{margin:'0% 0 10px 25%'}}>
                <SelectOption/>
            </div>

            <div className='confirmPay'>
                <Button name={'Cancel'} cancel={true}/>
                <Button name={'Confirm Payment'} cancel={false}/>
             </div>
        </div>
    )
}

export default CardPay