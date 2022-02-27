import React, {useCallback, useEffect, useState} from "react";
import {RiListSettingsLine} from 'react-icons/ri'
import OrderReportsMapper from "./orderReportsMapper";
import {OrderInfo} from '../../../data/orderInfo'
import Api from "../../../api/api";
import {sum} from "lodash/math";

const OrderReport = () => {

    const [order,setOrder]=useState([])

    const getOrderInfo= useCallback(
        async () => {

            await Api().get('/getOrderInfo')
                .then((response)=>{
                    console.log(response.data.getOrderInfo)
                    // console.log(response.data.totalPayment)
                    setOrder(response.data.getOrderInfo)
                })
        },
        [],
    );

    useEffect(() => {
        getOrderInfo().then(r=>r)
    }, [getOrderInfo]);


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
                            order.map((order) => (
                                <OrderReportsMapper
                                    key={(Math.random())}
                                    name={`${order.users.first_name} ${order.users.last_name}`}
                                    menu={order.order_items}
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
