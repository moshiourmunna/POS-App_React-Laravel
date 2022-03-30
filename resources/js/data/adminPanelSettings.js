import SettingsIcon from "../assets/icons/sidebar/SettingsIcon";
import RestaurantIcon from "../assets/icons/sidebar/RestaurantIcon";

const AdminPanelSettings=[
       {
        id:1,
        header:'Your Restaurant',
        title:'Manage Your Inventory, and Stocks',
        route:'/settings/inventory',
        icon:<RestaurantIcon width={'60'} height={'45'}/>
    },    {
        id:2,
        header:'Products Management',
        title:'Manage your product, pricing, etc',
        route:'/settings',
        icon:<SettingsIcon color={'#EA7C69'} width={'40'} height={'35'}/>
    },    {
        id:3,
        header:'   Notifications',
        title:'    Customize your Notification',
        route:'/settings/notifications',
        icon:<SettingsIcon color={'#EA7C69'} width={'40'} height={'35'}/>

    },    {
        id:4,
        header:'Security',
        title:'Configure Password, PIN, etc',
        route:'/settings/appearance',
        icon:<SettingsIcon color={'#EA7C69'} width={'40'} height={'35'}/>
    },    {
        id:5,
        header:'About Us',
        title:'Find out about Posly',
        route:'/settings/about',
        icon:<SettingsIcon color={'#EA7C69'} width={'40'} height={'35'}/>
    },
]
export {AdminPanelSettings}
