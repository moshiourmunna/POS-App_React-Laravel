import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import '../../style/sidebarCard.scss';
import ReactTooltip from 'react-tooltip';

const SidebarCard = (props) => {

    const url = useLocation();
    const basePath=url.pathname.split('/')[1]

    return (
        <div className={(props.path.split('/')[1] === basePath) ? 'sidebarActiveColor' : 'sidebarInactiveColor'}>
            <div className={(props.path.split('/')[1] === basePath) ? 'inActiveIcon' : 'activeIcon'}>
                {
                    ( props.path.split('/')[1] === basePath) ?
                        <NavLink to={props.path} data-tip={props.name}>
                            {props.activeIcon}
                        </NavLink>
                        :
                        <NavLink to={props.path} data-tip={props.name}>
                            {props.icon}
                        </NavLink>
                }
            </div>
            <ReactTooltip offset={{top: -10, left: -10}} multiline={true} backgroundColor={'inherit'}/>
        </div>
    )
}

export default SidebarCard
