import {
    Box,
    Typography,
    Paper,
    Avatar,
    Stack,
    Button,
    Chip,
    Grid,
    Divider,
    IconButton,
    Tooltip,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SchoolIcon from "@mui/icons-material/School";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import api from "../../API/api";
import { getUser } from "../../utils/auth";

const techStack = [
    "JavaScript",
    "Java",
    "React",
    "React Native",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "AWS",
    "Docker",
    "Express",
    "Linux",
    "HTML",
    "CSS",
    "Material-UI",
    "Git",
];


const stats = [
    {
        title: "Experience",
        value: "2.8+ Years",
        icon: <WorkIcon color="primary" />,
    },
    {
        title: "Projects",
        value: "5+",
        icon: <RocketLaunchIcon color="success" />,
    },
    {
        title: "DSA",
        value: "250+",
        icon: <CodeIcon color="warning" />,
    },
    {
        title: "Learning",
        value: "Every Day",
        icon: <SchoolIcon color="secondary" />,
    },
];


const Profile = () => {

    const [profileImage, setProfileImage] = useState<string | null>(null);

    const [uploading, setUploading] =
        useState(false);

    const fileInputRef =
        useRef<HTMLInputElement | null>(null);


    /*
    |--------------------------------------------------------------------------
    | GET PROFILE IMAGE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const user = getUser();
        if (user) setProfileImage(user.profilePicture as string);
    }, []);

    const handleUpload = () => {

        fileInputRef.current?.click();

    };


    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        console.log("file", file)

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5MB.");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();

            // IMPORTANT: backend expects "file"
            formData.append("file", file);

            console.log("file:", file);
            console.log("formData file:", formData.get("file"));
            console.log("formData entries:", [...formData.entries()]);

            const response = await api.post(
                "/fileUpload/upload",
                formData
            );

            console.log(
                "Cloudinary response:",
                response.data
            );

            setProfileImage(response.data.url);

        } catch (error: any) {
            console.error(
                "Image upload failed:",
                error
            );

            alert(
                error?.response?.data?.error ||
                "Unable to upload profile image."
            );
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };




    return (

        <Box
            sx={{
                p: 3,
            }}
        >

            {/* =========================================================
                HERO
            ========================================================== */}

            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    maxWidth: "80%",
                    minHeight: 300,

                    display: "flex",

                    margin: "0 auto",

                    background:
                        "linear-gradient(135deg,#075d7e,#106477,#096381)",

                    color: "#fff",
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={4}
                    sx={{
                        alignItems: "center",
                        width: "100%",
                    }}
                >

                    {/* =================================================
                        PROFILE IMAGE
                    ================================================== */}

                    <Box
                        sx={{
                            position: "relative",
                            flexShrink: 0,
                            cursor: "pointer",
                        }}
                    >

                        <Avatar
                            src={
                                profileImage ||
                                undefined
                            }
                            onClick={
                                handleUpload
                            }
                            sx={{
                                width: 140,
                                height: 140,

                                fontSize: 45,

                                border:
                                    "4px solid rgba(255,255,255,0.85)",

                                transition:
                                    "all 0.25s ease",

                                "&:hover": {
                                    transform:
                                        "scale(1.04)",

                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.25)",
                                },
                            }}
                        >
                            {!profileImage && "U"}
                        </Avatar>


                        {/* Hidden file input */}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={
                                handleFileChange
                            }
                        />


                        {/* Uploading overlay */}

                        {uploading && (

                            <Box
                                sx={{
                                    position:
                                        "absolute",

                                    inset: 0,

                                    borderRadius:
                                        "50%",

                                    display: "flex",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    background:
                                        "rgba(0,0,0,0.5)",
                                }}
                            >

                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                >
                                    Uploading...
                                </Typography>

                            </Box>

                        )}

                    </Box>


                    {/* =================================================
                        HERO CONTENT
                    ================================================== */}

                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight:
                                    "bold",
                            }}
                        >
                            Hi, I'm Uday 👋
                        </Typography>


                        <Typography
                            variant="h6"
                            sx={{
                                mt: 1,
                                opacity: 0.9,
                            }}
                        >
                            Full Stack MERN Developer
                        </Typography>


                        <Typography
                            sx={{
                                mt: 2,
                                maxWidth: "90%",
                            }}
                        >
                            Passionate Full Stack
                            Developer with 2.8+
                            years of experience
                            building scalable web
                            applications.

                            Currently building{" "}

                            <b>
                                AlgoSaathi
                            </b>

                            , where I aim to
                            provide quality
                            learning resources,
                            products and tools
                            for developers.
                        </Typography>


                        {/* Buttons */}

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                mt: 3,
                                flexWrap:
                                    "wrap",
                            }}
                        >

                            <Button
                                variant="contained"
                            >
                                View Portfolio
                            </Button>


                            <Button
                                variant="outlined"
                                sx={{
                                    color: "#fff",
                                    borderColor:
                                        "#fff",
                                }}
                            >
                                Download Resume
                            </Button>

                        </Stack>


                        {/* Social links */}

                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                mt: 3,
                            }}
                        >

                            <Tooltip title="GitHub">

                                <IconButton
                                    component="a"
                                    href="https://github.com/udaypro123"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="inherit"
                                >
                                    <GitHubIcon
                                        fontSize="large"
                                    />
                                </IconButton>

                            </Tooltip>


                            <Tooltip title="LinkedIn">

                                <IconButton
                                    component="a"
                                    href="https://www.linkedin.com/in/uday-chauhan-here/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="inherit"
                                >
                                    <LinkedInIcon
                                        fontSize="large"
                                    />
                                </IconButton>

                            </Tooltip>


                            <Tooltip title="LeetCode">

                                <IconButton
                                    component="a"
                                    href="https://leetcode.com/u/chauhanuday842/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="inherit"
                                >
                                    <CodeIcon
                                        fontSize="large"
                                    />
                                </IconButton>

                            </Tooltip>


                            <Tooltip title="Email">

                                <IconButton
                                    component="a"
                                    href="mailto:chauhanuday842@gmail.com"
                                    color="inherit"
                                >
                                    <EmailIcon
                                        fontSize="large"
                                    />
                                </IconButton>

                            </Tooltip>

                        </Stack>

                    </Box>

                </Stack>

            </Paper>


            {/* =========================================================
                ABOUT
            ========================================================== */}

            <Paper
                sx={{
                    m: 4,
                    mt: 2,
                    p: 4,
                    maxWidth: "80%",
                    margin: "0 auto",
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight:
                            "bold",
                    }}
                >
                    About Me
                </Typography>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                <Typography
                    color="text.secondary"
                >
                    Passionate Full Stack
                    Developer with 2.8+
                    years of experience
                    in building scalable
                    web and mobile
                    applications.

                    Skilled in React.js,
                    React Native,
                    Node.js,
                    Express.js,
                    MongoDB,
                    TypeScript,
                    System Design,
                    and Data Structures.

                    I enjoy transforming
                    ideas into high-quality
                    digital products and
                    solving real-world
                    problems.

                    Currently building{" "}

                    <b>
                        AlgoSaathi
                    </b>

                    , with the vision of
                    creating a platform
                    for developer education,
                    AI-powered tools,
                    innovative software
                    products, and mobile
                    applications.
                </Typography>

            </Paper>


            {/* =========================================================
                TECH STACK
            ========================================================== */}

            <Paper
                elevation={2}
                sx={{
                    m: 4,
                    mt: 2,
                    p: 4,
                    maxWidth: "80%",
                    margin: "0 auto",
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight:
                            "bold",
                    }}
                >
                    Tech Stack
                </Typography>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{
                        flexWrap:
                            "wrap",
                    }}
                >

                    {techStack.map(
                        (tech) => (

                            <Chip
                                key={tech}
                                label={tech}
                                sx={{
                                    backgroundColor:
                                        "#065a79",

                                    color:
                                        "white",

                                    fontSize:
                                        "16px",

                                    marginBottom:
                                        "5px",
                                }}
                                color="primary"
                                variant="outlined"
                            />

                        )
                    )}

                </Stack>

            </Paper>


            {/* =========================================================
                STATS
            ========================================================== */}

            <Box
                sx={{
                    maxWidth: "80%",
                    margin: "0 auto",
                    marginTop: 4,
                }}
            >

                <Grid
                    container
                    spacing={3}
                >

                    {stats.map(
                        (item) => (

                            <Grid
                                key={
                                    item.title
                                }
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 3,
                                }}
                            >

                                <Paper
                                    sx={{
                                        p: 3,
                                        textAlign:
                                            "center",

                                        borderRadius:
                                            3,

                                        height:
                                            "100%",
                                    }}
                                >

                                    {item.icon}


                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mt: 1,
                                            fontWeight:
                                                "bold",
                                        }}
                                    >
                                        {
                                            item.value
                                        }
                                    </Typography>


                                    <Typography
                                        color="text.secondary"
                                    >
                                        {
                                            item.title
                                        }
                                    </Typography>

                                </Paper>

                            </Grid>

                        )
                    )}

                </Grid>

            </Box>


            {/* =========================================================
                CURRENT FOCUS
            ========================================================== */}

            <Paper
                elevation={2}
                sx={{
                    m: 4,
                    mt: 2,
                    p: 4,
                    maxWidth: "80%",
                    margin: "0 auto",
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight:
                            "bold",
                    }}
                >
                    Current Focus
                </Typography>


                <Divider
                    sx={{
                        my: 2,
                    }}
                />


                <Stack spacing={2}>

                    <Typography>
                        🚀 Exploring System
                        Design to make a
                        very good System.
                    </Typography>


                    <Typography>
                        🚀 Love to Learn
                        Data structures
                        and algorithms.
                    </Typography>


                    <Typography>
                        🚀 Building
                        AlgoSaathi Platform
                    </Typography>


                    <Typography>
                        🤖 Love to Learn AI
                        Powered Developer
                        Tools
                    </Typography>


                    <Typography>
                        💼 Growing a
                        Software Product
                        Company
                    </Typography>

                </Stack>

            </Paper>


            {/* =========================================================
                QUOTE
            ========================================================== */}

            <Paper
                sx={{
                    m: 4,
                    mt: 2,
                    mb: 0,
                    p: 4,
                    maxWidth: "80%",
                    margin: "0 auto",

                    borderRadius:
                        "2rem",

                    textAlign:
                        "center",

                    background:
                        "linear-gradient(135deg,#075d7e,#106477,#096381)",

                    color: "#fff",
                }}
            >

                <Typography
                    variant="h6"
                    sx={{
                        fontStyle:
                            "italic",
                    }}
                >
                    "Code. Learn. Build. Repeat."
                </Typography>

            </Paper>

        </Box>
    );
};

export default Profile;