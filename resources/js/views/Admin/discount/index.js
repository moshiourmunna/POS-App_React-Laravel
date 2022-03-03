import React, {useCallback, useEffect, useRef, useState} from "react";
import '../../../style/adminPages/discount.scss';
import {useForm} from 'react-hook-form';
import Api from "../../../api/api";
import {BeatLoader} from "react-spinners";
import DiscountsList from "./partial/discountsList";
import {toast} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";

const Discount = () => {

    const [loading, setLoading] = useState(false)
    const [{state}, dispatch] = useStateValue()
    const [discounts, setDiscounts] = useState([])

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        await Api().post('/storeDiscount', data)
            .then((response) => {
                setLoading(true)
                dispatch(
                    {
                        type: "setState",
                        item: {
                            title: 1
                        },
                    })
                if (response.status === 201) {
                    toast.success('New Discount Added!!')
                    register('','')
                    setLoading(false)
                }
            })
    };

    const Discounts = useCallback(
        async () => {
            setLoading(true)
            await Api().get('/getDiscounts')
                .then((response) => {
                    setDiscounts(response.data)
                    setLoading(false)
                })
        },
        [state],
    );

    useEffect(() => {
        Discounts().then(r => r)
    }, [Discounts]);


    return (
        <div className='discount'>
            <div className='discountContainer'>

                <h2> Create a discount</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder='Name...'
                        {...register('name', {required: true})}
                    />
                    {errors.name && <p>A name for your discount is required</p>}
                    <input
                        placeholder='Percentage...'
                        {...register('percentage', {required: true, pattern: /[0-1]+/})}
                    />
                    {errors.percentage && <p>Enter A valid percentage amount</p>}
                    <input
                        placeholder='Status...(0 for published, 1 for unpublished)'
                        type='number'
                        max='100'
                        {...register('validity', {required: true, pattern: /\d+/})}
                    />
                    {errors.validity && <p>Enter either 0 or 1 (0 for published, 1 for unpublished)</p>}
                    <button type='submit'>
                        {
                            (!loading)?
                                'Save Discount'
                                :
                                <BeatLoader size={5} color={'#EA7C69'}/>
                        }
                    </button>
                </form>

            </div>

            <div className='pastDiscounts'>
                <h1>Past Discounts</h1>
                <hr/>
                {
                    (!loading) ?
                        discounts.map((discount) => (
                            <DiscountsList
                                key={discount.id}
                                percentage={discount.percentage}
                                name={discount.name}
                                id={discount.id}
                                status={discount.published}
                            />
                        ))
                        :
                        <BeatLoader size={10} color={'#a2a2a2'}/>
                }

            </div>
        </div>
    )
}

export default Discount
