import React from "react";
import Modal from "react-modal";
import {useStateValue} from "../../states/StateProvider";
import PaymentPopUp from "./payment";
import {MdKeyboardBackspace} from "react-icons/md";
import PropTypes from "prop-types";
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
            marginLeft:'10rem',
            paddingRight:'5rem',
            width:'80%',
            height:'fit-content',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1F1D2BFF',
            overflow: 'scroll',
            borderStyle:'none',
            scrollbarWidth:'none',
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


