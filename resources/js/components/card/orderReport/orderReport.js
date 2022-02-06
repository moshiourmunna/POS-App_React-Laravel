import React from "react";
import {RiListSettingsLine} from 'react-icons/ri'
import OrderReportsMapper from "./orderReportsMapper";
import {OrderInfo} from '../../../data/orderInfo'

const orderReport = () => {
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
                    <tr>
                        <th>Customer</th>
                        <th>Menu</th>
                        <th>Total Payment</th>
                        <th>Status</th>
                    </tr>
                    <hr width='375%'/>
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

export default orderReport
