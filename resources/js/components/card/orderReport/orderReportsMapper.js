import React from "react";
import avatar from '../../../assets/images/avatar.png'

const orderReportsMapper = (props) => {
    return (
        <tbody>
            <tr>
                <td style={{display:'flex'}}><img src={avatar} width='20%' style={{borderRadius:'100%'}}/><p style={{margin:'10px 0 0 5px'}}>{props.name}</p></td>
                <td>{props.menu}</td>
                <td> ${(props.total).toFixed(2)}</td>
                <td>
                    <p
                        className={(props.status==='completed')?'StatusCompletedInfo':(props.status==='pending')?'StatusPendingInfo':'StatusCookingInfo'}
                    >
                        {props.status}
                    </p>
                </td>
            </tr>
        </tbody>
    )
}

export default orderReportsMapper
