import React, {useCallback, useEffect, useState} from "react";
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
        formState,
        reset,
        formState: {
            errors, touchedFields
        },
    } = useForm({
        mode: "onChange"
    });
    const {isValid} = formState;

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
                    setLoading(false)
                    reset()
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

                <h1> Create A Discount</h1>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder='Name...'
                        {...register('name', {required: true})}
                    />
                    {errors.name && touchedFields && <p>A name for your discount is required</p>}
                    <input
                        placeholder='Percentage...'
                        type='number'
                        max='100'
                        {...register('percentage', {required: true, pattern: /[0-9]+/})}
                    />
                    {errors.percentage && touchedFields && <p>Enter A valid percentage amount</p>}
                    <select
                        {...register("validity", {required: true})}>
                        <option value="">Select Status...</option>
                        <option value={0}>Published</option>
                        <option value={1}>UnPublished</option>
                    </select>
                    {errors.validity && touchedFields &&
                        <p>Enter either 0 or 1 (0 for published, 1 for unpublished)</p>}
                    <input className={(isValid) ? 'enabled' : 'disabled'} disabled={!isValid} type="submit"
                           value='Save Discount'/>
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
