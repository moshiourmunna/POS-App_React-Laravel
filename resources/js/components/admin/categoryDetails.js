import React, {useState} from "react";
import {BeatLoader} from "react-spinners";
import {BsToggle2Off, BsToggle2On} from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import Api from "../../api/api";
import {useStateValue} from "../../states/StateProvider";
import {toast} from "react-toastify";

const CategoryDetailsCard = (props) => {

    const [{state}, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);

    async function Delete(id) {
        let confirmDelete = confirm('Are You Sure You Want To Delete?')
        if (confirmDelete) {
            await Api().delete(`/deleteCategory/` + id)
                .then((response) => {
                    toast.success(`Category ${props.name} Deleted Successfully!`)
                    dispatch(
                        {
                            type: "setState",
                            item: {
                                title: 1
                            },
                        })
                })
        }
    }

    async function changeStatus(id) {
        setLoading(true)
        await Api().post(`/updateCategory/` + id)
            .then((response) => {
                dispatch(
                    {
                        type: "setState",
                        item: {
                            title: 1
                        },
                    })
            })
        setLoading(false)
    }

    return (
        <tbody>
        {
            (props.id !== 0) &&
            <tr>
                <td className='title'>{props.name}</td>
                <td
                    className={(props.published === 0) ? 'statusGreen' : 'statusRed'}
                    onClick={() => changeStatus(props.id)}
                >
                    {
                        (!loading) ?
                            (props.published === 0) ? 'Published' : 'UnPublished'
                            :
                            <BeatLoader size={10} color={'#50D1AA'}/>
                    }
                    <div style={{marginLeft: '0px'}}>
                        {
                            (props.published === 0) ?
                                <BsToggle2On size='22px'/>
                                :
                                <BsToggle2Off size='22px'/>
                        }
                    </div>
                </td>
                <td className='delete'>
                    <AiFillDelete size='20px' onClick={() => Delete(props.id)}/>
                </td>
            </tr>

        }
        </tbody>
    )
}

export default CategoryDetailsCard
