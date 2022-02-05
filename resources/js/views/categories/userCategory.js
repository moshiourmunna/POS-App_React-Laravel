import React from "react";
import Home from "../home/Home";
import CategoryData from "../../data/categoryData";
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";
import Settings from "../settings";

const Category = (props) => {

    const url = useLocation()
    const path = url.pathname.split('/').pop()

    async function getCategoryData() {
        //call api with the path to get CategoryData
        console.log(path)
    }

    return (
        <div className='category'>
            <Home page={'category'} data={CategoryData}/>
        </div>
    )
}

export default Category

Category.propTypes = {
    admin: PropTypes.bool
}