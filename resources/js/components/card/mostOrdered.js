import React, {useState, useEffect} from "react";
import '../../style/mostOrdered.scss';

const mostOrdered = (props) => {
    return (
        <div className='mostOrdered'>
                <img src={props.data[1].image}/>
            <div className='flex-column'>
                <h4>{props.data[1].title}</h4>
                <p>{props.data[1].stock} Dishes Ordered</p>
            </div>
        </div>
    )
}
export default mostOrdered