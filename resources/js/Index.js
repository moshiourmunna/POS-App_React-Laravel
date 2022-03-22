import './App.css';
import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./views/home/Home";
import Sidebar from "./components/sidebar";
import Settings from "./views/Admin/settings";
import Dashboard from "./views/Admin/dashboard";
import Login from "./views/forms/login";
import Register from "./views/forms/register";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import NotFound from "./views/notFound";
import Discount from "./views/Admin/discount";
import Orders from "./views/orders";

function App() {

    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;

    return (
        <div className="App">

        <Router>
            <Sidebar/>
            <Routes>

                <Route path='*' exact={true} element={<NotFound/>} />

                {/*Protected Routes*/}
                <Route path="/Settings" element={admin ? <Settings/> : <Navigate to="/"/>}/>
                <Route path="/dashboard" element={admin ? <Dashboard/> : <Navigate to="/"/>}/>
                <Route exact path="/" element={!admin ? <Home/> : <Navigate to="/dashboard"/>}/>
                <Route exact path="/discount" element={admin ? <Discount/> : <Navigate to="/"/>}/>
                {/*Protected Routes*/}

                <Route path='/orders' element={<Orders/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </Router>

            <ToastContainer/>
    </div>
    );
}

export default App;

