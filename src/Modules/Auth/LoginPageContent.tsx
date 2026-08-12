import {
    Box,
    Button,
    Typography,
    Paper,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";


const LoginPageContent = () => {

    /*
    |--------------------------------------------------------------------------
    | LOGIN INPUT STYLE
    |--------------------------------------------------------------------------
    */
    const navigate = useNavigate()
    const bubbles = [
        {
            size: 42,
            left: "4%",
            top: "15%",
            duration: "6s",
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
            duration: "10s",
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
            duration: "14s",
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
            duration: "5s",
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
            duration: "5s",
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

    const handleChangeLogin = () => {
        navigate("/signup")
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",

                background: "#f8fafc",

                color: "#0f172a",

                position: "relative",

                overflowX: "hidden",

                pb: {
                    xs: 20,
                    md: 24
                },

                /*
                ==========================================================
                ANIMATIONS
                ==========================================================
                */

                "@keyframes modalEnter": {
                    "0%": {
                        opacity: 0,
                        transform:
                            "translateY(25px) scale(0.96)",
                    },

                    "100%": {
                        opacity: 1,
                        transform:
                            "translateY(0) scale(1)",
                    }
                },

                "@keyframes bubbleFloat": {
                    "0%": {
                        transform:
                            "translateY(0px) translateX(0px)",
                    },

                    "50%": {
                        transform:
                            "translateY(-18px) translateX(8px)",
                    },

                    "100%": {
                        transform:
                            "translateY(0px) translateX(-5px)",
                    }
                },

                "@keyframes bubbleFloat2": {
                    "0%": {
                        transform:
                            "translateY(0px) translateX(0px)",
                    },

                    "50%": {
                        transform:
                            "translateY(20px) translateX(-10px)",
                    },

                    "100%": {
                        transform:
                            "translateY(-5px) translateX(5px)",
                    }
                }
            }}
        >

            {/* ===================== HEADER   ======================= */}

            <Box
                component="header"
                sx={{
                    position: "fixed",

                    top: 0,
                    left: 0,
                    right: 0,

                    zIndex: 99,

                    py: 2,

                    px: {
                        xs: 3,
                        md: 6
                    },

                    backdropFilter:
                        "blur(18px)",

                    backgroundColor:
                        "rgba(255, 255, 255, 0.95)",

                    borderBottom:
                        "1px solid rgba(148, 163, 184, 0.18)",
                }}
            >

                <Box
                    sx={{
                        maxWidth: 1400,

                        mx: "auto",

                        display: "flex",

                        alignItems: "center",

                        justifyContent:
                            "space-between",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: 1,
                            display: "flex",
                            overflow: "hidden",
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

                                        animation:
                                            "letterAppear 3s ease-in-out infinite",

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
                            display: {
                                xs: "none",
                                md: "flex"
                            },

                            alignItems: "center",

                            gap: 4
                        }}
                    >

                        <Typography
                            component={Link}
                            to="/news"
                            sx={{
                                fontSize: 16,

                                color: "#475569",

                                cursor: "pointer",
                                fontWeight: 700,
                                textDecoration:
                                    "none",

                                "&:hover": {
                                    color: "#0f172a",
                                    borderBottom: "3px solid #fd5000"
                                }
                            }}
                        >
                            News
                        </Typography>


                        {/* <Typography
                            sx={{
                                fontSize: 16,
                                color: "#475569",
                                cursor: "pointer",
                                fontWeight: 700,
                                "&:hover": {
                                    color: "#0f172a"
                                }
                            }}
                        >
                            SDE-1
                        </Typography> */}


                        {/* <Typography
                            sx={{
                                fontSize: 16,
                                color: "#475569",
                                cursor: "pointer",
                                fontWeight: 700,
                                "&:hover": {
                                    color: "#0f172a",
                                    borderBottom: "3px solid #fd5000"
                                }
                            }}
                        >
                            About Us
                        </Typography> */}


                        <Button
                            variant="outlined"
                            onClick={handleChangeLogin}
                            sx={{
                                // bgcolor: "#0c0cea",
                                border: "1px solid #ea580c",
                                outline: "none",
                                px: 3,

                                py: 1,

                                fontWeight: 700,
                                color: "#0f172a",
                                borderRadius: 2,

                                textTransform:
                                    "none",

                                "&:hover": {
                                    border: "1px solid #ea580c",
                                    backgroundColor: "#e65100d6",
                                    color: "white"
                                }
                            }}
                        >
                            Sign In
                        </Button>

                    </Box>

                </Box>

            </Box>


            {/* ==========================================================
                MAIN HERO
                EXISTING BACKGROUND / UI UNCHANGED
            ========================================================== */}

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
                            borderRadius:  "50%",
                            background: "radial-gradient(circle at 30% 25%, rgb(23, 38, 255), rgb(255, 82, 2) 35%, rgba(81, 1, 255, 1) 70%)",
                            border:  "1px solid rgb(255, 152, 17)",
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
                    width: "100%",
                    maxWidth: 1400,
                    mx: "auto",
                    border: "1px solid #fd5000",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                    pt: {
                        xs: 10,
                        md: 20,
                    },

                    px: {
                        xs: 3,
                        md: 6,
                    },

                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",

                        gap: 3,
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: {
                                xs: 30,
                                sm: 40,
                                md: 50,
                            },

                            fontWeight: 900,
                            lineHeight: 1.02,

                            textAlign: "center",
                            maxWidth: "70%",
                        }}
                    >
                        Let's<span style={{ color: "#ea580c", padding: "0px 10px" }}>Come</span>
                        Build Our {" "}

                        <Box
                            component="span"
                            sx={{
                                color: "#ea580c",
                            }}
                        >
                            Career
                        </Box>{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#ea580c",
                            }}
                        >
                            You
                        </Box>{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#000000",
                            }}
                        >
                            And
                        </Box>{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#ea580c",
                            }}
                        >
                            Me
                        </Box>{" "}

                        Together
                    </Typography>


                    <Typography
                        sx={{


                            fontSize: 18,
                            color: "#475569",
                            lineHeight: 1.8,
                            maxWidth: "80%",
                            textAlign: "center",
                        }}
                    >
                        Your career is not built alone. Let’s come together, learn together, and grow together. Whether you are starting your journey, preparing for your next opportunity, or building the skills needed to succeed, this platform is designed to support you at every step. Explore practical resources, sharpen your problem-solving skills, stay updated with technology, and turn your goals into real progress. Let’s build the career you dream about, together.
                    </Typography>


                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                            width: "100%",
                            maxWidth: 700,
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(0, 1fr))",
                            },
                            mt: 4,
                            mb: 5,
                        }}
                    >
                        {[
                            "Core coding foundations for SDE-I",
                            "End-to-end web API & system design",
                            "React + TypeScript architecture patterns",
                            "Interview-ready, production-first skills",
                        ].map((item) => (
                            <Box
                                key={item}
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "flex-start",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        minWidth: 10,
                                        borderRadius: "50%",
                                        bgcolor: "#ea580c",
                                        mt: 0.75,
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#475569",
                                        textAlign: "left",
                                    }}
                                >
                                    {item}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Box>

            {/* <Divider
                sx={{
                    width: "80%",
                    borderColor: "#fd5000",
                    borderWidth: "2px",
                    margin: "1rem auto",
                }}
            /> */}

            <Box
                sx={{
                    maxWidth: 1200,
                    mx: "auto",
                    border: "1px solid #fd5000",
                    borderRadius: "1rem",
                    pt: {
                        xs: 10,
                        md: 5
                    },
                    px: {
                        xs: 3,
                        md: 6
                    },
                }}
            >

                <Box
                    sx={{
                        display: "grid",
                        gap: 6,
                        gridTemplateColumns: {
                            md: "1.1fr 0.9fr"
                        },
                        alignItems: "center",
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            justifyContent: "center"
                        }}
                    >


                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 28,
                                    sm: 38,
                                    md: 46
                                },
                                fontWeight: 900,
                                lineHeight: 1.02
                            }}
                        >
                            Build the <span style={{ color: "#ea580c", padding: "0px 10px" }} >skills {" "}</span> that  <span style={{ color: "#ea580c", padding: "0px 10px" }}>make you</span> stand out as an <span style={{ color: "#ea580c", padding: "0px 10px" }} >SDE-1</span>.{" "}

                          
                        </Typography>


                        <Typography
                            sx={{
                                maxWidth: 640,
                                fontSize: 16,
                                color: "#525863",
                                lineHeight: 1.5
                            }}
                        >
                            Prepare for your SDE-1 journey with practical learning, DSA, development, system design, and interview-focused resources. Strengthen your fundamentals, solve real problems, build meaningful projects, and develop the confidence to take on technical interviews. Learn consistently, track your progress, and build the skills that help you stand out from the competition.

                        </Typography>
                    </Box>


                    <Box
                        sx={{
                            position:
                                "relative",

                            minHeight: 460,

                            borderRadius: 4,

                            overflow:
                                "hidden",

                            boxShadow:
                                "0 28px 80px rgba(15,23,42,0.12)"
                        }}
                    >

                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
                            alt="SDE Role"
                            sx={{
                                width: "100%",

                                height: "100%",

                                objectFit:
                                    "cover"
                            }}
                        />

                        <Box
                            sx={{
                                position:
                                    "absolute",

                                inset: 0,

                                background:
                                    "linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.72) 100%)"
                            }}
                        />

                        <Box
                            sx={{
                                position:
                                    "absolute",

                                bottom: 24,

                                left: 24,

                                color: "#fff"
                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: 800,
                                    fontSize: 18
                                }}
                            >
                                SDE Career Ready
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,

                                    color:
                                        "#d1d5db",

                                    fontSize: 14
                                }}
                            >
                                Hands-on learning for real
                                dev roles.
                            </Typography>

                        </Box>

                    </Box>

                </Box>


                {/* ======================================================
                    FEATURE CARDS
                ====================================================== */}

                <Box
                    sx={{
                        mt: 5,
                        mb: 5,
                        display: "grid",
                        gap: 4,
                        gridTemplateColumns: {
                            md:
                                "repeat(3, minmax(0, 1fr))"
                        }
                    }}
                >

                    {[
                        {
                            title:
                                "Live mentorship",

                            description:
                                "Get guidance from experienced developers and ship complete projects.",
                        },

                        {
                            title:
                                "Job-ready curriculum",

                            description:
                                "Master cloud, APIs, system design, and clean architecture in a single path.",
                        },

                        {
                            title:
                                "Placement growth",

                            description:
                                "Interview prep, resume support, and hiring-readiness coaching.",
                        }
                    ].map((item) => (

                        <Paper
                            key={item.title}
                            sx={{
                                p: 4,

                                borderRadius: 4,

                                bgcolor:
                                    "#ffffff",

                                border:
                                    "1px solid rgba(148,163,184,0.18)",

                                boxShadow:
                                    "0 18px 40px rgba(15,23,42,0.06)"
                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: 700,

                                    fontSize: 20,

                                    mb: 1
                                }}
                            >
                                {item.title}
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "#475569",

                                    lineHeight: 1.8
                                }}
                            >
                                {item.description}
                            </Typography>

                        </Paper>

                    ))}

                </Box>

            </Box>

        </Box>
    );
};

export default LoginPageContent;