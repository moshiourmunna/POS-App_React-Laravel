import React, {useCallback, useEffect, useState} from "react"
import '../../../style/adminPages/dashboard.scss'
import BusinessSummary from "../../../components/admin/businessSummary"
import OrderReport from "../../../components/admin/orderReport/orderReport"
import MostOrdered from "../../../components/admin/mostOrdered"
import DeliveryMethod from "../../../components/deliveryMethod"
import Button from "../../../components/button/Button"
import Api from "../../../api/api"
import {BeatLoader} from "react-spinners"

const Dashboard = () => {

    const rawDate = new Date()
    const date = rawDate.toDateString()
    const [mostOrdered, setMostOrdered] = useState([])
    const [revenue, setRevenue] = useState(0)
    const [revenueStat, setRevenueStat] = useState(0)
    const [orderedDishCount, setOrderedDishCount] = useState(0)
    const [dishCountStat, setDishCountStat] = useState(0)
    const [customers, setCustomers] = useState([])
    const [customersStat, setCustomersStat] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingMostOrdered, setLoadingMostOrdered] = useState(false)
    const [filter, setFilter] = useState('today')
    const [uniqueCustomers, setUniqueCustomer] = useState([])

    const getMostOrdered = useCallback(
        async () => {
            setLoadingMostOrdered(true)
            await Api().get(`/getMostOrdered/` + filter)
                .then((response) => {
                    setMostOrdered(response.data)
                    setLoadingMostOrdered(false)
                })
        },
        [filter]
    );

    const getBusinessSummery = useCallback(
        async () => {
            setLoading(true)
            await Api().get(`/businessSummery`)
                .then((response) => {
                    setCustomers(response.data.customers)
                    setOrderedDishCount(response.data.orderedDishCount)
                    setRevenue(response.data.revenue)
                    setDishCountStat(response.data.dishStat)
                    setRevenueStat(response.data.revenueStat)
                    setCustomersStat(response.data.customersStat)
                    setLoading(false)
                })
        },
        [],
    );

    useEffect(() => {
        getBusinessSummery().then(r => r)
    }, [getBusinessSummery]);

    useEffect(() => {
        getMostOrdered().then(r => r)
    }, [getMostOrdered]);

    useEffect(() => {
        const unique = [];
        customers?.map(x => unique.filter(a => a.user_id === x.user_id).length > 0 ? null : unique.push(x));
        setUniqueCustomer(unique)
    }, [customers]);


    return (
        <div className='dashboardContainer'>
            <div style={{marginLeft: '3.5%'}}>
                <h2>Dashboard</h2>
                <h3>{date}</h3>
                <br/>
                <hr width='65%' color='#595959' style={{height: '.1px'}}/>
            </div>
            <div className='dashboardFlex'>
                <div className='dashboardLeft'>
                    <div className='businessCardsFlex'>
                        <BusinessSummary data={revenue} stat={revenueStat} money loading={loading} title={'Total Revenue'}/>
                        <BusinessSummary data={orderedDishCount} stat={dishCountStat} order loading={loading} title={'Total Dish Ordered'}/>
                        <BusinessSummary  data={uniqueCustomers.length} stat={customersStat} loading={loading} title={'Total Customer'}/>
                    </div>
                    <div className='orderSummery'>
                        <OrderReport customers={uniqueCustomers}/>
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
                            (loading) ?
                                <div style={{height: '15.1vh', marginTop: '35%', marginLeft: '30%'}}>
                                    <BeatLoader size={20} color={'#a2a2a2'}/>
                                </div>
                                :
                                (!mostOrdered)?
                                    <div style={{height:'28vh', textAlign:'center'}}>
                                        <h2 style={{paddingTop:'25%', color:'#EA7C69'}}>
                                            No Orders During The Period!!
                                        </h2>
                                    </div>
                                    :
                                mostOrdered.map((data) => (
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
                        <hr/>
                        {/*<Button name='View All' cancel={true} admin={true}/>*/}
                    </div>
                    <div className='orderTypesCard'>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h1>Most Type Of Order</h1>
                            <DeliveryMethod admin={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
