import  { useEffect, useState } from "react";
import {
    // Avatar,
    Badge,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatIcon from "@mui/icons-material/Chat";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/api";

import "../css/UserDashboard.css";
import PostCard from "../../../common/PostCard";
// import type { PostCardProps } from "../api/interface";



const posts = [
    {
        id: 1,
        author: "AlgoSaathi Admin",
        role: "Administrator",
        time: "2 hours ago",
        avatar: "A",
        type: "Announcement",
        title: "Welcome to the AlgoSaathi Community",
        content:
            "We are building a platform where people can learn, communicate, raise their voice and find useful solutions. Stay connected and keep contributing to the community.",
        likes: 24,
        comments: 8,
        src:"https://plus.unsplash.com/premium_photo-1780841708488-25d2581fdc66?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        author: "AlgoSaathi Team",
        role: "Community Team",
        time: "Yesterday",
        avatar: "A",
        type: "Community Update",
        title: "Your voice matters",
        content:
            "Have an issue or want to share something important with the community? Use the complaint and feedback section to reach the right team.",
        likes: 18,
        comments: 5,
        src:"https://plus.unsplash.com/premium_photo-1780596643314-4d11aa9ac8db?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        author: "AlgoSaathi Admin",
        role: "Administrator",
        time: "2 days ago",
        avatar: "A",
        type: "Platform Update",
        title: "New community resources are available",
        content:
            "Explore the latest resources, announcements and useful information added by our team.",
        likes: 32,
        comments: 11,
        src:"https://plus.unsplash.com/premium_photo-1663945779222-83acecbd856c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
];

const notifications = [
    {
        id: 1,
        title: "New announcement posted",
        description: "AlgoSaathi Admin shared a new announcement.",
        time: "10 min ago",
        type: "announcement",
        unread: true,
    },
    {
        id: 2,
        title: "Community update",
        description: "There is a new update from the community team.",
        time: "1 hour ago",
        type: "community",
        unread: true,
    },
    {
        id: 3,
        title: "Complaint status updated",
        description: "Your complaint has received a new update.",
        time: "3 hours ago",
        type: "complaint",
        unread: false,
    },
    {
        id: 4,
        title: "New resources available",
        description: "New resources have been added to the platform.",
        time: "Yesterday",
        type: "resource",
        unread: false,
    },
];

const quickAccess = [
    {
        title: "Complaints",
        description: "Raise or track your complaint",
        icon: <ReportProblemOutlinedIcon />,
        className: "quick-card complaint",
    },
    {
        title: "Announcements",
        description: "Latest updates from admin",
        icon: <CampaignOutlinedIcon />,
        className: "quick-card announcement",
    },
    {
        title: "Resources",
        description: "Useful community resources",
        icon: <MenuBookOutlinedIcon />,
        className: "quick-card resource",
    },
    {
        title: "Community",
        description: "Connect with the community",
        icon: <GroupsOutlinedIcon />,
        className: "quick-card community",
    },
];

/* -------------------------------------------------------
   USER COUNT
------------------------------------------------------- */

const useUserCount = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [displayUsers, setDisplayUsers] = useState(0);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchUsers = async () => {
            try {
                setLoadingUsers(true);

                const response = await getAllUsers();

                const count = response?.pagination?.count ?? 0;

                const target = Math.max(Number(count) - 1, 0);

                if (!mounted) return;

                setTotalUsers(target);
            } catch (error) {
                console.error("Unable to fetch users:", error);
            } finally {
                if (mounted) {
                    setLoadingUsers(false);
                }
            }
        };

        fetchUsers();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!totalUsers) {
            setDisplayUsers(0);
            return;
        }

        let current = 0;

        const interval = setInterval(() => {
            current += Math.ceil(totalUsers / 40);

            if (current >= totalUsers) {
                current = totalUsers;
                clearInterval(interval);
            }

            setDisplayUsers(current);
        }, 30);

        return () => clearInterval(interval);
    }, [totalUsers]);

    return {
        displayUsers,
        loadingUsers,
    };
};

/* -------------------------------------------------------
   NOTIFICATION ICON
------------------------------------------------------- */

const NotificationTypeIcon = ({ type }: { type: any }) => {
    if (type === "announcement") {
        return <CampaignOutlinedIcon />;
    }

    if (type === "complaint") {
        return <ReportProblemOutlinedIcon />;
    }

    if (type === "resource") {
        return <MenuBookOutlinedIcon />;
    }

    return <GroupsOutlinedIcon />;
};


/* -------------------------------------------------------
   NOTIFICATION CARD
------------------------------------------------------- */

const NotificationItem = ({ notification }: { notification: any }) => {
    return (
        <Box className={`notification-item ${notification.unread ? "unread" : ""}`}>
            <Box className="notification-icon">
                <NotificationTypeIcon type={notification?.type} />
            </Box>

            <Box className="notification-content">
                <Stack
                    sx={{ direction: "row", justifyContent: "space-between", alignItems: "center", gap: 1 }}

                >
                    <Typography className="notification-title">
                        {notification.title}
                    </Typography>

                    {notification.unread && (
                        <span className="notification-dot" />
                    )}
                </Stack>

                <Typography className="notification-description">
                    {notification.description}
                </Typography>

                <Stack
                    sx={{ direction: "row", justifyContent: "flex-start", alignItems: "center", gap: 1 }}
                    className="notification-time"
                >
                    <AccessTimeIcon />
                    {notification.time}
                </Stack>
            </Box>
        </Box>
    );
};

/* -------------------------------------------------------
   DASHBOARD
------------------------------------------------------- */

const UserDashboard = () => {
    const navigate = useNavigate();

    const { displayUsers, loadingUsers } = useUserCount();

    const handleComplaint = () => {
        navigate("/complaint");
    };

    const handleNotifications = () => {
        console.log("Open notifications");
    };

    const handleQuickAccess = (title: any) => {
        if (title === "Complaints") {
            navigate("/complaint");
            return;
        }

        if (title === "Announcements") {
            console.log("Open announcements");
            return;
        }

        if (title === "Resources") {
            console.log("Open resources");
            return;
        }

        if (title === "Community") {
            console.log("Open community");
        }
    };

    return (
        <Box className="dashboard-wrapper">
            <Box className="dashboard-container">

                {/* =====================================================
            HEADER
        ===================================================== */}

                <Box className="dashboard-topbar">
                    <Box>
                        <Typography className="dashboard-eyebrow">
                            ALGOSAATHI COMMUNITY
                        </Typography>

                        <Typography className="dashboard-heading">
                            Welcome back 👋
                        </Typography>

                        {/* <Typography className="dashboard-subheading">
                            Stay informed, stay connected and be part of meaningful
                            conversations.
                        </Typography> */}
                    </Box>

                    <Stack spacing={1.5} sx={{ direction: "row", alignItems: "center" }}>
                        <IconButton
                            className="notification-button"
                            onClick={handleNotifications}
                        >
                            <Badge badgeContent={2} color="error">
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>
                    </Stack>
                </Box>

                {/* =====================================================
            HERO / COMMUNITY SUMMARY
        ===================================================== */}

                <Paper className="community-banner" elevation={0}>
                    <Box className="banner-glow banner-glow-one" />
                    <Box className="banner-glow banner-glow-two" />

                    <Box className="banner-content">
                        <Chip
                            icon={<NotificationsActiveOutlinedIcon />}
                            label="Community Updates"
                            className="banner-chip"
                        />

                        <Typography className="banner-title">
                            Learn. Communicate.
                            <br />
                            <span>Raise your voice.</span>
                        </Typography>

                        <Typography className="banner-description">
                            Get the latest updates, community announcements and
                            important information from AlgoSaathi.
                        </Typography>

                        <Stack spacing={1.5} >
                            <Button
                                className="primary-banner-btn"
                                endIcon={<ArrowForwardIcon />}
                                onClick={handleComplaint}
                            >
                                Raise a Complaint
                            </Button>

                        </Stack>
                    </Box>

                    <Box className="community-stat">
                        <Box className="community-stat-icon">
                            <GroupsOutlinedIcon />
                        </Box>

                        <Typography className="community-stat-label">
                            COMMUNITY
                        </Typography>

                        <Typography className="community-stat-number">
                            {loadingUsers ? "..." : `${displayUsers}+`}
                        </Typography>

                        <Typography className="community-stat-text">
                            People connected with AlgoSaathi
                        </Typography>

                        <Box className="community-progress">
                            <Box className="community-progress-fill" />
                        </Box>

                        <Typography className="community-growth">
                            <TrendingUpIcon />
                            Growing every day
                        </Typography>
                    </Box>
                </Paper>

                {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

                <Box className="main-dashboard-grid">

                    {/* ================= POSTS ================= */}

                    <Box className="posts-section">

                        <Stack
                            sx={{ direction: "row", justifyContent: "space-between" }}
                            className="section-heading"
                        >
                            <Box>
                                <Typography className="section-overline">
                                    COMMUNITY FEED
                                </Typography>

                                <Typography className="section-title">
                                    Latest Updates
                                </Typography>
                            </Box>

                            {/* <Button
                                className="view-all-btn"
                                endIcon={<ArrowForwardIcon />}
                            >
                                View all
                            </Button> */}
                        </Stack>

                        <Stack spacing={2} sx={{display:"flex", flexDirection:"column", gap: ".5rem", alignItems:"center", border:"1px solid #fcfdfd", borderRadius:"1rem", padding: "1rem", backgroundColor:"#f8f8f9", }}>
                            {posts?.map((post: any) => (
                                <PostCard postData={post}/>
                            ))}
                        </Stack>
                    </Box>

                    {/* ================= NOTIFICATIONS ================= */}

                    <Box className="notifications-section">

                        <Paper className="notifications-card" elevation={0}>

                            <Stack
                                sx={{ direction: "row", justifyContent: "space-between", alignItems: "center",boxShadow: "0px 4px 3px rgba(4, 108, 113, 0.77)",}}
                                className="notifications-header"
                            >
                                <Box>
                                    <Typography className="section-overline">
                                        STAY UPDATED
                                    </Typography>

                                    <Typography className="section-title">
                                        Notifications
                                    </Typography>
                                </Box>

                                <IconButton className="notification-header-icon">
                                    <NotificationsNoneIcon />
                                </IconButton>
                            </Stack>

                            <Divider />

                            <Box className="notifications-list">
                                {notifications?.map((notification: any) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                    />
                                ))}
                            </Box>

                            <Button
                                fullWidth
                                className="notification-view-btn"
                                endIcon={<ArrowForwardIcon />}
                            >
                                View all notifications
                            </Button>

                        </Paper>

                        {/* ================= INFO CARD ================= */}

                        <Paper className="info-card" elevation={0}>

                            <Box className="info-card-icon">
                                <InfoOutlinedIcon />
                            </Box>

                            <Typography className="info-card-title">
                                Keep your community active
                            </Typography>

                            <Typography className="info-card-description">
                                Share useful information, report issues and participate
                                in conversations that can create positive change.
                            </Typography>

                            <Button
                                className="info-card-btn"
                                endIcon={<ArrowForwardIcon />}
                                onClick={handleComplaint}
                            >
                                Get Started
                            </Button>

                        </Paper>

                    </Box>
                </Box>

                {/* =====================================================
            QUICK ACCESS
        ===================================================== */}

                <Box className="quick-section">

                    <Box className="section-heading quick-heading">
                        <Typography className="section-overline">
                            QUICK ACCESS
                        </Typography>

                        <Typography className="section-title">
                            Everything you need, in one place
                        </Typography>
                    </Box>

                    <Box className="quick-grid">

                        {quickAccess.map((item: any) => (
                            <Paper
                                key={item.title}
                                elevation={0}
                                className={item.className}
                                onClick={() => handleQuickAccess(item?.title as any)}
                            >
                                <Box className="quick-icon">
                                    {item.icon}
                                </Box>

                                <Box className="quick-content">
                                    <Typography className="quick-title">
                                        {item.title}
                                    </Typography>

                                    <Typography className="quick-description">
                                        {item.description}
                                    </Typography>
                                </Box>

                                <ArrowForwardIcon className="quick-arrow" />
                            </Paper>
                        ))}

                    </Box>
                </Box>

                {/* =====================================================
            COMMUNITY TRUST SECTION
        ===================================================== */}

                <Paper className="trust-section" elevation={0}>

                    <Box className="trust-left">

                        <Box className="trust-icon">
                            <CheckCircleIcon />
                        </Box>

                        <Box>
                            <Typography className="trust-title">
                                A platform built for people
                            </Typography>

                            <Typography className="trust-description">
                                Technology, communication and community working
                                together to make everyday life easier.
                            </Typography>
                        </Box>

                    </Box>

                    <Button
                        className="trust-btn"
                        endIcon={<ArrowForwardIcon />}
                    >
                        Explore AlgoSaathi
                    </Button>

                </Paper>

                {/* =====================================================
            FOOTER
        ===================================================== */}

                <Box className="dashboard-footer">

                    <Typography className="footer-brand">
                        AlgoSaathi
                    </Typography>

                    <Typography className="footer-tagline">
                        Learn. Communicate. Build. Grow.
                    </Typography>

                    <Typography className="footer-copy">
                        © {new Date().getFullYear()} AlgoSaathi. All rights reserved.
                    </Typography>

                </Box>

            </Box>
        </Box>
    );
};

export default UserDashboard;