import React from "react";
import '../../../../style/sidebar.scss'
import SidebarCard from "../../../../components/card/sidebarCard";
import {Routes} from "../../../../data/RouteWithIcons";

const sidebar = () => {
    return (
        <div className='sidebar'>
            {
                Routes.map((route) =>
                    <SidebarCard key={route.id} activeIcon={route.activeIcon} icon={route.icon} path={route.path}/>
                )
            }
        </div>
    )
}

export default sidebar