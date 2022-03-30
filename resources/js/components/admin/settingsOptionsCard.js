import React from "react";
import PropTypes from "prop-types";
import RestaurantIcon from "../../assets/icons/sidebar/RestaurantIcon";
import {Link, useLocation} from "react-router-dom";

const settingsOptionsCard = (props) => {
    const url=useLocation()
    console.log(url.pathname)

    return (
        <div className={(url.pathname===props.route)?'settingsOptionsActive':'settingsOptions'}>
            <Link to={props.route}>
                <div className='flex-settingsOptions'>
                    {/*<RestaurantIcon width={'24'} height={'24'} color={'gray'}/>*/}
                    {props.icon}
                    <div className={(props.route==='/settings/inventory')? 'margin':''}>
                        <h3>{props.header}</h3>
                        <p>{props.title}</p>
                    </div>
                </div>
                <div className='height'>
                </div>
            </Link>
        </div>
    )
}

export default settingsOptionsCard

settingsOptionsCard.propTypes = {
    header: PropTypes.string,
    title: PropTypes.string
}
