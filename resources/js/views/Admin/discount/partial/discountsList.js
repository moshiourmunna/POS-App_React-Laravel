import React, {useRef, useState} from "react";
import Api from "../../../../api/api";
import {useStateValue} from "../../../../states/StateProvider";
import {toast} from "react-toastify";
import {IoMdCloseCircle} from 'react-icons/io'

const DiscountsList = (props) => {
    const selectForm = useRef(null)
    const [status, setStatus] = useState(props.status)
    const [loading, setLoading] = useState(false)
    const [{state}, dispatch] = useStateValue()

    async function submit(e) {
        console.log(status)
        e.preventDefault()
        const Data = new FormData();
        Data.append('status', status)
        setLoading(true)

        await Api().post(`/updateDiscount/${props.id}`, Data)
            .then((response) => {
                console.log('res', response.data)
                dispatch(
                    {
                        type: "setState",
                        item: {
                            title: 1
                        },
                    })
                setLoading(false)
            }).catch(e => {
                toast.error('OOps! Something Went Wrong!!')
            })
    }

    async function DeleteDiscount(id) {
        let confirmDelete = confirm("Are You Sure You Want to delete?");
        setLoading(true)
        if (confirmDelete) {
            await Api().delete(`/deleteDiscount/${id}`)
                .then((response) => {
                    dispatch(
                        {
                            type: "setState",
                            item: {
                                title: 1
                            },
                        })
                    if (response.status === 201) {
                        toast.success(`Deleted Discount ${props.name} Successfully`)
                    } else {
                        toast.error('OOOps! Something Went Wrong')
                    }
                })
                .catch(e => {
                    console.log('error', e)
                    if (e.response.status === 500) {
                        toast.error('OOOps! Something Went Wrong')
                    }
                })
        }
    }

    return (
        <div>
            <div className='discountInfo'>
                <div
                    style={{cursor: 'pointer', float: 'right'}}
                    onClick={() => DeleteDiscount(props.id)}
                >
                    <IoMdCloseCircle size='3vw' color='#EA7C69'/>
                </div>
                <h2>{props.name}</h2>
                <p>{props.percentage}%</p>
                <form
                    className='selectOption'
                    onSubmit={submit}
                >
                    <select
                        value={status}
                        className={(props.status === 0) ? 'green' : 'red'}
                        onChange={
                            async (e) => {
                                await setStatus(e.target.value)
                                selectForm.current.click()
                            }}
                    >

                        <option value={props.status}>{(props.status === 0) ? 'Published' : 'UnPublished'}</option>
                        <option value='0'>Published</option>
                        <option value='1'>UnPublished</option>
                    </select>
                    <button ref={selectForm} style={{display: 'none'}} type='submit'> Update</button>
                </form>
                <hr/>
            </div>
        </div>
    )
}

export default DiscountsList
