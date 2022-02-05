import React from "react";
import PropTypes from "prop-types";
import RestaurantIcon from "../../assets/icons/sidebar/RestaurantIcon";
import {Link} from "react-router-dom";

const settingsOptionsCard = (props) => {
    return (
        <div>
            <Link to={props.route}>
                <div className='flex-settingsOptions'>
                    <RestaurantIcon width={'24'} height={'24'} color={'gray'}/>
                    <div>
                        <h3>{props.header}</h3>
                        <p>{props.title}</p>
                    </div>
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