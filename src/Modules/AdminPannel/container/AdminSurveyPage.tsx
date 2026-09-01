import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Stack,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Divider,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

import { useNavigate } from "react-router-dom";
import { getAllUsersQuery } from "../api/api"; // apne actual path ke according change karo


const AdminSurveyPage = () => {

    const navigate = useNavigate();

    const [surveys, setSurveys] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchSurveys = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await getAllUsersQuery();

                console.log("Survey Response:", response);

                setSurveys(
                    response?.data?.users || []
                );

            } catch (error: any) {

                console.error(
                    "Failed to fetch surveys:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load survey data"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchSurveys();

    }, []);


    const handleBack = () => {
        navigate("/admin-dashboard");
    };


    return (

        <Box
            sx={{
                minHeight: "100vh",
                maxWidth: "95%",
                margin: "0 auto",
                background: "#f5f8fa",
                borderRadius: ".5rem",
                border: "1px solid rgba(10, 130, 177, 0.34)",
                p: {
                    xs: 2,
                    md: 4,
                },
            }}
        >

            {/* =========================
                HEADER
            ========================= */}

            

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 2,
                        md: 3,
                    },
                    maxWidth: "80%",
                    margin: "0 auto",

                    borderRadius: 4,

                    border:
                        "1px solid rgba(7,93,126,0.10)",

                    background:
                        "#ffffff",
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    sx={{
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },

                        justifyContent:
                            "space-between",
                    }}
                >

                    <Box >

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 900,
                                color: "#075d7e",
                            }}
                        >
                            User Surveys
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            View all queries submitted
                            by users.
                        </Typography>

                    </Box>


                    <Button
                        variant="outlined"
                        startIcon={
                            <ArrowBackIcon />
                        }
                        onClick={handleBack}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            borderColor: "#075d7e",
                            color: "#075d7e",

                            "&:hover": {
                                borderColor: "#043b52",
                                background:
                                    "rgba(7,93,126,0.05)",
                            },
                        }}
                    >
                        Back to Dashboard
                    </Button>

                </Stack>

            </Paper>


            {/* =========================
                SURVEY COUNT
            ========================= */}

            <Box
                sx={{
                    mt: 5,
                    mb: 5,
                    margin: "auto", maxWidth: "80%"
                }}
            >

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{p:3}}
                >
                    Total Surveys:{" "}
                    <strong>
                        {surveys.length}
                    </strong>
                </Typography>

            </Box>


            {/* =========================
                LOADING
            ========================= */}

            {loading && (

                <Box
                    sx={{
                        minHeight: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        maxWidth: "80%",
                        margin: "0 auto",

                    }}
                >

                    <CircularProgress
                        sx={{
                            color: "#075d7e",
                        }}
                    />

                </Box>

            )}


            {/* =========================
                ERROR
            ========================= */}

            {!loading && error && (

                <Alert
                    severity="error"
                    sx={{
                        borderRadius: 3,
                    }}
                >
                    {error}
                </Alert>

            )}


            {/* =========================
                EMPTY STATE
            ========================= */}

            {!loading &&
                !error &&
                surveys.length === 0 && (

                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            textAlign: "center",
                            borderRadius: 4,
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                            }}
                        >
                            No Surveys Found
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 1,
                            }}
                        >
                            No user queries have been
                            submitted yet.
                        </Typography>

                    </Paper>

                )}


            {/* =========================
                SURVEY CARDS
            ========================= */}

            {!loading &&
                !error &&
                surveys.length > 0 && (

                    <Stack spacing={2} sx={{ margin: "0 auto", maxWidth: "80%" }}>

                        {surveys.map(
                            (survey, index) => (

                                <Paper
                                    key={
                                        survey._id ||
                                        index
                                    }
                                    elevation={0}
                                    sx={{
                                        p: {
                                            xs: 2,
                                            md: 3,
                                        },

                                        borderRadius: 4,

                                        border: "1px solid rgba(7,93,126,0.10)",

                                        transition:
                                            "all 0.25s ease",

                                        "&:hover": {
                                            boxShadow:
                                                "0 12px 30px rgba(7,93,126,0.08)",
                                            transform:
                                                "translateY(-2px)",
                                        },
                                    }}
                                >

                                    {/* TOP */}

                                    <Stack
                                        direction={{
                                            xs: "column",
                                            md: "row",
                                        }}
                                        sx={{
                                            justifyContent:
                                                "space-between",
                                            gap: 2,
                                        }}
                                    >

                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            sx={{
                                                alignItems:
                                                    "center",
                                            }}
                                        >

                                            <Box
                                                sx={{
                                                    width: 46,
                                                    height: 46,
                                                    borderRadius:
                                                        "50%",

                                                    display:
                                                        "flex",

                                                    alignItems:
                                                        "center",

                                                    justifyContent:
                                                        "center",

                                                    background:
                                                        "linear-gradient(135deg,#075d7e,#14b8a6)",

                                                    color: "#fff",
                                                }}
                                            >
                                                <PeopleAltIcon />
                                            </Box>


                                            <Box>

                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 900,
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    {
                                                        survey.fullName
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Survey #
                                                    {index + 1}
                                                </Typography>

                                            </Box>

                                        </Stack>


                                        <Chip
                                            label={
                                                survey.educationLevel
                                            }
                                            sx={{
                                                width:
                                                    "fit-content",

                                                fontWeight: 700,

                                                textTransform:
                                                    "capitalize",

                                                color:
                                                    "#075d7e",

                                                background:
                                                    "#e8f7f8",
                                            }}
                                        />

                                    </Stack>


                                    <Divider
                                        sx={{
                                            my: 2,
                                        }}
                                    />


                                    {/* USER INFO */}

                                    <Box
                                        sx={{
                                            display: "grid",

                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                sm: "1fr 1fr",
                                                md: "1fr 1fr 1fr",
                                            },

                                            gap: 2,
                                        }}
                                    >

                                        {/* MOBILE */}

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                        >

                                            <PhoneIcon
                                                sx={{
                                                    color:
                                                        "#075d7e",
                                                    fontSize: 21,
                                                }}
                                            />

                                            <Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Mobile
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {
                                                        survey.mobile
                                                    }
                                                </Typography>

                                            </Box>

                                        </Stack>


                                        {/* EMAIL */}

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                        >

                                            <EmailOutlinedIcon
                                                sx={{
                                                    color:
                                                        "#075d7e",
                                                    fontSize: 21,
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    minWidth: 0,
                                                }}
                                            >

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Email
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 700,
                                                        overflow:
                                                            "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {
                                                        survey.email
                                                    }
                                                </Typography>

                                            </Box>

                                        </Stack>


                                        {/* SCHOOL */}

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                        >

                                            <SchoolOutlinedIcon
                                                sx={{
                                                    color:
                                                        "#075d7e",
                                                    fontSize: 21,
                                                }}
                                            />

                                            <Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    School /
                                                    Institute
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {
                                                        survey.schoolname ||
                                                        "Not provided"
                                                    }
                                                </Typography>

                                            </Box>

                                        </Stack>

                                    </Box>


                                    {/* MESSAGE */}

                                    <Box
                                        sx={{
                                            mt: 2.5,
                                            p: 2,
                                            borderRadius: 3,
                                            background:
                                                "#f7fafb",
                                        }}
                                    >

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                                alignItems:
                                                    "flex-start",
                                            }}
                                        >

                                            <MessageOutlinedIcon
                                                sx={{
                                                    color:
                                                        "#075d7e",
                                                    fontSize: 21,
                                                    mt: 0.2,
                                                }}
                                            />

                                            <Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Message
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mt: 0.3,
                                                        lineHeight:
                                                            1.6,
                                                    }}
                                                >
                                                    {
                                                        survey.message ||
                                                        "No message provided"
                                                    }
                                                </Typography>

                                            </Box>

                                        </Stack>

                                    </Box>


                                    {/* DATE */}

                                    {survey.createdAt && (

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                display:
                                                    "block",
                                                mt: 1.5,
                                                textAlign:
                                                    "right",
                                            }}
                                        >
                                            Submitted:{" "}
                                            {new Date(
                                                survey.createdAt
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </Typography>

                                    )}

                                </Paper>

                            )
                        )}

                    </Stack>

                )}

        </Box>
    );
};

export default AdminSurveyPage;