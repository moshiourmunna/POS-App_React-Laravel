import React from "react";
import PropTypes from "prop-types";
import '../../style/button.scss';
import {VscAdd} from 'react-icons/vsc'
import {useNavigate} from "react-router-dom";

const AddMore = (props) => {

    const navigate=useNavigate()
    return (
        <div className='addButton'>
            <button
                style={{ background:props.background, color:props.color}}
            ><VscAdd size='25px'/></button>
            <p>{props.name}</p>
        </div>
    )
}

export default AddMore

AddMore.propTypes={
    color:PropTypes.string,
    name:PropTypes.string,
    background:PropTypes.string
}
