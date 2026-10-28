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

            await sendQuery(formData);

            setSnackbar({
                open: true,
                message:
                    "Your request has been submitted successfully!",
                severity: "success",
            });

            setTimeout(() => {
                navigate("/signup");
            }, 1200);

        } catch {
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
                    "radial-gradient(ellipse at 18% 18%, rgba(37, 99, 235, 0.28), transparent 35%), radial-gradient(ellipse at 84% 78%, rgba(124, 58, 237, 0.24), transparent 34%), linear-gradient(135deg, #080d20 0%, #111a38 52%, #0b1024 100%)",
                color: "#f8fafc",
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
                    md: 14,
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 520,
                    height: 520,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(56,189,248,0.12), transparent 68%)",
                    top: -220,
                    right: -160,
                    pointerEvents: "none",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 460,
                    height: 460,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.14), transparent 70%)",
                    bottom: -240,
                    left: -180,
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
                            "radial-gradient(circle at 30% 25%, rgba(125,211,252,0.75), rgba(59,130,246,0.22) 42%, rgba(124,58,237,0.08) 72%)",
                        border: "1px solid rgba(191,219,254,0.28)",
                        boxShadow: "inset -8px -10px 24px rgba(8,13,32,0.32), 0 12px 40px rgba(59,130,246,0.12)",
                        opacity: 0.18,
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
                            opacity: 0.1,
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
                    maxWidth: 1120,
                    position: "relative",
                    zIndex: 2,
                    perspective: 1400,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "0.82fr 1.18fr" },
                        background: "rgba(255,255,255,0.96)",
                        border: "1px solid rgba(191,219,254,0.34)",
                        borderRadius: { xs: "24px", md: "32px" },
                        boxShadow: "0 34px 90px rgba(0,0,0,0.42), 0 10px 30px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ display: "flex" }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                p: { xs: 3, sm: 4, md: 5 },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                color: "#fff",
                                background: "linear-gradient(145deg, #172554 0%, #1d4ed8 48%, #6d28d9 100%)",
                                position: "relative",
                                overflow: "hidden",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    width: 260,
                                    height: 260,
                                    right: -115,
                                    top: -95,
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    boxShadow: "0 0 0 24px rgba(255,255,255,0.035), 0 0 0 52px rgba(255,255,255,0.025)",
                                },
                            }}
                        >
                            <Box sx={{ position: "relative", zIndex: 1 }}>
                                <Box
                                    sx={{
                                        width: 62,
                                        height: 62,
                                        display: "grid",
                                        placeItems: "center",
                                        mb: 3.5,
                                        borderRadius: "19px",
                                        color: "#bfdbfe",
                                        background: "linear-gradient(145deg, rgba(255,255,255,0.24), rgba(255,255,255,0.07))",
                                        border: "1px solid rgba(255,255,255,0.28)",
                                        boxShadow: "8px 10px 22px rgba(8,13,32,0.28), inset 2px 2px 5px rgba(255,255,255,0.24)",
                                        transform: "rotate(-7deg)",
                                    }}
                                >
                                    <MessageOutlined sx={{ fontSize: 30 }} />
                                </Box>
                                <Typography
                                    component="h1"
                                    sx={{
                                        fontSize: { xs: 34, sm: 40, md: 44 },
                                        fontWeight: 900,
                                        lineHeight: 1.08,
                                        letterSpacing: "-1.8px",
                                        textShadow: "0 4px 18px rgba(8,13,32,0.28)",
                                    }}
                                >
                                    Let&apos;s build
                                    <Box component="span" sx={{ display: "block", color: "#bfdbfe" }}>
                                        something
                                    </Box>
                                    great.
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgba(239,246,255,0.82)",
                                        mt: 2.5,
                                        maxWidth: 360,
                                        fontSize: { xs: 14, md: 15 },
                                        lineHeight: 1.8,
                                    }}
                                >
                                    Tell us what you have in mind. Share your goals and our team will help you find the right next step.
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    mt: 5,
                                    p: 2.5,
                                    borderRadius: 3,
                                    background: "linear-gradient(145deg, rgba(255,255,255,0.17), rgba(255,255,255,0.06))",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    boxShadow: "0 14px 28px rgba(8,13,32,0.18), inset 1px 1px 0 rgba(255,255,255,0.16)",
                                    transform: { md: "perspective(700px) rotateY(5deg)" },
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                <Typography sx={{ fontWeight: 750, mb: 0.5 }}>
                                    A real person, ready to help
                                </Typography>
                                <Typography sx={{ color: "rgba(239,246,255,0.76)", fontSize: 13, lineHeight: 1.65 }}>
                                    Complete the form and we&apos;ll follow up about your request.
                                </Typography>
                            </Box>
                        </Box>
                    </motion.div>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            p: { xs: 2.5, sm: 4, md: 5 },
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                            },
                            gap: {
                                xs: 2,
                                sm: 2.5,
                            },
                            alignContent: "center",
                        }}
                    >
                        <Box sx={{ gridColumn: "1 / -1", mb: 0.5 }}>
                            <Typography component="h2" sx={{ color: "#111827", fontSize: { xs: 22, md: 26 }, fontWeight: 850, letterSpacing: "-0.6px", textalign: "center" }}>
                                Send your request
                            </Typography>
                            <Typography sx={{ color: "#64748b", mt: 0.5, fontSize: 14, textalign: { xs: "center", sm: "left", md:"center" } }}>
                                Fill in your details and we&apos;ll get back to you.
                            </Typography>
                        </Box>

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
                                placeholder="Enter your full name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                slotProps={{
                                    inputLabel: { shrink: true },
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
                                placeholder="Enter your mobile number"
                                name="mobile"
                                type="tel"

                                value={formData.mobile}
                                onChange={handleChange}
                                slotProps={{
                                    inputLabel: { shrink: true },
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
                                placeholder="Enter your email address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                slotProps={{
                                    inputLabel: { shrink: true },
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
                                slotProps={{
                                    inputLabel: { shrink: true },
                                }}
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                sx={inputStyle}
                            >
                                <MenuItem value="" disabled>
                                    Select your education level
                                </MenuItem>
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
                            style={{
                                gridColumn: "1 / -1",
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                label="College / School Name"
                                placeholder="Enter your school or college name"
                                name="schoolname"
                                value={formData.schoolname}
                                onChange={handleChange}
                                slotProps={{
                                    inputLabel: { shrink: true },
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
                                    inputLabel: { shrink: true },
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
                                display: "flex",
                                justifyContent: "flex-end",
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
                                    borderRadius: "50px",
                                    width: { xs: "100%", sm: "auto" },
                                    minWidth: { sm: 240 },
                                    justifySelf: { sm: "end" },
                                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    textTransform: "none",
                                    letterSpacing: "0.2px",
                                    boxShadow: "0 4px 0 #1e40af, 0 8px 16px rgba(37,99,235,0.16)",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    "&:active": {
                                        transform: "translateY(2px)",
                                        boxShadow: "0 2px 0 #1e40af, 0 4px 10px rgba(37,99,235,0.12)",
                                    },
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 5px 0 #1e40af, 0 10px 18px rgba(37,99,235,0.2)",
                                    },
                                    "&:disabled": {
                                        background: "#94a3b8",
                                        color: "#fff",
                                        boxShadow: "none",
                                    },
                                    "@media (max-width: 600px)": {
                                        width: "100%",
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
                            gridColumn: "1 / -1",
                            textAlign: "center",
                            color: "#94a3b8",
                            fontSize: 12,
                            px: { xs: 2.5, sm: 4, md: 5 },
                            pt: 0,
                            pb: 2.5,
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
        backgroundColor: "#f8fafc",
        boxShadow: "inset 0 2px 4px rgba(15,23,42,0.035), 0 2px 0 rgba(15,23,42,0.025)",
        transition: "all 0.25s ease",
        "& fieldset": {
            borderColor: "#dbe3ef",
        },
        "&:hover fieldset": {
            borderColor: "#60a5fa",
        },
        "&.Mui-focused": {
            backgroundColor: "#fff",
            boxShadow: "0 0 0 4px rgba(59,130,246,0.1), 0 5px 12px rgba(15,23,42,0.06)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#2563eb",
            borderWidth: "1.5px",
        },
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#2563eb",
    },
};


export default SendQuery;