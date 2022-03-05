import React, {useEffect} from "react";
import {useStateValue} from "../states/StateProvider";

const Search = () => {

    const [{query,category}, dispatch] = useStateValue();


    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //        //req
    //     }, 1000)
    //     return () => clearTimeout(delayDebounceFn)
    // }, [getProducts]);


    function formHandler(e){
        dispatch(
            {
                type: "setCategory",
                item: {
                    title: category.title
                },
            })
        dispatch(
            {
                type: "SetQuery",
                item:e.target.value
            })
    }

    return (
        <div>
            <input
                onChange={(e)=>formHandler(e)}
                type='search'
                value={(query!=='all')?query:''}
                placeholder='Search...'
            />
        </div>
    )
}

export default Search
