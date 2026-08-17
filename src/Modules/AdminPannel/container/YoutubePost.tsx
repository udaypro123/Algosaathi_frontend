import {
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    Grid,
    Divider,
    IconButton,
    Tooltip,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};



import YouTubeIcon from "@mui/icons-material/YouTube";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
    useEffect,
    useState,
} from "react";

import { getUser, getUserRole } from "../../../utils/auth";
import BubleComponent from "../../../common/BubleComponent";
import { addYoutubePost, deleteYoutubePost, getAllYoutubePost, updateYoutubePost } from "../api/api";


/* =========================================================
   TYPES
========================================================= */

interface YoutubePostData {
    _id?: string;
    id?: string;

    ownerId: string;

    title: string;

    playListName: string;

    description?: string;

    link: string;

    role?: "users" | "admin";

    thumbnail: string;

    profileImagePublicId?: string | null;

    createdAt?: string;

    updatedAt?: string;
}

interface YoutubePostFormData {
    title: string;
    description: string;
    link: string;
    thumbnail: string;
    playListName: string;
}

/* =========================================================
   COMPONENT
========================================================= */

const YoutubePost = () => {


    /* =====================================================
       YOUTUBE POSTS STATE
    ====================================================== */
    const userRole = getUserRole();
    console.log("userRole", userRole)

    const [posts, setPosts] = useState<YoutubePostData[]>([]);

    const [loadingPosts, setLoadingPosts] = useState(false);

    const [savingPost, setSavingPost] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const [editingPost, setEditingPost] = useState<YoutubePostData | null>(null);

    const [formData, setFormData] = useState<YoutubePostFormData>({
        title: "",
        description: "",
        link: "",
        thumbnail: "",
        playListName: "",
    });

    /*
     * Keep `posts` as the original/master list.
     * Do not modify `posts` when filtering.
     *
     * playListName is a String in the Mongoose schema, so a single
     * selected playlist is also stored as a String, not String[].
     */
    const [personName, setPersonName] = React.useState<string>("");

    const handleChange = (event: SelectChangeEvent) => {
        setPersonName(event.target.value);
    };

    /*
     * Create unique playlist names from the original posts.
     * This prevents duplicate MenuItem keys such as key="DSA".
     */
    const names = React.useMemo(() => {
        return Array.from(
            new Set(
                posts
                    .map((post) => post.playListName?.trim())
                    .filter((name): name is string => Boolean(name))
            )
        );
    }, [posts]);

    /*
     * Filter only for display.
     * `posts` remains untouched, so changing the playlist filter
     * does not destroy the original data.
     */
    const filteredPosts = React.useMemo(() => {
        if (!personName) {
            return posts;
        }

        return posts.filter(
            (post) => post.playListName === personName
        );
    }, [posts, personName]);



    /* =========================================================
       GET USER ID
    ========================================================== */

    const getOwnerId = (): string => {

        const user: any = getUser();

        if (!user) {
            return "";
        }
        console.log("user data ------->", user)

        return (
            user.ownerId ||
            user._id ||
            user.id ||
            user.userId ||
            ""
        );
    };


    /* =========================================================
       GET YOUTUBE VIDEO ID
    ========================================================== */

    const getYoutubeVideoId = (url: string): string | null => {

        if (!url?.trim()) {
            return null;
        }

        try {

            const parsedUrl =
                new URL(url.trim());

            const hostname =
                parsedUrl.hostname
                    .toLowerCase()
                    .replace("www.", "");

            /* ---------------------------------------------
               youtu.be/VIDEO_ID
            --------------------------------------------- */

            if (
                hostname === "youtu.be"
            ) {

                const videoId =
                    parsedUrl.pathname
                        .split("/")
                        .filter(Boolean)[0];

                return videoId || null;
            }


            /* ---------------------------------------------
               youtube.com/watch?v=VIDEO_ID
            --------------------------------------------- */

            if (
                hostname === "youtube.com" ||
                hostname === "m.youtube.com"
            ) {

                const videoId =
                    parsedUrl.searchParams.get("v");

                if (videoId) {
                    return videoId;
                }


                /* -----------------------------------------
                   youtube.com/embed/VIDEO_ID
                ------------------------------------------ */

                const embedMatch =
                    parsedUrl.pathname.match(
                        /\/embed\/([^/]+)/
                    );

                if (embedMatch) {
                    return embedMatch[1];
                }


                /* -----------------------------------------
                   youtube.com/shorts/VIDEO_ID
                ------------------------------------------ */

                const shortsMatch =
                    parsedUrl.pathname.match(
                        /\/shorts\/([^/]+)/
                    );

                if (shortsMatch) {
                    return shortsMatch[1];
                }
            }

            return null;

        } catch (error) {

            return null;
        }
    };


    /* =========================================================
       GET YOUTUBE THUMBNAIL
    ========================================================== */

    const getYoutubeThumbnail = (url: string): string | null => {

        const videoId = getYoutubeVideoId(url);

        if (!videoId) {
            return null;
        }

        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };


    /* =========================================================
       VALIDATE YOUTUBE URL
    ========================================================== */

    const isValidYoutubeUrl = (
        url: string
    ): boolean => {

        return !!getYoutubeVideoId(url);
    };


    /* =========================================================
       GET YOUTUBE POSTS
    ========================================================== */

    const fetchPosts = async () => {

        try {

            setLoadingPosts(true);

            const response = await getAllYoutubePost()
            console.log("response data ---------->", response)

            setPosts(response.data?.data || response.data || []);

        } catch (error) {

            console.error(
                "Unable to fetch YouTube posts:",
                error
            );

        } finally {

            setLoadingPosts(false);
        }
    };


    useEffect(() => {

        fetchPosts();

    }, []);


    /* =========================================================
       OPEN ADD DIALOG
    ========================================================== */

    const handleAddPost = () => {

        setEditingPost(null);

        setFormData({
            title: "",
            description: "",
            link: "",
            thumbnail: "",
            playListName: ""
        });

        setOpenDialog(true);
    };


    /* =========================================================
       OPEN EDIT DIALOG
    ========================================================== */

    const handleEditPost = (post: YoutubePostData) => {

        setEditingPost(post);

        setFormData({

            title: post.title || "",

            description: post.description || "",

            link: post.link || "",

            thumbnail: post.thumbnail || "",

            playListName: post?.playListName || ""
        });

        setOpenDialog(true);
    };


    /* =========================================================
       CLOSE DIALOG
    ========================================================== */

    const handleCloseDialog = () => {

        if (savingPost) {
            return;
        }

        setOpenDialog(false);

        setEditingPost(null);

        setFormData({
            title: "",
            description: "",
            link: "",
            thumbnail: "",
            playListName: ""
        });
    };


    /* =========================================================
       FORM CHANGE
    ========================================================== */

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));


        /* ---------------------------------------------
           Automatically generate thumbnail
        --------------------------------------------- */

        if (name === "link") {

            const thumbnail =
                getYoutubeThumbnail(value);

            setFormData((prev) => ({
                ...prev,
                link: value,
                thumbnail:
                    thumbnail || "",
            }));
        }
    };


    /* =========================================================
       CREATE / UPDATE POST
    ========================================================== */

    const handleSavePost = async () => {

        /* ---------------------------------------------
           Title validation
        --------------------------------------------- */

        if (!formData.title.trim()) {

            alert(
                "Title is required."
            );

            return;
        }


        if (formData.title.trim().length > 150) {

            alert(
                "Title cannot exceed 150 characters."
            );

            return;
        }

        // play list name validation
        if (!formData.playListName.trim()) {

            alert(
                "PlayList Name is required."
            );

            return;
        }


        if (formData.playListName.trim().length > 150) {

            alert(
                "PlayList Name cannot exceed 75 characters."
            );

            return;
        }


        /* ---------------------------------------------
           Description validation
        --------------------------------------------- */

        if (formData.description.trim().length < 30) {

            alert(
                "Description must contain at least 30 characters."
            );

            return;
        }

        /* ---------------------------------------------
           YouTube link validation
        --------------------------------------------- */

        if (!formData.link.trim()) {

            alert(
                "YouTube link is required."
            );

            return;
        }


        if (!isValidYoutubeUrl(formData.link)) {

            alert(
                "Please enter a valid YouTube URL."
            );

            return;
        }


        /* ---------------------------------------------
           Thumbnail
        --------------------------------------------- */

        const thumbnail = getYoutubeThumbnail(formData.link);


        if (!thumbnail) {

            alert(
                "Unable to generate YouTube thumbnail."
            );

            return;
        }


        /* ---------------------------------------------
           Owner ID
        --------------------------------------------- */

        const ownerId = getOwnerId();

        if (!ownerId) {

            alert(
                "User information not found. Please login again."
            );

            return;
        }


        try {

            setSavingPost(true);


            /* -----------------------------------------
               Payload according to Mongoose model
            ------------------------------------------ */

            const payload = {

                ownerId,

                title: formData.title.trim(),

                description: formData.description.trim(),

                link: formData.link.trim(),

                thumbnail,
                playListName: formData.playListName.trim(),

            };


            /* -----------------------------------------
               UPDATE
            ------------------------------------------ */

            if (editingPost?._id) {

                // await api.put(`/youtubePost/${editingPost._id}`, payload);
                await updateYoutubePost({ ...payload, postId: editingPost._id })

            } else {
                const response = await addYoutubePost(payload)
                console.log("response data ", response)
                // await api.post( "/youtubePost",  payload);
            }
            await fetchPosts()

            handleCloseDialog();

        } catch (error: any) {

            console.error(
                "Unable to save YouTube post:",
                error
            );


            alert(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Unable to save YouTube post."
            );

        } finally {

            setSavingPost(false);
        }
    };


    /* =========================================================
       DELETE POST
    ========================================================== */

    const handleDeletePost = async (post: YoutubePostData) => {

        if (!post._id) {
            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this post?"
            );


        if (!confirmed) {
            return;
        }


        try {

            console.log("post ----->", post)
            let Id: string = post?._id

            await deleteYoutubePost(Id)

            // await api.delete(
            //     `/youtubePost/${post._id}`
            // );


            await fetchPosts();

        } catch (error: any) {

            console.error(
                "Unable to delete YouTube post:",
                error
            );


            alert(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Unable to delete YouTube post."
            );
        }
    };


    /* =========================================================
       RETURN
    ========================================================== */

    return (

        <Box
            sx={{
                p: 3,
                position: "relative",
                overflow: "hidden",
            }}
        >

            <BubleComponent />


            {/* =====================================================
                HERO / HEADER
            ====================================================== */}

            <Paper
                elevation={4}
                sx={{
                    p: 5,
                    maxWidth: "80%",
                    minHeight: "fit-content",
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
                            sx={{
                                mt: 2,
                                maxWidth: "90%",
                            }}
                        >
                            If you’re passionate about becoming a software engineer, you’re in the right place. Here, you’ll learn interview-focused DSA, programming, and development concepts explained in a simple and practical way.

                            Stay focused, stay consistent, and keep learning. Your goal of becoming a better software engineer is closer than you think.



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

                    </Box>

                </Stack>

            </Paper>


            {/* =========================================================
                YOUTUBE POSTS SECTION
            ========================================================== */}

            <Box
                sx={{
                    maxWidth: "80%",
                    margin: "25px auto 0",
                    position: "relative",
                    zIndex: 1,
                }}
            >

                <Paper
                    elevation={3}
                    sx={{
                        p: {
                            xs: 2,
                            md: 4,
                        },
                        borderRadius: 3,
                    }}
                >

                    {/* =================================================
                        SECTION HEADER
                    ================================================== */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        sx={{
                            justifyContent:
                                "space-between",

                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },
                        }}
                        spacing={2}
                    >

                        <Box>

                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >

                                <YouTubeIcon
                                    sx={{
                                        color: "#ff0000",
                                        fontSize: 34,
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight:
                                            "bold",
                                    }}
                                >
                                    YouTube Posts
                                </Typography>

                            </Stack>


                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                Latest videos, tutorials
                                you guys will learn here.
                            </Typography>

                        </Box>

                        {
                            userRole === "admin" && <Button
                                variant="contained"
                                startIcon={
                                    <AddIcon />
                                }
                                onClick={
                                    handleAddPost
                                }
                                sx={{
                                    background:
                                        "linear-gradient(135deg,#075d7e,#106477,#096381)",
                                    borderRadius: 2,
                                    px: 2.5,
                                }}
                            >
                                Add YouTube Post
                            </Button>

                        }

                    </Stack>


                    <Divider
                        sx={{
                            my: 3,
                        }}
                    />


                    {/* =================================================
                        LOADING
                    ================================================== */}

                    {loadingPosts && (

                        <Box
                            sx={{
                                py: 6,
                                textAlign: "center",
                            }}
                        >

                            <Typography
                                color="text.secondary"
                            >
                                Loading YouTube posts...
                            </Typography>

                        </Box>

                    )}


                    {/* =================================================
                        EMPTY STATE
                    ================================================== */}

                    {!loadingPosts &&
                        userRole === "admin" && filteredPosts.length === 0 && (

                            <Box
                                sx={{
                                    py: 7,
                                    textAlign: "center",
                                    borderRadius: 3,
                                    border:
                                        "2px dashed rgba(0,0,0,0.12)",
                                }}
                            >

                                <YouTubeIcon
                                    sx={{
                                        fontSize: 60,
                                        color:
                                            "text.secondary",
                                        mb: 1,
                                    }}
                                />


                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                >
                                    No YouTube posts yet
                                </Typography>


                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        mt: 1,
                                    }}
                                >
                                    Add your first
                                    YouTube video
                                    to get started.
                                </Typography>


                                <Button
                                    variant="contained"
                                    startIcon={
                                        <AddIcon />
                                    }
                                    onClick={
                                        handleAddPost
                                    }
                                    sx={{
                                        mt: 3,
                                        backgroundColor:
                                            "#ff0000",

                                        "&:hover": {
                                            backgroundColor:
                                                "#cc0000",
                                        },
                                    }}
                                >
                                    Add First Video
                                </Button>

                            </Box>

                        )}


                    {/* =================================================
                        POSTS GRID
                    ================================================== */}


                    {
                        posts.length > 0 && <div>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="playlist-select-label">Playlist</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="">
                                        All Playlists
                                    </MenuItem>

                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    }

                    {
                        posts?.length > 0 && <Divider
                            sx={{
                                flex: 1,
                                borderColor: "rgba(0, 60, 95, 0.97)",
                                mb: 2,
                                mt: 2,
                                opacity: .3,
                                borderTopWidth: ".1rem",
                                borderRadius: "1rem"

                            }}
                        />

                    }

                    {!loadingPosts &&
                        filteredPosts.length > 0 && (

                            <Grid
                                container
                                spacing={3}
                            >

                                {filteredPosts.map((post) => {

                                    return (

                                        <Grid
                                            key={
                                                post._id ||
                                                post.link
                                            }
                                            size={{
                                                xs: 12,
                                                sm: 6,
                                                md: 6,
                                            }}
                                        >

                                            <Paper
                                                elevation={2}
                                                sx={{
                                                    height: "100%",
                                                    borderRadius: 3,
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    border: "1px solid rgba(0,0,0,0.08)",
                                                    transition: "all 0.25s ease",

                                                    "&:hover":
                                                    {
                                                        transform:
                                                            "translateY(-1px)",

                                                        boxShadow:
                                                            "0 1px 3px rgba(0,0,0,0.12)",
                                                    },
                                                }}
                                            >

                                                {/* =================================================
                                                        THUMBNAIL
                                                    ================================================== */}

                                                <Box
                                                    sx={{
                                                        height: 190,
                                                        position: "relative",
                                                        background: "linear-gradient(135deg,#075d7e,#106477)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >

                                                    {post?.thumbnail ? (

                                                        <Box
                                                            component="img"
                                                            src={
                                                                post.thumbnail
                                                            }
                                                            alt={
                                                                post.title
                                                            }
                                                            sx={{
                                                                width:
                                                                    "100%",
                                                                height:
                                                                    "100%",
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                        />

                                                    ) : (

                                                        <YouTubeIcon
                                                            sx={{
                                                                fontSize:
                                                                    70,
                                                                color:
                                                                    "#fff",
                                                            }}
                                                        />

                                                    )}


                                                    {/* YouTube Icon */}

                                                    <Box
                                                        sx={{
                                                            position:
                                                                "absolute",
                                                            left:
                                                                "50%",
                                                            top:
                                                                "50%",
                                                            transform:
                                                                "translate(-50%, -50%)",
                                                            width:
                                                                55,
                                                            height:
                                                                55,
                                                            borderRadius:
                                                                "50%",
                                                            background:
                                                                "rgba(255,0,0,0.95)",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >

                                                        <YouTubeIcon
                                                            sx={{
                                                                color:
                                                                    "#fff",
                                                                fontSize:
                                                                    35,
                                                            }}
                                                        />

                                                    </Box>

                                                </Box>


                                                {/* =================================================
                                                        POST CONTENT
                                                    ================================================== */}

                                                <Box
                                                    sx={{
                                                        p: 2.5,
                                                    }}
                                                >

                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            minHeight:
                                                                30,
                                                        }}
                                                    >
                                                        {
                                                            post.title
                                                        }
                                                    </Typography>


                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            display:
                                                                "-webkit-box",
                                                            WebkitLineClamp:
                                                                3,
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            overflow:
                                                                "hidden",
                                                            minHeight:
                                                                60,
                                                        }}
                                                    >
                                                        {post.description || "No description available."}
                                                    </Typography>


                                                    {/* =================================================
                                                            ACTIONS
                                                        ================================================== */}

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        sx={{
                                                            mt: 2,
                                                        }}
                                                    >

                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            startIcon={
                                                                <OpenInNewIcon />
                                                            }
                                                            component="a"
                                                            href={
                                                                post.link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            sx={{
                                                                flex: 1,
                                                                backgroundColor:
                                                                    "#ff0000",

                                                                "&:hover":
                                                                {
                                                                    backgroundColor:
                                                                        "#cc0000",
                                                                },
                                                            }}
                                                        >
                                                            Watch
                                                        </Button>
                                                        {
                                                            userRole === "admin" && <>
                                                                <Tooltip title="Edit">

                                                                    <IconButton
                                                                        color="primary"
                                                                        onClick={() =>
                                                                            handleEditPost(
                                                                                post
                                                                            )
                                                                        }
                                                                    >
                                                                        <EditIcon />
                                                                    </IconButton>

                                                                </Tooltip>
                                                            </>
                                                        }



                                                        {
                                                            userRole === "admin" && <Tooltip title="Delete">

                                                                <IconButton
                                                                    color="error"
                                                                    onClick={() =>
                                                                        handleDeletePost(
                                                                            post
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>

                                                            </Tooltip>

                                                        }

                                                    </Stack>

                                                </Box>

                                            </Paper>

                                        </Grid>

                                    );
                                }
                                )}

                            </Grid>

                        )}

                </Paper>

            </Box>


            {/* =========================================================
                ADD / EDIT DIALOG
            ========================================================== */}

            {
                userRole === "admin" &&
                <Dialog
                    open={openDialog}
                    onClose={
                        handleCloseDialog
                    }
                    fullWidth
                    maxWidth="sm"
                >

                    <DialogTitle
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        {editingPost
                            ? "Edit YouTube Post"
                            : "Add YouTube Post"}
                    </DialogTitle>


                    <DialogContent>

                        <Stack
                            spacing={2.5}
                            sx={{
                                mt: 1,
                            }}
                        >

                            {/* =================================================
                            TITLE
                        ================================================== */}

                            <TextField
                                fullWidth
                                required
                                label="Title"
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleInputChange
                                }
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 150,
                                    },
                                }}
                                helperText={
                                    `${formData.title.length}/150`
                                }
                            />

                            {/* =================================================
                            PLAYLISTNAME
                        ================================================== */}
                            <TextField
                                fullWidth
                                required
                                label="Playlist Name"
                                name="playListName"
                                value={
                                    formData.playListName
                                }
                                onChange={
                                    handleInputChange
                                }
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 150,
                                    },
                                }}
                                helperText={
                                    `${formData.playListName.length}/150`
                                }
                            />


                            {/* =================================================
                            DESCRIPTION
                        ================================================== */}

                            <TextField
                                fullWidth
                                required
                                multiline
                                minRows={4}
                                label="Description"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleInputChange
                                }
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 1000,
                                    },
                                }}
                                helperText={
                                    formData.description.length < 30
                                        ? `${formData.description.length}/30 minimum characters`
                                        : `${formData.description.length} characters`
                                }
                                error={
                                    formData.description.length > 0 &&
                                    formData.description.length < 30
                                }
                            />


                            {/* =================================================
                            YOUTUBE LINK
                        ================================================== */}

                            <TextField
                                fullWidth
                                required
                                label="YouTube Link"
                                name="link"
                                value={
                                    formData.link
                                }
                                onChange={
                                    handleInputChange
                                }
                                placeholder="https://www.youtube.com/watch?v=..."
                                error={
                                    formData.link.length > 0 &&
                                    !isValidYoutubeUrl(
                                        formData.link
                                    )
                                }
                                helperText={
                                    formData.link.length > 0 &&
                                        !isValidYoutubeUrl(
                                            formData.link
                                        )
                                        ? "Please enter a valid YouTube URL"
                                        : "Thumbnail will be generated automatically"
                                }
                            />


                            {/* =================================================
                            THUMBNAIL PREVIEW
                        ================================================== */}

                            {formData.thumbnail && (

                                <Box>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 1,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Thumbnail Preview
                                    </Typography>


                                    <Box
                                        component="img"
                                        src={
                                            formData.thumbnail
                                        }
                                        alt="YouTube thumbnail"
                                        sx={{
                                            width: "100%",
                                            maxHeight: 250,
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            border:
                                                "1px solid rgba(0,0,0,0.12)",
                                        }}
                                    />

                                </Box>

                            )}

                        </Stack>

                    </DialogContent>


                    <DialogActions
                        sx={{
                            p: 2,
                        }}
                    >

                        <Button
                            onClick={
                                handleCloseDialog
                            }
                            disabled={savingPost}
                        >
                            Cancel
                        </Button>


                        <Button
                            variant="contained"
                            onClick={
                                handleSavePost
                            }
                            disabled={savingPost}
                        >
                            {savingPost
                                ? "Saving..."
                                : editingPost
                                    ? "Update Post"
                                    : "Create Post"}
                        </Button>

                    </DialogActions>

                </Dialog>
            }

        </Box>
    );
};


export default YoutubePost;