import React, {useEffect} from "react";
import {useStateValue} from "../states/StateProvider";

const Search = () => {

    const [{query,category}, dispatch] = useStateValue();

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
                query:e.target.value
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
