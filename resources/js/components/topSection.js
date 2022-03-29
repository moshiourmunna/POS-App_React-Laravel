import React, {useCallback, useEffect, useState} from "react";
import Search from "./search";
import Categories from "./card/categories";
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import PropTypes from "prop-types";
import {RiListSettingsLine} from 'react-icons/ri'
import Api from "../api/api";
import {BeatLoader} from "react-spinners";
import CategoryDetails from "../views/Admin/settings/partial/categoryDetails";
import {useStateValue} from "../states/StateProvider";
import '../style/adminPages/editCategory.scss';
import '../style/topSection.scss';
import {toast} from "react-toastify";
import useModal from "../hooks/useModal";
import Modal from "../hooks/modal";

const TopSection = (props) => {

    const rawDate = new Date();
    const date = rawDate.toDateString()
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryDiv, setCategoryDiv] = useState(false);
    const [categories, setCategories] = useState([]);
    const [{state,query}] = useStateValue();
    const { toggle2, visible2} = useModal();

    const getCategories = useCallback(
        async () => {
            await Api().get(`/getCategory`)
                .then((response) => {
                    setCategories(response.data)
                    setLoading(false)
                })
                .catch(e => toast.error('something went wrong'))
        },
        [state],
    );

    useEffect(() => {
        getCategories().then(r => r)
    }, [getCategories]);


    return (
        <div className='topSection'>
            {
                (!props.admin) ?
                    <div>
                        <div className='rightSide'>
                            <Search/>
                        </div>
                        <h1>POS APPLICATION</h1>
                        <h2>{date}</h2>
                    </div>
                    :
                    <div>
                        <div className='rightSide'>
                            <button onClick={toggle2}>
                                <span style={{margin: '.2vw'}}>
                                    <RiListSettingsLine/>
                                </span>
                                {
                                    (!categoryDiv)?
                                        'Manage Categories'
                                        :
                                        'Close Categories'
                                }
                            </button>
                        </div>
                        <Modal toggle={toggle2} visible={visible2} component={ <CategoryDetails/>} className='categoryPage'/>
                        <h3>Products Management</h3>
                    </div>
            }
            <div className='header'>
                <ul className='headerUl'>
                    {
                        (!loading) ?
                            categories.map((type) => (
                                <Categories
                                    key={type.id}
                                    keys={type.id}
                                    title={type.name}
                                    admin={props.admin}
                                    loading={loading}
                                />
                            ))
                            :
                            <BeatLoader size={20} color={'#EA7C69'}/>
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
                        categories.map((type) => (
                            <Categories
                                key={type.id}
                                keys={type.name}
                                loading={loading}
                            />
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
