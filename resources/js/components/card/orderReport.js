import React, {useState, useEffect} from "react";
import {BeatLoader} from "react-spinners";
import {sum} from "lodash/math";

const OrderReport = (props) => {

    const [total, setTotal] = useState(0)
    useEffect(() => {
        let Sum = []
        props.products.map((menu) => {
            Sum.push(menu.products.price * menu.quantity)
        })
        setTotal(sum(Sum))
    }, []);

    return (
        <div>
            {
                (props.loading) ?
                    <BeatLoader size={10} color={'#a2a2a2'}/>
                    :
                    <div className='OrderContainer'>
                        <p className='orderId'>Order #{props.id}</p>
                        <hr/>
                        {
                            props.products.map((product) => (
                                <div key={product.products.id}>
                                    <p className='productTitle'>{product.products.title} ({product.quantity})</p>
                                </div>
                            ))
                        }
                        <hr/>
                        <p>Order Total: <span  className='price'>${total.toFixed(2)}</span> </p>
                        <p
                            className={(props.status === 'delivered') ? 'delivered' : (props.status === 'sent') ? 'sent' : 'processing'}
                        >
                            {props.status}
                        </p>
                    </div>
            }
        </div>
    )
}

export default OrderReport
