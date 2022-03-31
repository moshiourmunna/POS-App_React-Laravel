import './App.css';
import React, {useCallback, useEffect} from "react";
import '../js/style/modal.scss';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./views/home/Home";
import Sidebar from "./components/sidebar";
import Settings from "./views/Admin/settings";
import Dashboard from "./views/Admin/dashboard";
import Login from "./views/forms/login";
import Register from "./views/forms/register";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import NotFound from "./views/notFound";
import Discount from "./views/Admin/discount";
import Orders from "./views/orders";
import Inventory from "./views/Admin/inventory";
import LandingData from "./components/landingData";
import Api from "./api/api";
import {useStateValue} from "./states/StateProvider";

function App() {

    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;
    const [{showNotification, state}] = useStateValue();

    const getNotification = useCallback(
        async () => {
            (admin)&&
            await Api().get('/notification')
                .then(res => {
                    res.data.map(notification => {
                        (showNotification) &&
                        console.log('noti: ', res.data)
                        toast.warning(notification.message, {
                            position: "bottom-left",
                            closeOnClick:true,
                            autoClose:100000,
                            onClick:event => console.log(event.target.innerText),
                        });
                    })
                })
                .catch(e => console.log('error', e));
        },
        [],
    );



    useEffect(async () => {
        getNotification().then(r => r)
    }, [getNotification]);



    return (
        <div className="App">

            <Router>
                <Sidebar/>
                <Routes>

                    <Route path='*' exact={true} element={<NotFound/>}/>

                    {/*Protected Routes*/}
                    <Route path="/settings"
                           element={admin ? <Settings element={<LandingData admin={true}/>}/> : <Navigate to="/"/>}
                    />
                    <Route path="/settings/inventory"
                           element={admin ? <Settings element={<Inventory/>}/> : <Navigate to="/"/>}
                    />
                    <Route path="/dashboard" element={admin ? <Dashboard/> : <Navigate to="/"/>}/>
                    <Route exact path="/" element={!admin ? <Home/> : <Navigate to="/dashboard"/>}/>
                    <Route exact path="/orders" element={!admin ? <Orders/> : <Navigate to="/dashboard"/>}/>
                    <Route exact path="/discount" element={admin ? <Discount/> : <Navigate to="/"/>}/>
                    <Route exact path="/inventory" element={admin ? <Inventory/> : <Navigate to="/"/>}/>
                    {/*Protected Routes*/}

                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Router>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;

