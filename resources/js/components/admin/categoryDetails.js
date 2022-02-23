import React, {useState} from "react";
import Api from "../../api/api";
import PropTypes from "prop-types";
import {AiFillDelete} from "react-icons/ai";
import {useStateValue} from "../../states/StateProvider";

const CategoryDetails = (props) => {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [published, setPublished] = useState(1);
    const [response, setResponse] = useState('');
    const [toggle, setToggle] = useState(false);
    const [{}, dispatch] = useStateValue();


    async function createCategory() {

        const Data = new FormData();
        Data.append('name', name);
        Data.append('published', published);

        await Api().post('/createCategory', Data
        ).then((response) => {
            console.log(response)
            if (response.status === 201) {
                setResponse(`Category ${name} Created Successfully!`)
                setName('')
                dispatch(
                    {
                        type: "setState",
                        item: {
                            title: 1
                        },
                    })
            } else {
                setResponse(response.statusText)
                console.log(response)
            }
        }).catch((e) => {
            console.log(e.response.data.errors?.name)
            setErrors(e.response.data?.errors)
        })
            .finally(setToggle(false))

    }

    const nameHandler = (e) => {
        setName(e.target.value)
        errors.name = ''
    }

    return (
        <div>
            <div  className='Category-table'>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        props.categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>{category.published}</td>
                                <td><AiFillDelete/></td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
            </div>

            <button className='CategoryPop' onClick={() => setToggle(!toggle)}>
                {
                    (!toggle)?
                        'Create A New Category'
                        :
                        'Cancel'
                }
            </button>

            <div className={(toggle) ? 'addCategory' : 'hide'}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className={(errors?.name) ? 'input_red' : 'input'}
                        type='text'
                        name='name'
                        onChange={(e) => nameHandler(e)}
                        placeholder={
                            (errors?.name) ?
                                errors?.name
                                :
                                "* Category Name"
                        }
                        value={!(errors?.name) ?
                            name
                            :
                            ''
                        }
                    />
                    <select
                        className={(errors?.status) ? 'select_red' : 'select'}
                        id='status'
                        name="published"
                        onChange={(e) => setPublished(e.target.value)}
                        value={!(errors?.published) ?
                            published
                            :
                            ''
                        }
                    >
                        <option
                            value="1">
                            unPublished
                        </option>
                        <option
                            value="0">
                            Published
                        </option>
                    </select>

                </form>
                <div className='button'>
                    <button
                        onClick={createCategory}>
                        Create category
                    </button>
                </div>
            </div>
            {
                (response) ?
                    <p className='addedDoneMessage'>{response}</p>
                    :
                    ''
            }
        </div>
    )
}

export default CategoryDetails

CategoryDetails.prototype = {
    categories: PropTypes.array
}
