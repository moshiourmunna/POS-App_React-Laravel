import React, {useCallback, useEffect, useState} from "react";
import {RiListSettingsLine} from 'react-icons/ri'
import OrderReportsMapper from "./orderReportsMapper";
import {OrderInfo} from '../../../data/orderInfo'
import Api from "../../../api/api";

const OrderReport = () => {

    const [order,setOrder]=useState([])
    const [orderItems,setOrderItems]=useState([])

    const getOrderInfo= useCallback(
        async () => {

            await Api().get('/getOrderInfo')
                .then((response)=>{
                    console.log(response.data.getOrderInfo)
                    setOrder(response.data.getOrderInfo)
                })
        },
        [],
    );

    useEffect(() => {
        getOrderInfo().then(r=>r)
    }, [getOrderInfo]);

    // useEffect(() => {
    //     order.map((o)=>{
    //         console.log('status:',o.status)
    //         o.order_items.map((oi)=>{
    //             console.log('orderItem: ',oi.id)
    //         })
    //     })
    // }, [order]);
    //

    return (
        <div className='orderReports'>

            <div className='flexHeader'>
                <h2>Order Report</h2>
                <button>
                    <span style={{margin: '5px'}}><RiListSettingsLine/></span>
                    Filter Orders
                </button>
            </div>
            <div className='orderInfo'>
                <table>
                    <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Menu</th>
                        <th>Total Payment</th>
                        <th>Status</th>
                    </tr>
                    <tr style={{borderBottom:' 1px solid #2f2f2f'}}/>
                    </thead>
                        {

                            OrderInfo.map((order) => (
                                <OrderReportsMapper
                                    key={order.id}
                                    name={order.name}
                                    menu={order.menu}
                                    total={order.total}
                                    status={order.status}
                                />
                            ))
                        }
                </table>
            </div>
        </div>
    )
}

export default OrderReport
