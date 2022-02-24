import React, {useState} from 'react'
import {useNavigate} from 'react-router'
import '../../style/registration.scss'
import Api from "../../api/api";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const api = process.env.MIX_API;
    const [errors, setErrors] = useState([]);
    const [notFound, setNotFound] = useState('');

    const login = async () => {
        let userdata = new FormData;
        userdata.append('email', email);
        userdata.append('password', password);

        await axios.post(`${api}/login`, userdata)
            .then((res) => {
                console.log('res',res)
                if (res.status === 202) {
                    window.localStorage.setItem('user', JSON.stringify(res.data))
                    console.log('res',res)

                } else {
                    console.log('res',res)
                }
            })
            .catch(e => {
                setNotFound(e.response.data.message)
            })

        let user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
            setErrors(user?.errors)
            console.log(user?.errors)
        if (user?.admin === true) {
            // navigate('/dashboard')
            window.location.replace('/dashboard')

        } else {
            // navigate('/POS')
            window.location.replace('/POS')
        }
        }


    }

    return (
        <div className='login'>
            <div className='login-box'>
                <input type='text' name='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <br/>
                {
                    (notFound && !email) ?
                        <p>Enter a valid Email</p>
                        :
                        ''
                }
                <input type='password' name='password' placeholder='password'
                       onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <br/>
                {
                    (notFound && !password) ?
                        <p>Enter Correct Password</p>
                        :
                        ''
                }
                <button style={{backgroundColor: '#75a85d'}} onClick={login}> Log In</button>
                {
                    (notFound) ?
                        <p style={{marginLeft:'20%',marginTop:'10px',fontSize:'15px'}}>{notFound}</p>
                        :
                        ''
                }
                <h3>Dont have an account?</h3>
                <button style={{backgroundColor: '#cccccc'}} onClick={() => {
                    navigate('/register')
                }}> Register
                </button>
            </div>
        </div>
    )
}

export default Login
