import React, {useState, useEffect, useCallback} from "react"
import '../../../style/adminPages/inventory.scss'
import Api from "../../../api/api";
import {toast, ToastContainer} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";
import Button from "../../../components/button/Button";
import {BeatLoader} from "react-spinners";

const Inventory = () => {

    const [data, setData] = useState([])
    const [ready, setReady] = useState(false)
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;
    const [{state}, dispatch] = useStateValue();

    const getData = useCallback(
        async () => {
            setLoading2(true)
            await Api().get('/productsWithInventory')
                .then(res => {
                    console.log('inv', res.data)
                    setData(res.data)
                    setLoading2(false)
                    res.data.map(data => {
                        data.inventories.map(inv => {
                            if (inv.stock < inv.threshold) {
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
        getData().then(r => r)
    }, [getData]);

    async function sendMail() {
        setLoading(true)
        await Api().post(`/mailNotification/${info}`)
            .then(res => {
                setLoading(false)
                setInfo('')
                toast.success('Alert Sent To Kitchen')
            })
            .catch(e => console.log('error', e))
    }

    useEffect(() => {
        if (info) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [info]);

    const getNotification = useCallback(
        async () => {
            (admin) &&
            await Api().get('/notification')
                .then(res => {
                    res.data.map(notification => {
                        console.log('noti: ', res.data)
                        toast.warning(notification.message, {
                            position: "bottom-left",
                            closeOnClick: true,
                            autoClose: 3000,
                            onClick: event => console.log(event.target.innerText),
                        });
                    })
                })
                .catch(e => console.log('error', e));
        },
        [],
    );

    useEffect(async () => {
        getNotification().then(r => r)
    }, [getNotification]);


    return (
        <div>
            <div className='inventoryHeader'>
                <h1>Inventory Management</h1>

                <div style={{display:'flex', justifyContent:"space-between"}}>
                    <input
                        className='instruction'
                        type='text'
                        placeholder='Instruction *'
                        onChange={(e) => setInfo(e.target.value)}
                        name='info'
                        value={info}
                    />
                    <div onClick={sendMail}>
                        <Button
                            name={'Restock Instruction To Kitchen'}
                            cancel={!ready}
                            normal={true}
                            loading={loading}
                        />
                    </div>
                </div>

            </div>
            <div className='inventory'>
                {
                    (loading2) ?
                        <div className='inventory'>
                            <BeatLoader size={15} color={'#a2a2a2'}/>
                        </div>
                        :
                        data.map((item) => (
                            <div className='inventoryCard' key={item.id}>
                                <br/>
                                <p>Ingredients for <span className='title'>{item.title}</span></p>
                                <hr/>
                                <p className='ingredients'>
                                    {item.inventories.map(inv =>
                                        <li className='list' key={inv.id}>
                                            {inv.name} <br/>
                                            <span className='stock'>
                                                        Stocks Left:
                                                <span className={(inv.stock > inv.threshold) ? 'plus' : 'minus'}>
                                                        {inv.stock}
                                                </span>
                                            </span>
                                            <br/>
                                            <span className='threshold'> Minimum Needed {inv.threshold}</span>
                                        </li>
                                    )}
                                </p>
                                <br/>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Inventory
