import React from "react";
import {PaymentMethods} from "../../../../data/paymentMethods";
import PaymentMethodList from "../../../card/paymentMethodList";
import CardPay from "../../../card/billingPage/card";

const PaymentInfo = () => {

    return (
        <div className='billingInfo'>
            <div className='billingHeader'>
                <h2>Payment</h2>
                <p>{PaymentMethods.length} payment methods available</p>
            </div>
            <hr style={{marginLeft:'5px'}}/>

            <div className='billingContainer'>
                <h2>Payment Method</h2>
                <div className='paymentIcons'>
                    {
                        PaymentMethods.map((payMethod) => (
                            <PaymentMethodList
                                key={payMethod.id}
                                icon={payMethod.icon}
                                id={payMethod.id}
                                route={payMethod.route}
                            />
                        ))
                    }
                </div>
                <CardPay/>
            </div>

        </div>
    )
}

export default PaymentInfo
