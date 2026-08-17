import {
    Avatar,
    Box,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WorkIcon from '@mui/icons-material/Work';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TerminalIcon from "@mui/icons-material/Terminal";
import QuizIcon from "@mui/icons-material/Quiz";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from "@mui/icons-material/BarChart";
import StorageIcon from "@mui/icons-material/Storage";

import { useEffect, useState } from "react";

import api from "../../API/api";
import { getUserRole } from "../../utils/auth";
import { useNavigate } from "react-router-dom";


/* =========================================================
   LEARNING DATA
========================================================= */

const learningCards = [
    {
        title: "DSA & Problem Solving",
        description:
            "Master important DSA patterns and learn how to approach coding problems step by step.",
        icon: <CodeIcon />,
        tag: "Interview",
        progress: 72,
    },
    {
        title: "Interview Preparation",
        description:
            "Prepare for technical interviews with concepts, questions and practical explanations.",
        icon: <WorkIcon />,
        tag: "Career",
        progress: 58,
    },
    {
        title: "Programming Concepts",
        description:
            "Build strong fundamentals in JavaScript, Java and other essential programming concepts.",
        icon: <PsychologyIcon />,
        tag: "Fundamentals",
        progress: 84,
    },
    {
        title: "Development",
        description:
            "Learn React, Node.js, APIs, databases and real-world software development.",
        icon: <RocketLaunchIcon />,
        tag: "Development",
        progress: 46,
    },
];


/* =========================================================
   QUICK ACTIONS
========================================================= */

const quickActions = [
    {
        title: "Practice DSA",
        subtitle: "Solve coding problems",
        icon: <TerminalIcon />,
    },
    {
        title: "Watch Videos",
        subtitle: "Learn from tutorials",
        icon: <YouTubeIcon />,
    },
    {
        title: "Take a Quiz",
        subtitle: "Test your knowledge",
        icon: <QuizIcon />,
    },
    {
        title: "Explore Resources",
        subtitle: "Improve your skills",
        icon: <MenuBookIcon />,
    },
];


/* =========================================================
   COMMON BACKGROUND
========================================================= */

const DashboardWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",

                px: {
                    xs: 1.5,
                    sm: 2,
                    md: 3,
                },

                py: {
                    xs: 2,
                    md: 3,
                },

                borderRadius: "2rem",

                background: "linear-gradient(135deg,#f4f9fb 0%,#ffffff 45%,#f2f8fa 100%)",

                position: "relative",

                overflow: "hidden",
                border: "1px solid rgba(0, 95, 132, 0.16)",

                "&::before": {
                    content: '""',

                    position: "absolute",

                    width: 450,
                    height: 450,

                    borderRadius: "50%",

                    background: "linear-gradient(135deg,#f4f9fb 0%,#ffffff 45%,#f2f8fa 100%)",
                    border: "3px solid rgba(7, 92, 126, 1)",

                    top: -220,
                    right: -180,

                    animation:
                        "floatCircle 8s ease-in-out infinite",
                },

                "&::after": {
                    content: '""',

                    position: "absolute",

                    width: 350,
                    height: 350,

                    borderRadius: "50%",

                    // background: "rgba(5, 109, 132, 0.4)",
                    border: "3px solid rgba(7, 92, 126, 0.81)",
                    bottom: -180,
                    left: -150,

                    animation: "floatCircle 10s ease-in-out infinite reverse",
                },

                "@keyframes floatCircle": {
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
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: "95%",
                        sm: "90%",
                        md: "80%",
                    },

                    mx: "auto",

                    position: "relative",

                    zIndex: 2,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};


/* =========================================================
   USER COUNT HOOK
========================================================= */

const useUserCount = () => {

    const navigate = useNavigate()
    const [totalUsers, setTotalUsers] = useState<number>(0);

    const [displayUsers, setDisplayUsers] = useState<number>(0);

    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);


    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                setLoadingUsers(true);

                const response =
                    await api.get("/users/count");

                const count =
                    response?.data?.totalUsers ??
                    response?.data?.count ??
                    0;

                setTotalUsers(Number(count));
            } catch (error) {
                console.error(
                    "Failed to fetch user count:",
                    error
                );
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchUserCount();
    }, []);


    useEffect(() => {
        if (loadingUsers) return;

        const target = totalUsers;

        if (target <= 0) {
            setDisplayUsers(0);
            return;
        }

        let current = 0;

        const duration = 1500;
        const stepTime = 30;

        const totalSteps =
            Math.ceil(duration / stepTime);

        const increment =
            Math.max(
                1,
                Math.ceil(target / totalSteps)
            );

        const interval = setInterval(() => {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            setDisplayUsers(current);
        }, stepTime);

        return () =>
            clearInterval(interval);
    }, [totalUsers, loadingUsers]);


    return {
        totalUsers,
        displayUsers,
        loadingUsers,
    };
};


/* =========================================================
   USER DASHBOARD
========================================================= */

const UserDashboard = () => {
    const {
        displayUsers,
        loadingUsers,
    } = useUserCount();

    const navigate = useNavigate();
    const handleLearning = () => {
        navigate("/youtubepost")
    }

    return (
        <DashboardWrapper>

            {/* =================================================
                USER HERO
            ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        sm: 4,
                        md: 5,
                    },

                    borderRadius: 5,

                    color: "#fff",

                    overflow: "hidden",

                    position: "relative",

                    background:
                        "linear-gradient(135deg,#043b52 0%,#075d7e 50%,#0b8792 100%)",

                    boxShadow:
                        "0 25px 60px rgba(4,59,82,0.18)",

                    animation:
                        "heroEntry 0.8s ease",

                    "@keyframes heroEntry": {
                        from: {
                            opacity: 0,
                            transform:
                                "translateY(20px)",
                        },

                        to: {
                            opacity: 1,
                            transform:
                                "translateY(0)",
                        },
                    },
                }}
            >

                <Grid
                    container
                    spacing={4}
                    sx={{
                        alignItems: "center",
                    }}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 8,
                        }}
                    >

                        <Chip
                            icon={
                                <AutoAwesomeIcon />
                            }
                            label="Interview Focused Learning"
                            sx={{
                                color: "#fff",

                                background:
                                    "rgba(255,255,255,0.12)",

                                fontWeight: 700,

                                mb: 2,
                            }}
                        />

                        <Typography
                            sx={{
                                fontWeight: 900,

                                fontSize: {
                                    xs: "1.5rem",
                                    sm: "2rem",
                                    md: "2.5rem",
                                },

                                lineHeight: 1.05,
                            }}
                        >
                            Learn Smart.

                            <Box
                                component="span"

                                sx={{
                                    display:
                                        "block",

                                    color:
                                        "#7de3df",

                                    mt: 0.5,
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "2rem",
                                        md: "2.5rem",
                                    },

                                }}
                            >
                                Crack Interviews.
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,

                                maxWidth: 700,

                                color:
                                    "rgba(255,255,255,0.82)",

                                lineHeight: 1.8,
                            }}
                        >
                            Learn DSA, programming,
                            development and interview
                            concepts through practical
                            and easy-to-understand
                            content.
                        </Typography>

                        {/* <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                mt: 3,

                                flexWrap: "wrap",

                                rowGap: 1,
                            }}
                        >

                            {[
                                "DSA",
                                "Programming",
                                "Development",
                                "Interviews",
                            ].map((item) => (
                                <Chip
                                    key={item}
                                    label={item}
                                    sx={{
                                        color:
                                            "#fff",

                                        background:
                                            "rgba(255,255,255,0.1)",

                                        fontWeight: 600,
                                    }}
                                />
                            ))}

                        </Stack> */}

                    </Grid>


                    {/* COMMUNITY CARD */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 4,
                        }}
                    >

                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,

                                borderRadius: 4,

                                background:
                                    "rgba(255,255,255,0.1)",

                                backdropFilter:
                                    "blur(15px)",

                                border:
                                    "1px solid rgba(255,255,255,0.15)",

                                animation:
                                    "floatingCard 4s ease-in-out infinite",

                                "@keyframes floatingCard":
                                {
                                    "0%": {
                                        transform:
                                            "translateY(0)",
                                    },

                                    "50%": {
                                        transform:
                                            "translateY(-8px)",
                                    },

                                    "100%": {
                                        transform:
                                            "translateY(0)",
                                    },
                                },
                            }}
                        >

                            <GroupsIcon
                                sx={{
                                    fontSize: 45,
                                    color:
                                        "#7de3df",
                                }}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,

                                    color:
                                        "rgba(255,255,255,0.7)",
                                }}
                            >
                                AlgoSaathi Community
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "2.3rem",
                                    color:"white",
                                    fontWeight: 900,
                                }}
                            >
                                {loadingUsers
                                    ? "..."
                                    : `${displayUsers}+`}
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "rgba(255,255,255,0.75)",

                                    lineHeight: 1.6,
                                }}
                            >
                                Learners growing
                                their skills with us.
                            </Typography>

                        </Paper>

                    </Grid>

                </Grid>

            </Paper>


            {/* =================================================
                USER STATS
            ================================================= */}

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 2.5,
                    p: 2,
                    borderRadius: ".5rem",
                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                {[
                    {
                        title: "Your Streak",
                        value: "7 Days",
                        icon:
                            <LocalFireDepartmentIcon />,
                    },

                    {
                        title: "Problems Solved",
                        value: "24",
                        icon:
                            <CodeIcon />,
                    },

                    {
                        title: "Learning Hours",
                        value: "18h",
                        icon:
                            <AccessTimeIcon />,
                    },

                    {
                        title: "Achievements",
                        value: "5",
                        icon:
                            <EmojiEventsIcon />,
                    },
                ].map((item) => (

                    <Grid
                        key={item.title}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3,
                        }}
                    >

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,

                                borderRadius: 4,

                                background:
                                    "#fff",

                                border:
                                    "1px solid rgba(7,93,126,0.08)",

                                transition:
                                    "all 0.3s ease",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 18px 40px rgba(7,93,126,0.1)",
                                },
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >

                                <Avatar
                                    sx={{
                                        background:
                                            "linear-gradient(135deg,#075d7e,#14b8a6)",
                                    }}
                                >
                                    {
                                        item.icon
                                    }
                                </Avatar>

                                <Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            item.title
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize:
                                                "1.5rem",

                                            fontWeight:
                                                900,

                                            color:
                                                "#075d7e",
                                        }}
                                    >
                                        {
                                            item.value
                                        }
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                ))}

            </Grid>


            {/* =================================================
                QUICK START
            ================================================= */}

            <Box
                sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: ".5rem",
                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                <Typography
                    variant="overline"
                    color="primary"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                    QUICK START
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    Continue your learning
                </Typography>

                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 1,
                    }}
                >

                    {quickActions.map((item) => (

                        <Grid
                            key={item.title}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3,
                            }}


                        >

                            <Paper
                                elevation={0}
                                onClick={
                                    item.title === "Watch Videos"
                                        ? handleLearning
                                        : undefined
                                }
                                sx={{
                                    p: 2.5,

                                    borderRadius: 4,

                                    border:
                                        "1px solid rgba(7,93,126,0.08)",

                                    cursor:
                                        "pointer",

                                    transition:
                                        "all 0.3s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-5px)",

                                        boxShadow:
                                            "0 15px 35px rgba(7,93,126,0.1)",
                                    },
                                }}
                            >

                                <Avatar
                                    sx={{
                                        background:
                                            "linear-gradient(135deg,#075d7e,#14b8a6)",

                                        mb: 2,
                                    }}
                                >
                                    {
                                        item.icon
                                    }
                                </Avatar>

                                <Typography
                                    sx={{
                                        fontWeight:
                                            800,
                                    }}
                                >
                                    {
                                        item.title
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {
                                        item.subtitle
                                    }
                                </Typography>

                                <ArrowForwardIcon
                                    sx={{
                                        mt: 2,

                                        color:
                                            "#075d7e",
                                    }}
                                />

                            </Paper>

                        </Grid>

                    ))}

                </Grid>

            </Box>


            {/* =================================================
                LEARNING PATH
            ================================================= */}

            <Box
                sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: ".5rem",
                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                <Typography
                    variant="overline"
                    color="primary"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                    LEARNING PATH
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    Build skills that matter
                </Typography>

                <Grid
                    container
                    spacing={2.5}
                    sx={{
                        mt: 1,
                    }}
                >

                    {learningCards.map((item) => (

                        <Grid
                            key={item.title}
                            size={{
                                xs: 12,
                                md: 6,
                            }}
                        >

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,

                                    borderRadius: 4,

                                    border:
                                        "1px solid rgba(7,93,126,0.08)",

                                    transition:
                                        "all 0.3s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-6px)",

                                        boxShadow:
                                            "0 20px 45px rgba(7,93,126,0.1)",
                                    },
                                }}
                            >

                                <Stack
                                    direction="row"
                                    spacing={2}
                                >

                                    <Avatar
                                        sx={{
                                            width: 58,
                                            height: 58,

                                            background:
                                                "linear-gradient(135deg,#075d7e,#14b8a6)",
                                        }}
                                    >
                                        {
                                            item.icon
                                        }
                                    </Avatar>

                                    <Box>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{
                                                alignItems:
                                                    "center",

                                                flexWrap:
                                                    "wrap",
                                            }}
                                        >

                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight:
                                                        900,
                                                }}
                                            >
                                                {
                                                    item.title
                                                }
                                            </Typography>

                                            <Chip
                                                label={
                                                    item.tag
                                                }
                                                size="small"
                                                sx={{
                                                    color:
                                                        "#075d7e",

                                                    background:
                                                        "#eaf7f8",

                                                    fontWeight:
                                                        700,
                                                }}
                                            />

                                        </Stack>

                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                mt: 1,

                                                lineHeight:
                                                    1.7,
                                            }}
                                        >
                                            {
                                                item.description
                                            }
                                        </Typography>

                                    </Box>

                                </Stack>


                                <Box
                                    sx={{
                                        mt: 3,
                                    }}
                                >

                                    <Box
                                        sx={{
                                            height: 7,

                                            borderRadius:
                                                10,

                                            background:
                                                "#e8f1f3",

                                            overflow:
                                                "hidden",
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                width:
                                                    `${item.progress}%`,

                                                height:
                                                    "100%",

                                                background:
                                                    "linear-gradient(90deg,#075d7e,#14b8a6)",

                                                borderRadius:
                                                    10,

                                                transition:
                                                    "width 1s ease",
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </Paper>

                        </Grid>

                    ))}

                </Grid>

            </Box>


            {/* =================================================
                YOUTUBE
            ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    mt: 5,

                    p: {
                        xs: 3,
                        md: 5,
                    },

                    borderRadius: 5,

                    background:
                        "linear-gradient(135deg,#fff4f3,#ffffff)",

                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={3}
                    sx={{
                        alignItems:
                            "center",
                    }}
                >

                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,

                            background:
                                "#dc2626",
                        }}
                    >
                        <YouTubeIcon
                            sx={{
                                fontSize: 38,
                            }}
                        />
                    </Avatar>

                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >

                        <Typography
                            variant="overline"
                            sx={{
                                color:
                                    "#dc2626",

                                fontWeight:
                                    800,
                            }}
                        >
                            VIDEO LEARNING
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight:
                                    900,
                            }}
                        >
                            Learn through practical videos
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 1,

                                lineHeight:
                                    1.7,
                            }}
                        >
                            DSA patterns, interview
                            questions and development
                            concepts explained simply.
                        </Typography>

                    </Box>

                    <PlayCircleIcon
                        sx={{
                            fontSize: 65,

                            color:
                                "#dc2626",
                        }}
                    />

                </Stack>

            </Paper>


            {/* =================================================
                FOOTER
            ================================================= */}

            <Box
                sx={{
                    py: 4,

                    textAlign:
                        "center",
                }}
            >

                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Learn. Practice. Build. Grow.
                </Typography>

                <Typography
                    color="text.secondary"
                    variant="caption"
                >
                    © {new Date().getFullYear()} AlgoSaathi
                </Typography>

            </Box>

        </DashboardWrapper>
    );
};


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

const AdminDashboard = () => {

    const {
        displayUsers,
        loadingUsers,
    } = useUserCount();


    return (
        <DashboardWrapper>

            {/* =================================================
                ADMIN HEADER
            ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        md: 4,
                    },

                    borderRadius: 5,

                    color: "#fff",

                    background:
                        "linear-gradient(135deg,#172554,#075d7e)",

                    border: "3px solid rgba(10, 130, 177, 0.34)",

                    boxShadow:
                        "0 25px 55px rgba(23,37,84,0.18)",
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    sx={{
                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },

                        justifyContent:
                            "space-between",

                        gap: 3,
                    }}
                >

                    <Box>

                        <Chip
                            icon={
                                <AdminPanelSettingsIcon />
                            }
                            label="Administrator Dashboard"
                            sx={{
                                mb: 2,

                                color:
                                    "#fff",

                                background:
                                    "rgba(255,255,255,0.12)",

                                fontWeight:
                                    700,
                            }}
                        />

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight:
                                    900,

                                fontSize: {
                                    xs: "2rem",
                                    md: "3rem",
                                },
                            }}
                        >
                            AlgoSaathi Overview
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,

                                color:
                                    "rgba(255,255,255,0.75)",

                                maxWidth: 650,

                                lineHeight:
                                    1.7,
                            }}
                        >
                            Manage your learning platform,
                            monitor users and keep your
                            content organized from one
                            place.
                        </Typography>

                    </Box>


                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,

                            background:
                                "rgba(255,255,255,0.12)",

                            border:
                                "1px solid rgba(255,255,255,0.2)",
                        }}
                    >
                        <AdminPanelSettingsIcon
                            sx={{
                                fontSize: 42,
                            }}
                        />
                    </Avatar>

                </Stack>

            </Paper>


            {/* =================================================
                ADMIN STATS
            ================================================= */}

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 2.5,
                    p: 2,
                    borderRadius: ".5rem",
                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                {[
                    {
                        title:
                            "Total Users",
                        value:
                            loadingUsers
                                ? "..."
                                : `${displayUsers}+`,
                        description:
                            "Registered learners",
                        icon:
                            <PeopleAltIcon />,
                    },

                    {
                        title:
                            "Video Content",
                        value:
                            "100+",
                        description:
                            "Published videos",
                        icon:
                            <VideoLibraryIcon />,
                    },

                    {
                        title:
                            "Learning Resources",
                        value:
                            "100+",
                        description:
                            "Available resources",
                        icon:
                            <MenuBookIcon />,
                    },

                    {
                        title:
                            "Platform Activity",
                        value:
                            "Active",
                        description:
                            "System status",
                        icon:
                            <TrendingUpIcon />,
                    },
                ].map((item) => (

                    <Grid
                        key={item.title}
                        size={{
                            xs: 12,
                            sm: 6,
                            lg: 3,
                        }}
                    >

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,

                                borderRadius: 4,

                                border:
                                    "1px solid rgba(7,93,126,0.08)",

                                transition:
                                    "all 0.3s ease",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 18px 40px rgba(7,93,126,0.1)",
                                },
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >

                                <Avatar
                                    sx={{
                                        background:
                                            "linear-gradient(135deg,#075d7e,#14b8a6)",
                                    }}
                                >
                                    {
                                        item.icon
                                    }
                                </Avatar>

                                <Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            item.title
                                        }
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize:
                                                "1.7rem",

                                            fontWeight:
                                                900,

                                            color:
                                                "#075d7e",
                                        }}
                                    >
                                        {
                                            item.value
                                        }
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {
                                            item.description
                                        }
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                ))}

            </Grid>


            {/* =================================================
                ADMIN QUICK ACTIONS
            ================================================= */}

            <Box
                sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: ".5rem",
                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                <Typography
                    variant="overline"
                    color="primary"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                    MANAGEMENT
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    Manage your platform
                </Typography>


                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 1,
                    }}
                >

                    {[
                        {
                            title:
                                "Manage Users",
                            description:
                                "View and manage registered users.",
                            icon:
                                <PeopleAltIcon />,
                        },

                        {
                            title:
                                "Add Content",
                            description:
                                "Publish new learning content.",
                            icon:
                                <AddCircleIcon />,
                        },

                        {
                            title:
                                "YouTube Content",
                            description:
                                "Manage your video library.",
                            icon:
                                <YouTubeIcon />,
                        },

                        {
                            title:
                                "Analytics",
                            description:
                                "Monitor platform activity.",
                            icon:
                                <BarChartIcon />,
                        },
                    ].map((item) => (

                        <Grid
                            key={item.title}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3,
                            }}
                        >

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,

                                    borderRadius: 4,

                                    minHeight: 170,

                                    cursor:
                                        "pointer",

                                    border:
                                        "1px solid rgba(7,93,126,0.08)",

                                    transition:
                                        "all 0.3s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-7px)",

                                        boxShadow:
                                            "0 20px 40px rgba(7,93,126,0.1)",

                                        "& .adminIcon":
                                        {
                                            transform:
                                                "scale(1.1) rotate(-5deg)",
                                        },
                                    },
                                }}
                            >

                                <Avatar
                                    className="adminIcon"
                                    sx={{
                                        width: 55,
                                        height: 55,

                                        background:
                                            "linear-gradient(135deg,#075d7e,#14b8a6)",

                                        transition:
                                            "all 0.3s ease",
                                    }}
                                >
                                    {
                                        item.icon
                                    }
                                </Avatar>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 2,

                                        fontWeight:
                                            900,
                                    }}
                                >
                                    {
                                        item.title
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 0.5,

                                        lineHeight:
                                            1.6,
                                    }}
                                >
                                    {
                                        item.description
                                    }
                                </Typography>

                            </Paper>

                        </Grid>

                    ))}

                </Grid>

            </Box>


            {/* =================================================
                PLATFORM HEALTH
            ================================================= */}

            <Grid
                container
                spacing={2.5}
                sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: ".5rem",
                    border: "3px solid rgba(10, 130, 177, 0.34)"
                }}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 7,
                    }}
                >

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,

                            height:
                                "100%",

                            borderRadius:
                                5,

                            border:
                                "1px solid rgba(7,93,126,0.08)",
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                alignItems:
                                    "center",
                            }}
                        >

                            <Avatar
                                sx={{
                                    background:
                                        "#e8f7f1",

                                    color:
                                        "#059669",
                                }}
                            >
                                <TrendingUpIcon />
                            </Avatar>

                            <Box>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight:
                                            900,
                                    }}
                                >
                                    Platform Overview
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Current platform status
                                </Typography>

                            </Box>

                        </Stack>


                        {[
                            {
                                title:
                                    "User Growth",
                                value:
                                    "Active",
                                width:
                                    "82%",
                            },

                            {
                                title:
                                    "Content Availability",
                                value:
                                    "Excellent",
                                width:
                                    "91%",
                            },

                            {
                                title:
                                    "Platform Engagement",
                                value:
                                    "Growing",
                                width:
                                    "74%",
                            },
                        ].map((item) => (

                            <Box
                                key={
                                    item.title
                                }
                                sx={{
                                    mt: 3,
                                }}
                            >

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",

                                        mb: 0.7,
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight:
                                                700,
                                        }}
                                    >
                                        {
                                            item.title
                                        }
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            item.value
                                        }
                                    </Typography>

                                </Stack>

                                <Box
                                    sx={{
                                        height: 8,

                                        borderRadius:
                                            10,

                                        background:
                                            "#e8f1f3",

                                        overflow:
                                            "hidden",
                                    }}
                                >

                                    <Box
                                        sx={{
                                            width:
                                                item.width,

                                            height:
                                                "100%",

                                            borderRadius:
                                                10,

                                            background:
                                                "linear-gradient(90deg,#075d7e,#14b8a6)",
                                        }}
                                    />

                                </Box>

                            </Box>

                        ))}

                    </Paper>

                </Grid>


                <Grid
                    size={{
                        xs: 12,
                        md: 5,
                    }}
                >

                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,

                            height:
                                "100%",

                            borderRadius:
                                5,

                            color:
                                "#fff",

                            background:
                                "linear-gradient(135deg,#043b52,#075d7e)",
                        }}
                    >

                        <StorageIcon
                            sx={{
                                fontSize: 45,

                                color:
                                    "#7de3df",
                            }}
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2,

                                fontWeight:
                                    900,
                            }}
                        >
                            System Status
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,

                                color:
                                    "rgba(255,255,255,0.7)",

                                lineHeight:
                                    1.7,
                            }}
                        >
                            Your platform is running
                            smoothly. Keep adding
                            valuable content for
                            learners.
                        </Typography>


                        <Stack
                            spacing={1.5}
                            sx={{
                                mt: 3,
                            }}
                        >

                            {[
                                "API Services",
                                "Database",
                                "Content System",
                                "Authentication",
                            ].map((item) => (

                                <Stack
                                    key={item}
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <CheckCircleIcon
                                        sx={{
                                            fontSize:
                                                18,

                                            color:
                                                "#7de3df",
                                        }}
                                    />

                                    <Typography
                                        variant="body2"
                                    >
                                        {
                                            item
                                        }
                                    </Typography>

                                </Stack>

                            ))}

                        </Stack>

                    </Paper>

                </Grid>

            </Grid>


            {/* =================================================
                ADMIN FOOTER
            ================================================= */}

            <Box
                sx={{
                    py: 4,

                    textAlign: "center",

                }}
            >

                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    AlgoSaathi Administration Panel
                </Typography>

                <Typography
                    color="text.secondary"
                    variant="caption"
                >
                    © {new Date().getFullYear()} AlgoSaathi
                </Typography>

            </Box>

        </DashboardWrapper>
    );
};


/* =========================================================
   HOME
========================================================= */

const Dashboard = () => {

    const userRole = getUserRole();

    if (userRole === "admin") {
        return <AdminDashboard />;
    }

    return <UserDashboard />;
};


export default Dashboard;