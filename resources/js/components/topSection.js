import React, {useState} from "react";
import Search from "./forms/search";
import {CategoryInfo} from "../data/categoryInfo";
import Categories from "./card/categories";
import {IoIosArrowDropdownCircle} from 'react-icons/io';
import PropTypes from "prop-types";
import {RiListSettingsLine} from 'react-icons/ri'
import ModalContent from "./modal";
import {useStateValue} from "../states/StateProvider";

const TopSection = (props) => {

    const rawDate = new Date();
    const date = rawDate.toDateString()
    const [toggle, setToggle] = useState(false);
    const [categoryDiv, setCategoryDiv] = useState(false);

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
                            <button onClick={()=>setCategoryDiv(!categoryDiv)}>
                                <span style={{margin: '5px'}}>
                                    <RiListSettingsLine/>
                                </span>
                                Manage Categories
                            </button>
                        </div>
                        <h3>Products Management</h3>
                        <div className={(categoryDiv)?'categoryAdd':'hide'}>
                            <h2> heyyyy</h2>
                        </div>
                    </div>
            }
            <div className='header'>
                <ul className='headerUl'>
                    {
                        CategoryInfo.map((type) => (
                            <Categories key={type.id} keys={type.title} admin={props.admin}/>
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
