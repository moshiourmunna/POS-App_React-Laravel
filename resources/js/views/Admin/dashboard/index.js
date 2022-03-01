import React, {useCallback, useEffect, useState} from "react";
import '../../../style/dashboard.scss';
import BusinessSummary from "../../../components/admin/businessSummary";
import OrderReport from "../../../components/admin/orderReport/orderReport";
import MostOrdered from "../../../components/admin/mostOrdered";
import SelectOption from "../../../components/forms/selectOption";
import Button from "../../../components/button/Button";
import Api from "../../../api/api";
import {BeatLoader} from "react-spinners";

const Dashboard = () => {

    const rawDate = new Date();
    const date = rawDate.toDateString()

    const [order, setOrder] = useState([])
    const [mostOrdered, setMostOrdered] = useState([])
    const [revenue, setRevenue] = useState(0)
    const [orderedDishCount, setOrderedDishCount] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingMostOrdered, setLoadingMostOrdered] = useState(false)
    const [filter, setFilter] = useState('all')

    const getMostOrdered = useCallback(
        async () => {
            setLoadingMostOrdered(true)
            await Api().get(`/getMostOrdered/` + filter)
                .then((response) => {
                    setMostOrdered(response.data)
                    setLoadingMostOrdered(false)
                })
        },
        [filter],
    );

    useEffect(() => {
        getMostOrdered().then(r => r)
    }, [getMostOrdered]);


    const getOrderInfo = useCallback(
        async () => {
            setLoading(true)
            await Api().get('/getOrderInfo')
                .then((response) => {
                    console.log('orderItems', response.data.getOrderInfo)
                    setOrder(response.data.getOrderInfo)
                    setRevenue(response.data.revenue)
                    setOrderedDishCount(response.data.orderedDishCount)
                    setCustomers(response.data.customers)
                    setLoading(false)
                })
        },
        [],
    );

    useEffect(() => {
        getOrderInfo().then(r => r)
    }, [getOrderInfo]);


    return (
        <div className='dashboardContainer'>
            <div style={{marginLeft: '3.5%'}}>
                <h2>Dashboard</h2>
                <h3>{date}</h3>
                <br/>
                <hr width='63.5%' color='#595959' style={{height: '.1px'}}/>
            </div>
            <div className='dashboardFlex'>
                <div className='dashboardLeft'>
                    <div className='businessCardsFlex'>
                        <BusinessSummary data={revenue} money loading={loading} title={'Total Revenue'}/>
                        <BusinessSummary data={orderedDishCount} order loading={loading} title={'Total Dish Ordered'}/>
                        <BusinessSummary data={customers} loading={loading} title={'Total Customer'}/>
                    </div>
                    <div className='orderSummery'>
                        <OrderReport loading={loading} order={order}/>
                    </div>
                </div>
                <div className='dashboardRight'>
                    <div className='mostOrderedCard'>
                        <div className='selectOption' style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h1>Most Ordered</h1>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value='Today'>
                                    Today
                                </option>
                                <option value='all'>
                                    All
                                </option>
                            </select>
                        </div>
                        <br/>
                        <hr/>
                        {
                            (loading)?
                                <div style={{height:'15.1vh', marginTop:'35%', marginLeft:'30%'}}>
                                    <BeatLoader size={20} color={'#a2a2a2'}/>
                                </div>
                                :
                                mostOrdered.map((data)=>(
                                    <MostOrdered
                                        loading={loadingMostOrdered}
                                        key={data.id}
                                        title={data.title}
                                        sold={data.sold}
                                        image={data.image}
                                    />
                                ))
                        }

                        <br/>
                        {/*<hr/>*/}
                        <Button name='View All' cancel={true} admin={true}/>
                    </div>
                    <div className='orderTypesCard'>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h1>Most Type Of Order</h1>
                            <SelectOption admin={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
