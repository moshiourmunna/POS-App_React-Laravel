import React from "react";

const Search = (props) => {

    function formHandler(){
    }
    return (
        <div>
            <input
                onChange={formHandler}
                type='search'
                // value=''
                placeholder='Search...'
            />
        </div>
    )
}

export default Search