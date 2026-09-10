import { useState } from "react";
import {
    Box,
    Button,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: "Templates", to: "/templates" },
    { label: "Create Complaint", to: "/signup" },
    { label: "News", to: "/news" },
    { label: "Contact", to: "/contact" },
];

const PublicHeader = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinkStyles = (isActive: boolean) => ({
        fontSize: 18,
        color: "#fefefe",
        cursor: "pointer",
        fontStyle: "italic",
        fontWeight: isActive ? 700 : 500,
        textDecoration: "none",
        paddingBottom: isActive ? "2px" : 0,
        borderBottom: isActive ? "3px solid #fd5000" : "3px solid transparent",
        transition: "all 0.2s ease",
        "&:hover": {
            color: "#edf0f7",
            borderBottom: "3px solid #fd5000",
        },
    });

    const drawer = (
        <Box sx={{ p: 2, background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)", minHeight: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#fff", letterSpacing: 1 }}>
                    AlgoSaathi
                </Typography>
                <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
            <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <ListItem key={item.to} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.to}
                                onClick={handleDrawerToggle}
                                sx={{
                                    borderRadius: 2,
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        color: "#fff",
                                        "& .MuiTypography-root": {
                                            fontWeight: isActive ? 700 : 500,
                                            fontStyle: "italic",
                                            fontSize: 16,
                                        },
                                    }}
                                />
                                {isActive && (
                                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#ea580c", mr: 1 }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 2 }} />
            <Button
                component={Link}
                to="/signup"
                variant="contained"
                fullWidth
                onClick={handleDrawerToggle}
                sx={{
                    bgcolor: "#ea580c",
                    fontWeight: 700,
                    fontStyle: "italic",
                    borderRadius: 2,
                    textTransform: "none",
                    py: 1.2,
                    "&:hover": {
                        bgcolor: "#c2410c",
                    },
                }}
            >
                Sign Up
            </Button>
        </Box>
    );

    return (
        <Box
            component="header"
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1200,
                py: 2,
                px: { xs: 3, md: 6 },
                backdropFilter: "blur(18px)",
                background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                borderBottom: "1px solid rgba(148, 163, 184, 0.18)",
            }}
        >
            <Box
                sx={{
                    maxWidth: 1400,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Typography
                    component={Link}
                    to="/algosaathi"
                    variant="h5"
                    sx={{
                        fontWeight: 900,
                        letterSpacing: 1,
                        display: "flex",
                        overflow: "hidden",
                        textDecoration: "none",
                        fontSize: { xs: 24, md: 32 },
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
                                    color: isAlgo ? "#ffffff" : "#ea580c",
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

                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    {navItems?.map((item) => {
                        const isActive = location.pathname === item.to;

                        return (
                            <Typography
                                key={item.to}
                                component={Link}
                                to={item.to}
                                sx={navLinkStyles(isActive)}
                            >
                                {item.label}
                            </Typography>
                        );
                    })}

                    <Button
                        component={Link}
                        to="/signup"
                        variant="outlined"
                        sx={{
                            border: "1px solid #ea580c",
                            outline: "none",
                            px: 3,
                            py: 1,
                            fontWeight: 700,
                            fontStyle: "italic",
                            color: "#ffffff",
                            borderRadius: 2,
                            textTransform: "none",
                            "&:hover": {
                                border: "1px solid #ea580c",
                                backgroundColor: "#e65100d6",
                                color: "white",
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>

                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: 2,
                    }}
                    aria-label="Open navigation menu"
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 280,
                        background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default PublicHeader;