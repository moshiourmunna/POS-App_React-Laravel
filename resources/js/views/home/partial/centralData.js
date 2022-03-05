import React, {useEffect, useState} from "react";
import Dish from "../../../components/SingleDish/dish";
import PropTypes from "prop-types";
import AddMore from "../../../components/button/AddMore";
import {useStateValue} from "../../../states/StateProvider";
import ReactPaginate from "react-paginate";
import {FcPrevious} from "react-icons/fc";
import {FcNext} from "react-icons/fc";

const CentralData = (props) => {

    const items = props.data;
    const [{modal}, dispatch] = useStateValue();

    function setModal() {
        dispatch({
            type: "SetModal", item: true
        })
    }

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const perPage = 6


    useEffect(() => {
        const endOffset = itemOffset + perPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / perPage));
    }, [itemOffset, perPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % items.length;
        setItemOffset(newOffset);
    };

    return (<div className={(props.admin) ? 'grid-container-admin' : 'grid-container'}>
        {
            (props.admin) &&
            <div className='addDish' onClick={setModal}>
                <AddMore color={'#EA7C69'} name='Add More Dish' background={'inherit'}/>
            </div>
        }
        {currentItems && currentItems.map((data) => (
            <Dish
                key={data.id}
                id={data.id}
                data={data}
                Admin={props.admin}
                Availability={'Bowls Available'}
            />))}
        <ReactPaginate
            //  containerClassName='paginate'
            // pageClassName='pageNumber'
            activeClassName='activeCLass'
            previousClassName='prevClass'
            nextClassName='prevClass'
            className='paginate'
            breakLabel="..."
            nextLabel=<FcNext size='25px' color={'red'}/>
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=<FcPrevious size='25px'/>
        renderOnZeroPageCount={null}
        />
    </div>)
}
export default CentralData

CentralData.propTypes = {
    data: PropTypes.array, admin: PropTypes.bool
}
