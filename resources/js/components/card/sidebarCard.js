import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import '../../style/sidebarCard.scss';

const SidebarCard = (props) => {

    const url = useLocation();

    return (
        <div className={(url.pathname === props.path) ? 'sidebarActiveColor' : 'sidebarInactiveColor'}>
            <div className={(url.pathname === props.path) ? 'inActiveIcon' : 'activeIcon'}>
                {
                    (url.pathname !== props.path) ?
                        <NavLink to={props.path}>
                            {props.icon}
                        </NavLink>
                        :
                        <NavLink to={props.path}>
                            {props.activeIcon}
                        </NavLink>
                }
            </div>
        </div>
    )
}

export default SidebarCard