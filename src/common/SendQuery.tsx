import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bubbles } from "./Bubule";

const SendQuery = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        educationLevel: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Query Submitted:", formData);
    };

    return (
        <>
            {/* {bubbles.map(
                (bubble, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "absolute",
                            width: bubble.size,
                            height: bubble.size,
                            left: bubble.left,
                            top: bubble.top,
                            borderRadius: "50%",
                            background: "radial-gradient(circle at 30% 25%, rgb(23, 38, 255), rgb(255, 82, 2) 35%, rgba(81, 1, 255, 1) 70%)",
                            border: "1px solid rgb(255, 152, 17)",
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
            )} */}


            <Box
                sx={{
                    maxHeight: "100vh",
                    background: "#f8fafc",
                    color: "#0f172a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: {
                        xs: 2,
                        sm: 4,
                        md: 6,
                    },
                    py: {
                        xs: 10,
                        md: 12,
                    },
                    position: "relative",
                    overflow: "hidden",

                    "@keyframes formEnter": {
                        "0%": {
                            opacity: 0,
                            transform:
                                "translateY(30px) scale(0.97)",
                        },
                        "100%": {
                            opacity: 1,
                            transform:
                                "translateY(0) scale(1)",
                        },
                    },

                    "@keyframes arrowMove": {
                        "0%": {
                            transform: "translateX(0)",
                        },
                        "50%": {
                            transform: "translateX(7px)",
                        },
                        "100%": {
                            transform: "translateX(0)",
                        },
                    },
                }}
            >
                {/* BACK BUTTON */}

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
                                borderRadius: "50%",
                                background: "radial-gradient(circle at 30% 25%, rgb(23, 38, 255), rgb(255, 82, 2) 35%, rgba(81, 1, 255, 1) 70%)",
                                border: "1px solid rgb(255, 152, 17)",
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

                <Button
                    onClick={() => navigate(-1)}
                    sx={{
                        position: "absolute",
                        top: {
                            xs: 80,
                            md: 80,
                        },
                        left: {
                            xs: 190,
                            md: 190,
                        },
                        fontWeight: 700,
                        textTransform: "none",
                        border: "1px solid #ea580c",
                        color: "#f5f5f5",
                        background: "#ea580c",

                        "&:hover": {
                            color: "#ea580c",
                            background: "transparent",
                        },
                    }}
                >
                    Back To Home
                </Button>

                {/* FORM CARD */}

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 850,

                        background:
                            "rgba(255,255,255,0.98)",

                        border:
                            "1px solid rgba(234,88,12,0.35)",

                        borderRadius: "24px",

                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },

                        boxShadow:
                            "0 25px 80px rgba(15,23,42,0.12)",

                        animation:
                            "formEnter 0.6s ease-out",
                    }}
                >
                    {/* HEADING */}

                    <Typography
                        sx={{
                            textAlign: "center",

                            fontSize: {
                                xs: 28,
                                sm: 34,
                                md: 40,
                            },

                            fontWeight: 900,

                            lineHeight: 1.2,
                        }}
                    >
                        Send Your{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#ea580c",
                            }}
                        >
                            Request
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "#64748b",
                            mt: 1,
                            mb: 4,
                            fontSize: 16,
                        }}
                    >
                        Tell us about yourself and
                        how we can help you.
                    </Typography>

                    {/* FORM */}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                            },

                            gap: 2.5,
                        }}
                    >
                        {/* FULL NAME */}

                        <TextField
                            required
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={
                                formData.fullName
                            }
                            onChange={handleChange}
                        />

                        {/* MOBILE */}

                        <TextField
                            required
                            fullWidth
                            label="Mobile Number"
                            name="mobile"
                            type="tel"
                            value={
                                formData.mobile
                            }
                            onChange={handleChange}
                        />

                        {/* EMAIL */}

                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={
                                formData.email
                            }
                            onChange={handleChange}
                        />

                        {/* EDUCATION */}

                        <TextField
                            required
                            select
                            fullWidth
                            label="Education / Professional Level"
                            name="educationLevel"
                            value={
                                formData.educationLevel
                            }
                            onChange={handleChange}
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

                        {/* MESSAGE */}

                        <TextField
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            label="Your Message"
                            name="message"
                            value={
                                formData.message
                            }
                            onChange={handleChange}
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "1 / -1",
                                },
                            }}
                        />

                        {/* SUBMIT */}

                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={
                                <Box
                                    component="span"
                                    sx={{
                                        display:
                                            "inline-block",

                                        animation:
                                            "arrowMove 1s ease-in-out infinite",
                                    }}
                                >
                                    →
                                </Box>
                            }
                            sx={{
                                gridColumn: {
                                    xs: "auto",
                                    sm: "1 / -1",
                                },

                                justifySelf:
                                    "center",

                                minWidth: {
                                    xs: "100%",
                                    sm: 260,
                                },

                                py: 1.5,

                                borderRadius:
                                    "50px",

                                backgroundColor:
                                    "#ea580c",

                                fontSize: 16,

                                fontWeight: 700,

                                textTransform:
                                    "none",

                                transition:
                                    "all 0.3s ease",

                                "&:hover": {
                                    backgroundColor:
                                        "#c2410c",

                                    transform:
                                        "translateY(-2px)",

                                    boxShadow:
                                        "0 10px 25px rgba(234,88,12,0.25)",
                                },
                            }}
                        >
                            Submit Your Query
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>

    );
};

export default SendQuery;