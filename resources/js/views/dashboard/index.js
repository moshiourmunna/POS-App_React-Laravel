import React from "react";
import '../../style/dashboard.scss';
import BusinessSummary from "../../components/card/businessSummary";
import RecipeData from "../../data/Recipe";
import OrderReport from "../../components/card/orderReport/orderReport";
import MostOrdered from "../../components/card/mostOrdered";
import SelectOption from "../../components/forms/selectOption";
import Button from "../../components/button/Button";

const Dashboard = () => {

    const rawDate = new Date();
    const date = rawDate.toDateString()

    return (
        <div className='dashboardContainer'>
            <div style={{marginLeft: '3.5%'}}>
                <h2>Dashboard</h2>
                <h3>{date}</h3>
                <br/>
                <hr width='63.5%' color='#595959' style={{height: '.1px'}}/>
            </div>
            <div className='dashboardFlex'>
                <div className='dashboardLeft'>
                    <div className='businessCardsFlex'>
                        <BusinessSummary data={RecipeData} title={'Total Revenue'}/>
                        <BusinessSummary data={RecipeData} title={'Total Dish Ordered'}/>
                        <BusinessSummary data={RecipeData} title={'Total Customer'}/>
                    </div>
                    <div className='orderSummery'>
                        <OrderReport/>
                    </div>
                </div>
                <div className='dashboardRight'>
                    <div className='mostOrderedCard'>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <h1>Most Ordered</h1>
                            <SelectOption admin={true}/>
                        </div>
                        <br/>
                        <hr/>
                        <MostOrdered data={RecipeData}/>
                        <MostOrdered data={RecipeData}/>
                        <MostOrdered data={RecipeData}/>
                        <br/>
                        <Button name='View All' cancel={true} admin={true}/>
                    </div>
                    <div className='orderTypesCard'>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <h1>Most Type Of Order</h1>
                            <SelectOption admin={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
