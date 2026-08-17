import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    IconButton
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from "@mui/icons-material/Star";
import BookIcon from "@mui/icons-material/Book";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { NavLink } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { getUserRole } from "../utils/auth";
import { type Role, Roles } from "../redux/auth/authTypes";
import type { JSX } from "@emotion/react/jsx-runtime";


const drawerWidth = 260;



const menuItems: Array<{
    name: string;
    path: string;
    icon: JSX.Element;
    allowedRoles?: Role[];
}> = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <DashboardIcon />,
        allowedRoles: [Roles.USERS, Roles.ADMIN]
    },
    {
        name: "Courses",
        path: "/courses",
        icon: <BookIcon />,
        allowedRoles: [Roles.USERS]
    },
    {
        name: "Features",
        path: "/features",
        icon: <StarIcon />,
        allowedRoles: [Roles.USERS]
    },
    {
        name: "Contact",
        path: "/contact",
        icon: <ContactMailIcon />,
        allowedRoles: [Roles.USERS, Roles.ADMIN]
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <AccountCircleIcon />,
        allowedRoles: [Roles.USERS, Roles.ADMIN]
    },
    {
        name: "You Tube",
        path: "/youtubepost",
        icon: <YouTubeIcon />,
        allowedRoles: [ Roles.ADMIN, Roles.USERS]
    }
];




const Sidebar = ({
    open,
    handleDrawerToggle

}: any) => {


    return (

        <>


            <Drawer
                variant="temporary"
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: "block",
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        overflowX: "hidden",
                        transition: "0.3s",
                        background: "linear-gradient(135deg, #075d7e 30%, #106477 60%, #096381 100%)",
                        color: "#fff",
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        height: '100vh',
                        boxSizing: 'border-box',
                        zIndex: 1200
                    }
                }}
            >
                <DrawerContent handleDrawerToggle={handleDrawerToggle} />
            </Drawer>



        </>

    )

}




const DrawerContent = ({ handleDrawerToggle }: any) => {
    const userRole = getUserRole();
    const visibleItems = menuItems.filter((item) => {
        if (!item.allowedRoles) return true;
        return userRole ? item.allowedRoles.includes(userRole) : false;
    });

    return (

        <Box >


            <Toolbar sx={{borderBottom:"1px solid white", borderRight:"1px solid grey", display:"flex", justifyContent:"space-between", alignItems:"center"}}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <p style={{ fontSize: "20px", fontWeight: "bold", color: "#fff", margin: 0 }}>
                        Algosaathi
                    </p>
                    <img src="./src/assets/gene-structure-svgrepo-com.svg" alt="Logo" style={{ width: "30px", height: "25px" }} />
                </Box>

                <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff', border: "1px solid white", borderRadius: "50%" }}>
                    <ArrowBack />
                </IconButton>

            </Toolbar>



            <List>


                {
                    visibleItems.map((item) => (


                        <ListItemButton


                            key={item.path}


                            component={NavLink}

                            to={item.path}


                            sx={{

                                margin: "5px 10px",

                                borderRadius: "10px",

                                "&.active": {

                                    background: "#f8f8f9",

                                    color: "#1c0404"

                                }

                            }}


                        >


                            <ListItemIcon

                                sx={{
                                    color: "inherit"
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