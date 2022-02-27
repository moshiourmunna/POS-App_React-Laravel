import React, {useEffect, useState} from "react";
import avatar from '../../../assets/images/avatar.png'
import {sum} from "lodash/math";

const orderReportsMapper = (props) => {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let Sum = []
        props.menu.map((menu) => {
            Sum.push(menu.products.price * menu.quantity)
            console.log(Sum)
        })
        setTotal(sum(Sum))
    }, []);

    return (
        <tbody>
        <tr>
            <td style={{display: 'flex'}}><img src={avatar} width='20%' style={{borderRadius: '100%'}}/><p
                style={{margin: '10px 0 0 5px'}}>{props.name}</p></td>
            <td>{props.menu.map((menu, key) => (
                <p style={{padding: '5px', borderBottom: ' .1px solid #2D303E'}}>
                    {menu.products.title}
                </p>
            ))}</td>
            <td> ${(total).toFixed(2)}</td>
            <td>
                <p
                    className={(props.status === 'completed') ? 'StatusCompletedInfo' : (props.status === 'pending') ? 'StatusPendingInfo' : 'StatusCookingInfo'}
                >
                    {props.status}
                </p>
            </td>
        </tr>
        </tbody>
    )
}

export default orderReportsMapper
