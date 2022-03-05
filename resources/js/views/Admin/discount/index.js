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
    const [getLoading, setGetLoading] = useState(false)
    const [{state}, dispatch] = useStateValue()
    const [discounts, setDiscounts] = useState([])

    const {
        register, handleSubmit, formState, reset, formState: {
            errors, touchedFields
        },
    } = useForm({
        mode: "onChange"
    });
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        await Api().post('/storeDiscount', data)
            .then((response) => {
                dispatch({
                    type: "setState", item: {
                        title: 1
                    },
                })
                if (response.status === 201) {
                    toast.success('New Discount Added!!')
                    reset()
                    setLoading(false)
                }
            })
    };

    const Discounts = useCallback(async () => {
        setGetLoading(true)
        await Api().get('/getDiscounts')
            .then((response) => {
                setDiscounts(response.data)
                setGetLoading(false)
            })
    }, [state]);

    useEffect(() => {
        Discounts().then(r => r)
    }, [Discounts]);


    return (<div className='discount'>
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
                        <p>please select one</p>}
                    <input
                        className={(isValid) ? 'enabled' : 'disabled'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? 'Save Discount' : 'saving...'}/>
                </form>

            </div>

            <div className='pastDiscounts'>
                <h1>Past Discounts</h1>
                <hr/>
                {
                    (!getLoading) ? discounts.map((discount) => (<DiscountsList
                        key={discount.id}
                        percentage={discount.percentage}
                        name={discount.name}
                        id={discount.id}
                        status={discount.published}
                    />))
                        :
                        <div style={{height:'10vh', marginTop:'40%'}}>
                            <BeatLoader size={20} color={'#a2a2a2'}/>
                        </div>
                }
            </div>
        </div>)
}

export default Discount
