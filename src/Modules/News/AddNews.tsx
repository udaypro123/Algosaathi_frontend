import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddPhotoAlternate,
    Delete,
    Image,
    Newspaper,
    Refresh,
    VideoLibrary,
} from "@mui/icons-material";
import { AddNewsdata, getAllNews } from "./api.ts/api";


// ======================================================
// TYPES
// ======================================================

interface NewsImage {
    url: string;
    alt?: string;
    caption?: string;
}

interface News {
    _id: string;

    title: string;
    slug: string;
    shortDescription: string;
    content: string;

    images: NewsImage[];

    video?: {
        url?: string;
        thumbnail?: string;
    };

    category: string;
    subCategory?: string;

    tags?: string[];

    author?: {
        name?: string;
        profileImage?: string;
    };

    source?: {
        name?: string;
        url?: string;
    };

    publishedAt?: string;

    isPublished?: boolean;

    views?: number;

    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
        canonicalUrl?: string;
    };
}


interface FormState {
    title: string;
    slug: string;
    shortDescription: string;
    content: string;

    category: string;
    subCategory: string;
    tags: string;

    authorName: string;

    sourceName: string;
    sourceUrl: string;

    publishedAt: string;

    videoUrl: string;
    videoThumbnail: string;

    metaTitle: string;
    metaDescription: string;
    seoKeywords: string;
    canonicalUrl: string;

    isPublished: boolean;
}


// ======================================================
// INITIAL FORM
// ======================================================

const initialForm: FormState = {
    title: "",
    slug: "",
    shortDescription: "",
    content: "",

    category: "",
    subCategory: "",
    tags: "",

    authorName: "",

    sourceName: "",
    sourceUrl: "",

    publishedAt: "",

    videoUrl: "",
    videoThumbnail: "",

    metaTitle: "",
    metaDescription: "",
    seoKeywords: "",
    canonicalUrl: "",

    isPublished: true,
};


// ======================================================
// COMPONENT
// ======================================================

const AddNews = () => {

    // ==================================================
    // STATES
    // ==================================================

    const [form, setForm] = useState<FormState>(
        initialForm
    );

    const [images, setImages] = useState<File[]>([]);

    const [imagePreviews, setImagePreviews] = useState<
        string[]
    >([]);

    const [newsList, setNewsList] = useState<News[]>([]);

    const [loading, setLoading] = useState(false);

    const [fetchingNews, setFetchingNews] =
        useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");


    // ==================================================
    // HANDLE FORM CHANGE
    // ==================================================

    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // ==================================================
    // IMAGE SELECT
    // ==================================================

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const selectedFiles = Array.from(
            event.target.files || []
        );

        if (!selectedFiles.length) {
            return;
        }


        const combinedImages = [
            ...images,
            ...selectedFiles,
        ];


        if (combinedImages.length > 10) {

            setError(
                "Maximum 10 images are allowed."
            );

            return;
        }


        const previews = combinedImages.map(
            (file) => URL.createObjectURL(file)
        );


        imagePreviews.forEach((url) => {
            URL.revokeObjectURL(url);
        });


        setImages(combinedImages);

        setImagePreviews(previews);

        setError("");
    };


    // ==================================================
    // REMOVE IMAGE
    // ==================================================

    const removeImage = (index: number) => {

        if (imagePreviews[index]) {
            URL.revokeObjectURL(
                imagePreviews[index]
            );
        }


        const updatedImages = images.filter(
            (_, imageIndex) =>
                imageIndex !== index
        );


        const updatedPreviews =
            imagePreviews.filter(
                (_, imageIndex) =>
                    imageIndex !== index
            );


        setImages(updatedImages);

        setImagePreviews(updatedPreviews);
    };


    // ==================================================
    // GENERATE SLUG
    // ==================================================

    const generateSlug = () => {

        const slug = form.title
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9\s-]/g,
                ""
            )
            .replace(
                /\s+/g,
                "-"
            )
            .replace(
                /-+/g,
                "-"
            );


        setForm((previous) => ({
            ...previous,
            slug,
        }));
    };


    // ==================================================
    // FETCH ALL NEWS
    // ==================================================

    const fetchNews = async () => {

        try {

            setFetchingNews(true);

            setError("");


            const response = await getAllNews()

            // const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    response?.message ||
                    "Failed to fetch news"
                );
            }


            const news =
                response?.response ??
                response?.news ??
                response?.results ??
                response;


            setNewsList(
                Array.isArray(news)
                    ? news
                    : []
            );

        } catch (err) {

            const message =
                err instanceof Error
                    ? err.message
                    : "Failed to fetch news";


            setError(message);

        } finally {

            setFetchingNews(false);
        }
    };


    // ==================================================
    // INITIAL FETCH
    // ==================================================

    useEffect(() => {

        fetchNews();


        return () => {

            imagePreviews.forEach((url) => {
                URL.revokeObjectURL(url);
            });

        };

    }, []);


    // ==================================================
    // SUBMIT FORM
    // ==================================================

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();


        setSuccess("");

        setError("");


        // ----------------------------------------------
        // VALIDATION
        // ----------------------------------------------

        if (!form.title.trim()) {

            setError(
                "News title is required."
            );

            return;
        }


        if (!form.slug.trim()) {

            setError(
                "News slug is required."
            );

            return;
        }


        if (!form.shortDescription.trim()) {

            setError(
                "Short description is required."
            );

            return;
        }


        if (!form.content.trim()) {

            setError(
                "News content is required."
            );

            return;
        }


        if (!form.category.trim()) {

            setError(
                "News category is required."
            );

            return;
        }


        if (!images.length) {

            setError(
                "At least one image is required."
            );

            return;
        }


        try {

            setLoading(true);


            // ------------------------------------------
            // FORM DATA
            // ------------------------------------------

            const formData = new FormData();


            // ------------------------------------------
            // BASIC
            // ------------------------------------------

            formData.append(
                "title",
                form.title.trim()
            );

            formData.append(
                "slug",
                form.slug.trim()
            );

            formData.append(
                "shortDescription",
                form.shortDescription.trim()
            );

            formData.append(
                "content",
                form.content
            );

            formData.append(
                "category",
                form.category.trim()
            );

            formData.append(
                "subCategory",
                form.subCategory.trim()
            );


            // ------------------------------------------
            // PUBLISHED DATE
            // ------------------------------------------

            formData.append(
                "publishedAt",
                form.publishedAt ||
                new Date().toISOString()
            );


            // ------------------------------------------
            // PUBLISHED STATUS
            // ------------------------------------------

            formData.append(
                "isPublished",
                String(form.isPublished)
            );


            // ------------------------------------------
            // TAGS
            // ------------------------------------------

            const tags = form.tags
                .split(",")
                .map((tag) =>
                    tag.trim().toLowerCase()
                )
                .filter(Boolean);


            formData.append(
                "tags",
                JSON.stringify(tags)
            );


            // ------------------------------------------
            // AUTHOR
            // ------------------------------------------

            formData.append(
                "author",
                JSON.stringify({
                    name: form.authorName.trim(),
                    profileImage: "",
                })
            );


            // ------------------------------------------
            // SOURCE
            // ------------------------------------------

            formData.append(
                "source",
                JSON.stringify({
                    name: form.sourceName.trim(),
                    url: form.sourceUrl.trim(),
                })
            );


            // ------------------------------------------
            // OPTIONAL VIDEO
            // ------------------------------------------

            formData.append(
                "video",
                JSON.stringify({
                    url: form.videoUrl.trim(),
                    thumbnail:
                        form.videoThumbnail.trim(),
                })
            );


            // ------------------------------------------
            // SEO
            // ------------------------------------------

            const seoKeywords = form.seoKeywords
                .split(",")
                .map((keyword) =>
                    keyword.trim().toLowerCase()
                )
                .filter(Boolean);


            formData.append(
                "seo",
                JSON.stringify({
                    metaTitle:
                        form.metaTitle.trim(),

                    metaDescription:
                        form.metaDescription.trim(),

                    keywords: seoKeywords,

                    canonicalUrl:
                        form.canonicalUrl.trim(),
                })
            );


            // ------------------------------------------
            // MULTIPLE IMAGES
            // ------------------------------------------

            images.forEach((image) => {

                formData.append(
                    "images",
                    image
                );

            });


            // ------------------------------------------
            // API REQUEST
            // ------------------------------------------

            const response = await AddNewsdata(formData)


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    "Failed to add news"
                );
            }


            // ------------------------------------------
            // SUCCESS
            // ------------------------------------------

            setSuccess("News added successfully.");


            setForm(initialForm);


            imagePreviews.forEach((url) => {
                URL.revokeObjectURL(url);
            });


            setImages([]);

            setImagePreviews([]);


            // ------------------------------------------
            // REFRESH NEWS
            // ------------------------------------------

            await fetchNews();

        } catch (err) {

            const message =
                err instanceof Error
                    ? err.message
                    : "Something went wrong";


            setError(message);

        } finally {

            setLoading(false);
        }
    };


    // ==================================================
    // JSX
    // ==================================================

    return (

        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                p: {
                    xs: 2,
                    sm: 3,
                    md: 4,
                },
                backgroundColor: "#f3f9f8",
                boxSizing: "border-box",
                borderRadius: "1rem"
            }}
        >

            <Box
                sx={{
                    width: "90%",
                    minHeight: "100vh",
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                    boxSizing: "border-box",
                    backgroundColor: "#fcfcfc",
                    boxShadow: "0px 5px 10px #dee0e0",
                    borderRadius: "1rem",
                    margin: "0 auto"
                }}
            >


                {/* ==========================================
                HEADER
            ========================================== */}

                <Box
                    sx={{
                        width: "100%",
                        mb: 4,
                        maxHeight: 200,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 7,
                        borderRadius: ".3rem",
                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                        background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                        gap: 2,
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                        }}
                    >

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: "white",
                            }}
                        >
                            News Management
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color: "white",
                            }}
                        >
                            Create and manage your
                            news articles
                        </Typography>

                    </Box>


                    <Button
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={fetchNews}
                        disabled={fetchingNews}
                        sx={{
                            minWidth: 120,
                            borderRadius: 2,
                            textTransform: "none",
                        }}
                    >
                        Refresh
                    </Button>

                </Box>


                {/* ==========================================
                SUCCESS
            ========================================== */}

                {success && (

                    <Alert
                        severity="success"
                        onClose={() =>
                            setSuccess("")
                        }
                        sx={{
                            width: "100%",
                            mb: 3,
                            borderRadius: 2,
                            boxSizing: "border-box",
                        }}
                    >
                        {success}
                    </Alert>

                )}


                {/* ==========================================
                ERROR
            ========================================== */}

                {error && (

                    <Alert
                        severity="error"
                        onClose={() =>
                            setError("")
                        }
                        sx={{
                            width: "100%",
                            mb: 3,
                            borderRadius: 2,
                            boxSizing: "border-box",
                        }}
                    >
                        {error}
                    </Alert>

                )}


                {/* ==========================================
                ADD NEWS
            ========================================== */}

                <Paper
                    elevation={0}
                    sx={{
                        width: "90%",
                        p: {
                            xs: 2,
                            sm: 3,
                            md: 4,
                        },
                        margin: "0 auto",
                        borderRadius: 3,
                        borderColor: "divider",
                        backgroundColor:
                            "background.paper",
                        boxSizing: "border-box",
                    }}
                >

                    {/* Form Header */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 3,
                        }}
                    >

                        <Newspaper
                            sx={{
                                color: "primary.main",
                            }}
                        />

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Add News
                        </Typography>

                    </Box>


                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* ==================================
                        BASIC INFORMATION
                    ================================== */}

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            Basic Information
                        </Typography>


                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "repeat(2, 1fr)",
                                },
                                gap: 2,
                            }}
                        >

                            {/* Title */}

                            <TextField
                                fullWidth
                                required
                                label="News Title"
                                name="title"
                                value={form.title}
                                onChange={
                                    handleChange
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            {/* Slug */}

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:
                                        "flex-start",
                                    gap: 1,
                                    width: "100%",
                                }}
                            >

                                <TextField
                                    fullWidth
                                    required
                                    label="Slug"
                                    name="slug"
                                    value={
                                        form.slug
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root":
                                        {
                                            borderRadius:
                                                2,
                                        },
                                    }}
                                />


                                <Button
                                    variant="outlined"
                                    onClick={
                                        generateSlug
                                    }
                                    sx={{
                                        minWidth: 110,
                                        height: 56,
                                        borderRadius: 2,
                                        textTransform:
                                            "none",
                                    }}
                                >
                                    Generate
                                </Button>

                            </Box>


                            {/* Short Description */}

                            <TextField
                                fullWidth
                                required
                                label="Short Description"
                                name="shortDescription"
                                value={
                                    form.shortDescription
                                }
                                onChange={
                                    handleChange
                                }
                                multiline
                                minRows={3}
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            {/* Category */}

                            <TextField
                                fullWidth
                                required
                                label="Category"
                                name="category"
                                value={
                                    form.category
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Technology"
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            {/* Sub Category */}

                            <TextField
                                fullWidth
                                label="Sub Category"
                                name="subCategory"
                                value={
                                    form.subCategory
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="AI"
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            {/* Tags */}

                            <TextField
                                fullWidth
                                label="Tags"
                                name="tags"
                                value={
                                    form.tags
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="ai, technology, startup"
                                helperText="Separate tags using comma"
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                        </Box>


                        {/* ==================================
                        CONTENT
                    ================================== */}

                        <Box
                            sx={{
                                width: "100%",
                                mt: 2,
                            }}
                        >

                            <TextField
                                fullWidth
                                required
                                label="News Content"
                                name="content"
                                value={
                                    form.content
                                }
                                onChange={
                                    handleChange
                                }
                                multiline
                                minRows={10}
                                placeholder="Write complete news content..."
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                        </Box>


                        <Divider
                            sx={{
                                my: 4,
                            }}
                        />


                        {/* ==================================
                        IMAGES
                    ================================== */}

                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            News Images
                        </Typography>


                        <Paper
                            variant="outlined"
                            sx={{
                                width: "100%",
                                p: {
                                    xs: 2,
                                    md: 4,
                                },
                                borderRadius: 3,
                                borderStyle: "dashed",
                                display: "flex",
                                flexDirection:
                                    "column",
                                justifyContent:
                                    "center",
                                alignItems: "center",
                                textAlign: "center",
                                backgroundColor:
                                    "background.default",
                                boxSizing: "border-box",
                            }}
                        >

                            <AddPhotoAlternate
                                sx={{
                                    fontSize: 52,
                                    color: "text.secondary",
                                    mb: 1,
                                }}
                            />


                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                }}
                            >
                                Upload News Images
                            </Typography>


                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    mb: 2,
                                }}
                            >
                                Select multiple images.
                                Maximum 10 images.
                            </Typography>


                            <Button
                                component="label"
                                variant="contained"
                                startIcon={
                                    <Image />
                                }
                                sx={{
                                    borderRadius: 2,
                                    textTransform:
                                        "none",
                                    px: 3,
                                }}
                            >

                                Select Images

                                <input
                                    hidden
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={
                                        handleImageChange
                                    }
                                />

                            </Button>

                        </Paper>


                        {/* ==================================
                        IMAGE PREVIEW
                    ================================== */}

                        {imagePreviews.length >
                            0 && (

                                <Box
                                    sx={{
                                        width: "100%",
                                        mt: 3,
                                        display: "grid",
                                        gridTemplateColumns:
                                        {
                                            xs: "repeat(2, 1fr)",
                                            sm: "repeat(3, 1fr)",
                                            md: "repeat(5, 1fr)",
                                        },
                                        gap: 2,
                                    }}
                                >

                                    {imagePreviews.map(
                                        (
                                            preview,
                                            index
                                        ) => (

                                            <Box
                                                key={
                                                    preview
                                                }
                                                sx={{
                                                    position:
                                                        "relative",
                                                    width: "100%",
                                                    aspectRatio:
                                                        "1 / 1",
                                                    overflow:
                                                        "hidden",
                                                    borderRadius: 2,
                                                    border:
                                                        "1px solid",
                                                    borderColor:
                                                        "divider",
                                                    backgroundColor:
                                                        "grey.100",
                                                }}
                                            >

                                                <Box
                                                    component="img"
                                                    src={
                                                        preview
                                                    }
                                                    alt={`Preview ${index +
                                                        1
                                                        }`}
                                                    sx={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            "100%",
                                                        objectFit:
                                                            "cover",
                                                        display:
                                                            "block",
                                                    }}
                                                />


                                                <IconButton
                                                    onClick={() =>
                                                        removeImage(
                                                            index
                                                        )
                                                    }
                                                    sx={{
                                                        position:
                                                            "absolute",
                                                        top: 6,
                                                        right: 6,
                                                        width: 34,
                                                        height: 34,
                                                        display:
                                                            "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems:
                                                            "center",
                                                        backgroundColor:
                                                            "rgba(255,255,255,0.9)",
                                                        boxShadow:
                                                            1,
                                                        "&:hover":
                                                        {
                                                            backgroundColor:
                                                                "background.paper",
                                                        },
                                                    }}
                                                >

                                                    <Delete
                                                        fontSize="small"
                                                        color="error"
                                                    />

                                                </IconButton>

                                            </Box>

                                        )
                                    )}

                                </Box>

                            )}


                        {/* ==================================
                        VIDEO
                    ================================== */}

                        <Divider
                            sx={{
                                my: 4,
                            }}
                        />


                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            Video
                        </Typography>


                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "repeat(2, 1fr)",
                                },
                                gap: 2,
                            }}
                        >

                            <TextField
                                fullWidth
                                label="Video URL"
                                name="videoUrl"
                                value={
                                    form.videoUrl
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="https://youtube.com/..."
                                slotProps={{
                                    input: {
                                        startAdornment:
                                            (
                                                <VideoLibrary
                                                    sx={{
                                                        mr: 1,
                                                        color:
                                                            "text.secondary",
                                                    }}
                                                />
                                            ),
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            <TextField
                                fullWidth
                                label="Video Thumbnail URL"
                                name="videoThumbnail"
                                value={
                                    form.videoThumbnail
                                }
                                onChange={
                                    handleChange
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                        </Box>


                        {/* ==================================
                        AUTHOR / SOURCE
                    ================================== */}

                        <Divider
                            sx={{
                                my: 4,
                            }}
                        />


                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            Author & Source
                        </Typography>


                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "repeat(2, 1fr)",
                                },
                                gap: 2,
                            }}
                        >

                            <TextField
                                fullWidth
                                label="Author Name"
                                name="authorName"
                                value={
                                    form.authorName
                                }
                                onChange={
                                    handleChange
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            <TextField
                                fullWidth
                                label="Source Name"
                                name="sourceName"
                                value={
                                    form.sourceName
                                }
                                onChange={
                                    handleChange
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            <TextField
                                fullWidth
                                label="Source URL"
                                name="sourceUrl"
                                value={
                                    form.sourceUrl
                                }
                                onChange={
                                    handleChange
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            <TextField
                                fullWidth
                                label="Published At"
                                name="publishedAt"
                                type="datetime-local"
                                value={
                                    form.publishedAt
                                }
                                onChange={
                                    handleChange
                                }
                                slotProps={{
                                    inputLabel:
                                    {
                                        shrink:
                                            true,
                                    },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                        </Box>


                        {/* ==================================
                        SEO
                    ================================== */}

                        <Divider
                            sx={{
                                my: 4,
                            }}
                        />


                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            SEO Settings
                        </Typography>


                        <Stack
                            spacing={2}
                            sx={{
                                width: "100%",
                            }}
                        >

                            <TextField
                                fullWidth
                                label="Meta Title"
                                name="metaTitle"
                                value={
                                    form.metaTitle
                                }
                                onChange={
                                    handleChange
                                }
                                helperText={`${form.metaTitle.length}/60`}

                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,

                                    },
                                    maxLength: 60,
                                }}
                            />


                            <TextField
                                fullWidth
                                label="Meta Description"
                                name="metaDescription"
                                value={
                                    form.metaDescription
                                }
                                onChange={
                                    handleChange
                                }
                                multiline
                                minRows={3}
                                helperText={`${form.metaDescription.length}/160`}

                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                    maxLength: 160,
                                }}
                            />


                            <TextField
                                fullWidth
                                label="SEO Keywords"
                                name="seoKeywords"
                                value={
                                    form.seoKeywords
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="news, latest news, technology"
                                helperText="Separate keywords using comma"
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />


                            <TextField
                                fullWidth
                                label="Canonical URL"
                                name="canonicalUrl"
                                value={
                                    form.canonicalUrl
                                }
                                onChange={
                                    handleChange
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root":
                                    {
                                        borderRadius: 2,
                                    },
                                }}
                            />

                        </Stack>


                        {/* ==================================
                        SUBMIT
                    ================================== */}

                        <Box
                            sx={{
                                width: "100%",
                                mt: 4,
                                display: "flex",
                                justifyContent:
                                    "flex-end",
                                alignItems: "center",
                            }}
                        >

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    minWidth: 170,
                                    minHeight: 48,
                                    borderRadius: 2,
                                    textTransform:
                                        "none",
                                    fontWeight: 600,
                                }}
                            >

                                {loading ? (

                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />

                                ) : (

                                    "Publish News"

                                )}

                            </Button>

                        </Box>

                    </form>

                </Paper>


                {/* ==========================================
                ALL NEWS
            ========================================== */}

                <Box
                    sx={{
                        width: "100%",
                        mt: 6,
                    }}
                >

                    {/* News Header */}

                    <Box
                        sx={{
                            width: "100%",
                            mb: 3,
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                            gap: 1,
                        }}
                    >

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                gap: 0.5,
                            }}
                        >

                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                All News
                            </Typography>


                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                {newsList.length} news
                                articles
                            </Typography>

                        </Box>

                    </Box>


                    {/* Loading */}

                    {fetchingNews ? (

                        <Box
                            sx={{
                                width: "100%",
                                py: 8,
                                display: "flex",
                                justifyContent:
                                    "center",
                                alignItems:
                                    "center",
                            }}
                        >

                            <CircularProgress />

                        </Box>

                    ) : newsList.length === 0 ? (

                        /* Empty State */

                        <Paper
                            elevation={0}
                            sx={{
                                width: "100%",
                                p: 6,
                                display: "flex",
                                flexDirection:
                                    "column",
                                justifyContent:
                                    "center",
                                alignItems:
                                    "center",
                                textAlign: "center",
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor:
                                    "divider",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <Newspaper
                                sx={{
                                    fontSize: 52,
                                    color:
                                        "text.secondary",
                                    mb: 1,
                                }}
                            />


                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                No news found
                            </Typography>


                            <Typography
                                variant="body2"
                                sx={{
                                    color:
                                        "text.secondary",
                                    mt: 0.5,
                                }}
                            >
                                Add your first news
                                article above.
                            </Typography>

                        </Paper>

                    ) : (

                        /* News Cards */

                        <Box
                            sx={{
                                width: "100%",
                                display: "grid",
                                gridTemplateColumns:
                                {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(3, 1fr)",
                                },
                                gap: 3,
                            }}
                        >

                            {newsList.map(
                                (news) => (

                                    <Card
                                        key={
                                            news._id
                                        }
                                        elevation={0}
                                        sx={{
                                            width:
                                                "100%",
                                            height:
                                                "100%",
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            overflow:
                                                "hidden",
                                            border:
                                                "1px solid",
                                            borderColor:
                                                "divider",
                                            borderRadius:
                                                3,
                                            backgroundColor:
                                                "background.paper",
                                        }}
                                    >

                                        {/* Card Image */}

                                        {news.images
                                            ?.length >
                                            0 ? (

                                            <Box
                                                sx={{
                                                    position:
                                                        "relative",
                                                    width:
                                                        "100%",
                                                }}
                                            >

                                                <CardMedia
                                                    component="img"
                                                    image={
                                                        news
                                                            .images[0]
                                                            ?.url
                                                    }
                                                    alt={
                                                        news
                                                            .images[0]
                                                            ?.alt ||
                                                        news.title
                                                    }
                                                    sx={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            220,
                                                        objectFit:
                                                            "cover",
                                                        display:
                                                            "block",
                                                    }}
                                                />


                                                {/* Multiple image count */}

                                                {news
                                                    .images
                                                    .length >
                                                    1 && (

                                                        <Chip
                                                            label={`+${news
                                                                .images
                                                                .length -
                                                                1
                                                                } images`}
                                                            size="small"
                                                            sx={{
                                                                position:
                                                                    "absolute",
                                                                bottom: 10,
                                                                right: 10,
                                                                backgroundColor:
                                                                    "rgba(0,0,0,0.75)",
                                                                color:
                                                                    "#fff",
                                                                fontWeight:
                                                                    500,
                                                            }}
                                                        />

                                                    )}

                                            </Box>

                                        ) : (

                                            <Box
                                                sx={{
                                                    width:
                                                        "100%",
                                                    height:
                                                        220,
                                                    display:
                                                        "flex",
                                                    justifyContent:
                                                        "center",
                                                    alignItems:
                                                        "center",
                                                    backgroundColor:
                                                        "grey.100",
                                                }}
                                            >

                                                <Image
                                                    sx={{
                                                        fontSize:
                                                            52,
                                                        color:
                                                            "grey.400",
                                                    }}
                                                />

                                            </Box>

                                        )}


                                        {/* Card Content */}

                                        <CardContent
                                            sx={{
                                                flex: 1,
                                                display:
                                                    "flex",
                                                flexDirection:
                                                    "column",
                                                p: 2.5,
                                            }}
                                        >

                                            {/* Category / Video */}

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{
                                                    mb: 1.5,
                                                    flexWrap:
                                                        "wrap",
                                                    rowGap: 1,
                                                }}
                                            >

                                                {news.category && (

                                                    <Chip
                                                        label={
                                                            news.category
                                                        }
                                                        size="small"
                                                        color="primary"
                                                        sx={{
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                    />

                                                )}


                                                {news.video
                                                    ?.url && (

                                                        <Chip
                                                            label="Video"
                                                            size="small"
                                                            icon={
                                                                <VideoLibrary />
                                                            }
                                                        />

                                                    )}

                                            </Stack>


                                            {/* Title */}

                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight:
                                                        700,
                                                    lineHeight:
                                                        1.35,
                                                    display:
                                                        "-webkit-box",
                                                    WebkitLineClamp:
                                                        2,
                                                    WebkitBoxOrient:
                                                        "vertical",
                                                    overflow:
                                                        "hidden",
                                                }}
                                            >
                                                {
                                                    news.title
                                                }
                                            </Typography>


                                            {/* Description */}

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 1,
                                                    color:
                                                        "text.secondary",
                                                    lineHeight:
                                                        1.6,
                                                    display:
                                                        "-webkit-box",
                                                    WebkitLineClamp:
                                                        3,
                                                    WebkitBoxOrient:
                                                        "vertical",
                                                    overflow:
                                                        "hidden",
                                                }}
                                            >
                                                {
                                                    news.shortDescription
                                                }
                                            </Typography>


                                            {/* Tags */}

                                            {news.tags &&
                                                news.tags
                                                    .length >
                                                0 && (

                                                    <Stack
                                                        direction="row"
                                                        spacing={
                                                            0.5
                                                        }
                                                        sx={{
                                                            mt: 2,
                                                            flexWrap:
                                                                "wrap",
                                                            rowGap:
                                                                0.5,
                                                        }}
                                                    >

                                                        {news.tags
                                                            .slice(
                                                                0,
                                                                4
                                                            )
                                                            .map(
                                                                (
                                                                    tag
                                                                ) => (

                                                                    <Chip
                                                                        key={
                                                                            tag
                                                                        }
                                                                        label={
                                                                            tag
                                                                        }
                                                                        size="small"
                                                                        variant="outlined"
                                                                        sx={{
                                                                            maxWidth:
                                                                                "100%",
                                                                        }}
                                                                    />

                                                                )
                                                            )}

                                                    </Stack>

                                                )}


                                            {/* Bottom */}

                                            <Box
                                                sx={{
                                                    mt: "auto",
                                                    pt: 2,
                                                }}
                                            >

                                                <Divider
                                                    sx={{
                                                        mb: 1.5,
                                                    }}
                                                />


                                                <Box
                                                    sx={{
                                                        display:
                                                            "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems:
                                                            "center",
                                                        gap: 1,
                                                    }}
                                                >

                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                "text.secondary",
                                                            overflow:
                                                                "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {news
                                                            .author
                                                            ?.name ||
                                                            "Admin"}
                                                    </Typography>


                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                "text.secondary",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {news.publishedAt
                                                            ? new Date(
                                                                news.publishedAt
                                                            ).toLocaleDateString()
                                                            : ""}
                                                    </Typography>

                                                </Box>

                                            </Box>

                                        </CardContent>

                                    </Card>

                                )
                            )}

                        </Box>

                    )}

                </Box>
            </Box>

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


        </Box>
    );
};


export default AddNews;