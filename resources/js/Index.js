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
                <Route path="/Settings" element={admin ? <Settings/> : <Navigate to="/POS"/>}/>
                <Route path="/dashboard" element={admin ? <Dashboard/> : <Navigate to="/POS"/>}/>
                <Route exact path="/POS" element={!admin ? <Home/> : <Navigate to="/dashboard"/>}/>
                {/*Protected Routes*/}

                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </Router>

            <ToastContainer/>
    </div>
    );
}

export default App;

