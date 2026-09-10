import {
    Box,
    Button,
    Typography,
    Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

import "./auth.css";

import logo from "../../assets/AhaConvert_Software Solutions That Make You Stand Out.png";
import imageOne from "../../assets/cardone.png";
import Imagetwo from "../../assets/cardtwo.png";
import Imagethree from "../../assets/cardthree.png";


const LoginPageContent = () => {

    const navigate = useNavigate();

    const navigateSendQuerypage = () => {
        navigate("/sendquery");
    };

    /* ============================================================
       FRAMER MOTION VARIANTS
    ============================================================ */

    const containerVariants:Variants  = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };


    const fadeUp:Variants  = {
        hidden: {
            opacity: 0,
            y: 35,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };


    const fadeLeft :Variants = {
        hidden: {
            opacity: 0,
            x: -60,
        },

        visible: {
            opacity: 1,
            x: 0,

            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };


    const fadeRight :Variants = {
        hidden: {
            opacity: 0,
            x: 60,
        },

        visible: {
            opacity: 1,
            x: 0,

            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };


    const cardVariants :Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95,
        },

        visible: {
            opacity: 1,
            y: 0,
            scale: 1,

            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };


    return (
        <Box
            sx={{
                minHeight: "100vh",

                background: "#f8fafc",

                color: "#0f172a",

                position: "relative",

                overflowX: "hidden",

                pb: {
                    xs: 12,
                    md: 16,
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
                    },
                },

                "@keyframes bubbleGlow": {
                    "0%": {
                        opacity: 0.15,
                    },

                    "50%": {
                        opacity: 0.35,
                    },

                    "100%": {
                        opacity: 0.15,
                    },
                },
            }}
        >

            {/* ==========================================================
                HERO SECTION
            ========================================================== */}

            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1400,
                    mx: "auto",

    

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

                    position: "relative",

                    zIndex: 1,
                }}
            >

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    style={{
                        width: "100%",
                    }}
                >

                    {/* HERO HEADING */}

                    <motion.div variants={fadeUp}>

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

                                maxWidth: {
                                    xs: "100%",
                                    md: "70%",
                                },

                                mx: "auto",
                            }}
                        >

                            Let's

                            <Box
                                component="span"
                                sx={{
                                    color: "#ea580c",
                                    px: 1,
                                }}
                            >
                                Come
                            </Box>

                            Build{" "}

                            <Box
                                component="span"
                                sx={{
                                    color: "#ea580c",
                                }}
                            >
                                Anything,
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

                    </motion.div>


                    {/* HERO DESCRIPTION */}

                    <motion.div variants={fadeUp}>

                        <Typography
                            sx={{
                                mt: 3,

                                fontSize: {
                                    xs: 15,
                                    md: 18,
                                },

                                color: "#475569",

                                lineHeight: 1.8,

                                maxWidth: 900,

                                mx: "auto",

                                textAlign: "center",
                            }}
                        >

                            A platform for ideas, skills, opportunities,
                            and meaningful impact. Whether you’re here
                            to learn something new, build a project,
                            explore technology, grow your career, access
                            useful resources, or create a positive impact
                            in society — this is a place to move forward.

                            Discover knowledge. Develop skills. Turn ideas
                            into action. Connect with opportunities. And
                            keep growing — one step at a time.

                        </Typography>

                    </motion.div>


                    {/* HERO POINTS */}

                    <motion.div
                        variants={containerVariants}
                        style={{
                            width: "100%",
                        }}
                    >

                        <Box
                            sx={{
                                display: "grid",

                                gap: 2,

                                width: "100%",

                                maxWidth: 900,

                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, minmax(0, 1fr))",
                                },

                                mt: 4,

                                mb: 1,

                                mx: "auto",
                            }}
                        >

                            {[
                                "Learn skills that create real opportunities",

                                "Build technology, projects & solutions",

                                "Connect, collaborate & grow together",

                                "Contribute to society & create meaningful impact",
                            ].map((item) => (

                                <motion.div
                                    key={item}
                                    variants={fadeUp}
                                    whileHover={{
                                        x: 5,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                >

                                    <Box
                                        sx={{
                                            display: "flex",

                                            gap: 2,

                                            alignItems:
                                                "flex-start",
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,

                                                minWidth: 10,

                                                borderRadius:
                                                    "50%",

                                                bgcolor:
                                                    "#ea580c",

                                                mt: 0.75,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color:
                                                    "#475569",

                                                textAlign:
                                                    "left",
                                            }}
                                        >
                                            {item}
                                        </Typography>

                                    </Box>

                                </motion.div>

                            ))}

                        </Box>

                    </motion.div>


                    {/* CTA */}

                    <motion.div
                        variants={fadeUp}
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.96,
                        }}
                        style={{
                            display: "inline-block",
                        }}
                    >

                        <Button
                            variant="outlined"

                            onClick={
                                navigateSendQuerypage
                            }

                            endIcon={
                                <span className="request-arrow">
                                    →
                                </span>
                            }

                            sx={{
                                border:
                                    "1.5px solid #ea580c",

                                outline: "none",

                                px: 3,

                                py: 1.2,

                                mb: 4,

                                fontWeight: 700,

                                color: "white",

                                borderRadius: "50px",

                                textTransform:
                                    "none",

                                fontSize: "15px",

                                backgroundColor:
                                    "#ea580c",

                                transition:
                                    "all 0.3s [0.25, 0.1, 0.25, 1]",

                                "&:hover": {
                                    border:
                                        "1.5px solid #ea580c",

                                    backgroundColor:
                                        "#ea580c",

                                    color: "white",

                                    boxShadow:
                                        "0 10px 25px rgba(234, 88, 12, 0.30)",
                                },
                            }}
                        >
                            Send Your Request
                        </Button>

                    </motion.div>

                </motion.div>

            </Box>


            {/* ==========================================================
                SOFTWARE SOLUTIONS SECTION
            ========================================================== */}

            <Box
                sx={{
                    maxWidth: 1200,

                    mx: "auto",

                    mt: 2,

    

                    borderRadius: "1rem",

                    pt: {
                        xs: 8,
                        md: 6,
                    },

                    px: {
                        xs: 3,
                        md: 6,
                    },

                    position: "relative",

                    zIndex: 1,
                }}
            >

                <Box
                    sx={{
                        display: "grid",

                        gap: 6,

                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1.1fr 0.9fr",
                        },

                        alignItems: "center",
                    }}
                >

                    {/* LEFT CONTENT */}

                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",

                                flexDirection: "column",

                                gap: 3,

                                justifyContent:
                                    "center",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: 28,
                                        sm: 38,
                                        md: 46,
                                    },

                                    fontWeight: 900,

                                    lineHeight: 1.02,
                                }}
                            >

                                Build the{" "}

                                <Box
                                    component="span"
                                    sx={{
                                        color:
                                            "#ea580c",
                                    }}
                                >
                                    Software Solutions
                                </Box>{" "}

                                that make your{" "}

                                <Box
                                    component="span"
                                    sx={{
                                        color:
                                            "#ea580c",
                                    }}
                                >
                                    business/career
                                </Box>{" "}

                                stand out.

                            </Typography>


                            <Typography
                                sx={{
                                    maxWidth: 640,

                                    fontSize: 16,

                                    color: "#525863",

                                    lineHeight: 1.6,
                                }}
                            >

                                Turn ideas into practical software
                                solutions that create real impact for
                                businesses and careers. Learn how to
                                solve real-world problems, build
                                meaningful digital products, strengthen
                                your development and system design skills,
                                and approach technology with confidence.

                                Keep learning, keep building, and develop
                                the skills needed to create software
                                solutions that make you stand out.

                            </Typography>

                        </Box>

                    </motion.div>


                    {/* RIGHT IMAGE */}

                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}

                        whileHover={{
                            scale: 1.02,
                        }}

                        transition={{
                            duration: 0.4,
                        }}
                    >

                        <Box
                            sx={{
                                position:
                                    "relative",

                                minHeight: {
                                    xs: 260,
                                    md: 360,
                                },

                                borderRadius: 4,

                                overflow:
                                    "hidden",

                                boxShadow:
                                    "0 28px 80px rgba(15, 23, 42, 0.08)",
                            }}
                        >

                            <Box
                                component="img"

                                src={logo}

                                alt="Software Solutions"

                                sx={{
                                    width: "100%",

                                    height: "100%",

                                    minHeight: {
                                        xs: 260,
                                        md: 360,
                                    },

                                    objectFit:
                                        "cover",

                                    display:
                                        "block",

                                    transition:
                                        "transform 0.5s [0.25, 0.1, 0.25, 1]",

                                    "&:hover": {
                                        transform:
                                            "scale(1.04)",
                                    },
                                }}
                            />


                            {/* IMAGE OVERLAY */}

                            <Box
                                sx={{
                                    position:
                                        "absolute",

                                    inset: 0,

                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)",

                                    pointerEvents:
                                        "none",
                                }}
                            />


                            {/* IMAGE LABEL */}

                            <Box
                                sx={{
                                    position:
                                        "absolute",

                                    bottom: 24,

                                    left: 24,

                                    color: "#fff",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontWeight:
                                            800,

                                        fontSize:
                                            18,
                                    }}
                                >
                                    Career Ready
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize:
                                            13,

                                        opacity:
                                            0.85,

                                        mt: 0.5,
                                    }}
                                >
                                    Build. Learn. Grow.
                                </Typography>

                            </Box>

                        </Box>

                    </motion.div>

                </Box>


                {/* ======================================================
                    FEATURE CARDS
                ====================================================== */}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                >

                    <Box
                        sx={{
                            mt: 7,

                            mb: 6,

                            display: "grid",

                            gap: 4,

                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(3, minmax(0, 1fr))",
                            },
                        }}
                    >

                        {[
                            {
                                title:
                                    "Build Real Solutions",

                                description:
                                    "Turn ideas into practical software solutions that solve real-world business and user problems.",

                                image:
                                    imageOne,
                            },

                            {
                                title:
                                    "Modern Development",

                                description:
                                    "Build scalable applications with modern development practices, APIs, system design, and clean architecture.",

                                image:
                                    Imagetwo,
                            },

                            {
                                title:
                                    "Create Real Impact",

                                description:
                                    "Build meaningful digital products that improve businesses, strengthen your portfolio, and help you stand out.",

                                image:
                                    Imagethree,
                            },
                        ].map((item) => (

                            <motion.div
                                key={item.title}
                                variants={cardVariants}

                                whileHover={{
                                    y: -1,
                                }}

                                whileTap={{
                                    scale: 0.98,
                                }}
                            >

                                <Paper
                                    sx={{
                                        overflow:
                                            "hidden",

                                        height:
                                            "100%",

                                        borderRadius: 4,

                                        bgcolor:
                                            "#ffffff",

                                        border:
                                            "1px solid rgba(148,163,184,0.18)",

                                        boxShadow:
                                            "0 18px 40px rgba(15,23,42,0.06)",

                                        cursor:
                                            "pointer",

                                        transition:
                                            "box-shadow 0.3s [0.25, 0.1, 0.25, 1], border-color 0.3s [0.25, 0.1, 0.25, 1]",

                                        "&:hover": {
                                            boxShadow:
                                                "0 2px 5px rgba(0,55,185,0.14)",

                                        },
                                    }}
                                >

                                    {/* CARD IMAGE */}

                                    <Box
                                        sx={{
                                            height: 210,

                                            overflow:
                                                "hidden",

                                            backgroundColor:
                                                "#000",
                                        }}
                                    >

                                        <Box
                                            component="img"

                                            src={
                                                item.image
                                            }

                                            alt={
                                                item.title
                                            }

                                            sx={{
                                                width:
                                                    "100%",

                                                height:
                                                    "100%",

                                                objectFit:
                                                    "contain",

                                                display:
                                                    "block",

                                                transition: "transform 0.4s [0.25, 0.1, 0.25, 1]",
                                            }}
                                        />

                                    </Box>


                                    {/* CARD CONTENT */}

                                    <Box
                                        sx={{
                                            p: 4,
                                        }}
                                    >

                                        <Typography
                                            sx={{
                                                fontWeight:
                                                    700,

                                                fontSize:
                                                    20,

                                                mb: 1.2,
                                            }}
                                        >
                                            {item.title}
                                        </Typography>


                                        <Typography
                                            sx={{
                                                color:
                                                    "#475569",

                                                lineHeight:
                                                    1.8,
                                            }}
                                        >
                                            {item.description}
                                        </Typography>

                                    </Box>

                                </Paper>

                            </motion.div>

                        ))}

                    </Box>

                </motion.div>

            </Box>

        </Box>
    );
};

export default LoginPageContent;