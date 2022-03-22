import React, {useEffect, useRef, useState} from "react";
import {useStateValue} from "../states/StateProvider";
import '../style/userPages/receipt.scss';
import {useNavigate} from "react-router";
import {useReactToPrint} from 'react-to-print';
import ReceiptCard from "./card/receiptCard";

class ComponentToPrint extends React.Component {
    render() {
        return (
            <ReceiptCard/>
        );
    }
}


const Receipt = (props) => {

    const componentRef = useRef();
    const [{}, dispatch] = useStateValue()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)

    function printReceipt(){
        dispatch({
            type: 'EMPTY_BASKET'
        })
        navigate('/')
        localStorage.removeItem('cart')
        handlePrint()
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        printReceipt()
    }, []);


    return (
        <div className='receipt'>
            <ComponentToPrint ref={componentRef} />
        </div>
    )
}

export default Receipt
