import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Box,
    IconButton,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
// import StarIcon from "@mui/icons-material/Star";
import BookIcon from "@mui/icons-material/Book";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
import YouTubeIcon from '@mui/icons-material/YouTube';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaletteIcon from '@mui/icons-material/Palette';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import logo from "../assets/gene-structure-svgrepo-com.svg"

import { NavLink } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { getUserRole } from "../utils/auth";
import { type Role, Roles } from "../redux/auth/authTypes";
import type { JSX } from "@emotion/react/jsx-runtime";


const drawerWidth = 300;



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
            allowedRoles: [Roles.STUDENT]
        },
        // {
        //     name: "Features",
        //     path: "/features",
        //     icon: <StarIcon />,
        //     allowedRoles: [Roles.USERS, Roles.STUDENT]
        // },
        {
            name: "You Tube",
            path: "/youtubepost",
            icon: <YouTubeIcon />,
            allowedRoles: [Roles.ADMIN, Roles.STUDENT]
        },
        {
            name: "Template Manager",
            path: "/admin/templates",
            icon: <PaletteIcon />,
            allowedRoles: [Roles.ADMIN]
        },
        {
            name: "Our Client",
            path: "/ourclient",
            icon: <GroupAddIcon />,
            allowedRoles: [Roles.ADMIN]
        },
        {
            name: "News",
            path: "/addNews",
            icon: <NewspaperIcon />,
            allowedRoles: [Roles.ADMIN]
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
                        background: "white",
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


            <Toolbar sx={{ background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)", borderBottom: "1px solid white", borderRight: "1px solid grey", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: 1,
                            display: "flex",
                            overflow: "hidden",
                            textDecoration: "none",

                            fontSize: { xs: 20, md: 25 },
                            color: "inherit",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {"AlgoSaathi".split("").map((char, index) => {
                            const isAlgo = index < 4;

                            return (
                                <Box
                                    component="span"
                                    key={index}
                                    sx={{
                                        display: "inline-block",
                                        color: isAlgo ? "#fefefe" : "#ea580c",
                                        opacity: 0,
                                        fontStyle: "italic",
                                        transform: "translateY(18px)",
                                        animation: "letterAppear 3s ease-in-out infinite",
                                        animationDelay: `${index * 0.15}s`,
                                        "@keyframes letterAppear": {
                                            "0%": {
                                                opacity: 0,
                                                transform: "translateY(18px)",
                                            },
                                            "15%": {
                                                opacity: 1,
                                                transform: "translateY(0)",
                                            },
                                            "70%": {
                                                opacity: 1,
                                                transform: "translateY(0)",
                                            },
                                            "100%": {
                                                opacity: 0,
                                                transform: "translateY(-18px)",
                                            },
                                        },
                                    }}
                                >
                                    {char}
                                </Box>
                            );
                        })}
                    </Typography>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: "2.5rem", height: "2.5rem", marginLeft: "3rem" }}
                    />
                </Box>

                {/* <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff', border: "1px solid white", borderRadius: "50%" ,  marginLeft: "1rem" }}>
                    <ArrowBack />
                </IconButton> */}

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

                                    background: "#e9e9f9",

                                    color: "#010020"

                                }

                            }}


                        >


                            <ListItemIcon

                                sx={{
                                    color: "#010020"
                                }}

                            >

                                {item.icon}

                            </ListItemIcon>


                            <ListItemText
                                sx={{
                                    color: "#010020"
                                }}
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