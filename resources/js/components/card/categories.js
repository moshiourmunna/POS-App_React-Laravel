import React, {useEffect} from "react";
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

    useEffect(() => {
        // console.log(category.title)
    }, [category.title]);


    return (
        <div className={(category.title === props.keys) ? 'activeLink' : 'inActiveLink'}>
            <a onClick={clickHandler}>
                {props.title}
            </a>
            <hr/>
        </div>
    )
}

export default Categories
