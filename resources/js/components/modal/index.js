import React from "react";
import Modal from "react-modal";
import {useStateValue} from "../../states/StateProvider";
import PaymentPopUp from "./payment";
import {MdKeyboardBackspace} from "react-icons/md";
import PropTypes from "prop-types";
import Home from "../../views/home/Home";
import AddProducts from "./addProducts";

const ModalContent = (props) => {

    const [{modal}, dispatch] = useStateValue();

    function closeModal() {
        dispatch({
            type: "SetModal",
            item: false
        })
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(31,29,43,0.75)'
        },
        content: {
            position:'relative',
            marginLeft:'13%',
            marginTop:'1%',
            height:'100vh',
            width:'fit-content',
            transform: 'translate(5%, -8%)',
            backgroundColor: '#1F1D2BFF',
            overflow: 'scroll',
            borderStyle:'none'
        },
    };

    return (
        <div className='modalContainer'>
            <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <div style={{cursor: 'pointer', marginLeft: '30px'}}>
                    <MdKeyboardBackspace onClick={closeModal} color='white' size='25px'/>
                </div>
                {
                    (props.addProducts) ?
                        <AddProducts/>
                        :
                        <PaymentPopUp/>
                }
            </Modal>
        </div>
    )
}

export default ModalContent

ModalContent.propTypes = {
    admin: PropTypes.bool
}


