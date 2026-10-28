import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    ArrowForwardRounded,
    CheckCircleRounded,
    CodeRounded,
    EmailOutlined,
    LockOutlined,
    PersonOutlined,
    PhoneOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../API/api";
import { googleAuth } from "../../API/googleAuth";
import { setAuthData } from "../../utils/auth";


interface SignupForm {
    firstName: string;
    Role: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}

type SignupStep = "email" | "otp" | "details";

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = location.state?.from;
    const destination = typeof returnTo?.pathname === "string"
        && returnTo.pathname.startsWith("/")
        ? `${returnTo.pathname}${returnTo.search || ""}${returnTo.hash || ""}`
        : "/dashboard";

    const [form, setForm] = useState<SignupForm>({
        firstName: "",
        Role: "student",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [signupStep, setSignupStep] = useState<SignupStep>("email");
    const [verificationCode, setVerificationCode] = useState("");
    const [registrationVerificationToken, setRegistrationVerificationToken] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    /* =========================================================
       FRAMER MOTION
    ========================================================= */

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


    /* =========================================================
       HANDLE CHANGE
    ========================================================= */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError(null);
    };


    /* =========================================================
       PASSWORD STRENGTH
    ========================================================= */

    const getPasswordStrength = () => {
        const password = form.password;

        if (!password) {
            return {
                value: 0,
                text: "",
            };
        }

        let score = 0;

        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) {
            return {
                value: 25,
                text: "Weak password",
            };
        }

        if (score <= 3) {
            return {
                value: 60,
                text: "Medium password",
            };
        }

        return {
            value: 100,
            text: "Strong password",
        };
    };


    const passwordStrength =
        getPasswordStrength();


    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSendVerificationCode = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError(null);

        if (!form.email.trim()) {
            setError("Enter your email address.");
            return;
        }

        setLoading(true);
        try {
            const result = await api.post("/auth/register/request-otp", {
                email: form.email.trim().toLowerCase(),
            });
            setSignupStep("otp");
            setVerificationCode("");
            setVerificationMessage(
                result.data.message || "Enter the verification code sent to your email."
            );
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to send a verification code. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError(null);

        if (
            !form.firstName ||
            !form.Role ||
            !form.email ||
            !form.password ||
            !form.confirmPassword ||
            !form.phoneNumber
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        if (form.phoneNumber.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        setLoading(true);
        try {
            const result = await api.post(
                "/auth/register/complete",
                {
                    firstName: form.firstName,
                    role: form.Role,
                    lastName: form.lastName,
                    email: form.email.trim().toLowerCase(),
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                    phoneNumber: form.phoneNumber,
                    verificationToken: registrationVerificationToken,
                }
            );
            setAuthData(result.data.tokens.accessToken, result.data.user);
            navigate(destination, { replace: true });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to create your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyEmail = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError(null);

        if (!/^\d{6}$/.test(verificationCode)) {
            setError("Enter the six-digit verification code.");
            return;
        }

        setLoading(true);
        try {
            const result = await api.post("/auth/register/verify-otp", {
                email: form.email.trim().toLowerCase(),
                otp: verificationCode,
            });

            setRegistrationVerificationToken(result.data.verificationToken);
            setSignupStep("details");
            setVerificationMessage(
                result.data.message || "Email verified. Complete your account details."
            );
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to verify your email. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendVerificationCode = async () => {
        setError(null);
        setVerificationMessage("");
        setLoading(true);
        try {
            const result = await api.post("/auth/register/resend-otp", {
                email: form.email.trim().toLowerCase(),
            });
            setVerificationCode("");
            setVerificationMessage(
                result.data.message || "A new verification code has been requested."
            );
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Unable to resend the code. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async (response: any) => {
        try {
            setLoading(true);
            setError(null);
            
            const idToken = response.credential;
            const result = await googleAuth(idToken);
            
            setAuthData(result.data.tokens.accessToken, result.data.user);
            navigate(destination, { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.message || "Google sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const googleButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.google && googleButtonRef.current) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
                callback: handleGoogleSignup,
            });
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    theme: "outline",
                    size: "large",
                    width: "100%",
                    text: "signup_with",
                }
            );
        }
    }, []);

    /* =========================================================
       INPUT STYLE
    ========================================================= */

    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            minHeight: 54,

            borderRadius: "13px",

            backgroundColor: "#f8fafc",

            transition: "all 0.25s ease",

            "& fieldset": {
                borderColor: "#dbe4f0",
                borderWidth: "1px",
            },

            "&:hover": {
                backgroundColor: "#ffffff",

                "& fieldset": {
                    borderColor: "#60a5fa",
                },
            },

            "&.Mui-focused": {
                backgroundColor: "#ffffff",

                boxShadow: "0 0 0 4px rgba(37,99,235,0.08)",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#2563eb",
                borderWidth: "1.5px",
            },
        },

        "& .MuiInputLabel-root": {
            color: "#475569",
            fontWeight: 400,
            fontSize: "16px",
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: "#2563eb",
        },

        "& .MuiOutlinedInput-input": {
            color: "#0f172a",
            fontSize: "16px",
            fontWeight: 400,
        },

        "& .MuiOutlinedInput-input::placeholder": {
            color: "#94a3b8",
            opacity: 1,
        },

        "& .MuiInputAdornment-root svg": {
            color: "#64748b",
            fontSize: 21,
        },
    };

    /* =========================================================
       PAGE
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

                width: "100%",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                position: "relative",

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

                // background:
                    // "linear-gradient(135deg,#f8fafc 0%,#eef2ff 48%,#f0f9ff 100%)",

                "&::before": {
                    content: '""',

                    position:
                        "absolute",

                    width: {
                        xs: 280,
                        md: 500,
                    },

                    height: {
                        xs: 280,
                        md: 500,
                    },

                    borderRadius:
                        "50%",

                    background:
                        "radial-gradient(circle,rgba(37,99,235,0.12),transparent 70%)",

                    top: {
                        xs: -140,
                        md: -220,
                    },

                    right: {
                        xs: -140,
                        md: -200,
                    },
                },

                "&::after": {
                    content: '""',

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
                        "radial-gradient(circle,rgba(2,132,199,0.10),transparent 70%)",

                    bottom: -180,

                    left: -150,
                },
            }}
        >


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <motion.div
                variants={pageVariants}

                initial="hidden"

                animate="visible"

                style={{
                    width: "100%",
                    maxWidth: 660,
                    position: "relative",
                    zIndex: 2,
                    minWidth: 0,
                }}
            >

                {/* =================================================
                    CARD
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
                            sm: 3,
                            md: 3,
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
                            mx: { xs: -2.5, sm: -3, md: -3 },
                            mt: { xs: -2.5, sm: -3, md: -3 },
                            mb: 2.5,
                            px: { xs: 2.5, sm: 3, md: 3 },
                            pt: { xs: 2.5, sm: 3, md: 3 },
                            pb: 2.25,
                            background: "linear-gradient(135deg, #eff6ff 0%, #f8fbff 65%, #e0f2fe 100%)",
                            borderBottom: "none",
                            borderRadius: { xs: "21px 21px 16px 16px", md: "25px 25px 18px 18px" },
                        }}
                    >
                    {/* =================================================
                        LOGO / BRAND
                    ================================================= */}

                    <motion.div
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Stack
                            direction="row"
                            spacing={1}

                            sx={{
                                mb: 2,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "linear-gradient(135deg,#2563eb,#0284c7)",
                                    boxShadow:
                                        "0 8px 20px rgba(37,99,235,0.22)",
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
                                FREE ACCOUNT
                            </Box>
                        </Stack>
                    </motion.div>


                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <motion.div
                        variants={headerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Typography
                            sx={{
                                textAlign: "center",

                                fontSize: {
                                    xs: 30,
                                    sm: 34,
                                    md: 36,
                                },

                                fontWeight: 700,

                                color:
                                    "#0f172a",

                                letterSpacing: "-1.2px",

                                lineHeight:
                                    1.12,
                            }}
                        >
                            Create your{" "}
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
                                account
                            </Box>
                        </Typography>


                        <Typography
                            sx={{
                                textAlign: "center",

                                color:
                                    "#64748b",

                                fontSize: 16,
                                fontWeight: 400,

                                mt: 0.8,

                                mb: 0,

                                lineHeight:
                                    1.6,
                            }}
                        >
                            Start your journey with
                            AlgoSaathi today.
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
                                mb: 2.5,

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

                    {verificationMessage && (
                        <Alert
                            severity="success"
                            sx={{ mb: 2, borderRadius: "12px", fontSize: 13 }}
                        >
                            {verificationMessage}
                        </Alert>
                    )}

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <Box
                        component="form"
                        onSubmit={
                            signupStep === "email"
                                ? handleSendVerificationCode
                                : signupStep === "otp"
                                    ? handleVerifyEmail
                                    : handleSubmit
                        }
                    >

                        {signupStep === "email" ? (
                            <Stack spacing={2.25}>
                                <Typography
                                    sx={{
                                        color: "#475569",
                                        textAlign: "center",
                                        fontSize: 14,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    Start by verifying your email. We will send you a one-time code.
                                </Typography>

                                <TextField
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    autoComplete="email"
                                    sx={inputStyles}
                                    slotProps={{
                                        inputLabel: { shrink: true },
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlined />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading}
                                    endIcon={!loading && <ArrowForwardRounded />}
                                    sx={{
                                        height: 54,
                                        borderRadius: "14px",
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        background: "linear-gradient(135deg,#2563eb,#0284c7)",
                                        boxShadow: "0 6px 16px rgba(37,99,235,0.16)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg,#1d4ed8,#0369a1)",
                                            boxShadow: "0 8px 20px rgba(37,99,235,0.2)",
                                        },
                                    }}
                                >
                                    {loading ? "Sending code..." : "Send verification code"}
                                </Button>
                            </Stack>
                        ) : signupStep === "otp" ? (
                            <Stack spacing={2.25}>
                                <Typography
                                    sx={{
                                        color: "#475569",
                                        textAlign: "center",
                                        fontSize: 14,
                                        lineHeight: 1.7,
                                    }}
                                >
                                    We sent a six-digit code to{" "}
                                    <Box component="strong" sx={{ color: "#172033" }}>
                                        {form.email}
                                    </Box>
                                    . Enter it below to verify your account.
                                </Typography>

                                <TextField
                                    label="Verification code"
                                    placeholder="Enter 6-digit code"
                                    value={verificationCode}
                                    onChange={(event) => {
                                        setVerificationCode(
                                            event.target.value.replace(/\D/g, "").slice(0, 6)
                                        );
                                        setError(null);
                                    }}
                                    fullWidth
                                    required
                                    slotProps={{
                                        inputLabel: { shrink: true },
                                        htmlInput: {
                                            inputMode: "numeric",
                                            maxLength: 6,
                                            autoComplete: "one-time-code",
                                            style: {
                                                textAlign: "center",
                                                letterSpacing: "0.5em",
                                                fontSize: "1.25rem",
                                            },
                                        },
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlined />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    sx={inputStyles}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loading || verificationCode.length !== 6}
                                    endIcon={!loading && <ArrowForwardRounded />}
                                    sx={{
                                        height: 54,
                                        borderRadius: "14px",
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        background: "linear-gradient(135deg,#2563eb,#0284c7)",
                                        boxShadow: "0 6px 16px rgba(37,99,235,0.16)",
                                        "&:hover": {
                                            background: "linear-gradient(135deg,#1d4ed8,#0369a1)",
                                            boxShadow: "0 8px 20px rgba(37,99,235,0.2)",
                                        },
                                    }}
                                >
                                    {loading ? "Verifying..." : "Verify email"}
                                </Button>

                                <Button
                                    type="button"
                                    variant="text"
                                    disabled={loading}
                                    onClick={handleResendVerificationCode}
                                    sx={{
                                        textTransform: "none",
                                        color: "#2563eb",
                                        fontWeight: 600,
                                    }}
                                >
                                    Resend verification code
                                </Button>

                                <Button
                                    type="button"
                                    variant="text"
                                    disabled={loading}
                                    onClick={() => {
                                        setSignupStep("email");
                                        setVerificationCode("");
                                        setVerificationMessage("");
                                        setError(null);
                                    }}
                                    sx={{
                                        textTransform: "none",
                                        color: "#64748b",
                                    }}
                                >
                                    Change email address
                                </Button>
                            </Stack>
                        ) : (
                        <Stack
                            spacing={{ xs: 1.8, sm: 2 }}
                        >
                            <Alert severity="success" sx={{ borderRadius: "12px" }}>
                                Email verified: {form.email}
                            </Alert>

                            {/* FIRST + LAST */}

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row",
                                }}
                                spacing={{ xs: 1.5, sm: 1.75 }}
                            >

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        minWidth: 0,
                                    }}
                                >
                                    <TextField
                                        label="First name"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        value={
                                            form.firstName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        fullWidth
                                        required
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
                                                            <PersonOutlined />
                                                        </InputAdornment>
                                                    ),
                                            },
                                        }}
                                    />
                                </motion.div>


                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        delay:
                                            0.05,
                                    }}
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        minWidth: 0,
                                    }}
                                >
                                    <TextField
                                        label="Last name"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        value={
                                            form.lastName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        fullWidth
                                        sx={
                                            inputStyles
                                        }
                                        slotProps={{
                                            inputLabel: {
                                                shrink:
                                                    true,
                                            },
                                        }}
                                    />
                                </motion.div>

                            </Stack>


                            {/* PHONE + ROLE */}

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row",
                                }}
                                spacing={{ xs: 1.5, sm: 1.75 }}
                            >

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        minWidth: 0,
                                    }}
                                >
                                    <TextField
                                        label="Phone number"
                                        name="phoneNumber"
                                        type="tel"
                                        placeholder="+91 9876543210"
                                        value={
                                            form.phoneNumber
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        fullWidth
                                        required
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
                                                            <PhoneOutlined />
                                                        </InputAdornment>
                                                    ),
                                            },
                                        }}
                                    />
                                </motion.div>


                            </Stack>


                            {/* PASSWORDS */}

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row",
                                }}
                                spacing={{ xs: 1.5, sm: 1.75 }}
                                sx={{ alignItems: "flex-start" }}
                            >

                                {/* PASSWORD */}

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        minWidth: 0,
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
                                        placeholder="Create password"
                                        value={
                                            form.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        fullWidth
                                        required
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
                                                                size="small"
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        (prev) =>
                                                                            !prev
                                                                    )
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


                                    {form.password && (
                                        <Box
                                            sx={{
                                                mt:
                                                    1,

                                                px:
                                                    0.5,
                                            }}
                                        >
                                            <LinearProgress
                                                variant="determinate"
                                                value={
                                                    passwordStrength.value
                                                }
                                                sx={{
                                                    height:
                                                        5,

                                                    borderRadius:
                                                        "10px",

                                                    backgroundColor:
                                                        "#f7f7f7",

                                                    "& .MuiLinearProgress-bar":
                                                    {
                                                        borderRadius:
                                                            "10px",

                                                        backgroundColor:
                                                            passwordStrength.value ===
                                                                100
                                                                ? "#16a34a"
                                                                : passwordStrength.value >=
                                                                    60
                                                                    ? "#f59e0b"
                                                                    : "#ef4444",
                                                    },
                                                }}
                                            />

                                            <Typography
                                                sx={{
                                                    mt:
                                                        0.5,

                                                    fontSize:
                                                        11,

                                                    color:
                                                        passwordStrength.value ===
                                                            100
                                                            ? "#16a34a"
                                                            : passwordStrength.value >=
                                                                60
                                                                ? "#d97706"
                                                                : "#ef4444",

                                                    fontWeight:
                                                        600,
                                                }}
                                            >
                                                {
                                                    passwordStrength.text
                                                }
                                            </Typography>
                                        </Box>
                                    )}
                                </motion.div>


                                {/* CONFIRM PASSWORD */}

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{
                                        delay:
                                            0.05,
                                    }}
                                    style={{
                                        width: "100%",
                                        flex: 1,
                                        minWidth: 0,
                                    }}
                                >
                                    <TextField
                                        label="Confirm password"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm password"
                                        value={
                                            form.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        fullWidth
                                        required
                                        error={
                                            !!form.confirmPassword &&
                                            form.password !==
                                            form.confirmPassword
                                        }
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
                                                                size="small"
                                                                onClick={() =>
                                                                    setShowConfirmPassword(
                                                                        (prev) =>
                                                                            !prev
                                                                    )
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
                                                                {showConfirmPassword ? (
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


                                    {form.confirmPassword &&
                                        form.password ===
                                        form.confirmPassword && (
                                            <Stack
                                                direction="row"
                                                spacing={0.5}

                                                sx={{
                                                    mt:
                                                        0.5,

                                                    ml:
                                                        0.5,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <CheckCircleRounded
                                                    sx={{
                                                        fontSize:
                                                            14,

                                                        color:
                                                            "#16a34a",
                                                    }}
                                                />

                                                <Typography
                                                    sx={{
                                                        fontSize:
                                                            11,

                                                        color:
                                                            "#16a34a",

                                                        fontWeight:
                                                            600,
                                                    }}
                                                >
                                                    Passwords match
                                                </Typography>
                                            </Stack>
                                        )}
                                </motion.div>

                            </Stack>


                            {/* SUBMIT */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 15,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay:
                                        0.25,

                                    duration:
                                        0.5,
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

                                        mt:
                                            0.5,

                                        borderRadius:
                                            "14px",

                                        textTransform:
                                            "none",

                                        fontSize:
                                            17,

                                        fontWeight:
                                            600,

                                        background:
                                            "linear-gradient(135deg,#2563eb,#0284c7)",

                                        boxShadow:
                                            "0 12px 28px rgba(37,99,235,0.22)",

                                        transition:
                                            "all 0.25s ease",

                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg,#1d4ed8,#0369a1)",

                                            transform:
                                                "translateY(-2px)",

                                            boxShadow:
                                                "0 16px 35px rgba(37,99,235,0.28)",
                                        },

                                        "&:disabled": {
                                            background:
                                                "#93c5fd",

                                            color:
                                                "#ffffff",
                                        },
                                    }}
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}
                                </Button>
                            </motion.div>

                        </Stack>
                        )}
                    </Box>


                    {/* =================================================
                        GOOGLE SIGN UP
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
                        LOGIN
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
                        Already have an account?{" "}

                        <Box
                            component="span"
                            onClick={() =>
                                navigate("/login", { state: location.state })
                            }
                            sx={{
                                color:
                                    "#2563eb",

                                fontWeight:
                                    600,

                                cursor:
                                    "pointer",

                                "&:hover": {
                                    textDecoration:
                                        "underline",

                                    color:
                                        "#1d4ed8",
                                },
                            }}
                        >
                            Sign in
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
                                450,

                            mx:
                                "auto",
                        }}
                    >
                        By creating an account, you agree
                        to our terms and privacy policy.
                    </Typography>

                </Box>

            </motion.div>

        </Box>
    );
};


export default Signup;