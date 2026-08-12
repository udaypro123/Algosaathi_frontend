import {
    Box,
    Typography,
    Stack,
    Button,
} from "@mui/material";

import {
    CheckCircleOutlined,
    CodeRounded,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";


const AuthLayout = () => {

    const bubbles = [
        {
            size: 42,
            left: "4%",
            top: "15%",
            duration: "11s",
            delay: "-3s"
        },
        {
            size: 18,
            left: "11%",
            top: "72%",
            duration: "8s",
            delay: "-5s"
        },
        {
            size: 65,
            left: "17%",
            top: "45%",
            duration: "14s",
            delay: "-8s"
        },
        {
            size: 26,
            left: "28%",
            top: "8%",
            duration: "9s",
            delay: "-2s"
        },
        {
            size: 80,
            left: "38%",
            top: "82%",
            duration: "16s",
            delay: "-11s"
        },
        {
            size: 32,
            left: "48%",
            top: "20%",
            duration: "10s",
            delay: "-6s"
        },
        {
            size: 22,
            left: "57%",
            top: "75%",
            duration: "7s",
            delay: "-1s"
        },
        {
            size: 72,
            left: "65%",
            top: "12%",
            duration: "15s",
            delay: "-9s"
        },
        {
            size: 38,
            left: "73%",
            top: "62%",
            duration: "12s",
            delay: "-4s"
        },
        {
            size: 20,
            left: "82%",
            top: "28%",
            duration: "8s",
            delay: "-3s"
        },
        {
            size: 58,
            left: "88%",
            top: "78%",
            duration: "13s",
            delay: "-7s"
        },
        {
            size: 30,
            left: "94%",
            top: "48%",
            duration: "10s",
            delay: "-5s"
        },
        {
            size: 14,
            left: "52%",
            top: "92%",
            duration: "6s",
            delay: "-2s"
        },
        {
            size: 48,
            left: "7%",
            top: "91%",
            duration: "12s",
            delay: "-10s"
        },
        {
            size: 24,
            left: "91%",
            top: "8%",
            duration: "9s",
            delay: "-4s"
        }
    ];
    const navigate = useNavigate()

    const location = useLocation();
    const showloginForm = location.pathname === "/login";
    console.log("showloginForm", showloginForm)

    const handlBackHome = () => {
        navigate("/algosaathi")
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                minHeight: "100vh",

                position: "relative",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                overflow: "hidden",

                boxSizing: "border-box",

                background:
                    "linear-gradient(135deg, #020617 0%, #0f172a 42%, #075985 75%, #0c4a6e 100%)",

                px: {
                    xs: 1.5,
                    sm: 3,
                    md: 4
                },

                py: {
                    xs: 1,
                    md: 2
                },

                /*
                |--------------------------------------------------------------------------
                | GLOBAL BUBBLE ANIMATIONS
                |--------------------------------------------------------------------------
                */

                "@keyframes bubbleFloat": {
                    "0%": {
                        transform:
                            "translate3d(0, 20px, 0) scale(0.85)",
                        opacity: 0.15
                    },

                    "25%": {
                        transform:
                            "translate3d(25px, -30px, 0) scale(1)",
                        opacity: 0.35
                    },

                    "50%": {
                        transform:
                            "translate3d(-15px, -70px, 0) scale(0.92)",
                        opacity: 0.22
                    },

                    "75%": {
                        transform:
                            "translate3d(20px, -110px, 0) scale(1.08)",
                        opacity: 0.4
                    },

                    "100%": {
                        transform:
                            "translate3d(-10px, -150px, 0) scale(0.8)",
                        opacity: 0
                    }
                },

                "@keyframes bubbleGlow": {
                    "0%, 100%": {
                        boxShadow:
                            "0 0 10px rgba(125,211,252,0.10)"
                    },

                    "50%": {
                        boxShadow:
                            "0 0 28px rgba(125,211,252,0.32)"
                    }
                }
            }}
        >
            {/* =====================================================
                WATER BUBBLES
            ====================================================== */}

            {bubbles.map(
                (bubble, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "absolute",

                            width: bubble.size,
                            height: bubble.size,

                            left: bubble.left,
                            top: bubble.top,

                            borderRadius:
                                "50%",

                            /*
                            Glass bubble
                            */

                            background:
                                "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), rgba(125,211,252,0.12) 35%, rgba(14,165,233,0.04) 70%)",

                            border:
                                "1px solid rgba(186,230,253,0.32)",

                            backdropFilter:
                                "blur(2px)",

                            opacity: 0.25,

                            pointerEvents:
                                "none",

                            zIndex: 0,

                            animation: `
                                bubbleFloat ${bubble.duration}
                                ease-in-out infinite,
                                bubbleGlow 4s ease-in-out infinite
                            `,

                            animationDelay:
                                `${bubble.delay}, ${bubble.delay}`,

                            "@media (max-width: 600px)": {
                                opacity: 0.16,
                                transform:
                                    "scale(0.7)"
                            }
                        }}
                    />
                )
            )}

            {/* =====================================================
                LARGE WATER GLOW
            ====================================================== */}

            <Box
                sx={{
                    position: "absolute",

                    width: {
                        xs: 280,
                        md: 500
                    },

                    height: {
                        xs: 280,
                        md: 500
                    },

                    borderRadius: "50%",

                    top: "-20%",
                    left: "-12%",

                    background:
                        "rgba(14,165,233,0.20)",

                    filter:
                        "blur(100px)",

                    pointerEvents:
                        "none",

                    zIndex: 0,

                    "@keyframes glowMove": {
                        "0%": {
                            transform:
                                "translate(0,0)"
                        },

                        "50%": {
                            transform:
                                "translate(80px,60px)"
                        },

                        "100%": {
                            transform:
                                "translate(0,0)"
                        }
                    },

                    animation:
                        "glowMove 12s ease-in-out infinite"
                }}
            />

            <Box
                sx={{
                    position: "absolute",

                    width: {
                        xs: 300,
                        md: 520
                    },

                    height: {
                        xs: 300,
                        md: 520
                    },

                    borderRadius: "50%",

                    right: "-15%",
                    bottom: "-25%",

                    background:
                        "rgba(37,99,235,0.20)",

                    filter:
                        "blur(110px)",

                    pointerEvents:
                        "none",

                    zIndex: 0,

                    "@keyframes glowMoveTwo": {
                        "0%": {
                            transform:
                                "translate(0,0)"
                        },

                        "50%": {
                            transform:
                                "translate(-70px,-50px)"
                        },

                        "100%": {
                            transform:
                                "translate(0,0)"
                        }
                    },

                    animation:
                        "glowMoveTwo 15s ease-in-out infinite"
                }}
            />

            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1200,

                    height: {
                        xs: "auto",
                        md: "calc(100vh - 40px)"
                    },

                    maxHeight: {
                        md: "calc(100vh - 40px)"
                    },

                    display: {
                        xs: "block",
                        md: "grid"
                    },

                    gridTemplateColumns: {
                        md: "0.9fr 1.1fr"
                    },

                    position: "relative",

                    zIndex: 2,

                    overflow: "hidden",

                    borderRadius: {
                        xs: 3,
                        md: 5
                    },

                    /*
                    No border
                    No hard card
                    */

                    background: "transparent",

                    backdropFilter:
                        "blur(20px)",

                    WebkitBackdropFilter:
                        "blur(20px)"
                }}
            >
                {/* =================================================
                    LEFT SIDE
                ================================================== */}

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex"
                        },

                        flexDirection:
                            "column",

                        justifyContent:
                            "space-between",

                        p: {
                            md: 5,
                            lg: 6
                        },

                        position:
                            "relative",

                        color: "#ffffff",

                        background:
                            "linear-gradient(145deg, rgba(15,23,42,0.72), rgba(12,74,110,0.50), rgba(3,105,161,0.38))",

                        overflow: "hidden"
                    }}
                >
                    {/* Decorative ring */}

                    <Box
                        sx={{
                            position:
                                "absolute",

                            width: 220,
                            height: 220,

                            borderRadius:
                                "50%",

                            border:
                                "1px solid rgba(186,230,253,0.20)",

                            right: -100,
                            top: 80,

                            opacity: 0.8
                        }}
                    />

                    <Box
                        sx={{
                            position:
                                "absolute",

                            width: 150,
                            height: 150,

                            borderRadius:
                                "50%",

                            border:
                                "1px solid rgba(255,255,255,0.10)",

                            right: -55,
                            top: 115
                        }}
                    />

                    <Button variant="outlined" sx={{ width: "10%" ,color:"white", outline:"none", border:"1px solid white"}} onClick={handlBackHome}  >Back</Button>

                    {/* Logo */}

                    <Box
                        sx={{
                            position:
                                "relative",

                            zIndex: 2
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                alignItems:
                                    "center"
                            }}
                            spacing={1.5}
                        >
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,

                                    borderRadius:
                                        "13px",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    background:
                                        "linear-gradient(135deg,#38bdf8,#2563eb)",

                                    boxShadow:
                                        "0 10px 30px rgba(14,165,233,0.30)"
                                }}
                            >
                                <CodeRounded
                                    sx={{
                                        fontSize: 27,
                                        color:
                                            "#001a12"
                                    }}
                                />
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 800,
                                    letterSpacing:
                                        "-0.5px"
                                }}
                            >
                                AlgoSaathi
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Main text */}

                    <Box
                        sx={{
                            position:
                                "relative",

                            zIndex: 2,

                            maxWidth: 420
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: {
                                    md: 40,
                                    lg: 46
                                },

                                lineHeight:
                                    1.08,

                                fontWeight: 800,

                                letterSpacing:
                                    "-1.5px",

                                mb: 2
                            }}
                        >
                            Learn.
                            <br />
                            Practice.
                            <br />

                            <Box
                                component="span"
                                sx={{
                                    background:
                                        "linear-gradient(90deg,#38bdf8,#60a5fa)",

                                    backgroundClip:
                                        "text",

                                    WebkitBackgroundClip:
                                        "text",

                                    WebkitTextFillColor:
                                        "transparent"
                                }}
                            >
                                Become Better.
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "rgba(255,255,255,0.65)",

                                fontSize: 15,

                                lineHeight:
                                    1.65,

                                mb: 3
                            }}
                        >
                            Your personal coding
                            companion for mastering
                            DSA, improving problem
                            solving and becoming a
                            better developer.
                        </Typography>

                        <Stack spacing={1.5}>
                            {[
                                "Practice DSA problems",
                                "Track your coding progress",
                                "Build stronger problem-solving skills"
                            ].map(
                                (item) => (
                                    <Stack
                                        key={item}
                                        direction="row"
                                        spacing={1.2}
                                        sx={{ alignItems: "center" }}
                                    >
                                        <CheckCircleOutlined
                                            sx={{
                                                color:
                                                    "#38bdf8",
                                                fontSize: 19
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize: 13.5,
                                                color:
                                                    "rgba(255,255,255,0.78)"
                                            }}
                                        >
                                            {item}
                                        </Typography>
                                    </Stack>
                                )
                            )}
                        </Stack>
                    </Box>

                    {/* Footer */}

                    <Typography
                        sx={{
                            position:
                                "relative",

                            zIndex: 2,

                            fontSize: 12,

                            color:
                                "rgba(255,255,255,0.38)"
                        }}
                    >
                        ©{" "}
                        {new Date().getFullYear()}{" "}
                        AlgoSaathi
                    </Typography>
                </Box>

                {/* =================================================
                    RIGHT SIDE
                ================================================== */}
                {
                    showloginForm ? <Login /> : <Signup />
                }

            </Box>
        </Box>
    );
};

export default AuthLayout;