import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./views/home/Home";
import Sidebar from "./components/sidebar";
import Settings from "./views/Admin/settings";
import Dashboard from "./views/Admin/dashboard";
import Login from "./views/forms/login";
import Register from "./views/forms/register";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";


function App() {

    const user=JSON.parse(localStorage.getItem('user'));
    let admin=user?.admin;

    return (
        <div className="App">
            <Router>
                <Sidebar/>
                <Routes>
                    {
                        (admin) &&
                        <Route path="/Settings" element={<Settings page={'home'} data={[]}/>}/>

                    }
                    {
                        (admin) &&
                        <Route path="/Dashboard" element={<Dashboard/>}/>

                    }
                    {
                        (!admin) &&
                        <Route path="/Dashboard" element={<Home page={'home'}/>}/>

                    }
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route exact path="/POS" element={<Home page={'home'} data={[]}/>}/>
                    <Route path="/payment/:key" element={<Home/>}/>
                </Routes>
            </Router>
            <ToastContainer/>
        </div>
    );
}

export default App;

