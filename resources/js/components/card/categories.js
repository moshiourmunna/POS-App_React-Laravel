import React from "react";
import {useStateValue} from "../../states/StateProvider";

const Categories = (props) => {

    const [{category}, dispatch] = useStateValue();

    function clickHandler() {
        dispatch(
            {
                type: "setCategory",
                item: {
                    title: props.keys
                },
            })
    }

    return (
        <div className={(category.title === props.keys) ? 'activeLink' : 'inActiveLink'}>
            <a onClick={clickHandler}>
                {props.keys}
            </a>
            <hr/>
        </div>
    )
}

export default Categories
