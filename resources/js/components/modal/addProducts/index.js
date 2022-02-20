import React, {useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from "axios";

const AddProducts = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [discount, setDiscount] = useState('')
    const [status, setStatus] = useState('')
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
        Data.append('status', setStatus);

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
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type='text'
                        placeholder='* Title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    {
                        (errors?.title) ?
                            <p>{errors?.title}</p>
                            :
                            ''
                    }
                    <select
                        id='status'
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option> * Choose Product Status</option>
                        <option
                            value='1'>
                            unPublished
                        </option>
                        <option
                            value='0'>
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
                        type='text'
                        placeholder='* Reserved Stock Of The Product'
                        name='stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}/>
                    {
                        (errors?.stock) ?
                            <p>{errors?.stock}</p>
                            :
                            ''
                    }
                    <input
                        style={{color: 'grey'}}
                        type='file'
                        placeholder='* Product Image'
                        name='file'
                        onChange={(e) => setFile(e.target.files[0])}/>
                    {
                        (errors?.file) ?
                            <p>{errors?.file}</p>
                            :
                            ''
                    }
                    <input
                        type='number'
                        placeholder='* Price'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}/>
                    {
                        (errors?.price) ?
                            <p>{errors?.price}</p>
                            :
                            ''
                    }

                    <input
                        type='text'
                        placeholder='* discount id'
                        name='discount'
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}/>
                    {
                        (errors?.discount) ?
                            <p>{errors?.discount}</p>
                            :
                            ''
                    }
                    <TextareaAutosize
                        className='auto_height'
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="* Product Description"
                        minRows={3}
                        maxRows={20}
                    />
                    {
                        (errors?.description) ?
                            <p>{errors?.description}</p>
                            :
                            ''
                    }
                    <br/>
                    <button onClick={upload}>
                        Add Product
                    </button>
                </form>
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
