import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useGlobalToast } from "../../../common/GlobalToast";

import {
    addTemplate,
    buildTemplateFormData,
    deleteTemplate,
    getAllTemplates,
    updateTemplate,
} from "../api/api";
import type { TemplateFormData, TemplateItem } from "../api/interface";

const initialForm: TemplateFormData = {
    title: "",
    category: "Education",
    description: "",
    tags: "",
    icon: "🎓",
    gradient: "template-purple",
    url: "",
    images: ["", "", ""],
};

const categoryOptions = [
    "Law",
    "Education",
    "Technology",
    "Business",
    "Social",
    "Portfolio",
    "Marketing",
];

const gradientOptions = [
    { label: "Purple", value: "template-purple" },
    { label: "Blue", value: "template-blue" },
    { label: "Orange", value: "template-orange" },
    { label: "Pink", value: "template-pink" },
    { label: "Cyan", value: "template-cyan" },
    { label: "Green", value: "template-green" },
];

const AdminTemplateManager = () => {
    const [templates, setTemplates] = useState<TemplateItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<TemplateFormData>(initialForm);
    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<TemplateItem | null>(null);
    const { showToast } = useGlobalToast();

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;

        const selectedFiles = files.slice(0, 3);
        const nextImages = [...form.images];

        selectedFiles.forEach((file, index) => {
            const targetIndex = index + nextImages.findIndex((item) => item === "" || item === undefined);
            if (targetIndex >= 0 && targetIndex < 3) {
                nextImages[targetIndex] = file;
            }
        });

        setForm((prev) => ({
            ...prev,
            images: nextImages.slice(0, 3),
        }));

        if (selectedFiles.length > 0) {
            showToast(`${selectedFiles.length} image(s) selected.`, "success");
        }

        event.target.value = "";
    };

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
            showToast("Failed to load templates.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchTemplates();
    }, []);

    const filteredTemplates = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return templates;

        return templates.filter((template) => {
            const tags = Array.isArray(template.tags) ? template.tags.join(" ") : "";
            return [template.title, template.category, template.description, tags]
                .join(" ")
                .toLowerCase()
                .includes(query);
        });
    }, [templates, search]);

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedTags = form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        const validImageEntries = form.images.filter((image) => {
            if (typeof image === "string") return image.trim().length > 0;
            return image instanceof File;
        }).slice(0, 3);

        const payload = {
            ...form,
            tags: trimmedTags,
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category.trim() || "Education",
            icon: form.icon.trim() || "🎓",
            gradient: form.gradient.trim() || "template-purple",
            url: form.url.trim(),
            images: validImageEntries,
        };

        if (!payload.title || !payload.description) {
            showToast("Title and description are required.", "error");
            return;
        }

        if (!payload.url || !/^https?:\/\//i.test(payload.url)) {
            showToast("Please provide a valid Template URL starting with http:// or https://", "error");
            return;
        }

        if (validImageEntries.length === 0) {
            showToast("Please upload at least 1 image and up to 3 images.", "error");
            return;
        }

        try {
            setSaving(true);
            const formData = buildTemplateFormData({
                ...payload,
                images: validImageEntries,
            });

            if (editingId) {
                await updateTemplate(String(editingId), formData);
                showToast("Template updated successfully.", "success");
            } else {
                await addTemplate(formData);
                showToast("Template added successfully.", "success");
            }
            await fetchTemplates();
            resetForm();
        } catch (error) {
            console.error("Template save failed:", error);
            showToast("Could not save template. Check backend endpoint.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (template: TemplateItem) => {
        setEditingId(template._id || template.id || null);
        setForm({
            title: template.title || "",
            category: template.category || "Education",
            description: template.description || "",
            tags: Array.isArray(template.tags) ? template.tags.join(", ") : "",
            icon: template.icon || "🎓",
            gradient: template.gradient || "template-purple",
            url: template.url || "",
            images: Array.isArray(template.images) ? [...template.images, "", "", ""].slice(0, 3) : ["", "", ""],
        });
    };

    const handleDelete = async (template: TemplateItem) => {
        const id = template._id || template.id;
        if (!id) return;

        setDeleteTarget(template);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;

        const id = deleteTarget._id || deleteTarget.id;
        if (!id) {
            setDeleteTarget(null);
            return;
        }

        try {
            await deleteTemplate(id);
            await fetchTemplates();
            if (editingId === id) resetForm();
            showToast("Template deleted successfully.", "success");
        } catch (error) {
            console.error("Delete failed:", error);
            showToast("Could not delete template.", "error");
        } finally {
            setDeleteTarget(null);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)", py: 4 }}>
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            background: "linear-gradient(135deg, #0a4550 0%, #10435b 40%, #0e77a1 100%)",
                            color: "#fff",
                        }}
                    >
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ justifyContent: "space-between" }}>
                            <Box>
                                <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                                    Admin panel
                                </Typography>
                                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                                    Template Management
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<RefreshIcon />}
                                onClick={() => void fetchTemplates()}
                                sx={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
                            >
                                Refresh
                            </Button>
                        </Stack>
                    </Paper>

                    <Stack spacing={3}>
                        <Dialog
                            open={Boolean(deleteTarget)}
                            onClose={() => setDeleteTarget(null)}
                            maxWidth="xs"
                            fullWidth
                            slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}
                        >
                            <DialogTitle sx={{ pb: 1, fontWeight: 700 }}>Delete Template?</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete <strong>{deleteTarget?.title || "this template"}</strong>? This action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ px: 3, pb: 2 }}>
                                <Button onClick={() => setDeleteTarget(null)} variant="outlined" size="small">
                                    Cancel
                                </Button>
                                <Button onClick={() => void confirmDelete()} color="error" variant="contained" size="small">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Paper sx={{ p: 3, borderRadius: 4, height: "100%" }}>
                            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {editingId ? "Edit Template" : "Add New Template"}
                                    </Typography>
                                    {editingId && (
                                        <Button variant="text" onClick={resetForm}>
                                            Cancel
                                        </Button>
                                    )}
                                </Box>

                                <TextField
                                    label="Template title"
                                    value={form.title}
                                    onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                                    fullWidth
                                    required
                                />

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={form.category}
                                                label="Category"
                                                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                                            >
                                                {categoryOptions.map((category) => (
                                                    <MenuItem key={category} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <FormControl fullWidth>
                                            <InputLabel>Gradient</InputLabel>
                                            <Select
                                                value={form.gradient}
                                                label="Gradient"
                                                onChange={(event) => setForm((prev) => ({ ...prev, gradient: event.target.value }))}
                                            >
                                                {gradientOptions.map((gradient) => (
                                                    <MenuItem key={gradient.value} value={gradient.value}>
                                                        {gradient.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <TextField
                                    label="Icon"
                                    value={form.icon}
                                    onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
                                    fullWidth
                                    placeholder="🎓"
                                />

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                                        Template gallery (2–3 images)
                                    </Typography>

                                    <Button
                                        component="label"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ justifyContent: "center", py: 1.3, fontWeight: 700, letterSpacing: 0.6, minHeight: 56 }}
                                    >
                                        Select 1–3 images
                                        <input
                                            hidden
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) => void handleImageUpload(event)}
                                        />
                                    </Button>

                                    <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                                        {Array.from({ length: 3 }).map((_, index) => {
                                            const imageValue = form.images[index];
                                            const previewSrc =
                                                typeof imageValue === "string"
                                                    ? imageValue
                                                    : imageValue instanceof File
                                                        ? URL.createObjectURL(imageValue)
                                                        : "";
                                            const hasImage = Boolean(imageValue);

                                            return (
                                                <Box
                                                    key={`image-slot-${index}`}
                                                    sx={{
                                                        flex: "1 1 180px",
                                                        minWidth: 180,
                                                        border: "1px dashed rgba(148, 163, 184, 0.75)",
                                                        borderRadius: 2,
                                                        p: 1.5,
                                                        backgroundColor: "rgba(248, 250, 252, 0.8)",
                                                    }}
                                                >
                                                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1.25 }}>
                                                        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                                                            Image {index + 1}
                                                        </Typography>
                                                        {hasImage && (
                                                            <Button
                                                                size="small"
                                                                color="error"
                                                                variant="text"
                                                                sx={{ minWidth: 0, px: 0.75, py: 0.25 }}
                                                                onClick={() =>
                                                                    setForm((prev) => {
                                                                        const nextImages = [...prev.images];
                                                                        nextImages[index] = "";
                                                                        return { ...prev, images: nextImages };
                                                                    })
                                                                }
                                                            >
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </Stack>

                                                    {hasImage ? (
                                                        <Box
                                                            component="img"
                                                            src={previewSrc}
                                                            alt={`Template preview ${index + 1}`}
                                                            sx={{
                                                                width: "100%",
                                                                height: 220,
                                                                objectFit: "cover",
                                                                borderRadius: 1.5,
                                                                border: "1px solid rgba(148,163,184,0.4)",
                                                                display: "block",
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                width: "100%",
                                                                height: 220,
                                                                display: "grid",
                                                                placeItems: "center",
                                                                borderRadius: 1.5,
                                                                border: "1px dashed rgba(148,163,184,0.6)",
                                                                color: "text.secondary",
                                                                backgroundColor: "#fff",
                                                                fontSize: 13,
                                                            }}
                                                        >
                                                            No image
                                                        </Box>
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Stack>
                                </Box>

                                <TextField
                                    label="Template URL"
                                    value={form.url}
                                    onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
                                    fullWidth
                                    placeholder="https://example.com/template"
                                    required
                                />

                                <TextField
                                    label="Description"
                                    value={form.description}
                                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    required
                                />

                                <TextField
                                    label="Tags (comma separated)"
                                    value={form.tags}
                                    onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
                                    fullWidth
                                    placeholder="Education, Learning, Startup"
                                />

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        disabled={saving}
                                        size="small"
                                        sx={{
                                            background: "linear-gradient(135deg, #ea580c, #f97316)",
                                            borderRadius: 2,
                                            px: 2,
                                            py: 0.8,
                                            minWidth: 0,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {saving ? "Saving..." : editingId ? "Update Template" : "Add Template"}
                                    </Button>
                                </Box>
                            </Stack>
                        </Paper>

                        <Paper sx={{ p: 3, borderRadius: 4 }}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" } }}>
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    All Templates
                                </Typography>
                                <TextField
                                    size="small"
                                    placeholder="Search templates"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    sx={{ minWidth: { xs: "100%", sm: 260 } }}
                                />
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            {loading ? (
                                <Typography color="text.secondary">Loading templates...</Typography>
                            ) : filteredTemplates.length === 0 ? (
                                <Box sx={{ p: 3, textAlign: "center" }}>
                                    <Typography variant="h6" color="text.secondary">
                                        No templates available yet.
                                    </Typography>
                                </Box>
                            ) : (
                                <Stack spacing={2}>
                                    {filteredTemplates.map((template) => (
                                        <Card key={template._id || template.id} sx={{ borderRadius: 3, border: "1px solid rgba(148,163,184,0.2)" }}>
                                            <CardContent>
                                                <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ justifyContent: "space-between" }}>
                                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                                        <Box
                                                            sx={{
                                                                width: 54,
                                                                height: 54,
                                                                borderRadius: 2,
                                                                display: "grid",
                                                                placeItems: "center",
                                                                background: template.gradient || "linear-gradient(135deg, #dbeafe, #ede9fe)",
                                                                fontSize: 26,
                                                            }}
                                                        >
                                                            {template.icon || "🎓"}
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                                {template.title}
                                                            </Typography>
                                                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                                                <Chip label={template.category} size="small" />
                                                                {Array.isArray(template.tags) && template.tags.map((tag) => (
                                                                    <Chip key={`${template._id || template.id}-${tag}`} label={tag} size="small" variant="outlined" />
                                                                ))}
                                                            </Stack>
                                                        </Box>
                                                    </Box>

                                                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                        <IconButton color="primary" onClick={() => handleEdit(template)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDelete(template)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>

                                                {Array.isArray(template.images) && template.images.length > 0 && (
                                                    <Box sx={{ mt: 2, display: "flex", gap: 1, overflowX: "auto", pb: 0.5 }}>
                                                        {template.images.map((image, index) => (
                                                            <Box
                                                                key={`${template._id || template.id}-image-${index}`}
                                                                component="img"
                                                                src={image}
                                                                alt={`${template.title} preview ${index + 1}`}
                                                                sx={{
                                                                    width: 120,
                                                                    height: 82,
                                                                    objectFit: "cover",
                                                                    borderRadius: 2,
                                                                    border: "1px solid rgba(148,163,184,0.4)",
                                                                    flexShrink: 0,
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                )}

                                                {template.url && (
                                                    <Box sx={{ mt: 2 }}>
                                                        <Button
                                                            component="a"
                                                            href={template.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ borderRadius: 2 }}
                                                        >
                                                            Visit Template
                                                        </Button>
                                                    </Box>
                                                )}

                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                                    {template.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            )}
                        </Paper>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default AdminTemplateManager;
