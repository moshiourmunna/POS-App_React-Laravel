import React, {useEffect, useState} from "react";
import SelectOption from "../../forms/selectOption";
import Button from "../../button/Button";
import {useStateValue} from "../../../states/StateProvider";
import Api from "../../../api/api";
import {useNavigate} from "react-router";
import {ToastContainer, toast} from 'react-toastify';

const Pay = () => {

    const Notify =async () => toast("Wow so easy!");
    const [{orderNote, basket, deliveryMethod}, dispatch] = useStateValue()
    const [response, setResponse] = useState('')
    const [error, setError] = useState('')
    let user = localStorage.getItem('user')
    let navigate = useNavigate()

    useEffect(() => {
        console.log(basket)
    }, []);

    async function placeOrder() {

        if (user) {
            await Api().post('/storeOrder', basket)
                .then((response) => {
                    if (response.status === 201) {
                        toast('Order Placed Successfully')
                        dispatch({
                            type: 'EMPTY_BASKET'
                        })
                        dispatch({
                            type: 'SetModal',
                            item:false
                        })
                    }
                    else{
                        toast('OOps! Something Went Wrong')
                    }
                })
                .catch(e => toast(e)
                )
        } else {
            toast('Please, Log In First')
            navigate('/login')
        }
    }


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
            <p style={{padding: '10px', marginLeft: '5px'}}>Order Type</p>

            <div style={{margin: '0% 0 10px 25%'}}>
                <SelectOption/>
            </div>

            <div className='confirmPay'>
                <div onClick={() => dispatch({type: 'SetModal', item: false})}
                >
                    <Button
                        order={true}
                        name={'Cancel'}
                        cancel={false}
                    />
                </div>
                <div onClick={() => placeOrder()}>
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

export default Pay
