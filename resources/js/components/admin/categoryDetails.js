import React, {useCallback, useEffect, useState} from "react";
import Api from "../../api/api";
import {AiFillDelete} from "react-icons/ai";
import {useStateValue} from "../../states/StateProvider";
import {BeatLoader} from "react-spinners";
import {BsToggle2Off, BsToggle2On} from "react-icons/bs";
import CategoryDetailsCard from "../card/categoryDetails";

const CategoryDetails = () => {

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [published, setPublished] = useState(1);
    const [response, setResponse] = useState('');
    const [toggle, setToggle] = useState(false);
    const [{state}, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const getAllCategories = useCallback(
        async () => {
            await Api().get(`/getAllCategory`)
                .then((response) => {
                    setCategories(response.data)
                    setLoading(false)
                })
                .catch(e => console.log('first e', e))
        },
        [state],
    );

    useEffect(() => {
        getAllCategories().then(r => r)
    }, [getAllCategories]);


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
            <div className='Category-table'>
                <table id='customers'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                    <tr style={{borderBottom:' 1px solid #2f2f2f'}}/>
                    </thead>
                    {
                        categories.map((category) => (
                            <CategoryDetailsCard
                                key={category.id}
                                published={category.published}
                                id={category.id}
                                name={category.name}
                            />
                        ))
                    }
                </table>
            </div>

            <button className='CategoryPop' onClick={() => setToggle(!toggle)}>
                {
                    (!toggle) ?
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
                        value={!(errors?.name) &&
                            name
                        }
                    />
                    <select
                        className={(errors?.status) ? 'select_red' : 'select'}
                        id='status'
                        name="published"
                        onChange={(e) => setPublished(e.target.value)}
                        value={!(errors?.published) &&
                            published
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
                (response) &&
                <p className='addedDoneMessage'>{response}</p>
            }
        </div>
    )
}

export default CategoryDetails
