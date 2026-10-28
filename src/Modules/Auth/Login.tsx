import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded,
    CodeRounded,
    EmailOutlined,
    LockOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import {
    motion,
    type Variants,
} from "framer-motion";

import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../API/api";
import { setAuthData } from "../../utils/auth";
import { googleAuth } from "../../API/googleAuth";

declare global {
    interface Window {
        google?: any;
    }
}


interface LoginForm {
    email: string;
    password: string;
}


/* =========================================================
   INPUT STYLES
========================================================= */

const inputStyles = {
    "& .MuiOutlinedInput-root": {
        minHeight: 54,

        borderRadius: "13px",

        backgroundColor:
            "#f8fafc",

        transition:
            "all 0.25s ease",

        "& fieldset": {
            borderColor:
                "#dbe4f0",

            borderWidth:
                "1px",
        },

        "&:hover": {
            backgroundColor:
                "#ffffff",

            "& fieldset": {
                borderColor:
                    "#60a5fa",
            },
        },

        "&.Mui-focused": {
            backgroundColor:
                "#ffffff",

            boxShadow:
                "0 0 0 4px rgba(37,99,235,0.08)",
        },

        "&.Mui-focused fieldset": {
            borderColor:
                "#2563eb",

            borderWidth:
                "1.5px",
        },
    },


    "& .MuiInputLabel-root": {
        color:
        "#475569",

        fontWeight:
        400,
    fontSize: "16px",
    },


    "& .MuiInputLabel-root.Mui-focused": {
        color:
            "#2563eb",
    },


    "& .MuiOutlinedInput-input": {
        color:
            "#0f172a",

        fontSize:
            "16px",

        fontWeight:
            400,
    },


    "& .MuiOutlinedInput-input::placeholder": {
        color:
            "#94a3b8",

        opacity:
            1,
    },


    "& .MuiInputAdornment-root svg": {
        color:
            "#64748b",

        fontSize:
            21,
    },
};


/* =========================================================
   LOGIN COMPONENT
========================================================= */

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = location.state?.from;
    const destination = typeof returnTo?.pathname === "string"
        && returnTo.pathname.startsWith("/")
        ? `${returnTo.pathname}${returnTo.search || ""}${returnTo.hash || ""}`
        : "/dashboard";


    const [form, setForm] =
        useState<LoginForm>({
            email: "",
            password: "",
        });


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState<string | null>(null);

    const [showPassword, setShowPassword] =
        useState(false);


    /* =====================================================
       ANIMATIONS
    ===================================================== */

    const pageVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 25,
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


    const headerVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -15,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };


    const fieldVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
        },

        visible: {
            opacity: 1,
            y: 0,

            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };


    /* =====================================================
       HANDLE CHANGE
    ===================================================== */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
        } = e.target;


        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));


        setError(null);
    };


    /* =====================================================
       LOGIN
    ===================================================== */

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError(null);


        if (
            !form.email ||
            !form.password
        ) {

            setError(
                "Please enter your email and password."
            );

            return;
        }


        setLoading(true);


        try {

            const response =
                await api.post(
                    "/auth/login",
                    form
                );


            setAuthData(
                response.data.tokens.accessToken,
                response.data.user
            );


            navigate(destination, { replace: true });


        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Invalid email or password."
            );


        } finally {

            setLoading(false);
        }
    };

    /* =====================================================
       NAVIGATION
    ===================================================== */

    const handleSignup = () => {
        navigate("/signup", { state: location.state });
    };

    const handleGoogleLogin = async (response: any) => {
        try {
            setLoading(true);
            setError(null);
            
            const idToken = response.credential;
            const result = await googleAuth(idToken);
            
            setAuthData(result.data.tokens.accessToken, result.data.user);
            navigate(destination, { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.message || "Google login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const googleButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google && googleButtonRef.current) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
                callback: handleGoogleLogin,
            });
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: "outline",
                    size: "large",
                    width: "100%",
                    text: "signin_with",
                }
            );
        }
    }, []);

    /* =========================================================
       UI
    ========================================================= */

    return (

        <Box
            sx={{

                minHeight: {
                    xs: "auto",
                    md: "100%",
                },

                height: {
                    xs: "auto",
                    md: "100%",
                },

                width:
                    "100%",

                display:
                    "flex",

                alignItems:
                    "center",

                justifyContent:
                    "center",

                position:
                    "relative",

                overflowX: "clip",
                overflowY: "visible",

                px: {
                    xs: 2,
                    sm: 3,
                    md: 2,
                },

                py: {
                    xs: 4,
                    md: 2,
                },


                /* =============================================
                   GREY BACKGROUND
                ============================================= */

                // background:
                //     "linear-gradient(135deg,#f1f5f9 0%,#e2e8f0 50%,#f8fafc 100%)",
                // background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",


                /* =============================================
                   TOP GLOW
                ============================================= */

                "&::before": {

                    content:
                        '""',

                    position:
                        "absolute",

                    width: {
                        xs: 260,
                        md: 500,
                    },

                    height: {
                        xs: 260,
                        md: 500,
                    },

                    borderRadius:
                        "50%",

                    background:
                        "radial-gradient(circle,rgba(37,99,235,0.10),transparent 70%)",

                    top: {
                        xs: -140,
                        md: -220,
                    },

                    right: {
                        xs: -140,
                        md: -200,
                    },

                    pointerEvents:
                        "none",
                },


                /* =============================================
                   BOTTOM GLOW
                ============================================= */

                "&::after": {

                    content:
                        '""',

                    position:
                        "absolute",

                    width: {
                        xs: 240,
                        md: 400,
                    },

                    height: {
                        xs: 240,
                        md: 400,
                    },

                    borderRadius:
                        "50%",

                    background:
                        "radial-gradient(circle,rgba(2,132,199,0.08),transparent 70%)",

                    bottom:
                        -180,

                    left:
                        -150,

                    pointerEvents:
                        "none",
                },
            }}
        >

            {/* =================================================
                MAIN
            ================================================= */}

            <motion.div
                variants={
                    pageVariants
                }

                initial="hidden"

                animate="visible"

                style={{
                    width: "100%",
                    maxWidth: 520,
                    position: "relative",
                    zIndex: 2,
                    minWidth: 0,
                }}
            >


                {/* =================================================
                    LOGIN CONTENT
                ================================================= */}

                <Box
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        boxSizing: "border-box",
                        fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
                        background: "linear-gradient(155deg, #ffffff 0%, #f9fbff 62%, #f2f7ff 100%)",
                        borderRadius: {
                            xs: "22px",
                            md: "26px",
                        },
                        p: {
                            xs: 2.5,
                            sm: 3.5,
                            md: 3.5,
                        },
                        boxShadow: "0 20px 48px rgba(2,6,23,0.16), inset 0 1px 0 rgba(255,255,255,0.95)",
                        position: "relative",
                        overflow: "hidden",
                        border: "none",
                        "& .MuiTypography-root, & .MuiInputBase-root, & .MuiInputLabel-root, & .MuiButton-root": {
                            fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif",
                        },

                        "&::after": {
                            content: '""',
                            position: "absolute",
                            width: 180,
                            height: 180,
                            top: -110,
                            right: 0,
                            borderRadius: "50%",
                            background: "rgba(59,130,246,0.07)",
                            pointerEvents: "none",
                        },
                    }}
                >


                    <Box
                        sx={{
                            mx: { xs: -2.5, sm: -3.5, md: -3.5 },
                            mt: { xs: -2.5, sm: -3.5, md: -3.5 },
                            mb: 3,
                            px: { xs: 2.5, sm: 3.5, md: 3.5 },
                            pt: { xs: 2.5, sm: 3.5, md: 3.5 },
                            pb: 2.5,
                            background: "linear-gradient(135deg, #eff6ff 0%, #f8fbff 65%, #e0f2fe 100%)",
                            borderBottom: "none",
                            borderRadius: { xs: "21px 21px 16px 16px", md: "25px 25px 18px 18px" },
                        }}
                    >
                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <motion.div
                        variants={
                            headerVariants
                        }

                        initial="hidden"

                        animate="visible"
                    >

                        <Stack
                            direction="row"

                            spacing={1}



                            sx={{
                                mb: 2.5,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >

                            <Box
                                sx={{

                                    width:
                                        42,

                                    height:
                                        42,

                                    borderRadius:
                                        "12px",

                                    display:
                                        "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    background:
                                        "linear-gradient(135deg,#2563eb,#0284c7)",

                                    boxShadow:
                                        "0 8px 20px rgba(37,99,235,0.20)",
                                }}
                            >

                                <CodeRounded
                                    sx={{
                                        color:
                                            "#ffffff",

                                        fontSize:
                                            25,
                                    }}
                                />

                            </Box>


                            <Typography
                                sx={{

                                    fontSize: 25,

                                    fontWeight: 700,

                                    color:
                                        "#0f172a",

                                    letterSpacing:
                                        "-0.7px",
                                }}
                            >

                                Algo

                                <Box
                                    component="span"
                                    sx={{
                                        color:
                                            "#2563eb",
                                    }}
                                >
                                    Saathi
                                </Box>

                            </Typography>

                            <Box
                                sx={{
                                    ml: 0,
                                    px: 1.25,
                                    py: 0.65,
                                    borderRadius: 99,
                                    color: "#1d4ed8",
                                    backgroundColor: "rgba(37,99,235,0.08)",
                                    border: "1px solid rgba(37,99,235,0.12)",
                                    fontSize: 10,
                                    fontWeight: 800,
                                    letterSpacing: "0.08em",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                MEMBER SIGN IN
                            </Box>

                        </Stack>

                    </motion.div>


                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <motion.div
                        variants={
                            headerVariants
                        }

                        initial="hidden"

                        animate="visible"
                    >

                        <Typography
                            sx={{
                                textAlign: "center",

                                fontSize: {
                                    xs: 32,
                                    sm: 36,
                                },

                                fontWeight: 700,

                                color:
                                    "#0f172a",

                                letterSpacing: "-1.2px",

                                lineHeight:
                                    1.12,
                            }}
                        >

                            Welcome{" "}

                            <Box
                                component="span"
                                sx={{

                                    background:
                                        "linear-gradient(135deg,#2563eb,#0284c7)",

                                    backgroundClip:
                                        "text",

                                    WebkitBackgroundClip:
                                        "text",

                                    WebkitTextFillColor:
                                        "transparent",
                                }}
                            >
                                back
                            </Box>

                        </Typography>


                        <Typography
                            sx={{
                                textAlign: "center",

                                color:
                                    "#64748b",

                                fontSize: 16,
                                fontWeight: 400,

                                mt:
                                    0.8,

                                mb: 0,

                                lineHeight:
                                    1.6,
                            }}
                        >
                            Sign in to continue your
                            AlgoSaathi journey.
                        </Typography>

                    </motion.div>
                    </Box>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <Alert
                            severity="error"

                            sx={{

                                mb:
                                    2.5,

                                borderRadius:
                                    "12px",

                                fontSize:
                                    13,

                                alignItems:
                                    "center",
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Stack
                            spacing={2.2}
                        >


                            {/* EMAIL */}

                            <motion.div
                                variants={
                                    fieldVariants
                                }

                                initial="hidden"

                                animate="visible"
                            >

                                <TextField
                                    label="Email address"

                                    name="email"

                                    type="email"

                                    placeholder="you@example.com"

                                    value={
                                        form.email
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    fullWidth

                                    required

                                    autoComplete="email"

                                    sx={
                                        inputStyles
                                    }

                                    slotProps={{
                                        inputLabel: {
                                            shrink:
                                                true,
                                        },

                                        input: {

                                            startAdornment:
                                                (
                                                    <InputAdornment position="start">
                                                        <EmailOutlined />
                                                    </InputAdornment>
                                                ),
                                        },
                                    }}
                                />

                            </motion.div>


                            {/* PASSWORD */}

                            <motion.div
                                variants={
                                    fieldVariants
                                }

                                initial="hidden"

                                animate="visible"

                                transition={{
                                    delay:
                                        0.05,
                                }}
                            >

                                <TextField
                                    label="Password"

                                    name="password"

                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Enter your password"

                                    value={
                                        form.password
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    fullWidth

                                    required

                                    autoComplete="current-password"

                                    sx={
                                        inputStyles
                                    }

                                    slotProps={{
                                        inputLabel: {
                                            shrink:
                                                true,
                                        },

                                        input: {

                                            startAdornment:
                                                (
                                                    <InputAdornment position="start">
                                                        <LockOutlined />
                                                    </InputAdornment>
                                                ),

                                            endAdornment:
                                                (
                                                    <InputAdornment position="end">

                                                        <IconButton
                                                            type="button"

                                                            onClick={() =>
                                                                setShowPassword(
                                                                    (prev) =>
                                                                        !prev
                                                                )
                                                            }

                                                            edge="end"

                                                            size="small"

                                                            aria-label={
                                                                showPassword
                                                                    ? "Hide password"
                                                                    : "Show password"
                                                            }

                                                            sx={{

                                                                color:
                                                                    "#64748b",

                                                                "&:hover":
                                                                {
                                                                    color:
                                                                        "#2563eb",

                                                                    backgroundColor:
                                                                        "rgba(37,99,235,0.08)",
                                                                },
                                                            }}
                                                        >

                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}

                                                        </IconButton>

                                                    </InputAdornment>
                                                ),
                                        },
                                    }}
                                />

                            </motion.div>


                            {/* =================================================
                                FORGOT PASSWORD
                            ================================================= */}

                            <Box
                                sx={{

                                    display:
                                        "flex",

                                    justifyContent:
                                        "flex-end",

                                    mt:
                                        "-2px !important",
                                }}
                            >

                                <Typography
                                    component="button"

                                    type="button"

                                    onClick={() =>
                                        navigate(
                                            "/forgot-password"
                                        )
                                    }

                                    sx={{

                                        border:
                                            0,

                                        background:
                                            "transparent",

                                        p:
                                            0,

                                        fontFamily:
                                            "inherit",

                                        fontSize:
                                            12.5,

                                        color:
                                            "#2563eb",

                                        fontWeight:
                                            700,

                                        cursor:
                                            "pointer",

                                        "&:hover":
                                        {
                                            textDecoration:
                                                "underline",

                                            color:
                                                "#1d4ed8",
                                        },
                                    }}
                                >
                                    Forgot password?
                                </Typography>

                            </Box>


                            {/* =================================================
                                LOGIN BUTTON
                            ================================================= */}

                            <motion.div
                                initial={{
                                    opacity:
                                        0,

                                    y:
                                        15,
                                }}

                                animate={{
                                    opacity:
                                        1,

                                    y:
                                        0,
                                }}

                                transition={{
                                    delay:
                                        0.15,

                                    duration:
                                        0.45,
                                }}
                            >

                                <Button
                                    type="submit"

                                    fullWidth

                                    variant="contained"

                                    disabled={
                                        loading
                                    }

                                    endIcon={
                                        !loading && (
                                            <ArrowForwardRounded />
                                        )
                                    }

                                    sx={{

                                        height:
                                            54,

                                        borderRadius:
                                            "14px",

                                        textTransform:
                                            "none",

                                        fontSize:
                                            17.5,

                                        fontWeight:
                                            600,

                                        background:
                                            "linear-gradient(135deg,#2563eb,#0284c7)",

                                        boxShadow:
                                            "0 7px 16px rgba(37,99,235,0.18)",

                                        transition:
                                            "all 0.25s ease",

                                        "&:hover":
                                        {
                                            background:
                                                "linear-gradient(135deg,#1d4ed8,#0369a1)",

                                            transform:
                                                "translateY(-2px)",

                                            boxShadow:
                                                "0 9px 20px rgba(37,99,235,0.22)",
                                        },

                                        "&:active":
                                        {
                                            transform:
                                                "translateY(0)",
                                        },

                                        "&:disabled":
                                        {
                                            background:
                                                "#93c5fd",

                                            color:
                                                "#ffffff",
                                        },
                                    }}
                                >

                                    {loading
                                        ? "Signing in..."
                                        : "Sign in"}

                                </Button>

                            </motion.div>
                        </Stack>

                    </Box>


                    {/* =================================================
                        GOOGLE LOGIN
                    ================================================= */}

                    {/* <Box
                        ref={googleButtonRef}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                        }}
                    /> */}


                    {/* =================================================
                        SIGNUP
                    ================================================= */}

                    <Typography
                        sx={{

                            textAlign:
                                "center",

                            fontSize: 15.5,

                            color:
                                "#64748b",
                        }}
                    >

                        Don't have an account?{" "}

                        <Box
                            component="span"

                            onClick={
                                handleSignup
                            }

                            sx={{

                                color:
                                    "#2563eb",

                                fontWeight:
                                    600,

                                cursor:
                                    "pointer",

                                "&:hover":
                                {
                                    textDecoration:
                                        "underline",

                                    color:
                                        "#1d4ed8",
                                },
                            }}
                        >
                            Sign up
                        </Box>

                    </Typography>


                    {/* =================================================
                        TERMS
                    ================================================= */}

                    <Typography
                        sx={{

                            textAlign:
                                "center",

                            color:
                                "#94a3b8",

                            fontSize: 12.5,

                            mt:
                                1.5,

                            lineHeight:
                                1.5,

                            maxWidth:
                                420,

                            mx:
                                "auto",
                        }}
                    >
                        By signing in, you agree
                        to our terms and privacy policy.
                    </Typography>

                </Box>

            </motion.div>

        </Box>
    );
};


export default Login;