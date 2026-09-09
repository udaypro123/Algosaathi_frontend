import { useEffect, useMemo, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getAllTemplates } from "../api/api";
import "../css/TemplateLibrary.css";

const fallbackTemplateImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
];

const normalizeTags = (template: any) => {
    if (Array.isArray(template?.tags)) return template.tags.filter(Boolean);
    if (typeof template?.tags === "string") return template.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean);
    return [];
};

const getTemplateImages = (template: any) => {
    const images = Array.isArray(template?.images)
        ? template.images
            .map((image: any) => (typeof image === "string" ? image : image?.url || image?.src || ""))
            .filter(Boolean)
        : [];

    if (images.length > 0) return images;

    const fallbackIndex = Number(template?.id ?? template?._id ?? 1) % fallbackTemplateImages.length;
    return [fallbackTemplateImages[fallbackIndex]];
};

const TemplateLibrary = () => {
    const [templates, setTemplates] = useState<any[]>([]);
    const [category, setCategory] = useState("All Templates");
    const [search, setSearch] = useState("");
    const [activeImageMap, setActiveImageMap] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);
    const [previewIndex, setPreviewIndex] = useState(0);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(
                templates
                    .map((template) => template.category)
                    .filter((value): value is string => Boolean(value && String(value).trim()))
            )
        );

        return ["All Templates", ...uniqueCategories];
    }, [templates]);

    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true);
            try {
                const response = await getAllTemplates();
                const list = Array.isArray(response)
                    ? response
                    : response?.data ?? response?.templates ?? [];
                setTemplates(list);
            } catch (error) {
                console.error("Failed to fetch templates:", error);
                setTemplates([]);
            } finally {
                setLoading(false);
            }
        };

        void fetchTemplates();
    }, []);

    useEffect(() => {
        if (!templates.length) return;

        const timer = window.setInterval(() => {
            setActiveImageMap((prev) => {
                const next = { ...prev };

                templates.forEach((template) => {
                    const key = String(template?._id ?? template?.id ?? template?.title ?? "template");
                    const images = getTemplateImages(template);

                    if (images.length <= 1) return;

                    const currentIndex = prev[key] ?? 0;
                    next[key] = (currentIndex + 1) % images.length;
                });

                return next;
            });
        }, 3000);

        return () => window.clearInterval(timer);
    }, [templates]);

    const filteredTemplates = useMemo(() => {
        return templates.filter((template) => {
            const itemCategory = String(template.category || "");
            const itemTitle = template.title || "";
            const itemDescription = template.description || "";
            const tags = normalizeTags(template).join(" ");

            const matchesCategory =
                category === "All Templates" ||
                itemCategory.toLowerCase() === category.toLowerCase();

            const searchText = search.toLowerCase();

            const matchesSearch =
                itemTitle.toLowerCase().includes(searchText) ||
                itemDescription.toLowerCase().includes(searchText) ||
                itemCategory.toLowerCase().includes(searchText) ||
                tags.toLowerCase().includes(searchText);

            return matchesCategory && matchesSearch;
        });
    }, [category, search, templates]);

    // const changePreviewImage = (template: any, step: number) => {
    //     const key = String(template?._id ?? template?.id ?? template?.title ?? "template");
    //     const images = getTemplateImages(template);
    //     const currentIndex = activeImageMap[key] ?? 0;
    //     const nextIndex = (currentIndex + step + images.length) % images.length;

    //     setActiveImageMap((prev) => ({
    //         ...prev,
    //         [key]: nextIndex,
    //     }));
    // };

    const handleTemplateAction = (template: any, type: "preview" | "use") => {
        if (type === "preview") {
            const previewImages = getTemplateImages(template);
            setPreviewTemplate(template);
            setPreviewIndex(previewImages.length > 0 ? 0 : -1);
            setToast("Please contact admin for preview.");
            return;
        }

        setToast("Please contact admin for template access.");
      
    };

    const previewImages = previewTemplate ? getTemplateImages(previewTemplate) : [];
    const canNavigatePreview = previewImages.length > 1;

    const goToPreviousPreview = () => {
        if (!canNavigatePreview) return;
        setPreviewIndex((prev) => (prev <= 0 ? previewImages.length - 1 : prev - 1));
    };

    const goToNextPreview = () => {
        if (!canNavigatePreview) return;
        setPreviewIndex((prev) => (prev >= previewImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box className="template-page">

            {/* Animated Background */}
            <div className="background-effects">
                <div className="glow glow-one"></div>
                <div className="glow glow-two"></div>
                <div className="glow glow-three"></div>
            </div>

            {/* HERO */}
            <Box className="hero-section">
                <Container maxWidth="lg">

                    <Box className="hero-badge">
                        <AutoAwesomeIcon fontSize="small" />
                        CREATIVE TEMPLATE LIBRARY
                    </Box>

                    <Typography
                        variant="h6"
                        className="hero-title"
                    >
                        Find the perfect
                        <span> template </span>
                        for your next idea.
                    </Typography>

                    <Typography className="hero-description">
                        Explore professionally designed templates for education,
                        technology, business, social media, portfolios and much more.
                        Choose a template and start creating.
                    </Typography>

                    <Box className="hero-buttons">

                        <Button
                            className="hero-primary-btn"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() =>
                                document
                                    .getElementById("template-library")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Explore Templates
                        </Button>

                        <Button
                            className="hero-secondary-btn"
                            onClick={() =>
                                document
                                    .getElementById("categories")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Browse Categories
                        </Button>

                    </Box>

                </Container>
            </Box>


            {/* CATEGORY SECTION */}
            <Container
                maxWidth="lg"
                id="categories"
                className="category-section"
            >

                <Box className="section-header">

                    <Box>
                        <Typography className="section-label">
                            DISCOVER
                        </Typography>

                        <Typography variant="h3" className="section-title">
                            Choose your category
                        </Typography>
                    </Box>

                </Box>


                <Grid container spacing={2}>

                    {categories.map((item) => {

                        const active = category === item;

                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={item}>

                                <Card
                                    className={`category-card ${active ? "category-active" : ""
                                        }`}
                                    onClick={() => setCategory(item)}
                                >

                                    <CardContent>

                                        <div className="category-icon">
                                            {item === "All Templates" && "✦"}
                                            {item === "Education" && "🎓"}
                                            {item === "Technology" && "💻"}
                                            {item === "Business" && "📊"}
                                            {item === "Social" && "🌍"}
                                            {item === "Portfolio" && "🚀"}
                                            {item === "Law" && "⚖️"}
                                        </div>

                                        <Typography className="category-name">
                                            {item}
                                        </Typography>

                                        <Typography className="category-small">
                                            {item === "All Templates"
                                                ? "Everything"
                                                : item}
                                        </Typography>

                                    </CardContent>

                                </Card>

                            </Grid>
                        );
                    })}

                </Grid>

            </Container>


            {/* TEMPLATE LIBRARY */}
            <Container
                maxWidth="lg"
                id="template-library"
                className="library-section"
            >

                <Box className="library-header">

                    <Box>
                        <Typography className="section-label">
                            TEMPLATE LIBRARY
                        </Typography>

                        <Typography variant="h3" className="section-title">
                            Explore templates
                        </Typography>

                        <Typography className="library-count">
                            Showing {filteredTemplates.length} of {templates.length} templates
                        </Typography>
                    </Box>


                    {/* SEARCH + FILTER */}
                    <Box className="library-controls">

                        <TextField
                            placeholder="Search templates..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />

                        <FormControl className="category-select">

                            <InputLabel>Category</InputLabel>

                            <Select
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories?.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                    </Box>

                </Box>


                {/* TEMPLATE CARDS */}
                <Grid container spacing={3}>

                    {filteredTemplates?.map((template: any) => {
                        const previewImages = getTemplateImages(template);
                        const imageKey = String(template?._id ?? template.id ?? template.title ?? "template");
                        const activePreviewIndex = activeImageMap[imageKey] ?? 0;
                        const templateTags = normalizeTags(template);

                        return (
                            <Grid
                                size={{ xs: 12, sm: 6, lg: 4 }}
                                key={template._id || template.id || template.title}
                            >

                                <Card className="template-card">

                                    {/* Preview Area */}
                                    <Box className={`template-preview ${template.gradient}`} sx={{ position: "relative", overflow: "hidden" }}>
                                        <Box
                                            component="img"
                                            src={previewImages[activePreviewIndex]}
                                            alt={template.title}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                                // filter: "brightness(0.95)",
                                            }}
                                        />
                                    </Box>


                                    {/* Card Content */}
                                    <CardContent className="template-content">

                                        <Box className="template-top">

                                            <Chip
                                                label={template.category || "General"}
                                                className="template-chip"
                                            />

                                        </Box>

                                        <Typography
                                            variant="h5"
                                            className="template-title"
                                        >
                                            {template.title}
                                        </Typography>


                                        <Typography className="template-description">
                                            {template.description}
                                        </Typography>


                                        <Box className="template-tags">

                                            {templateTags.map((tag: string) => (
                                                <span key={`${template._id || template.id || template.title}-${tag}`}>
                                                    {tag}
                                                </span>
                                            ))}

                                        </Box>


                                        <Box className="template-actions">

                                            <Button
                                                startIcon={<VisibilityOutlinedIcon />}
                                                className="preview-btn"
                                                onClick={() => handleTemplateAction(template, "preview")}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Preview
                                            </Button>

                                            <Button
                                                endIcon={<ArrowForwardIcon />}
                                                className="use-btn"
                                                onClick={() => handleTemplateAction(template, "use")}
                                                style={{ cursor: "pointer" }}
                                            >
                                                Use Template
                                            </Button>

                                        </Box>

                                    </CardContent>

                                </Card>

                            </Grid>

                        );
                    })}

                </Grid>


                {/* EMPTY STATE */}
                {loading ? (
                    <Box className="empty-state">
                        <Typography variant="h5">Loading templates...</Typography>
                    </Box>
                ) : filteredTemplates.length === 0 && (

                    <Box className="empty-state">

                        <div>🔎</div>

                        <Typography variant="h5">
                            No templates found
                        </Typography>

                        <Typography>
                            Try another search or category.
                        </Typography>

                    </Box>

                )}

            </Container>

            <Dialog
                open={Boolean(previewTemplate)}
                onClose={() => setPreviewTemplate(null)}
                maxWidth="lg"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            overflow: "hidden",
                            background: "#06070a",
                            color: "#fff",
                            boxShadow: "0 24px 80px rgba(15, 23, 42, 0.45)",
                        },
                    },
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <IconButton
                        aria-label="close preview"
                        onClick={() => setPreviewTemplate(null)}
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 2,
                            background: "rgb(252, 252, 252)",
                            color: "#01080e",
                            "&:hover": { background: "rgba(112, 117, 128, 0.8)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box sx={{ position: "relative", height: { xs: 300, md: 520 }, background: "#111827" }}>
                        {previewImages?.length > 0 && (
                            <Box
                                component="img"
                                src={previewImages[previewIndex]}
                                alt={previewTemplate?.title || "Template preview"}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    display: "block",
                                    borderBottom: "3px solid rgba(252, 252, 252, 0.76)",
                                }}
                            />
                        )}

                        {canNavigatePreview && (
                            <>
                                <IconButton
                                    aria-label="previous image"
                                    onClick={goToPreviousPreview}
                                    sx={{
                                        position: "absolute",
                                        left: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "rgb(245, 245, 246)",
                                        color: "#000303",
                                        "&:hover": { background: "rgba(206, 209, 214, 0.8)" },
                                    }}
                                >
                                    <ChevronLeftIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="next image"
                                    onClick={goToNextPreview}
                                    sx={{
                                        position: "absolute",
                                        right: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "rgb(249, 249, 250)",
                                        color: "#010f11",
                                        "&:hover": { background: "rgba(255, 255, 255, 0.8)" },
                                    }}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>

                    <Box sx={{ p: 3 }}>
                      
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {previewImages?.map((image: string, index: number) => (
                                <Box
                                    key={`${previewTemplate?._id || previewTemplate?.id || "preview"}-thumb-${index}`}
                                    onClick={() => setPreviewIndex(index)}
                                    component="img"
                                    src={image}
                                    alt={`${previewTemplate?.title || "Template"} thumbnail ${index + 1}`}
                                    sx={{
                                        width: 72,
                                        height: 48,
                                        objectFit: "cover",
                                        borderRadius: 1.5,
                                        border: index === previewIndex ? "2px solid #f97316" : "1px solid rgba(255,255,255,0.25)",
                                        cursor: "pointer",
                                        opacity: index === previewIndex ? 1 : 0.3,
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Dialog>

            <Snackbar
                open={Boolean(toast)}
                autoHideDuration={2200}
                onClose={() => setToast(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                sx={{ bottom: "10px !important", left: "10px !important" }}
            >
                <Alert severity="info" onClose={() => setToast(null)} variant="filled" sx={{ borderRadius: 2 }}>
                    {toast}
                </Alert>
            </Snackbar>


            {/* CTA */}
            <Container maxWidth="lg">

                <Box className="bottom-cta">

                    <Typography className="cta-small">
                        HAVE AN IDEA?
                    </Typography>

                    <Typography variant="h3">
                        Your next creation starts here.
                    </Typography>

                    <Typography>
                        Pick a template, customize it and turn your idea into reality.
                    </Typography>

                    <Button
                        className="cta-button"
                        endIcon={<ArrowForwardIcon />}
                    >
                        Start Creating
                    </Button>

                </Box>

            </Container>


            {/* FOOTER */}
            <footer className="footer">

                <Container maxWidth="lg">

                    <Box className="footer-content">

                        <div className="footer-logo">
                            ✦ Algo<span style={{ color: "#ea580c" }}>Saathi</span>
                        </div>

                        <Typography>
                            Learn. Build. Grow. Together.
                        </Typography>

                    </Box>

                </Container>

            </footer>

        </Box>
    );
}


export default TemplateLibrary;