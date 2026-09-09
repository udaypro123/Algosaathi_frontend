import {
    Alert,
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    LinearProgress,
    MenuItem,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../API/api";


interface SignupForm {
    firstName: string;
    Role: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}


const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<SignupForm>({
        firstName: "",
        Role: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError(null);

        if (
            !form.firstName ||
            !form.lastName ||
            !form.Role ||
            !form.email ||
            !form.password ||
            !form.confirmPassword ||
            !form.phoneNumber
        ) {
            setError(
                "Please fill in all required fields."
            );

            return;
        }


        if (form.phoneNumber.length < 10) {
            setError(
                "Please enter a valid phone number."
            );

            return;
        }


        if (form.password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );

            return;
        }


        if (
            form.password !==
            form.confirmPassword
        ) {
            setError(
                "Password and confirm password do not match."
            );

            return;
        }


        setLoading(true);

        try {
            await api.post(
                "/auth/register",
                {
                    firstName:
                        form.firstName,

                    role:
                        form.Role,

                    lastName:
                        form.lastName,

                    email:
                        form.email,

                    password:
                        form.password,

                    confirmPassword:
                        form.confirmPassword,

                    phoneNumber:
                        form.phoneNumber,
                }
            );


            navigate("/login");

        } catch (err: any) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to create account. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };


    /* =========================================================
       INPUT STYLE
    ========================================================= */

    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            minHeight: 52,

            borderRadius: "14px",

            backgroundColor: "rgb(247, 249, 251)",

            transition: "all 0.25s ease",

            "& fieldset": {
                borderColor: "#ffffff",
                borderWidth: "2px",
            },

            "&:hover": {
                backgroundColor: "rgb(247, 249, 251)",

                "& fieldset": {
                    borderColor: "#ffffff",
                },
            },

            "&.Mui-focused": {
                backgroundColor: "#ffffff",
            },

            /* Focus hone par blue border nahi */
            "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
                borderWidth: "2px",
            },
        },

        "& .MuiInputLabel-root": {
            color: "#64748b",
            fontWeight: 500,
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: "#000000",
        },

        "& .MuiOutlinedInput-input": {
            color: "#030408",
            fontSize: "14px",
            fontWeight: 500,
        },

        "& .MuiOutlinedInput-input::placeholder": {
            color: "#080e1553",
            opacity: 1,
        },

        "& .MuiInputAdornment-root svg": {
            color: "#64748b",
            fontSize: 21,
        },

        /* Chrome Autofill / Suggestion Background */
        "& input:-webkit-autofill": {
            WebkitBoxShadow:
                "0 0 0 1000px rgb(247, 249, 251) inset",

            WebkitTextFillColor:
                "#030408",

            transition:
                "background-color 9999s ease-in-out 0s",
        },

        "& input:-webkit-autofill:hover": {
            WebkitBoxShadow:
                "0 0 0 1000px rgb(247, 249, 251) inset",
        },

        "& input:-webkit-autofill:focus": {
            WebkitBoxShadow:
                "0 0 0 1000px #ffffff inset",

            WebkitTextFillColor:
                "#030408",
        },
    };

    /* =========================================================
       PAGE
    ========================================================= */

    return (
        <Box
            sx={{
                minHeight: "100vh",

                width: "100%",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                position: "relative",

                overflow: "hidden",

                px: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },

                py: {
                    xs: 4,
                    md: 6,
                },

                background:
                    "linear-gradient(135deg,#f8fafc 0%,#eef2ff 48%,#f0f9ff 100%)",

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
                    maxWidth: 760,
                    position: "relative",
                    zIndex: 2,
                }}
            >

                {/* =================================================
                    CARD
                ================================================= */}

                <Box
                    sx={{
                        width:
                            "100%",

                        background: "white",

                        backdropFilter:
                            "blur(20px)",

                        WebkitBackdropFilter:
                            "blur(20px)",

                        // border:  "1px solid rgba(148,163,184,0.25)",

                        borderRadius: {
                            xs: "22px",
                            md: "30px",
                        },

                        p: {
                            xs: 2.5,
                            sm: 4,
                            md: 5,
                        },

                        boxShadow:
                            "0 30px 90px rgba(15,23,42,0.10)",

                        position:
                            "relative",

                        overflow:
                            "hidden",

                        "&::before": {
                            content:
                                '""',

                            position:
                                "absolute",

                            top: 0,

                            left: 0,

                            right: 0,

                            height:
                                "4px",

                            // background:
                            //     "linear-gradient(90deg,#2563eb,#0284c7,#06b6d4)",
                        },
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
                                justifyContent: "center"
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
                                    fontSize:
                                        23,

                                    fontWeight:
                                        900,

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
                                textAlign:
                                    "center",

                                fontSize: {
                                    xs: 27,
                                    sm: 32,
                                    md: 38,
                                },

                                fontWeight:
                                    900,

                                color:
                                    "#0f172a",

                                letterSpacing:
                                    "-1.2px",

                                lineHeight:
                                    1.15,
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
                                textAlign:
                                    "center",

                                color:
                                    "#64748b",

                                fontSize:
                                    14,

                                mt: 1,

                                mb: 4,

                                lineHeight:
                                    1.6,
                            }}
                        >
                            Start your journey with
                            AlgoSaathi today.
                        </Typography>
                    </motion.div>


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

                            {/* FIRST + LAST */}

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={2}
                            >

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        width: "100%",
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
                                        required
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


                            {/* EMAIL */}

                            <motion.div
                                variants={fieldVariants}
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


                            {/* PHONE + ROLE */}

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={2}
                            >

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        width: "100%",
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
                                    }}
                                >
                                    <TextField
                                        select
                                        label="Select role"
                                        name="Role"
                                        value={
                                            form.Role
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
                                    >
                                        <MenuItem value="users">
                                            User
                                        </MenuItem>

                                        <MenuItem value="student">
                                            Student
                                        </MenuItem>
                                    </TextField>
                                </motion.div>

                            </Stack>


                            {/* PASSWORDS */}

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={2}
                                sx={{ alignItems: "flex-start" }}
                            >

                                {/* PASSWORD */}

                                <motion.div
                                    variants={fieldVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        width: "100%",
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
                                        placeholder="Create a password"
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
                                        placeholder="Repeat your password"
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
                                            15,

                                        fontWeight:
                                            800,

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
                    </Box>


                    {/* =================================================
                        DIVIDER
                    ================================================= */}

                    <Stack
                        direction="row"
                        spacing={2}

                        sx={{
                            my:
                                3,
                            alignItems: "center"
                        }}
                    >
                        <Divider
                            sx={{
                                flex:
                                    1,

                                borderColor:
                                    "#e2e8f0",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize:
                                    11,

                                color:
                                    "#94a3b8",

                                fontWeight:
                                    600,
                            }}
                        >
                            OR
                        </Typography>

                        <Divider
                            sx={{
                                flex:
                                    1,

                                borderColor:
                                    "#e2e8f0",
                            }}
                        />
                    </Stack>


                    {/* =================================================
                        LOGIN
                    ================================================= */}

                    <Typography
                        sx={{
                            textAlign:
                                "center",

                            fontSize:
                                13.5,

                            color:
                                "#64748b",
                        }}
                    >
                        Already have an account?{" "}

                        <Box
                            component="span"
                            onClick={() =>
                                navigate("/login")
                            }
                            sx={{
                                color:
                                    "#2563eb",

                                fontWeight:
                                    800,

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

                            fontSize:
                                10.5,

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