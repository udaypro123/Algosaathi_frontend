import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box
} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";


import { NavLink } from "react-router-dom";


const drawerWidth = 260;



const menuItems = [

    {
        name:"Home",
        path:"/home",
        icon:<DashboardIcon/>
    },

    {
        name:"Login",
        path:"/login",
        icon:<PeopleIcon/>
    }

];




const Sidebar = ({
    mobileOpen,
    desktopOpen,
    handleDrawerToggle

}:any)=>{


return (

<>


{/* Mobile Drawer */}

<Drawer

variant="temporary"

open={mobileOpen}

onClose={handleDrawerToggle}


sx={{

display:{
    xs:"block",
    md:"none"
},


"& .MuiDrawer-paper":{

width:drawerWidth,

background:"#111827",

color:"#fff"

}

}}

>


<DrawerContent/>

</Drawer>





{/* Desktop Drawer */}


<Drawer

variant="permanent"

open={desktopOpen}


sx={{

display:{
    xs:"none",
    md:"block"
},


width: desktopOpen ? drawerWidth : 0,


"& .MuiDrawer-paper":{

width: desktopOpen ? drawerWidth : 0,

overflowX:"hidden",

transition:"0.3s",

background:"#111827",

color:"#fff"

}

}}

>


<DrawerContent/>


</Drawer>



</>

)

}




const DrawerContent=()=>{


return (

<Box>


<Toolbar>

<h2>
Admin Panel
</h2>

</Toolbar>



<List>


{
menuItems.map((item)=>(


<ListItemButton


key={item.path}


component={NavLink}

to={item.path}


sx={{

margin:"5px 10px",

borderRadius:"10px",

"&.active":{

background:"#2563eb",

color:"#fff"

}

}}


>


<ListItemIcon

sx={{
color:"inherit"
}}

>

{item.icon}

</ListItemIcon>


<ListItemText

primary={item.name}

/>


</ListItemButton>


))

}



</List>


</Box>

)

}



export default Sidebar;