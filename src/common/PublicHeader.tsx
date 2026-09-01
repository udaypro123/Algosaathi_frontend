import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { label: "Templates", to: "/templates" },
    { label: "Create Complaint", to: "/signup" },
    { label: "News", to: "/news" },
    { label: "Contact", to: "/contact" },
];

const PublicHeader = () => {
    const location = useLocation();

    return (
        <Box
            component="header"
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
                py: 2,
                px: { xs: 3, md: 6 },
                backdropFilter: "blur(18px)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
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
                        color: "inherit",
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
                                    color: isAlgo ? "#2563eb" : "#ea580c",
                                    opacity: 0,
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
                                sx={{
                                    fontSize: 16,
                                    color: "#000102",
                                    cursor: "pointer",
                                    fontWeight: isActive ? 700 : 500,
                                    textDecoration: "none",
                                    paddingBottom: isActive ? "2px" : 0,
                                    borderBottom: isActive ? "3px solid #fd5000" : "3px solid transparent",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        color: "#0f172a",
                                        borderBottom: "3px solid #fd5000",
                                    },
                                }}
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
                            color: "#0f172a",
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
            </Box>
        </Box>
    );
};

export default PublicHeader;
