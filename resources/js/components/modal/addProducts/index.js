import React, {useCallback, useEffect, useRef, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import '../../../style/addProduct.scss'
import {BsImage} from "react-icons/bs";
import Api from "../../../api/api";
import {useNavigate} from "react-router";

const AddProducts = () => {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [discount, setDiscount] = useState('')
    const [status, setStatus] = useState(0)
    const [File, setFile] = useState('');
    const [res, setResponse] = useState('');
    const [Url, setUrl] = useState('');
    const [ready, setReady] = useState(false);
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const ref = useRef();
    const disabled = '';

    const getCategories= useCallback(
        async() => {
            await Api().get(`/getCategory`)
                .then((response)=>{
                    setCategories(response.data)
                })
                .catch(e=>setErrors(e))
        },
        [],
    );

    useEffect(() => {
        getCategories().then(r=>r)
    }, [getCategories]);


    async function upload() {
        const Data = new FormData();
        Data.append('file', File);
        Data.append('title', title);
        Data.append('discount', discount);
        Data.append('stock', stock);
        Data.append('price', price);
        Data.append('description', description);
        Data.append('status', status);
        Data.append('category', category);

        await Api().post('/store', Data
        ).then((response) => {
            console.log(response)
            if (response.status === 201) {
                setResponse('Product Added Successfully!')
                setTitle('')
                setDiscount('')
                setStock('')
                setPrice('')
                setDescription('')
                setFile('')
                setUrl('')
            } else {
                setResponse('response.statusText')
                console.log(response)
            }
        }).catch((e) => {
            setResponse(e.response.statusText)
            if (e.response.status === 401) {
                navigate('/login')
            }
            setErrors(e.response.data.errors)
        })

    }

    const titleHandler = (e) => {
        setTitle(e.target.value)
        errors.title = ''
    }
    const stockHandler = (e) => {
        setStock(e.target.value)
        errors.stock = ''
    }

    const priceHandler = (e) => {
        setPrice(e.target.value)
        errors.price = ''
    }
    const descriptionHandler = (e) => {
        setDescription(e.target.value)
        errors.description = ''
    }

    const discountHandler = (e) => {
        setDiscount(e.target.value)
        errors.discount = ''
    }

    const fileHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            let reader = new FileReader();

            await setFile(file);
            reader.onloadend = () => {
                setUrl(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            setFile(null);
            errors.file = ''
        }
    }

    useEffect(() => {
        if (File && title && price && description && discount && stock) {
            setReady(true)
        }
    }, [File, title, price, description, discount, stock]);


    return (
        <div className='add-page'>
            <h1>Add a new product</h1>
            <hr/>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className={(errors?.title) ? 'input_red' : 'input'}
                    type='text'
                    placeholder={
                        (errors?.title) ?
                            errors?.title
                            :
                            "* Product Title"
                    }
                    name='title'
                    value={!(errors?.title) ?
                        title
                        :
                        ''
                    }
                    onChange={(e) => titleHandler(e)}/>

                <select
                    className={(errors?.status) ? 'select_red' : 'select'}
                    id='status'
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                    value={!(errors?.status) ?
                        status
                        :
                        ''
                    }
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

                <select
                    className={(errors?.category) ? 'select_red' : 'select'}
                    id='status'
                    name="status"
                    onChange={(e) => setCategory(e.target.value)}
                    value={!(errors?.category) ?
                        category
                        :
                        ''
                    }
                >
                    <option> * Select Category</option>
                    {
                        categories.map((category)=>(
                            <option
                                key={category.id}
                                value={category.id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>

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
                    value={!(errors?.stock) ?
                        stock
                        :
                        ''
                    }
                    onChange={(e) => stockHandler(e)}/>

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
                    value={!(errors?.discount) ?
                        discount
                        :
                        ''
                    }
                    onChange={(e) => discountHandler(e)}/>

                <input
                    className={(errors?.price) ? 'input_red' : 'input'}
                    type='text'
                    placeholder={
                        (errors?.price) ?
                            errors?.price
                            :
                            "* Price"
                    }
                    name='price'
                    value={!(errors?.price) ?
                        price
                        :
                        ''
                    }
                    onChange={(e) => priceHandler(e)}/>
                <label className={(errors?.file) ? 'input_red' : 'input'} ref={ref} htmlFor="fileInput">
                    <BsImage
                        size={20}
                        style={{cursor: "pointer", opacity: '.7'}}
                        color={'white'}
                    />
                    {
                        (errors?.file) ?
                            errors?.file
                            :
                            " * Product Image"
                    }
                </label>

                <input
                    id="fileInput"
                    className={(errors?.file) ? 'input_red' : 'input'}
                    type='file'
                    style={{display: "none"}}
                    name='file'
                    onChange={(e) => fileHandler(e)}/>

                <TextareaAutosize
                    className={(errors?.description) ? 'auto_height_red' : 'auto_height'}
                    name='description'
                    value={!(errors?.description) ?
                        description
                        :
                        ''
                    }
                    onChange={(e) => descriptionHandler(e)}
                    placeholder={
                        (errors?.description) ?
                            errors?.description
                            :
                            "* Product Description"
                    }
                    minRows={3}
                    maxRows={20}
                />
                <img src={Url} width='60%' style={{maxHeight: '150px', marginLeft: '20%'}}/>
                <br/>
            </form>
            <div className='button'>
                <button
                    className={(ready) ? 'button-glow' : 'button-dim'}
                    disabled={(ready) ? disabled : !disabled}
                    onClick={upload}>
                    Add Product
                </button>
            </div>

            {
                (res) ?
                    <p className='addedDoneMessage'>{res}</p>
                    :
                    ''
            }
        </div>
    );
};

export default AddProducts;
