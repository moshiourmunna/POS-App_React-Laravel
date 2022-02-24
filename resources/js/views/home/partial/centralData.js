import React from "react";
import Dish from "../../../components/card/SingleDish/dish";
import PropTypes from "prop-types";
import AddMore from "../../../components/button/AddMore";
import {useStateValue} from "../../../states/StateProvider";
import {BeatLoader} from 'react-spinners'

const CentralData = (props) => {

    const [{modal}, dispatch] = useStateValue();

    function setModal() {
        dispatch({
            type: "SetModal",
            item: true
        })
    }

    return (
        <div className={(props.admin) ? 'grid-container-admin' : 'grid-container'}>
            {
                (props.admin) ?
                    <div className='addDish' onClick={setModal}>
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
export default CentralData

CentralData.propTypes = {
    data: PropTypes.array,
    admin: PropTypes.bool
}
