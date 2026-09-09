import {
    Avatar,
    Box,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from "@mui/icons-material/BarChart";
import StorageIcon from "@mui/icons-material/Storage";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/api";
import { getAllUsersQuery, getAllYoutubePost } from "../../AdminPannel/api/api";


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
                // border: "1px solid rgba(0, 95, 132, 0.16)",

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

    const [totalUsers, setTotalUsers] = useState<number>(0);

    const [displayUsers, setDisplayUsers] = useState<number>(0);

    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);


    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                setLoadingUsers(true);

                const response = await getAllUsers();
                console.log("responce------------>", response)

                const count = response?.pagination?.count ?? 0;

                setTotalUsers(Number(count) - 1);
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

        const totalSteps = Math.ceil(duration / stepTime);

        const increment = Math.max(1, Math.ceil(target / totalSteps));

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            setDisplayUsers(current);
        }, stepTime);

        return () => clearInterval(interval);
    }, [totalUsers, loadingUsers]);


    return {
        totalUsers,
        displayUsers,
        loadingUsers,
    };
};



const AdminDashboard = () => {

    const {
        displayUsers,
        loadingUsers,
    } = useUserCount();

    const navigate = useNavigate();

    const [videoCount, setvideoCount] = useState<number>(0)
    const [requestCount, setRequestCount] = useState<number>(0)

    useEffect(() => {
        const fetchUserCount = async () => {
            try {


                const allyoutubePost = await getAllYoutubePost()
                const allUsersQuery = await getAllUsersQuery()
                console.log("response data ---------->", allyoutubePost, allUsersQuery)

                setvideoCount(allyoutubePost?.data?.length || 0)
                setRequestCount(allUsersQuery?.data?.pagination?.count || 0)
            } catch (error) {
                console.error(
                    "Failed to fetch user count:",
                    error
                );
            } finally {

            }
        };

        fetchUserCount();
    }, []);


    const handleNaviagteQuerryPage = () => {
        navigate("/users-survey")
    }



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

                    background: "linear-gradient(135deg, #075d7e 30%, #106477 60%, #096381 100%)",

                    border: "3px solid rgba(10, 130, 177, 0.34)",

                    boxShadow: "0 25px 55px rgba(23,37,84,0.18)",
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
                        title: "Video Content",
                        value: `${videoCount}+`,
                        description: "Published videos",
                        icon: <VideoLibraryIcon />,
                    },

                    {
                        title: "Learning Resources",
                        value: "100+",
                        description: "Available resources",
                        icon: <MenuBookIcon />,
                    },
                    {
                        title: "Total Survey",
                        value: `${requestCount}+`,
                        description: "All Users request",
                        icon: <GroupAddIcon />,
                    },

                    // {
                    //     title: "Platform Activity",
                    //     value: "Active",
                    //     description: "System status",
                    //     icon: <TrendingUpIcon />,
                    // },
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
                            onClick={
                                item?.title === "Total Survey"
                                    ? handleNaviagteQuerryPage
                                    : undefined
                            }
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
                                    alignItems: "center",
                                    cursor: "pointer"
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

export default AdminDashboard;

