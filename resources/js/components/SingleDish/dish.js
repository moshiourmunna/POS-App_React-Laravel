import React, {useEffect, useRef, useState} from "react";
import '../../style/products/dish.scss';
import PropTypes from "prop-types";
import {useStateValue} from "../../states/StateProvider";
import '../../style/adminPages/editProduct.scss';
import {useNavigate} from "react-router-dom";
import {BeatLoader} from "react-spinners";
import {FiEdit3} from 'react-icons/fi';
import {RiDeleteBin5Fill} from "react-icons/ri";
import Api from "../../api/api";
import AddProducts from "../modal/addProducts";
import {toast} from "react-toastify";
import {IoMdCloseCircle} from 'react-icons/io';

const Dish = (props) => {

    const [{basket, deliveryMethod}, dispatch] = useStateValue();
    const [quantity, setQuantity] = useState(1)
    const [allReadyAdded, setAllReadyAdded] = useState([])
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [error, setError] = useState('')
    const [discount, setDiscount] = useState(0)
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;
    const modalRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!modalRef.current?.contains(e.target)) {
                setToggle(false)
            }
        })
    }, []);

    function editSubmission() {
        setToggle(!toggle)
    }

    useEffect(() => {
        const res = basket.filter(b => {
            return b.productId === props.data.id
        })
        setAllReadyAdded(res)
        if (props.data.discounts?.percentage) {
            setDiscount(props.data.discounts?.percentage)
        }
    }, [basket]);

    async function addToCart() {

        if (quantity <= props.data.stock && allReadyAdded.length < 1) {
            (!admin) &&
            dispatch(
                {
                    type: "ADD_TO_BASKET",
                    id: props.data.id,
                    item: {
                        productId: props.data.id,
                        title: props.data.title,
                        price: props.data.price,
                        image: props.data.image,
                        quantity: 1,
                        stock: props.data.stock,
                        deliveryMethod: deliveryMethod.deliveryMethod,
                        orderNote: '',
                        orderID:props.orderID,
                        discount: discount
                    },
                })
        }
        // else if(quantity <= props.data.stock && allReadyAdded.length>0 ){
        //     (!admin) &&
        //         setQ(Q+1)
        //     dispatch({
        //         type:'INCREMENT_QUANTITY',
        //         id: props.data.id,
        //         value:Q
        //     })
        // }
        // else {
        //     toast.error('Maximum Stock Reached')
        // }
    }

    async function Delete(id) {

        let confirmDelete = confirm("Are You Sure You Want to delete?");
        setLoading(true)
        if (confirmDelete) {
            await Api().delete(`/delete/` + id)
                .then((response) => {
                    dispatch(
                        {
                            type: "setState",
                            item: {
                                title: 1
                            },
                        })
                    toast(`${props.data.title} Deleted Successfully`)
                    setLoading(false)
                })
                .catch(e => {
                    setError(e)
                })
        }
        else {
            setLoading(false)
        }
    }

    return (
        <div className='dish' onClick={addToCart}>
            {
                (toggle) &&
                <div className='editProduct'>
                    <p onClick={editSubmission}><IoMdCloseCircle size='2.5em'/></p>
                    <div ref={modalRef} className='modal-content'>
                        <AddProducts
                            data={props.data}
                            category={props.data.categories}
                        />
                    </div>
                </div>
            }
            {
                (props.data) ?
                    (!toggle) &&
                    <div className={(props.Admin) ? 'adminDesign' : 'userDesign'}>

                        <div className={(props.data.discounts && !props.Admin)?'coupon':'opacityNone'}>
                            <h5>{props.data.discounts?.name}</h5>
                            <h1> Enjoy {props.data.discounts?.percentage}% Off!!</h1>
                        </div>

                        <img src={props.data.image}/>
                        <div className={(allReadyAdded.length > 0 && !props.Admin) ? 'containerAdded' : 'container'}>
                            <h3>{props.data.title}</h3>
                            <h4>${props.data.price}</h4>
                            <h5>{props.data.stock} {props.Availability}</h5>
                        </div>

                        <div className={(props.Admin) ? 'editDish' : 'hidden'}>
                            <button
                                onClick={editSubmission}
                            >
                                <FiEdit3 size='2.5em'/>
                            </button>
                            <button
                                onClick={() => Delete(props.data.id)}
                            >
                                {
                                    (!loading) ?
                                        <RiDeleteBin5Fill size='2.5em'/>
                                        :
                                        <BeatLoader size={10} color={'#EA7C69'}/>
                                }
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <BeatLoader size={20} color={'#EA7C69'}/>
                    </div>
            }
        </div>
    )
}

export default Dish

Dish.propTypes = {
    data: PropTypes.object,
    Admin: PropTypes.bool,
    Availability: PropTypes.string
}
