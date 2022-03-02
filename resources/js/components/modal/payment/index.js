import React from "react";
import '../../../style/userPages/payment.scss';
import FullCart from "../../fullCart";
import '../../../style/products/items.scss'
import PaymentInfo from "./partial/paymentInfo";

const PaymentPopUp = () => {

    return (
        <div className='payment'>
            <div style={{display:"flex"}}>
                <div>
                    <FullCart isThisForConfirmPayment={true} />
                </div>
                <div>
                    <PaymentInfo/>
                </div>
            </div>
        </div>
    )
}

export default PaymentPopUp
