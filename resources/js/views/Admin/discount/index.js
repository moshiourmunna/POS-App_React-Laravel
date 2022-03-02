import React from "react";
import '../../../style/adminPages/discount.scss';
import {useForm} from 'react-hook-form';
import Api from "../../../api/api";

const Discount = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const onSubmit = async (data) => {
        await Api().post('/storeDiscount', data)
            .then((response)=>{
                console.log('store response',response)
            })
    };

    return (
        <div className='discount'>
            <div className='discountContainer'>
                <h2> Create a discount</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder='Name...'
                        {...register('name',{required:true})}
                    />
                    {errors.name && <p>A name for your discount is required</p>}
                    <input
                        placeholder='Percentage...'
                        {...register('percentage', {required: true,pattern: /\d+/})}
                    />
                    {errors.percentage && <p>Enter A valid integer amount</p>}
                    <input
                        placeholder='Number of days valid...'
                        {...register('validity', {required: true,pattern: /\d+/})}
                    />
                    {errors.validity && <p>Enter a number for days valid</p>}
                    <button type='submit'>Save Discount</button>
                </form>
            </div>
            <div>
                <h2>Past Discounts</h2>
            </div>
        </div>
    )
}

export default Discount
