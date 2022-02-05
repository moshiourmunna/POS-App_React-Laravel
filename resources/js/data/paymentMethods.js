import CardIcon from "../assets/icons/cardIcon";
import PaypalIcon from "../assets/icons/paypalIcon";
import WalletIcon from "../assets/icons/walletIcon";


const PaymentMethods=[
    {
        id:0,
        icon:<CardIcon color={'white'} width={'24'} height={'24'}/>,
        route:'/payment/card'
    },
    {
        id:1,
        icon:<PaypalIcon color={'white'} width={'24'} height={'24'}/>,
        route:'/payment/paypal'
    },
    {
        id:2,
        icon:<WalletIcon color={'white'} width={'24'} height={'24'}/>,
        route:'/payment/cash'
    }
]

export {PaymentMethods}