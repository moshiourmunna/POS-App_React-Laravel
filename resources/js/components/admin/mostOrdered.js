import React, {useState, useEffect} from "react";
import '../../style/mostOrdered.scss';
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";

const mostOrdered = (props) => {
    return (
        <div className='mostOrdered'>
            {
                (props.loading)?
                    <BeatLoader size={20} color={'#a2a2a2'}/>
                    :
                    <>
                        <img src={props.image} alt={props.title}/>
                        <div className='flex-column'>
                            <h4>{props.title}</h4>
                            <p>{props.sold} Dishes Ordered</p>
                        </div>
                    </>

            }

        </div>
    )
}
export default mostOrdered

mostOrdered.propTypes={
    sold:PropTypes.number,
    image:PropTypes.string,
    title:PropTypes.string,
    loading:PropTypes.bool,
}
