import React from "react";
import '../../style/sidebar.scss'
import SidebarCard from "../card/sidebarCard";
import {AdminRoutes, Routes} from "../../data/RouteWithIcons";
import {NavLink} from "react-router-dom";
import LogOutIcon from "../../assets/icons/sidebar/LogOutIcon";
import {useNavigate} from "react-router";
import LogInIcon from "../../assets/icons/sidebar/LogInIcon";
import RestaurantIcon from "../../assets/icons/sidebar/RestaurantIcon";
import ReactTooltip from "react-tooltip";

const sidebar = () => {

    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;


    function logout() {
        window.localStorage.removeItem('user')
        // navigate('/POS')
        window.location.replace('/POS')
    }


    return (
        <div className='sidebar'>
            <div style={{
                marginTop: '20px',
                marginBottom: '20px',
                marginLeft: '15px',
                maxHeight: '60px',
                background: 'rgb(234,124,105,.1)',
                maxWidth: '60px',
                borderRadius: '8px'
            }}>
                <div style={{margin: '12px 0 0 12px'}} data-tip='Your Restaurant'>
                    <RestaurantIcon/>
                </div>
            </div>
            {
                (admin) ?
                    AdminRoutes.map((route) =>
                        <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}
                                     name={route.pathName}/>
                    )
                    :
                    Routes.map((route) =>
                        <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}
                                     name={route.pathName}/>
                    )
            }
            {
                (user) ?
                    <div onClick={logout} style={{cursor: 'pointer'}} data-tip='log out'>
                        <br/>
                        <LogOutIcon color={'#EA7C69'} width={'30'} height={'25'}/>
                    </div> :
                    <NavLink to='/login' data-tip='log in'>
                        <br/>
                        <LogInIcon color={'#EA7C69'} width={'30'} height={'25'}/>
                    </NavLink>
            }
            <ReactTooltip offset={{top: -10, left: -10}} multiline={true} backgroundColor={'inherit'}/>
        </div>
    )
}

export default sidebar
