import React, {useState, useEffect, useRef} from "react";
import Api from "../../api/api";

const UserManagement = (props) => {

    const [updatedRole, setUpdatedRole] = useState(props.role)
    const selectForm = useRef(null)

    async function updateUser(e){
        e.preventDefault()
       await Api().post(`/updateUser/${props.userId}/${updatedRole}`)
           .then((response)=>{
               console.log(response)
           })
    }

    return (
        <div className='users'>

            <p>{props.email}</p>

            <form onSubmit={updateUser}>
                <select value={updatedRole}
                        onChange={
                            async (e) => {
                                await setUpdatedRole(e.target.value)
                                selectForm.current.click()
                            }
                        }>
                    <option>{props.role}</option>
                    <option>Stuff</option>
                    <option>user</option>
                    <option>Admin</option>
                </select>
                <button ref={selectForm} style={{display: 'none'}} type='submit'> Update</button>
            </form>

        </div>
    )
}

export default UserManagement
