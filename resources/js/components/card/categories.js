import React from "react";
import {useStateValue} from "../../states/StateProvider";
import {Link, useLocation} from "react-router-dom";

const Categories = (props) => {

    const url = useLocation();
    const path = url.pathname.split('/').pop();
    const [{}, dispatch] = useStateValue();

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
        <div className={(path === props.keys) ? 'activeLink' : 'inActiveLink'}>
            {
                (props.admin)?
                    <Link to={`/settings/categories/${props.keys}`} onClick={clickHandler}>
                        {props.keys}
                    </Link>
                    :
                    <Link to={`/categories/${props.keys}`} onClick={clickHandler}>
                        {props.keys}
                    </Link>
            }
            <hr/>
        </div>
    )
}

export default Categories