import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./views/home/Home";
import Sidebar from "./views/home/partial/sidebar";
import Category from "./views/categories/userCategory";
import Settings from "./views/settings";
import CategoryAdmin from "./views/categories/adminCategory";
import Dashboard from "./views/dashboard";


function App() {
    return (
        <div className="App">
            <Router>
                <Sidebar/>
                <Routes>
                    <Route exact path="/POS" element={<Home page={'home'} data={[]}/>}/>
                    <Route path="/categories/:key" element={<Category/>}/>
                    <Route path="/settings/categories/:key" element={<CategoryAdmin/>}/>
                    <Route path="/Settings" element={<Settings page={'home'} data={[]}/>}/>
                    <Route path="/payment/:key" element={<Home/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
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

