import React from "react";
import Dish from "../../../components/card/dish";
import PropTypes from "prop-types";
import AddMore from "../../../components/button/AddMore";

const centralData = (props) => {
    return (
        <div className={(props.admin) ? 'grid-container-admin' : 'grid-container'}>
            {
                (props.admin) ?
                    <div className='addDish'>
                        <AddMore color={'#EA7C69'} name='Add More Dish' background={'inherit'}/>
                    </div>
                    :
                    ''
            }
            {
                props.data.map((data) => (
                    <Dish
                        key={data.id}
                        id={data.id}
                        data={data}
                        Admin={props.admin}
                        Availability={'Bowls Available'}
                    />
                ))
            }
        </div>
    )
}
export default centralData

centralData.propTypes = {
    data: PropTypes.array,
    admin: PropTypes.bool
}