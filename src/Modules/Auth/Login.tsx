import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    IconButton,
    InputAdornment,
    Alert,
    Divider
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    EmailOutlined,
    LockOutlined,
    ArrowForwardRounded
} from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";
import { setAuthData } from "../../utils/auth";

interface LoginForm {
    email: string;
    password: string;
}


const inputStyles = {
    "& .MuiOutlinedInput-root": {
        height: 48,
        borderRadius: "12px",

        backgroundColor:
            "rgba(35, 31, 227, 0.17)",

        transition:
            "all 0.25s ease",

        "& fieldset": {
            borderColor:
                "rgba(63, 29, 230, 0.35)",
            borderWidth: "1px"
        },

        "&:hover fieldset": {
            borderColor:
                "#280dd692"
        },

        "&.Mui-focused": {
            backgroundColor: "#2107cb5a",
            boxShadow:
                "0 0 0 3px rgba(37,99,235,0.10)",
            border: "white",
        },

        "&.Mui-focused fieldset": {
            borderColor:
                "#2563eb",
            borderWidth: "2px"
        }
    },

    /*
    |--------------------------------------------------------------------------
    | LABEL
    |--------------------------------------------------------------------------
    */

    "& .MuiInputLabel-root": {
        color: "#f1f3f6",
        fontWeight: 500,

        backgroundColor:
            "#1a1accaa",

        padding:
            "0 5px",

        borderRadius:
            "4px"
    },

    "& .MuiInputLabel-root.Mui-focused": {
        color: "#2563eb",
        fontWeight: 600,

        backgroundColor:
            "#2b13e2a2"
    },

    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
        color: "#475569",

        backgroundColor:
            "#f1f5f9",

        padding:
            "0 5px",

        borderRadius:
            "4px"
    },

    "& .MuiInputLabel-root.Mui-focused.MuiInputLabel-shrink": {
        color: "#1049c2",

        backgroundColor:
            "#ffffff"
    },

    /*
    |--------------------------------------------------------------------------
    | INPUT TEXT
    |--------------------------------------------------------------------------
    */

    "& .MuiOutlinedInput-input": {
        color: "#eff1f5",
        fontSize: "14px"
    },

    "& .MuiOutlinedInput-input::placeholder": {
        color: "#2171e1",
        opacity: 1
    },


    "& .MuiInputAdornment-root svg": {
        color: "#64748b"
    }
};


const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] =  useState<string | null>(null);

    const [showPassword, setShowPassword] =    useState(false);

    const handleChange = (  e: React.ChangeEvent<HTMLInputElement>  ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError(null);
    };

    const handleSubmit = async ( e: React.FormEvent  ) => {
        e.preventDefault();

        setError(null);

        if (!form.email || !form.password) {
            setError(
                "Please fill in all fields"
            );
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(
                "/auth/login",
                form
            );

            console.log(
                "Login successful:",
                response.data
            );

            setAuthData(
                response.data.tokens.accessToken,
                response.data.user
            );

            navigate("/dashboard");

        } catch (err: any) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Invalid credentials"
            );

        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                opacity: 0,
                animation: "pageFadeIn 0.35s ease-out forwards",

                "@keyframes pageFadeIn": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(10px)"
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                },

                p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                },

                background: "transparent",
                borderRadius: 4
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    mx: "auto"
                }}
            >

                {/* Heading */}

                <Box
                    sx={{
                        mb: 4,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 25,
                                sm: 29
                            },

                            fontWeight: 800,

                            color: "#f0f2f6",

                            letterSpacing:
                                "-0.8px",

                            mb: 2
                        }}
                    >
                        Welcome back
                    </Typography>

                    <Typography
                        sx={{
                            color: "#ccd4e1",
                            fontSize: 13.5
                        }}
                    >
                        Sign in to continue your
                        AlgoSaathi journey.
                    </Typography>
                </Box>


                {/* Error */}

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2,
                            py: 0.2,
                            borderRadius: "10px",
                            fontSize: 12.5
                        }}
                    >
                        {error}
                    </Alert>
                )}


                {/* Login Form */}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2.2}>

                        {/* Email */}

                        <TextField
                            label="Email address"
                            name="email"
                            type="email"
                            placeholder="Please Enter Your Email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={inputStyles}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlined />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />


                        {/* Password */}

                        <TextField
                            label="Password"
                            name="password"
                            placeholder="Enter Your Password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={inputStyles}
                            slotProps={{
                                input: {

                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlined />
                                        </InputAdornment>
                                    ),

                                    endAdornment: (
                                        <InputAdornment position="end">

                                            <IconButton
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        prev =>
                                                            !prev
                                                    )
                                                }
                                                edge="end"
                                                aria-label={
                                                    showPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                                sx={{
                                                    color:
                                                        "#64748b",

                                                    "&:hover": {
                                                        color:
                                                            "#2563eb",

                                                        background:
                                                            "rgba(37,99,235,0.08)"
                                                    }
                                                }}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>

                                        </InputAdornment>
                                    )
                                }
                            }}
                        />


                        {/* Forgot Password */}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: "3px !important"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 12.5,
                                    color: "#f8f9fa",
                                    cursor: "pointer",
                                    fontWeight: 600,

                                    "&:hover": {
                                        textDecoration:
                                            "underline"
                                    }
                                }}
                            >
                                Forgot password?
                            </Typography>
                        </Box>


                        {/* Login Button */}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            endIcon={
                                !loading && (
                                    <ArrowForwardRounded />
                                )
                            }
                            sx={{
                                height: 54,

                                borderRadius:
                                    "14px",

                                textTransform:
                                    "none",

                                fontSize: 15.5,

                                fontWeight: 700,

                                background:
                                    "linear-gradient(135deg,#2563eb,#0284c7)",

                                boxShadow:
                                    "0 12px 28px rgba(37,99,235,0.28)",

                                transition:
                                    "all 0.25s ease",

                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg,#1d4ed8,#0369a1)",

                                    transform:
                                        "translateY(-2px)",

                                    boxShadow:
                                        "0 16px 32px rgba(37,99,235,0.35)"
                                },

                                "&:active": {
                                    transform:
                                        "translateY(0)"
                                }
                            }}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign in"}
                        </Button>

                    </Stack>
                </Box>


                {/* Divider */}

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        my: 2.2,
                        alignItems: "center"
                    }}
                >
                    <Divider
                        sx={{
                            flex: 1,
                            borderColor:
                                "rgba(214, 218, 227, 0.97)"
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 11,
                            color: "#d0d4da"
                        }}
                    >
                        OR
                    </Typography>

                    <Divider
                        sx={{
                            flex: 1,
                            borderColor:
                                "rgba(223, 227, 235, 0.88)"
                        }}
                    />
                </Stack>


                {/* Signup */}

                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: 13.5,
                        color: "#f9fafc"
                    }}
                >
                    Don't have an account?{" "}

                    <Box
                        component="span"
                        onClick={handleSignup}
                        sx={{
                            color: "#d6dae3",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize:18,
                            "&:hover": {
                                textDecoration:
                                    "underline"
                            }
                        }}
                    >
                        Sign up
                    </Box>
                </Typography>


                {/* Terms */}

                <Typography
                    sx={{
                        textAlign: "center",

                        color: "#cfd6e0",

                        fontSize: 10.5,

                        mt: 1,

                        lineHeight: 1.4
                    }}
                >
                    By signing in, you agree
                    to our terms and privacy policy.
                </Typography>

            </Box>
        </Box>
    );
};

export default Login;