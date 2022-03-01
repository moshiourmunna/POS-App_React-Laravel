import React, {useEffect, useRef, useState} from "react";
import avatar from '../../../assets/images/avatar.png'
import {sum} from "lodash/math";
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";
import Api from "../../../api/api";
import {toast} from "react-toastify";

const orderReportsMapper = (props) => {

    const [total, setTotal] = useState(0)
    const [updatedStatus, setUpdatedStatus] = useState(props.status)
    const [loading, setLoading] = useState(false)
    const selectForm = useRef(null)

    const updateOrder = async (e) => {
        e.preventDefault()
        const Data = new FormData();
        Data.append('status', updatedStatus);

        setLoading(true)
        await Api().post(`/updateOrder/${props.orderId}`, Data)
            .then((response) => {
                setLoading(false)
            })
            .catch(e =>{
                if(e.response.status===500){
                    toast.error('OOps! Something went wrong!! Please try clicking again')
                }
                else{
                    toast.error('OOps! Something went wrong!!')
                }
            })
    }

    useEffect(() => {
        let Sum = []
        props.menu.map((menu) => {
            Sum.push(menu.products.price * menu.quantity)
        })
        setTotal(sum(Sum))
    }, []);

    return (
        <tbody>
        <tr>
            {
                (props.loading) ?
                    <BeatLoader size={10} color={'#a2a2a2'}/>
                    :
                    <td style={{display: 'flex'}}><img src={avatar} width='20%' style={{borderRadius: '100%'}}/><p
                        style={{margin: '10px 0 0 5px'}}>{props.name}</p></td>
            }

            <td>{props.menu.map((menu, key) => (
                <p style={{padding: '5px', borderBottom: ' .1px solid #2D303E'}}>
                    {menu.products.title}
                </p>
            ))}</td>
            <td> ${(total).toFixed(2)}</td>
            <td>
                <form  onSubmit={updateOrder}>
                    <select
                        className={(updatedStatus === 'delivered') ? 'StatusCompletedInfo' : (updatedStatus === 'processing') ? 'StatusPendingInfo' : (updatedStatus === 'sent') ? 'StatusCookingInfo' : 'StatusPendingInfo'}
                        value={updatedStatus}
                        onChange={
                             async (e) => {
                              await setUpdatedStatus(e.target.value)
                                selectForm.current.click()
                            }
                        }
                    >
                        <option value={props.status}>{props.status}</option>
                        <option value='processing'>Processing</option>
                        <option value='sent'>Sent</option>
                        <option value='delivered'>Delivered</option>
                    </select>
                    <button ref={selectForm} style={{display:'none'}} type='submit'> Update</button>
                </form>
            </td>
        </tr>
        </tbody>
    )
}

export default orderReportsMapper

orderReportsMapper.prototype = {
    loading: PropTypes.bool
}
