import React, {useState, useEffect, useCallback} from "react";
import '../../style/adminPages/mostOrdered.scss';
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";
import Api from "../../api/api";

const mostOrdered = (props) => {
    return (
        <div className='mostOrdered'>
            {
                (props.loading)?
                    <div style={{height:'7.1vh'}}>
                        <BeatLoader size={10} color={'#a2a2a2'}/>
                    </div>
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
