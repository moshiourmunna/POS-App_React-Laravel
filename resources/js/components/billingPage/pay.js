import React, {useEffect, useRef, useState} from "react";
import Button from "../button/Button";
import {useStateValue} from "../../states/StateProvider";
import Api from "../../api/api";
import {useNavigate} from "react-router";
import {toast} from 'react-toastify';
import {useReactToPrint} from "react-to-print";
import ReceiptCard from "../card/receiptCard";
import TableSelector from "../tableSelector";

class ComponentToPrint extends React.Component {
    render() {
        return (
            <ReceiptCard/>
        );
    }
}

const Pay = () => {

    const [{basket, table, deliveryMethod}, dispatch] = useStateValue()
    let user = localStorage.getItem('user')
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    console.log('bas', basket)
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    async function placeOrder() {
        setLoading(true)
        if (user) {
            await Api().post('/storeOrder', basket)
                .then((response) => {
                    if (response.status === 201) {
                        setLoading(false)
                        handlePrint()
                        toast('Order Placed Successfully')
                        dispatch({
                            type: 'EMPTY_BASKET'
                        })
                        dispatch({
                            type: 'SetModal',
                            item: false
                        })
                        dispatch({
                            type: "setTable",
                            item:0
                        })
                        dispatch(
                            {
                                type: "setState",
                                item: {
                                    title: 22
                                },
                            })
                    } else {
                        toast.error('OOps! Something Went Wrong')
                    }
                })
                .catch(e => {
                    toast.error(e.response.statusText)
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
            <div style={{marginLeft: '.4em'}}>
                {
                    (deliveryMethod.deliveryMethod === 'Dine In') &&
                    <div>
                        <p>Table No</p>
                        <TableSelector/>
                    </div>
                }
            </div>
            <br/>
            <div className='confirmPay'>
                <div onClick={() => dispatch({type: 'SetModal', item: false})}
                >
                    <Button
                        normal={true}
                        name={'Cancel'}
                        dark={true}
                    />
                </div>
                <div onClick={() => placeOrder()}>
                    <Button
                        loading={loading}
                        normal={true}
                        name={'Confirm Payment'}
                        cancel={deliveryMethod.deliveryMethod === 'Dine In' ? table !== 0 ? false : true : false}
                    />
                </div>
            </div>
            <div style={{display: 'none'}}>
                <ComponentToPrint ref={componentRef}/>
            </div>
        </div>
    )
}

export default Pay
