import React, {useCallback, useEffect, useRef, useState} from "react";
import {RiListSettingsLine} from 'react-icons/ri'
import OrderReportsMapper from "./orderReportsMapper";
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";
import '../../../style/forms.scss'
import Api from "../../../api/api";

const OrderReport = (props) => {

    const modalRef = useRef();
    const [customerFilter, setCustomerFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [toggle, setToggle] = useState(false)
    const selectForm = useRef(null)
    const [orders, setOrder] = useState([])
    const [loading, setLoading] = useState(false)

    const getOrderInfo = useCallback(
        async () => {
            setLoading(true)
            await Api().get(`/getOrderInfo/${statusFilter}/${customerFilter}/`)
                .then((response) => {
                    console.log('customers', response.data.customers)
                    setOrder(response.data.getOrderInfo)
                    setLoading(false)
                })
                .catch(e => console.log('error', e))
        },
        [statusFilter, customerFilter],
    );

    useEffect(() => {
        getOrderInfo().then(r => r)
    }, [getOrderInfo]);

    function toggleHandler() {
        setToggle(!toggle)
        setStatusFilter('all')
        setCustomerFilter('all')
    }

    return (
        <div className='orderReports'>

            <div className='flexHeader' ref={modalRef}>
                <h2 className={(!toggle)?'':'hide'}>Order Report</h2>
                <button onClick={toggleHandler} style={{fontSize: '1.2vw'}}>
                    <span style={{margin: '5px'}}>
                        <RiListSettingsLine/>
                    </span>
                    {
                        (!toggle) ?
                            'Filter Orders'
                            :
                            'Cancel Filter'
                    }
                </button>
                {
                    (toggle) &&
                    <>
                        <form className='selectOption' onSubmit={(e)=>e.preventDefault()}>
                            <select
                                value={statusFilter}
                                onChange={
                                    async (e) => {
                                        await setStatusFilter(e.target.value)
                                        selectForm.current.click()
                                    }
                                }
                            >
                                <option value='all'>Filter By Status</option>
                                <option value="processing">Processing</option>
                                <option value="sent">Sent</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <button ref={selectForm} style={{display: 'none'}} type='submit'> Update</button>
                        </form>

                        <form className='selectOption' onSubmit={(e)=>e.preventDefault()}>
                            <select
                                value={customerFilter}
                                onChange={
                                    async (e) => {
                                        await setCustomerFilter(e.target.value)
                                        selectForm.current.click()
                                    }
                                }
                            >
                                <option value='all'>Filter By Customer</option>
                                {
                                    props.customers.map((customer) => (
                                        <option
                                            value={customer.user_id}>{customer.users.first_name} {customer.users.last_name}</option>
                                    ))
                                }
                            </select>
                            <button ref={selectForm} style={{display: 'none'}} type='submit'> Update</button>
                        </form>
                    </>
                }


            </div>
            <div className='orderInfo'>
                {
                    (loading) ?
                        <div style={{position: 'relative', marginLeft: '44%', marginTop: '30%'}}>
                            <BeatLoader size={15} color={'#a2a2a2'}/>
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
                                orders.map((order) => (
                                    <OrderReportsMapper
                                        key={order.id}
                                        orderId={order.id}
                                        loading={loading}
                                        name={`${order.users?.first_name} ${order.users?.last_name}`}
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
