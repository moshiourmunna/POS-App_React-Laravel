import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./views/home/Home";
import Sidebar from "./components/sidebar";
import Category from "./views/categories/userCategory";
import Settings from "./views/settings";
import CategoryAdmin from "./views/categories/adminCategory";
import Dashboard from "./views/dashboard";
import Login from "./views/forms/login";
import Register from "./views/forms/register";


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
                    {/*{*/}
                    {/*    (!admin) &&*/}
                    {/*    <Route path="/Dashboard" element={<Home page={'home'}/>}/>*/}

                    {/*}*/}
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route exact path="/POS" element={<Home page={'home'} data={[]}/>}/>
                    <Route path="/categories/:key" element={<Category/>}/>
                    <Route path="/settings/categories/:key" element={<CategoryAdmin/>}/>
                    <Route path="/payment/:key" element={<Home/>}/>
                </Routes>
            </Router>

            {/*<AddMore color={'white'} background={'#EA7C69'} name={<AiOutlinePlus size='21px'/>}/>*/}
            {/*<br/>*/}
            {/*<Button color={'white'} name={'Confirm Payment Payment'} background={'#EA7C69'}/>*/}
            {/*<SelectOption title={'Dine In'}/>*/}
            {/*<CartItem data={RecipeData}/>*/}
            {/*<Dish data={RecipeData} Admin={true} Availability={'Bowls Available'}/>*/}
            {/*<Index title={'Dine In'} active={true}/>*/}
            {/*<MostOrdered data={RecipeData}/>*/}
            {/*<BusinessSummary data={RecipeData} title={'Total Revenue'}/>*/}

        </div>
    );
}

export default App;

