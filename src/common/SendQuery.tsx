import {
    Alert,
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import {
    ArrowForward,
    EmailOutlined,
    MessageOutlined,
    PersonOutlined,
    PhoneOutlined,
    SchoolOutlined,
} from "@mui/icons-material";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { bubbles } from "./Bubule";
import { sendQuery } from "../Modules/AdminPannel/api/api";


const SendQuery = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        educationLevel: "",
        schoolname: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });


    /* =========================
       FRAMER MOTION VARIANTS
    ========================= */

    const formVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    };

    const headingVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const fieldVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: "easeOut",
            },
        },
    };


    /* =========================
       HANDLE INPUT
    ========================= */

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    /* =========================
       SUBMIT
    ========================= */

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (formData.mobile.length < 10) {
            setSnackbar({
                open: true,
                message: "Please enter a valid mobile number.",
                severity: "error",
            });

            return;
        }

        try {
            setLoading(true);

            const response = await sendQuery(formData);

            console.log("Query Submitted:", response);

            setSnackbar({
                open: true,
                message:
                    "Your request has been submitted successfully!",
                severity: "success",
            });

            setTimeout(() => {
                navigate("/signup");
            }, 1200);

        } catch (error) {
            console.error("Query submission failed:", error);

            setSnackbar({
                open: true,
                message:
                    "Something went wrong. Please try again.",
                severity: "error",
            });

        } finally {
            setLoading(false);
        }
    };


    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #fff7ed 0%, #f8fafc 45%, #eef2ff 100%)",

                color: "#0f172a",

                position: "relative",

                overflow: "hidden",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                px: {
                    xs: 2,
                    sm: 4,
                    md: 6,
                },

                py: {
                    xs: 12,
                    md: 8,
                },

                "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 450,
                    height: 450,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(234,88,12,0.12), transparent 70%)",
                    top: -180,
                    right: -120,
                    pointerEvents: "none",
                },

                "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)",
                    bottom: -180,
                    left: -120,
                    pointerEvents: "none",
                },

                "@keyframes bubbleFloat": {
                    "0%": {
                        transform: "translateY(0px)",
                    },
                    "50%": {
                        transform: "translateY(-25px)",
                    },
                    "100%": {
                        transform: "translateY(0px)",
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

            {/* =========================
                FLOATING BUBBLES
            ========================= */}

            {bubbles.map((bubble, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "absolute",

                        width: bubble.size,
                        height: bubble.size,

                        left: bubble.left,
                        top: bubble.top,

                        borderRadius: "50%",

                        background:
                            "radial-gradient(circle at 30% 25%, rgb(23,38,255), rgb(255,82,2) 35%, rgba(81,1,255,1) 70%)",

                        border:
                            "1px solid rgba(255,152,17,0.7)",

                        backdropFilter: "blur(3px)",

                        opacity: 0.22,

                        pointerEvents: "none",

                        zIndex: 0,

                        animation: `
                            bubbleFloat ${bubble.duration}
                            ease-in-out infinite,
                            bubbleGlow 4s ease-in-out infinite
                        `,

                        animationDelay:
                            `${bubble.delay}, ${bubble.delay}`,

                        "@media (max-width: 600px)": {
                            opacity: 0.12,
                            transform: "scale(0.7)",
                        },
                    }}
                />
            ))}

            {/* =========================
                MAIN CARD
            ========================= */}

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                style={{
                    width: "100%",
                    maxWidth: 850,
                    marginTop: 50,
                    position: "relative",
                    zIndex: 2,
                }}
            >

                <Box
                    sx={{
                        width: "100%",

                        background:
                            "rgba(255,255,255,0.92)",

                        backdropFilter:
                            "blur(18px)",

                        WebkitBackdropFilter:
                            "blur(18px)",

                        border:
                            "1px solid rgba(234,88,12,0.25)",

                        borderRadius: {
                            xs: "20px",
                            md: "28px",
                        },

                        p: {
                            xs: 2.5,
                            sm: 4,
                            md: 5,
                        },

                        boxShadow:
                            "0 30px 100px rgba(15,23,42,0.12)",

                        position: "relative",

                        overflow: "hidden",

                        "&::before": {
                            content: '""',

                            position: "absolute",

                            top: 0,
                            left: 0,
                            right: 0,

                            height: "4px",

                            background:
                                "linear-gradient(90deg, #ea580c, #f97316, #fb923c)",
                        },
                    }}
                >

                    {/* =========================
                        HEADING
                    ========================= */}

                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Typography
                            sx={{
                                textAlign: "center",

                                fontSize: {
                                    xs: 28,
                                    sm: 34,
                                    md: 42,
                                },

                                fontWeight: 900,

                                lineHeight: 1.15,

                                letterSpacing: "-1px",
                            }}
                        >
                            Send Your{" "}

                            <Box
                                component="span"
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #ea580c, #f97316)",

                                    backgroundClip:
                                        "text",

                                    WebkitBackgroundClip:
                                        "text",

                                    WebkitTextFillColor:
                                        "transparent",
                                }}
                            >
                                Request
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                textAlign: "center",

                                color: "#64748b",

                                mt: 1.5,

                                mb: {
                                    xs: 3,
                                    md: 4,
                                },

                                fontSize: {
                                    xs: 14,
                                    sm: 16,
                                },

                                maxWidth: 550,

                                mx: "auto",

                                lineHeight: 1.7,
                            }}
                        >
                            Tell us about yourself and what
                            you want to build, learn, or
                            achieve. Let's turn your idea
                            into something meaningful.
                        </Typography>
                    </motion.div>


                    {/* =========================
                        FORM
                    ========================= */}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                            },

                            gap: {
                                xs: 2,
                                sm: 2.5,
                            },
                        }}
                    >

                        {/* FULL NAME */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <TextField
                                required
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <PersonOutlined
                                                sx={{
                                                    mr: 1,
                                                    color: "#94a3b8",
                                                }}
                                            />
                                        ),
                                    }
                                }}
                                sx={inputStyle}
                            />
                        </motion.div>


                        {/* MOBILE */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay: 0.05,
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                label="Mobile Number"
                                name="mobile"
                                type="tel"

                                value={formData.mobile}
                                onChange={handleChange}
                                slotProps={{
                                    input: {

                                        startAdornment: (
                                            <PhoneOutlined
                                                sx={{
                                                    mr: 1,
                                                    color: "#94a3b8",
                                                }}
                                            />
                                        ),
                                    }
                                }}
                                sx={inputStyle}
                            />
                        </motion.div>


                        {/* EMAIL */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay: 0.1,
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <EmailOutlined
                                                sx={{
                                                    mr: 1,
                                                    color: "#94a3b8",
                                                }}
                                            />
                                        ),
                                    }
                                }}
                                sx={inputStyle}
                            />
                        </motion.div>


                        {/* EDUCATION */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay: 0.2,
                            }}
                        >
                            <TextField
                                required
                                select
                                fullWidth
                                label="Education / Professional Level"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                sx={inputStyle}
                            >
                                <MenuItem value="10th">
                                    10th
                                </MenuItem>

                                <MenuItem value="12th">
                                    12th
                                </MenuItem>

                                <MenuItem value="graduate">
                                    Graduate
                                </MenuItem>

                                <MenuItem value="postgraduate">
                                    Post Graduate
                                </MenuItem>

                                <MenuItem value="employee">
                                    Working Professional
                                </MenuItem>

                                <MenuItem value="other">
                                    Other
                                </MenuItem>
                            </TextField>
                        </motion.div>


                        {/* SCHOOL / COLLEGE */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay: 0.15,
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                label="College / School Name"
                                name="schoolname"
                                value={formData.schoolname}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <SchoolOutlined
                                                sx={{
                                                    mr: 1,
                                                    color: "#94a3b8",
                                                }}
                                            />
                                        ),
                                    }
                                }}
                                sx={inputStyle}
                            />
                        </motion.div>


                        {/* MESSAGE */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                delay: 0.25,
                            }}
                            style={{
                                gridColumn: "1 / -1",
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                multiline
                                minRows={3}
                                label="Tell Us About Your Requirement"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us what you want to build, learn, or achieve..."
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <MessageOutlined
                                                sx={{
                                                    mr: 1,
                                                    mt: 1,
                                                    color: "#94a3b8",
                                                }}
                                            />
                                        ),
                                    }
                                }}
                                sx={{
                                    ...inputStyle,

                                    "& textarea": {
                                        paddingTop: "4px",
                                    },
                                }}
                            />
                        </motion.div>


                        {/* SUBMIT BUTTON */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.35,
                                duration: 0.5,
                            }}
                            style={{
                                gridColumn: "1 / -1",
                                
                            }}
                        >
                            <Button
                                type="submit"
                                disabled={loading}
                                variant="contained"
                                fullWidth
                                endIcon={
                                    loading ? (
                                        <CircularProgress
                                            size={20}
                                            sx={{
                                                color: "#fff",
                                            }}
                                        />
                                    ) : (
                                        <ArrowForward />
                                    )
                                }
                                sx={{
                                    mt: 1,

                                    minHeight: 56,
                                    float:"right",
                                    borderRadius: "50px",
                                    width:"30%",
                                    margin:"auto",
                                    background:
                                        "linear-gradient(135deg, #ea580c, #f97316)",

                                    fontSize: 14,

                                    fontWeight: 600,

                                    textTransform: "none",

                                    letterSpacing: "0.2px",

                                    boxShadow:
                                        "0 12px 30px rgba(234,88,12,0.25)",

                                    transition:
                                        "all 0.3s ease",

                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #c2410c, #ea580c)",

                                        transform:
                                            "translateY(-3px)",

                                        boxShadow:
                                            "0 18px 35px rgba(234,88,12,0.32)",
                                    },

                                    "&:disabled": {
                                        background:
                                            "#fdba74",

                                        color: "#fff",
                                    },
                                }}
                            >
                                {loading
                                    ? "Submitting..."
                                    : "Submit Your Query"}
                            </Button>
                        </motion.div>

                    </Box>


                    {/* =========================
                        BOTTOM TRUST TEXT
                    ========================= */}

                    <Typography
                        sx={{
                            textAlign: "center",

                            color: "#94a3b8",

                            fontSize: 12,

                            mt: 3,
                        }}
                    >
                        Your information is used only to
                        understand your requirement and
                        connect with you.
                    </Typography>

                </Box>
            </motion.div>


            {/* =========================
                SNACKBAR
            ========================= */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() =>
                        setSnackbar((prev) => ({
                            ...prev,
                            open: false,
                        }))
                    }
                    sx={{
                        borderRadius: "12px",
                        fontWeight: 600,
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
};


/* =========================
   INPUT STYLE
========================= */

const inputStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        maxLength: 10,
        backgroundColor:
            "rgba(248,250,252,0.75)",

        transition: "all 0.25s ease",

        "& fieldset": {
            borderColor: "#e2e8f0",
        },

        "&:hover fieldset": {
            borderColor: "#fb923c",
        },

        "&.Mui-focused": {
            backgroundColor: "#fff",

            boxShadow:
                "0 0 0 4px rgba(234,88,12,0.08)",
        },

        "&.Mui-focused fieldset": {
            borderColor: "#ea580c",
            borderWidth: "1.5px",
        },
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#ea580c",
    },
};


export default SendQuery;