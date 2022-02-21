import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import axios from "axios"
import '../../../style/addProduct.scss'

const AddProducts = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [discount, setDiscount] = useState('')
    const [status, setStatus] = useState()
    const [file, setFile] = useState('');
    const [res, setResponse] = useState('');
    const [errors, setErrors] = useState([]);
    const api = process.env.MIX_API;

    async function upload() {
        const Data = new FormData();
        Data.append('file', file);
        Data.append('title', title);
        Data.append('discount', discount);
        Data.append('stock', stock);
        Data.append('price', price);
        Data.append('description', description);
        Data.append('status', status);

        await axios.post(`${api}/store`, Data
        ).then((response) => {
            if (response.status === 201) {
                setResponse('Product Added Successfully!')
                setTitle('')
                setDiscount('')
                setStock('')
                setPrice('')
                setDescription('')
                setFile('')
            }
        }).catch((e) => {
            setErrors(e.response.data.errors)
            console.log('errors:', e.response.data.errors)
        })

    }

    return (
        <div>
            <div className='add-page'>
                <h1>Add a new product</h1>
                <hr/>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className={(errors?.title) ? 'input_red' : 'input'}
                        type='text'
                        placeholder='* Title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    {/*{*/}
                    {/*    (errors?.title) ?*/}
                    {/*        <p>{errors?.title}</p>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*}*/}
                    <select
                        className={(errors?.status) ? 'select_red' : 'select'}
                        id='status'
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option> * Choose Product Status</option>
                        <option
                            value="1">
                            unPublished
                        </option>
                        <option
                            value="0">
                            Published
                        </option>
                    </select>
                    {
                        (errors?.status) ?
                            <p>{errors?.status}</p>
                            :
                            ''
                    }
                    <input
                        className={(errors?.stock) ? 'input_red' : 'input'}
                        type='text'
                        placeholder={
                            (errors?.stock) ?
                                errors?.stock
                                :
                                "* Product Stock"
                        }
                        name='stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}/>
                    {/*{*/}
                    {/*    (errors?.stock) ?*/}
                    {/*        <p>{errors?.stock}</p>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*}*/}
                    <input
                        className={(errors?.discount) ? 'input_red' : 'input'}
                        type='text'
                        placeholder={
                            (errors?.discount) ?
                                errors?.discount
                                :
                                "* Product Discount ID"
                        }
                        name='discount'
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}/>
                    {/*{*/}
                    {/*    (errors?.discount) ?*/}
                    {/*        <p>{errors?.discount}</p>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*}*/}

                    <input
                        className={(errors?.price) ? 'input_red' : 'input'}
                        type='number'
                        placeholder={
                            (errors?.price) ?
                                errors?.price
                                :
                                "* Price"
                        }
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}/>
                    {/*{*/}
                    {/*    (errors?.price) ?*/}
                    {/*        <p>{errors?.price}</p>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*}*/}

                    <input
                        className={(errors?.file) ? 'input_red' : 'input'}
                        style={{color: 'grey'}}
                        type='file'
                        placeholder={
                            (errors?.file) ?
                                errors?.file
                                :
                                "* Product Image"
                        }
                        name='file'
                        onChange={(e) => setFile(e.target.files[0])}/>
                    {/*{*/}
                    {/*    (errors?.file) ?*/}
                    {/*        <p>{errors?.file}</p>*/}
                    {/*        :*/}
                    {/*        ''*/}
                    {/*}*/}
                    <TextareaAutosize
                        className={(errors?.description) ? 'auto_height_red' : 'auto_height'}
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={
                            (errors?.description) ?
                                errors?.description
                                :
                                "* Product Description"
                        }
                        minRows={3}
                        maxRows={20}
                    />
                </form>
                <button onClick={upload}>
                    Add Product
                </button>
                {
                    (res) ?
                        <p className='addedDoneMessage'>{res}</p>
                        :
                        ''
                }
            </div>
        </div>
    );
};

export default AddProducts;
