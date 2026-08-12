import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    IconButton,
    InputAdornment,
    Alert,
    LinearProgress,
    Divider
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
    PersonOutlined,
    EmailOutlined,
    PhoneOutlined,
    LockOutlined,
    CodeRounded,
    ArrowForwardRounded
} from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/api";

interface SignupForm {
    firstName: string;
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
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError(null);
    };

    const getPasswordStrength = () => {
        const password = form.password;

        if (!password) {
            return {
                value: 0,
                text: ""
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
                text: "Weak password"
            };
        }

        if (score <= 3) {
            return {
                value: 60,
                text: "Medium password"
            };
        }

        return {
            value: 100,
            text: "Strong password"
        };
    };

    const passwordStrength =
        getPasswordStrength();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setError(null);

        if (
            !form.firstName ||
            !form.lastName ||
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
            await api.post("/auth/register", {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                confirmPassword:
                    form.confirmPassword,
                phoneNumber: form.phoneNumber
            });

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

    const handlenaviagte = () => {
        navigate("/login");
    };

    /*
    |--------------------------------------------------------------------------
    | INPUT STYLES
    |--------------------------------------------------------------------------
    */

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
                backgroundColor:"#2107cb5a",
                boxShadow:
                    "0 0 0 3px rgba(37,99,235,0.10)",
                    border:"white",
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



    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",

                alignItems: "center",

                opacity: 0,
                animation:
                    "pageAppear 0.35s ease-out forwards",

                "@keyframes pageAppear": {
                    "0%": {
                        opacity: 0,
                        transform:
                            "translateY(10px)"
                    },

                    "100%": {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                },

                p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                },

                background: "transparent",

                // border: "1px solid rgba(255,255,255,0.18)",
                // boxShadow:
                //     "0 24px 80px rgba(15,23,42,0.14)",
                borderRadius: 4
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    mx: "auto"
                }}
            >
                {/* Mobile Logo */}

                <Stack
                    direction="row"
                    spacing={1}

                    sx={{
                        display: {
                            xs: "flex",
                            md: "none"
                        },
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5
                    }}
                >
                    <CodeRounded
                        sx={{
                            color:
                                "#0284c7",
                            fontSize: 29
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 23,
                            fontWeight: 800,
                            color:
                                "#020617"
                        }}
                    >
                        AlgoSaathi
                    </Typography>
                </Stack>

                {/* Heading */}

                <Box
                    sx={{
                        mb: 5,
                        display:"flex",
                        justifyContent:"center",
                        flexDirection:"column",
                        alignItems:"center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: 25,
                                sm: 29
                            },

                            fontWeight:
                                800,

                            color:
                                "#efeff3",

                            letterSpacing:
                                "-0.8px",

                            mb: 0.4
                        }}
                    >
                        Create your account
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                "#8b9097",

                            fontSize:
                                13.5
                        }}
                    >
                        Start your journey with
                        AlgoSaathi today.
                    </Typography>
                </Box>

                {/* Error */}

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 1.5,
                            py: 0.2,
                            borderRadius:
                                "10px",
                            fontSize:
                                12.5
                        }}
                    >
                        {error}
                    </Alert>
                )}

                {/* =================================================
                            FORM
                        ================================================== */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >
                    <Stack spacing={3}>

                        {/* First + Last */}

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={1.4}
                        >
                            <TextField
                                label="First name"
                                name="firstName"
                                placeholder="First Name"
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
                                        shrink: true
                                    },

                                    input: {
                                        startAdornment:
                                            (
                                                <InputAdornment position="start">
                                                    <PersonOutlined />
                                                </InputAdornment>
                                            )
                                    }
                                }}
                            />

                            <TextField
                                label="Last name"
                                name="lastName"
                                placeholder="Last Name"
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
                                        shrink: true
                                    }
                                }}
                            />
                        </Stack>

                        {/* Email */}

                        <TextField
                            label="Email address"
                            name="email"
                            placeholder="Please Enter Your Email"
                            type="email"
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
                                    shrink: true
                                },

                                input: {
                                    startAdornment:
                                        (
                                            <InputAdornment position="start">
                                                <EmailOutlined />
                                            </InputAdornment>
                                        )
                                }
                            }}
                        />

                        {/* Phone */}

                        <TextField
                            label="Phone number"
                            name="phoneNumber"
                            type="tel"
                            value={
                                form.phoneNumber
                            }
                            onChange={
                                handleChange
                            }
                            fullWidth
                            required
                            placeholder="+91 9876543210"
                            sx={
                                inputStyles
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                },

                                input: {
                                    startAdornment:
                                        (
                                            <InputAdornment position="start">
                                                <PhoneOutlined />
                                            </InputAdornment>
                                        )
                                }
                            }}
                        />

                        {/* Password + Confirm */}

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",

                            }}
                            spacing={1.4}
                            sx={{ alignItems: "flex-start" }}

                        >
                            {/* Password */}

                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "50%"
                                    }
                                }}
                            >
                                <TextField
                                    label="Password"
                                    name="password"
                                    placeholder="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
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
                                            shrink: true
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
                                                                    prev =>
                                                                        !prev
                                                                )
                                                            }
                                                            edge="end"
                                                            size="small"
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

                                {form.password && (
                                    <Box
                                        sx={{
                                            mt: 0.5
                                        }}
                                    >
                                        <LinearProgress
                                            variant="determinate"
                                            value={
                                                passwordStrength.value
                                            }
                                            sx={{
                                                height: 4,
                                                borderRadius: 5,

                                                backgroundColor:
                                                    "rgba(148,163,184,0.25)"
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                mt: 0.3,
                                                fontSize: 10.5,
                                                color:
                                                    "#475569"
                                            }}
                                        >
                                            {
                                                passwordStrength.text
                                            }
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* Confirm */}

                            <Box
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "50%"
                                    }
                                }}
                            >
                                <TextField
                                    label="Confirm password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
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
                                            shrink: true
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
                                                                setShowConfirmPassword(
                                                                    prev =>
                                                                        !prev
                                                                )
                                                            }
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            {showConfirmPassword ? (
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

                                {form.confirmPassword &&
                                    form.password !==
                                    form.confirmPassword && (
                                        <Typography
                                            sx={{
                                                color:
                                                    "#ef4444",
                                                fontSize:
                                                    10.5,
                                                mt: 0.3,
                                                ml: 1
                                            }}
                                        >
                                            Passwords
                                            do not
                                            match
                                        </Typography>
                                    )}
                            </Box>
                        </Stack>

                        {/* Submit */}

                        <Button
                            type="submit"
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
                                mt: 0.3,

                                height: 48,

                                borderRadius:
                                    "12px",

                                textTransform:
                                    "none",

                                fontSize: 15,

                                fontWeight: 700,

                                background:
                                    "linear-gradient(135deg,#2563eb,#0284c7)",

                                boxShadow:
                                    "0 10px 25px rgba(37,99,235,0.25)",

                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg,#1d4ed8,#0369a1)",

                                    transform:
                                        "translateY(-1px)",

                                    boxShadow:
                                        "0 14px 30px rgba(37,99,235,0.32)"
                                },

                                transition:
                                    "all 0.2s ease"
                            }}
                        >
                            {loading
                                ? "Creating account..."
                                : "Create account"}
                        </Button>
                    </Stack>
                </form>

                {/* Divider */}

                <Stack
                    direction="row"
                    spacing={2}

                    sx={{
                        my: 1.5,
                        alignItems: "center"
                    }}
                >
                    <Divider
                        sx={{
                            flex: 1,
                            borderColor:
                                "rgb(231, 235, 238)"
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: 11,
                            color:
                                "#c5cfdc"
                        }}
                    >
                        OR
                    </Typography>

                    <Divider
                        sx={{
                            flex: 1,
                            borderColor:
                                "rgb(224, 227, 234)"
                        }}
                    />
                </Stack>

                {/* Login */}

                <Typography
                    sx={{
                        textAlign:
                            "center",

                        fontSize:
                            13.5,

                        color:
                            "#f9fafc"
                    }}
                >
                    Already have an account?{" "}

                    <Box
                        component="span"
                        onClick={handlenaviagte}
                        sx={{
                            color:
                                "#ecf4ef",

                            fontWeight:
                                800,
                                fontSize:18,

                            cursor:
                                "pointer",

                            "&:hover": {
                                textDecoration:
                                    "underline"
                            }
                        }}
                    >
                        Sign in
                    </Box>
                </Typography>

                {/* Terms */}

                <Typography
                    sx={{
                        textAlign:
                            "center",

                        color:
                            "#94a3b8",

                        fontSize:
                            10.5,

                        mt: 1,

                        lineHeight:
                            1.4
                    }}
                >
                    By creating an account,
                    you agree to our terms
                    and privacy policy.
                </Typography>
            </Box>
        </Box>
    );
};

export default Signup;