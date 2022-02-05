import React, {useState} from "react";
import '../../style/dish.scss';
import PropTypes from "prop-types";
import {useStateValue} from "../../states/StateProvider";
import {Cart} from "../../helpers/cleanBasket";
import {useNavigate} from "react-router-dom";

const Dish = (props) => {

    const [{}, dispatch] = useStateValue();
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState('')
    const navigate = useNavigate()


    function editSubmission() {
        navigate(`/settings/dish/edit/${props.id}`)
    }

    function addToCart() {
        setQuantity(quantity + 1)
        if (quantity <= props.data.stock) {
            dispatch(
                {
                    type: "ADD_TO_BASKET",
                    id: props.data.id,
                    item: {
                        productId: props.data.id,
                        title: props.data.title,
                        price: props.data.price,
                        image: props.data.image,
                        quantity: quantity
                    },
                })
        } else {
            setError('Maximum Added')
        }

        console.log('data', Cart)
    }

    return (
        <div className='dish'
             onClick={() => addToCart()}
        >
            <div className={(props.Admin === true) ? 'adminDesign' : 'userDesign'}>
                <img src={props.data.image} alt='product'/>
                <div className='container'>
                    <h3>{props.data.title}</h3>
                    <h4>${props.data.price}</h4>
                    <h5>{props.data.stock} {props.Availability}</h5>
                </div>
                {
                    (error) ?
                        <p>{error}</p>
                        :
                        ''
                }
                <div className={(props.Admin) ? 'editDish' : 'hidden'}>
                    <button
                        onClick={editSubmission}
                    >
                        Edit Dish
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dish

Dish.propTypes = {
    data: PropTypes.object,
    Admin: PropTypes.bool,
    Availability: PropTypes.string
}