import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import '../../style/sidebarCard.scss';
import ReactTooltip from 'react-tooltip';

const SidebarCard = (props) => {

    const url = useLocation();

    return (
        <div className={(url.pathname === props.path) ? 'sidebarActiveColor' : 'sidebarInactiveColor'}>
            <div className={(url.pathname === props.path) ? 'inActiveIcon' : 'activeIcon'}>
                {
                    (url.pathname !== props.path) ?
                        <NavLink to={props.path} data-tip={props.name}>
                            {props.icon}
                        </NavLink>
                        :
                        <NavLink to={props.path} data-tip={props.name}>
                            {props.activeIcon}
                        </NavLink>
                }
            </div>
            <ReactTooltip offset={{top: -10, left: -10}} multiline={true} backgroundColor={'inherit'}/>
        </div>
    )
}

export default SidebarCard
