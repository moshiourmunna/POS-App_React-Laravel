import React, {useState, useEffect, useCallback} from "react"
import '../../../style/adminPages/inventory.scss'
import Api from "../../../api/api";
import {toast, ToastContainer} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";

const Inventory = () => {

    const [data, setData] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;
    const [{state}, dispatch] = useStateValue();

    const getData= useCallback(
        async () => {
            await Api().get('/productsWithInventory')
                .then(res => {
                    console.log('inv', res.data)
                    setData(res.data)
                    res.data.map(data=>{
                        data.inventories.map(inv=>{
                            if(inv.stock<inv.threshold){
                                dispatch(
                                    {
                                        type: "setShowNotification",
                                        item: true
                                    })
                            }
                        })
                    })
                })
        },
        [],
    );

    useEffect(async () => {
        getData().then(r=>r)
    }, [getData]);


    return (
        <div className='inventory'>
            <h1>INVENTORY PAGE</h1>
            <hr/>
            {
                data.map((item) => (
                    <div className='inventoryCard' key={item.id}>
                        <br/>
                        <p>Ingredients for <span className='title'>{item.title}</span></p>
                        <p className='ingredients'>
                            {item.inventories.map(inv =>
                                <li key={inv.id}>
                                    {inv.name} <br/>
                                    <span> Stocks Left: {inv.stock}</span>
                                    <span> Minimum Needed {inv.threshold}</span>
                                    {/*{(inv.stock<inv.threshold)&& toast.warning(`Restock Needed For ${inv.name}`)}*/}
                                </li>
                            )}
                        </p>
                        <br/>
                    </div>
                ))
            }
            <ToastContainer
                position="top-right"
                autoClose={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
            />
        </div>
    )
}

export default Inventory
