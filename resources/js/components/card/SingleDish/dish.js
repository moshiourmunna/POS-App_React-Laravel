import React, {useEffect, useState} from "react";
import '../../../style/dish.scss';
import PropTypes from "prop-types";
import {useStateValue} from "../../../states/StateProvider";
import '../../../style/editProduct.scss';
import {useNavigate} from "react-router-dom";
import {BeatLoader} from "react-spinners";
import {FiEdit3} from 'react-icons/fi';
import {RiDeleteBin5Fill} from "react-icons/ri";
import Api from "../../../api/api";
import AddProducts from "../../modal/addProducts";

const Dish = (props) => {

    const [{basket,deliveryMethod,orderNote}, dispatch] = useStateValue();
    const [quantity, setQuantity] = useState(1)
    let clicked=1
    const [allReadyAdded, setAllReadyAdded] = useState([])
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;


    function editSubmission() {
        setToggle(!toggle)
    }

    useEffect(() => {
        const res = basket.filter(b => {
            return b.productId === props.data.id
        })
        setAllReadyAdded(res)
        console.log('orderNote',orderNote)
    }, [basket]);

    async function addToCart() {

        setQuantity(quantity+1)
        if (quantity <= props.data.stock && allReadyAdded.length<1) {
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
                        quantity: quantity,
                        stock:props.data.stock,
                        deliveryMethod: deliveryMethod.deliveryMethod,
                        orderNote:orderNote.orderNote
                    },
                })
        }
         else if(quantity <= props.data.stock && allReadyAdded.length>0 ){
            (!admin) &&
            dispatch({
                type:'INCREMENT_QUANTITY',
                id: props.data.id,
                value:quantity
            })
        }
        else {
            setError('Maximum Added')
        }
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
                    setLoading(false)
                })
                .catch(e => {
                    setError(e)
                })
        }
    }

    return (
        <div className='dish'
             onClick={addToCart}
        >
            {
                (toggle) &&
                    <div className='editProduct'>
                        <p onClick={editSubmission}>Cancel</p>
                        <AddProducts
                            data={props.data}
                            category={props.data.categories}
                        />
                    </div>
            }
            {
                (props.data) ?
                    <div className={(props.Admin) ? 'adminDesign' : 'userDesign'}>
                        {
                            (!props.data.image) ?
                                <BeatLoader size={10} color={'#50D1AA'}/>
                                :
                                <img src={props.data.image}/>
                        }
                        <div className={(allReadyAdded.length > 0 && !props.Admin) ? 'containerAdded' : 'container'}>
                            <h3>{props.data.title}</h3>
                            <h4>${props.data.price}</h4>
                            <h5>{props.data.stock} {props.Availability}</h5>
                        </div>
                        {
                            (error) &&
                                <p style={{marginTop:'-60%', width:'16vw'}}>{error}</p>
                        }
                        <div className={(props.Admin) ? 'editDish' : 'hidden'}>
                            <button
                                onClick={editSubmission}
                            >
                                <FiEdit3 size='25px'/>
                            </button>
                            <button
                                onClick={() => Delete(props.data.id)}
                            >
                                {
                                    (!loading) ?
                                        <RiDeleteBin5Fill size='25px'/>
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
