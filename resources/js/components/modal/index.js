import React from "react";
import Modal from "react-modal";
import {useStateValue} from "../../states/StateProvider";
import PaymentPopUp from "./payment";
import {MdKeyboardBackspace} from "react-icons/md";

const ModalContent = () => {

    const [{modal}, dispatch] = useStateValue();

    function closeModal() {
        dispatch({
            type: "SetModal",
            item: false
        })
    }

    const customStyles = {
        content: {
            top: '56%',
            left: '67%',
            right: 'auto',
            bottom: '-70%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1F1D2BFF',
            overflow: 'scroll'
        },
    };

    return (
        <div className='modalContainer'>
            <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{cursor: 'pointer', marginLeft: '30px'}}>
                    <MdKeyboardBackspace onClick={closeModal} color='white' size='25px'/>
                </div>
                <PaymentPopUp/>
            </Modal>
        </div>
    )
}

export default ModalContent

