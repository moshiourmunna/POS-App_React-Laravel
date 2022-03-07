import React, {useState, useEffect, useCallback} from "react";
import Api from "../../api/api";
import OrderReport from "../../components/card/orderReport";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import '../../style/userPages/orderReport.scss';
import AddMore from "../../components/button/AddMore";
import {VscAdd} from "react-icons/vsc";
import {BeatLoader} from "react-spinners";

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate=useNavigate()

    const getOrders = useCallback(

        async () => {
            await Api().get(`/orders/all/${user?.user.id}`)
                .then((response) => {
                    setOrders(response.data.getOrderInfo)
                    setLoading(false)
                })
                .catch(e=>{
                    toast.error('Something Went Wrong')
                })
        },
        [],
    );

    useEffect(() => {
        if(!user){
            toast.warning('Log in to view your orders')
            navigate('/login')
        }
        getOrders().then(r => r)
    }, [getOrders]);


    return (
        <div className='userOrders'>
            {
                (!loading)?
                    <>
                    <div onClick={()=>navigate('/')} style={{height:'21vh', marginTop:'-10vh'}}>
                        <AddMore background='inherit'/>
                        <p className='newOrder'>Make A New Order</p>
                    </div>
                        {
                            orders.map((order) => (
                                <OrderReport
                                    key={order.id}
                                    id={order.id}
                                    loading={loading}
                                    status={order.status}
                                    products={order.order_items}
                                />
                            ))
                        }
                    </>
                :
                    <div className='userOrders' style={{marginTop:'60%',marginLeft:'100%'}}>
                        <BeatLoader size={20} color={'#a2a2a2'}/>
                    </div>
            }

        </div>
    )
}

export default Orders
