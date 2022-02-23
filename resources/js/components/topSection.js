import React, {useState} from "react";
import Search from "./forms/search";
import {CategoryInfo} from "../data/categoryInfo";
import Categories from "./card/categories";
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import PropTypes from "prop-types";
import {RiListSettingsLine} from 'react-icons/ri'
import ModalContent from "./modal";
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import {useNavigate} from "react-router";

const TopSection = (props) => {

    const rawDate = new Date();
    const date = rawDate.toDateString()
    const [toggle, setToggle] = useState(false);
    const [categoryDiv, setCategoryDiv] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [published, setPublished] = useState(0);
    const [response, setResponse] = useState('');
    const navigate=useNavigate();

    async function createCategory(){

        const Data = new FormData();
        Data.append('name', name);
        Data.append('published', published);

        await Api().post('/createCategory', Data
        ).then((response) => {
            console.log(response)
            if (response.status === 201) {
                setResponse('Category Created Successfully!')
                setName('')
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

    return (
        <div className='topSection'>
            {
                (!props.admin) ?
                    <div>
                        <div className='rightSide'>
                            <Search/>
                        </div>
                        <h1>Jaeger Resto</h1>
                        <h2>{date}</h2>
                    </div>
                    :
                    <div>
                        <div className='rightSide'>
                            <button onClick={() => setCategoryDiv(!categoryDiv)}>
                                <span style={{margin: '5px'}}>
                                    <RiListSettingsLine/>
                                </span>
                                Manage Categories
                            </button>
                        </div>
                        <h3>Products Management</h3>
                        <div className={(categoryDiv) ? 'categoryAdd' : 'hide'}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input type='text' name='name' onChange={(e)=>setName(e.target.value)}/>
                                <select
                                    className={(errors?.published) ? 'select_red' : 'select'}
                                    id='status'
                                    name="status"
                                    onChange={(e) => setPublished(e.target.value)}
                                    value={!(errors?.published) ?
                                        published
                                        :
                                        ''
                                    }
                                >
                                    <option> * Published</option>
                                    <option
                                        value="0">
                                        Published
                                    </option>
                                    <option
                                        value="1">
                                        Unpublished
                                    </option>
                                </select>
                            </form>
                            <div className='button'>
                                <button
                                    onClick={createCategory}>
                                    Add Product
                                </button>
                            </div>
                            {
                                (response) ?
                                    <p className='addedDoneMessage'>{response}</p>
                                    :
                                    ''
                            }
                        </div>
                    </div>
            }
            <div className='header'>
                <ul className='headerUl'>
                    {
                        CategoryInfo.map((type) => (
                            <Categories key={type.id} keys={type.id} title={type.title} admin={props.admin}/>
                        ))
                    }
                </ul>
            </div>

            <div className='dropDownIcon' onClick={() => setToggle(!toggle)}>
                <IoIosArrowDropdownCircle
                    size='20px'
                    color='#9288E0'
                />
                <span>categories</span>
            </div>
            <div className='header-mobile'>
                <ul className={(toggle) ? 'headerUl' : 'hide'}>
                    {
                        CategoryInfo.map((type) => (
                            <Categories key={type.id} keys={type.title}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TopSection

TopSection.propTypes = {
    admin: PropTypes.bool
}
