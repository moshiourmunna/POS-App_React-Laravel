import React from "react";
import {RiListSettingsLine} from 'react-icons/ri'
import OrderReportsMapper from "./orderReportsMapper";
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";

const OrderReport = (props) => {

    return (
        <div className='orderReports'>

            <div className='flexHeader'>
                <h2>Order Report</h2>
                <button style={{fontSize:'1.2vw'}}>
                    <span style={{margin: '5px'}}><RiListSettingsLine/></span>
                    Filter Orders
                </button>
            </div>
            <div className='orderInfo'>
                {
                    (props.loading) ?
                        <div style={{position:'relative',marginLeft:'44%', marginTop:'30%'}}>
                            <BeatLoader size={20} color={'#a2a2a2'}/>
                        </div>
                        :
                        <table>
                            <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Menu</th>
                                <th>Total Payment</th>
                                <th>Status</th>
                            </tr>
                            <tr style={{borderBottom: ' 1px solid #2f2f2f'}}/>
                            </thead>
                            {
                                props.order.map((order) => (
                                    <OrderReportsMapper
                                        key={(Math.random())}
                                        orderId={order.id}
                                        loading={props.loading}
                                        name={`${order.users.first_name} ${order.users.last_name}`}
                                        menu={order.order_items}
                                        status={order.status}
                                    />
                                ))
                            }
                        </table>
                }
            </div>
        </div>
    )
}

export default OrderReport

OrderReport.prototype = {
    order: PropTypes.array,
    loading: PropTypes.bool
}
