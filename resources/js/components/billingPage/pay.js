import React, {useEffect, useState} from "react";
import DeliveryMethod from "../deliveryMethod";
import Button from "../button/Button";
import {useStateValue} from "../../states/StateProvider";
import Api from "../../api/api";
import {useNavigate} from "react-router";
import {toast} from 'react-toastify';

const Pay = () => {

    const [{basket}, dispatch] = useStateValue()
    let user = localStorage.getItem('user')
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    console.log('basket in payment page: ', basket)

    async function placeOrder() {
        setLoading(true)
        if (user) {
            await Api().post('/storeOrder', basket)
                .then((response) => {
                    if (response.status === 201) {
                        setLoading(false)
                        toast('Order Placed Successfully')
                        dispatch({
                            type: 'EMPTY_BASKET'
                        })
                        localStorage.setItem('cart', JSON.stringify(basket))
                        dispatch({
                            type: 'SetModal',
                            item: false
                        })
                        navigate('/receipt')
                    } else {
                        toast.error('OOps! Something Went Wrong')
                    }
                })
                .catch(e => {
                    if (e.response.status === 500) {
                        toast.error('OOPs! Please Add An Order Note')
                    }
                })
        } else {
            toast.warning('Please, Log In First')
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
                <DeliveryMethod/>
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
                        loading={loading}
                        normal={true}
                        name={'Confirm Payment'}
                        cancel={false}
                    />
                </div>

            </div>
        </div>
    )
}

export default Pay
