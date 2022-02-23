import React, {useEffect} from "react";
import {useStateValue} from "../../states/StateProvider";
import {BeatLoader} from "react-spinners";

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
                {
                    (!props.loading) ?
                        props.title
                        :
                        <BeatLoader size={10} color={'#EA7C69'}/>
                }
            </a>
            <hr/>
        </div>
    )
}

export default Categories
