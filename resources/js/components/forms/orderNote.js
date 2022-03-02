// import React from "react";
// import PropTypes from "prop-types";
// import {useStateValue} from "../../states/StateProvider";
//
// const OrderNote = (props) => {
//
//     const [{orderNote}, dispatch] = useStateValue();
//
//     return (
//         <div style={{width:'100%'}}>
//             <input
//                 type={"text"}
//                 value={orderNote.orderNote}
//                 placeholder={props.placeholder}
//                 onChange={(e) =>
//                     dispatch(
//                         {
//                             type: "setOrderNote",
//                             item:
//                                 {
//                                     orderNote: e.target.value
//                                 }
//                             ,
//                         })}
//             />
//         </div>
//     )
// }
//
// export default OrderNote
//
// OrderNote.propTypes = {
//     value: PropTypes.string,
//     placeholder: PropTypes.string
// }
