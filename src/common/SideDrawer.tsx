import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    IconButton,
    Tooltip
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";
import YouTubeIcon from '@mui/icons-material/YouTube';
import PaletteIcon from '@mui/icons-material/Palette';
import NewspaperIcon from "@mui/icons-material/Newspaper";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/gene-structure-svgrepo-com.svg"

import { NavLink, useNavigate } from "react-router-dom";
import { getUserRole, clearAuthData } from "../utils/auth";
import type { JSX } from "@emotion/react/jsx-runtime";
import { type Role, Roles } from "../redux/auth/authTypes";

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
            allowedRoles: [Roles.USERS, Roles.ADMIN, Roles.STUDENT]
        },
        {
            name: "Courses",
            path: "/courses",
            icon: <BookIcon />,
            allowedRoles: [Roles.STUDENT]
        },
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
            name: "Courses",
            path: "/admin/courses",
            icon: <SchoolIcon />,
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

const Sidebar = () => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const visibleItems = menuItems.filter((item) => {
        if (!item.allowedRoles) return true;
        return userRole ? item.allowedRoles.includes(userRole) : false;
    });

    const handleLogout = () => {
        clearAuthData();
        navigate("/login", { replace: true });
    };



    return (
        <Box
            sx={{
                width: drawerWidth,
                minWidth: drawerWidth,
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 1200,
                display: "flex",
                flexDirection: "column",
                background: "white",
                color: "#fff",
                // boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
                // borderRight: "1px solid rgba(0,0,0,0.06)"
            }}
        >
            <Box
                sx={{
                    background: "#f5f7fa",
                    borderBottom: "3px solid rgb(255, 255, 255)",
                    boxShadow:" rgba(17, 3, 120, 0.04) 0px 60px 40px 7px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 20px",
                    minHeight: 72
                }}
            >
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
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
                                        animationDelay: `${index * .5}s`,
                                        "@keyframes letterAppear": {
                                            "0%": { opacity: 0, transform: "translateY(18px)" },
                                            "15%": { opacity: 1, transform: "translateY(0)" },
                                            "70%": { opacity: 1, transform: "translateY(0)" },
                                            "100%": { opacity: 0, transform: "translateY(-18px)" },
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
                        style={{ width: "2.5rem", height: "2.5rem", marginLeft: "0.5rem" }}
                    />
                </Box> */}


                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 900,
                            letterSpacing: 1,
                            fontSize: { xs: 18, md: 22 },
                            fontStyle: "italic",

                            // backgroundImage: `url(${geneStructure})`,
                            // backgroundSize: "contain",
                            // backgroundPosition: "center",
                            // backgroundRepeat: "no-repeat",

                            // WebkitBackgroundClip: "text",
                            // WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color:"#0d0262",
                            display: "flex",
                        }}
                    >
                        AlgoSaathi
                    </Typography>

                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: "2.4rem",
                            height: "2.4rem",
                            marginLeft:"1rem"
                        }}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    py: 1,
                    "&::-webkit-scrollbar": { width: "4px" },
                    "&::-webkit-scrollbar-thumb": { background: "#ccc", borderRadius: "4px" }
                }}
            >
                <List sx={{ px: 1.5 }}>
                    {visibleItems.map((item) => (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            sx={{
                                margin: "4px 0",
                                borderRadius: "10px",
                                py: 1,
                                px: 1.5,
                                "&.active": {
                                    background: "#e3f2fd",
                                    color: "#0d47a1",
                                    "& .MuiListItemIcon-root": {
                                        color: "#1565c0"
                                    },
                                    "& .MuiListItemText-primary": {
                                        color: "#0d47a1",
                                        fontWeight: 700
                                    }
                                },
                                "&:hover": {
                                    background: "#f0f7ff",
                                    "& .MuiListItemIcon-root": {
                                        color: "#1976d2"
                                    },
                                    "& .MuiListItemText-primary": {
                                        color: "#1565c0"
                                    }
                                }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "#1976d2",
                                    minWidth: 40
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                sx={{ color: "#0d47a1" }}
                                primary={item.name}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            <Divider sx={{ borderColor: "rgba(0,0,0,0.08)" }} />

            <Box sx={{ p: 1.5 }}>
                <Tooltip title="Sign Out">
                    <IconButton
                        onClick={handleLogout}
                        sx={{
                            width: "100%",
                            justifyContent: "flex-start",
                            gap: 1,
                            px: 1.5,
                            py: 1,
                            borderRadius: "10px",
                            color: "#d32f2f",
                            "&:hover": { background: "#ffebee" }
                        }}
                    >
                        <LogoutIcon fontSize="small" />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Sign Out</Typography>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Sidebar;
