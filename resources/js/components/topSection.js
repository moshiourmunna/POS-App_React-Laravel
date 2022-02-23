import React, {useCallback, useEffect, useState} from "react";
import Search from "./forms/search";
import Categories from "./card/categories";
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import PropTypes from "prop-types";
import {RiListSettingsLine} from 'react-icons/ri'
import Api from "../api/api";
import {BeatLoader} from "react-spinners";
import CategoryDetails from "./admin/categoryDetails";
import {useStateValue} from "../states/StateProvider";

const TopSection = (props) => {

    const rawDate = new Date();
    const date = rawDate.toDateString()
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryDiv, setCategoryDiv] = useState(false);
    const [categories, setCategories] = useState([]);
    const [{state}] = useStateValue();

    const getCategories = useCallback(
        async () => {
            await Api().get(`/getCategory`)
                .then((response) => {
                    setCategories(response.data)
                    setLoading(false)
                })
                .catch(e => console.log('first e',e))
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
                                {
                                    (!categoryDiv)?
                                        'Manage Categories'
                                        :
                                        'Close Categories'
                                }
                            </button>
                        </div>
                        <h3>Products Management</h3>
                        <div className={(categoryDiv) ? 'categoryPage' : 'hide'}>
                            <CategoryDetails/>
                        </div>
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
