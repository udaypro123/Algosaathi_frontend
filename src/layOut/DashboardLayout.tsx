import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Tooltip,
    Typography,
    Badge,
    Divider
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { Outlet,  } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../common/SideDrawer";
import { getUser } from "../utils/auth";


const drawerWidth = 260;
const navbarHeight = 72;

const DashboardLayout = () => {
    const user = getUser();
    const [notificationCount] = useState(3);

    // const handleLogout = () => {
    //     clearAuthData();
    //     navigate("/login", { replace: true });
    // };

    const userName = user?.name || user?.fullName || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5f7fa",  }}>

            <Sidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: `${drawerWidth}px`,
                    width: `calc(100% - ${drawerWidth}px)`,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        height: navbarHeight,
                        // background: "transparent",
                        background: "#f5f7fa",
                        color: "#fff",
                        // boxShadow:" rgba(17, 3, 120, 0.04) 0px 60px 40px 7px",
                        boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
                        bborderBottom: "3px solid rgb(255, 255, 255)",
                        zIndex: 1100
                    }}
                >
                    <Toolbar
                        sx={{
                            justifyContent: "flex-end",
                            height: "100%",
                            px: { xs: 2, md: 4 },
                            gap: 2
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Tooltip title="Notifications">
                                <IconButton sx={{ color: "#0c014d" }}>
                                    <Badge badgeContent={notificationCount} color="error" overlap="circular">
                                        <NotificationsNoneIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: "rgba(255,255,255,0.25)" }} />

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer" }}>
                                <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
                                    <Typography variant="body2" sx={{ color: "rgba(0, 7, 128, 0.7)", fontSize: "0.75rem" }}>
                                        Welcome Back
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#040362", fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.2 }}>
                                        {userName}
                                    </Typography>
                                </Box>
                                <Avatar
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        background: "rgba(185, 179, 228, 0.2)",
                                        color: "#07078d",
                                        fontWeight: 600,
                                        fontSize: "1rem"
                                    }}
                                >
                                    {userInitial}
                                </Avatar>
                            </Box>

                            {/* <Tooltip title="Logout">
                                <IconButton
                                    onClick={handleLogout}
                                    sx={{ color: "#fff" }}
                                >
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip> */}
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 3 },
                        background: "#f5f7fa",
                        minHeight: `calc(100vh - ${navbarHeight}px)`
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardLayout;
