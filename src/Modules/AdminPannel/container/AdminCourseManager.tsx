import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
    TextField,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Alert,
    Divider,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Loader from "../../../common/Loader";
import { useGlobalToast } from "../../../common/GlobalToast";

import {
    addCourse,
    deleteCourse,
    getAllCourses,
    updateCourse,
    addInterviewQuestions,
    uploadTopicImages,
} from "../../Courses/api/api";
import type { CourseItem, Chapter, CoursePayload, ContentBlock, ContentBlockType, Topic } from "../../Courses/api/interface";

const emptyContentBlock = (type: ContentBlockType = "text"): ContentBlock => ({
    type,
    content: "",
    format: "plain" as const,
    url: "",
    alt: "",
    caption: "",
    textColor: "#000000",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    highlights: [],
});

const emptyTopic = {
    title: "",
    contentBlocks: [emptyContentBlock("text")],
    completed: false,
    interviewQuestions: [] as string[],
};

const emptyChapter: Chapter = {
    title: "",
    description: "",
    topics: [emptyTopic],
};

const initialForm: CoursePayload = {
    courseName: "",
    chapters: [emptyChapter],
};

const AdminCourseManager = () => {
    const [courses, setCourses] = useState<CourseItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<CoursePayload>(initialForm);
    const [error, setError] = useState("");
    const [deleteTarget, setDeleteTarget] = useState<CourseItem | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [interviewTarget, setInterviewTarget] = useState<{ courseId: string; chapterIndex: number; topicIndex: number } | null>(null);
    const [interviewText, setInterviewText] = useState("");
    const [uploadingTopic, setUploadingTopic] = useState<string | null>(null);
    const { showToast } = useGlobalToast();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await getAllCourses();
            const list = Array.isArray(data) ? data : data?.data || data?.courses || [];
            setCourses(list);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to load courses.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
        setOpenDialog(false);
    };

    const handleChapterChange = (chapterIndex: number, field: keyof Chapter, value: any) => {
        setForm((prev) => {
            const chapters = [...prev.chapters];
            chapters[chapterIndex] = { ...chapters[chapterIndex], [field]: value };
            return { ...prev, chapters };
        });
    };

    const updateTopic = (chapters: CoursePayload["chapters"], chapterIndex: number, topicIndex: number, updater: (topic: Topic) => Topic) => {
        const updatedChapters = [...chapters];
        const topics = [...updatedChapters[chapterIndex].topics];
        topics[topicIndex] = updater(topics[topicIndex]);
        updatedChapters[chapterIndex] = { ...updatedChapters[chapterIndex], topics };
        return updatedChapters;
    };

    const handleTopicChange = (chapterIndex: number, topicIndex: number, _field: "title", value: string) => {
        setForm((prev) => {
            const chapters = updateTopic(prev.chapters, chapterIndex, topicIndex, (topic) => {
                return { ...topic, title: value };
            });
            return { ...prev, chapters };
        });
    };

    const handleBlockChange = (chapterIndex: number, topicIndex: number, blockIndex: number, field: keyof ContentBlock, value: string | Array<{ text: string; color: string }>) => {
        setForm((prev) => {
            const chapters = updateTopic(prev.chapters, chapterIndex, topicIndex, (topic) => {
                const blocks = [...topic.contentBlocks];
                blocks[blockIndex] = { ...blocks[blockIndex], [field]: value };
                return { ...topic, contentBlocks: blocks };
            });
            return { ...prev, chapters };
        });
    };

    const addBlock = (chapterIndex: number, topicIndex: number, type: ContentBlockType) => {
        setForm((prev) => {
            const chapters = updateTopic(prev.chapters, chapterIndex, topicIndex, (topic) => ({
                ...topic,
                contentBlocks: [...topic.contentBlocks, emptyContentBlock(type)],
            }));
            return { ...prev, chapters };
        });
    };

    const removeBlock = (chapterIndex: number, topicIndex: number, blockIndex: number) => {
        setForm((prev) => {
            const chapters = updateTopic(prev.chapters, chapterIndex, topicIndex, (topic) => ({
                ...topic,
                contentBlocks: topic.contentBlocks.filter((_, index) => index !== blockIndex),
            }));
            return { ...prev, chapters };
        });
    };

    const addChapter = () => {
        setForm((prev) => ({
            ...prev,
            chapters: [...prev.chapters, { title: "", description: "", topics: [emptyTopic] }],
        }));
    };

    const removeChapter = (chapterIndex: number) => {
        setForm((prev) => ({
            ...prev,
            chapters: prev.chapters.filter((_, index) => index !== chapterIndex),
        }));
    };

    const addTopic = (chapterIndex: number) => {
        setForm((prev) => {
            const chapters = [...prev.chapters];
            chapters[chapterIndex] = {
                ...chapters[chapterIndex],
                topics: [...chapters[chapterIndex].topics, emptyTopic],
            };
            return { ...prev, chapters };
        });
    };

    const removeTopic = (chapterIndex: number, topicIndex: number) => {
        setForm((prev) => {
            const chapters = [...prev.chapters];
            chapters[chapterIndex] = {
                ...chapters[chapterIndex],
                topics: chapters[chapterIndex].topics.filter((_, index) => index !== topicIndex),
            };
            return { ...prev, chapters };
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!form.courseName.trim()) {
            showToast("Course name is required.", "error");
            return;
        }

        const validChapters = form.chapters.filter((chapter) => chapter.title.trim());
        if (validChapters.length === 0) {
            showToast("At least one chapter with a title is required.", "error");
            return;
        }

        let hasInvalidTopic = false;
        validChapters.forEach((chapter) => {
            chapter.topics.forEach((topic) => {
                if (!topic.title.trim()) {
                    hasInvalidTopic = true;
                }
            });
        });

        if (hasInvalidTopic) {
            showToast("All topics must have a title.", "error");
            return;
        }

        try {
            setSaving(true);
            const payload: CoursePayload = {
                courseName: form.courseName.trim(),
                chapters: validChapters.map((chapter) => ({
                    ...chapter,
                    topics: chapter.topics.map((topic) => ({
                        ...topic,
                        contentBlocks: topic.contentBlocks.filter((block) => {
                            if (block.type === "text") return block.content.trim().length > 0;
                            if (block.type === "image") return block.url.trim().length > 0;
                            return false;
                        }),
                    })),
                })),
            };

            if (editingId) {
                await updateCourse(editingId, payload);
                showToast("Course updated successfully.", "success");
            } else {
                await addCourse(payload);
                showToast("Course added successfully.", "success");
            }

            await fetchCourses();
            resetForm();
        } catch (err: any) {
            showToast(err?.response?.data?.message || "Failed to save course.", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleOpenDialog = () => {
        setEditingId(null);
        setForm(initialForm);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingId(null);
        setForm(initialForm);
    };

    const handleEdit = (course: CourseItem) => {
        setEditingId(course._id);
        setForm({
            courseName: course.courseName,
            chapters: course.chapters.map((chapter) => ({
                title: chapter.title,
                description: chapter.description,
                    topics: chapter.topics.map((topic) => ({
                        title: topic.title,
                        contentBlocks: topic.contentBlocks.length ? topic.contentBlocks : [emptyContentBlock("text")],
                        completed: topic.completed,
                        interviewQuestions: topic.interviewQuestions || [],
                    })),
            })),
        });
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteCourse(deleteTarget._id);
            await fetchCourses();
            if (editingId === deleteTarget._id) resetForm();
            showToast("Course deleted successfully.", "success");
        } catch (err: any) {
            showToast(err?.response?.data?.message || "Failed to delete course.", "error");
        } finally {
            setDeleteTarget(null);
        }
    };

    const openInterviewDialog = (courseId: string, chapterIndex: number, topicIndex: number) => {
        setInterviewTarget({ courseId, chapterIndex, topicIndex });
        setInterviewText("");
    };

    const handleAddInterviewQuestions = async () => {
        if (!interviewTarget || !interviewText.trim()) return;

        const questions = interviewText.split(",").map((q) => q.trim()).filter(Boolean);
        if (questions.length === 0) {
            showToast("Enter at least one interview question.", "error");
            return;
        }

        try {
            await addInterviewQuestions(interviewTarget.courseId, {
                chapterIndex: interviewTarget.chapterIndex,
                topicIndex: interviewTarget.topicIndex,
                interviewQuestions: questions,
            });
            await fetchCourses();
            setInterviewTarget(null);
            setInterviewText("");
            showToast("Interview questions added.", "success");
        } catch (err: any) {
            showToast(err?.response?.data?.message || "Failed to add interview questions.", "error");
        }
    };

    const handleTopicImageUpload = async (chapterIndex: number, topicIndex: number, files: FileList | null) => {
        if (!files || files.length === 0 || !editingId) return;

        try {
            setUploadingTopic(`${chapterIndex}-${topicIndex}`);
            const uploadedFiles = Array.from(files);
            const result = await uploadTopicImages(editingId, chapterIndex, topicIndex, uploadedFiles);

            const urls: string[] = Array.isArray(result?.urls)
                ? result.urls
                : Array.isArray(result?.data?.urls)
                    ? result.data.urls
                    : [];

            if (!urls.length) {
                showToast("Image upload failed.", "error");
                return;
            }

            setForm((prev) => {
                const chapters = [...prev.chapters];
                const topics = [...chapters[chapterIndex].topics];
                const topic = { ...topics[topicIndex] };

            const newBlocks = urls.map((url): ContentBlock => ({
                type: "image",
                content: "",
                format: "plain",
                url,
                alt: "",
                caption: "",
            }));

                topic.contentBlocks = [...topic.contentBlocks, ...newBlocks];
                topics[topicIndex] = topic;
                chapters[chapterIndex] = { ...chapters[chapterIndex], topics };
                return { ...prev, chapters };
            });

            showToast("Images uploaded successfully.", "success");
        } catch (err: any) {
            showToast(err?.response?.data?.message || "Failed to upload images.", "error");
        } finally {
            setUploadingTopic(null);
        }
    };

    return (
        <Box className="containerClass">
            <Box className="SubContainerClass">
                <Box sx={{ p: 3, borderRadius: 4, background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)", color: "#fff" }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", md: "center" } }}>
                        <Box>
                            <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                                Admin panel
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: 800 }}>
                                Course Management
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<AddIcon />}
                            onClick={handleOpenDialog}
                            sx={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
                        >
                            Add Course
                        </Button>
                    </Stack>
                </Box>

                <Stack spacing={3} sx={{ mt: 3 }}>
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        maxWidth="md"
                        fullWidth
                        slotProps={{ paper: { sx: { borderRadius: 3, maxHeight: "90vh" } } }}
                    >
                        <DialogTitle
                            sx={{
                                background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                                color: "#fff",
                                fontWeight: 700,
                            }}
                        >
                            {editingId ? "Edit Course" : "Add New Course"}
                        </DialogTitle>
                        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: 2 }}>
                            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                                <TextField
                                    label="Course Name"
                                    value={form.courseName}
                                    onChange={(event) => setForm((prev) => ({ ...prev, courseName: event.target.value }))}
                                    fullWidth
                                    required
                                />

                                {form.chapters.map((chapter, chapterIndex) => (
                                    <Paper key={chapterIndex} sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
                                        <Stack spacing={2}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                                    Chapter {chapterIndex + 1}
                                                </Typography>
                                                {form.chapters.length > 1 && (
                                                    <Button size="small" color="error" onClick={() => removeChapter(chapterIndex)}>
                                                        Remove
                                                    </Button>
                                                )}
                                            </Box>

                                            <TextField
                                                label="Chapter Title"
                                                value={chapter.title}
                                                onChange={(event) => handleChapterChange(chapterIndex, "title", event.target.value)}
                                                fullWidth
                                                required
                                            />

                                            <TextField
                                                label="Chapter Description"
                                                value={chapter.description}
                                                onChange={(event) => handleChapterChange(chapterIndex, "description", event.target.value)}
                                                fullWidth
                                                multiline
                                                minRows={2}
                                            />

                                            <Stack spacing={1}>
                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                    Topics
                                                </Typography>
                                                {chapter.topics.map((topic, topicIndex) => (
                                                    <Paper key={topicIndex} sx={{ p: 2, borderRadius: 2, border: "1px dashed", borderColor: "divider", bgcolor: "background.default" }}>
                                                        <Stack spacing={1.5}>
                                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                                                    Topic {topicIndex + 1}
                                                                </Typography>
                                                                {chapter.topics.length > 1 && (
                                                                    <IconButton size="small" color="error" onClick={() => removeTopic(chapterIndex, topicIndex)}>
                                                                        <DeleteIcon fontSize="small" />
                                                                    </IconButton>
                                                                )}
                                                            </Box>

                                                            <TextField
                                                                label="Topic Title"
                                                                value={topic.title}
                                                                onChange={(event) => handleTopicChange(chapterIndex, topicIndex, "title", event.target.value)}
                                                                fullWidth
                                                                required
                                                                size="small"
                                                            />

                                                            <Stack spacing={1.5}>
                                                                {topic.contentBlocks.map((block, blockIndex) => (
                                                                    <Paper key={blockIndex} sx={{ p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
                                                                        <Stack spacing={1.5}>
                                                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                                                 <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                                                                    <Chip
                                                                                        size="small"
                                                                                        icon={block.type === "text" ? <TextFieldsIcon /> : <ImageIcon />}
                                                                                        label={block.type === "text" ? "Text Block" : "Image Block"}
                                                                                        color={block.type === "text" ? "primary" : "secondary"}
                                                                                        variant="outlined"
                                                                                    />
                                                                                    {block.type === "text" && (
                                                                                        <FormControl size="small" sx={{ minWidth: 120 }}>
                                                                                            <InputLabel>Format</InputLabel>
                                                                                            <Select
                                                                                                value={block.format}
                                                                                                label="Format"
                                                                                                onChange={(event) => handleBlockChange(chapterIndex, topicIndex, blockIndex, "format", event.target.value)}
                                                                                            >
                                                                                                 <MenuItem value="plain">Plain</MenuItem>
                                                                                                 <MenuItem value="markdown">Markdown</MenuItem>
                                                                                                 <MenuItem value="html">HTML</MenuItem>
                                                                                            </Select>
                                                                                        </FormControl>
                                                                                    )}
                                                                                </Stack>
                                                                                <IconButton size="small" color="error" onClick={() => removeBlock(chapterIndex, topicIndex, blockIndex)}>
                                                                                    <DeleteIcon fontSize="small" />
                                                                                </IconButton>
                                                                            </Box>

                                                                             {block.type === "text" ? (
                                                                                 <Stack spacing={1.5}>
                                                                                     <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                                                                                         Tip: Use HTML format to enable highlighting. Wrap text with &lt;mark&gt;...&lt;/mark&gt; or use the button below.
                                                                                     </Typography>
                                                                                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: "center" }}>
                                                                                          <TextField
                                                                                              label="Highlight Color"
                                                                                              type="color"
                                                                                              value={block.highlights?.[0]?.color || "#fef08a"}
                                                                                              onChange={(event) => handleBlockChange(chapterIndex, topicIndex, blockIndex, "highlights", [{ text: "", color: event.target.value }])}
                                                                                              fullWidth
                                                                                              size="small"
                                                                                              sx={{ "& input": { py: 0.5, px: 1 } }}
                                                                                          />
                                                                                         <Button
                                                                                             size="small"
                                                                                             variant="outlined"
                                                                                             startIcon={<FormatColorFillIcon />}
                                                                                             onClick={() => {
                                                                                                                                 const textarea = document.querySelector(`[data-block-index="${blockIndex}"] textarea`) as HTMLTextAreaElement | null;
                                                                                                                                 if (textarea) {
                                                                                                                                     const start = textarea.selectionStart;
                                                                                                                                     const end = textarea.selectionEnd;
                                                                                                                                     const selectedText = block.content.slice(start, end);
                                                                                                                                     if (selectedText) {
                                                                                                                                         const highlightColor = block.highlights?.[0]?.color || "#fef08a";
                                                                                                                                         const highlighted = `<mark style="background-color: ${highlightColor}; color: #713f12; padding: 2px 4px; border-radius: 4px;">${selectedText}</mark>`;
                                                                                                                                         const newContent = block.content.slice(0, start) + highlighted + block.content.slice(end);
                                                                                                                                         handleBlockChange(chapterIndex, topicIndex, blockIndex, "content", newContent);
                                                                                                                                         handleBlockChange(chapterIndex, topicIndex, blockIndex, "format", "html");
                                                                                                                                     }
                                                                                                                                 }
                                                                                                                                 }}
                                                                                         >
                                                                                                                                 Highlight Selection
                                                                                         </Button>
                                                                                     </Stack>
                                                                                      <TextField
                                                                                          label="Content"
                                                                                          value={block.content}
                                                                                          onChange={(event) => handleBlockChange(chapterIndex, topicIndex, blockIndex, "content", event.target.value)}
                                                                                          fullWidth
                                                                                          multiline
                                                                                          minRows={5}
                                                                                          placeholder="Write topic content here... Use <mark>text</mark> to highlight"
                                                                                          data-block-index={blockIndex}
                                                                                      />
                                                                                 </Stack>
                                                                             ) : (
                                                                                <Stack spacing={1.5}>
                                                                                    <TextField
                                                                                        label="Image URL"
                                                                                        value={block.url}
                                                                                        onChange={(event) => handleBlockChange(chapterIndex, topicIndex, blockIndex, "url", event.target.value)}
                                                                                        fullWidth
                                                                                        placeholder="https://example.com/image.jpg"
                                                                                    />
                                                                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                                                                                        <TextField
                                                                                            label="Alt Text"
                                                                                            value={block.alt}
                                                                                            onChange={(event) => handleBlockChange(chapterIndex, topicIndex, blockIndex, "alt", event.target.value)}
                                                                                            fullWidth
                                                                                            size="small"
                                                                                        />
                                                                                        <TextField
                                                                                            label="Caption"
                                                                                            value={block.caption}
                                                                                            onChange={(event) => handleBlockChange(chapterIndex, topicIndex, blockIndex, "caption", event.target.value)}
                                                                                            fullWidth
                                                                                            size="small"
                                                                                        />
                                                                                    </Stack>
                                                                                </Stack>
                                                                            )}
                                                                        </Stack>
                                                                    </Paper>
                                                                ))}
                                                            </Stack>

                                                            <Stack direction="row" spacing={1}>
                                                                <Button size="small" startIcon={<TextFieldsIcon />} onClick={() => addBlock(chapterIndex, topicIndex, "text")} variant="outlined">
                                                                    Add Text
                                                                </Button>
                                                                <Button size="small" startIcon={<ImageIcon />} onClick={() => addBlock(chapterIndex, topicIndex, "image")} variant="outlined">
                                                                    Add Image
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    component="label"
                                                                    variant="outlined"
                                                                    disabled={uploadingTopic === `${chapterIndex}-${topicIndex}`}
                                                                >
                                                                    {uploadingTopic === `${chapterIndex}-${topicIndex}` ? "Uploading..." : "Upload Images"}
                                                                    <input
                                                                        hidden
                                                                        type="file"
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={(event) => {
                                                                            handleTopicImageUpload(chapterIndex, topicIndex, event.target.files);
                                                                            event.target.value = "";
                                                                        }}
                                                                    />
                                                                </Button>
                                                            </Stack>
                                                        </Stack>
                                                    </Paper>
                                                ))}
                                                <Button size="small" startIcon={<AddIcon />} onClick={() => addTopic(chapterIndex)}>
                                                    Add Topic
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                ))}

                                <Button startIcon={<AddIcon />} onClick={addChapter} variant="outlined">
                                    Add Chapter
                                </Button>

                                <DialogActions sx={{ px: 0, pb: 0, justifyContent: "flex-end" }}>
                                    <Button onClick={handleCloseDialog} variant="outlined" disabled={saving}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={saving} startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <CloudUploadIcon />}>
                                        {saving ? "Saving..." : editingId ? "Update Course" : "Add Course"}
                                    </Button>
                                </DialogActions>
                            </Stack>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={Boolean(deleteTarget)}
                        onClose={() => setDeleteTarget(null)}
                        maxWidth="xs"
                        fullWidth
                        slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}
                    >
                        <DialogTitle sx={{ pb: 1, fontWeight: 700 }}>Delete Course?</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete <strong>{deleteTarget?.courseName || "this course"}</strong>? This action cannot be undone.
                            </Typography>
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

                    <Dialog
                        open={Boolean(interviewTarget)}
                        onClose={() => setInterviewTarget(null)}
                        maxWidth="sm"
                        fullWidth
                        slotProps={{ paper: { sx: { borderRadius: 3, p: 3 } } }}
                    >
                        <DialogTitle sx={{ pb: 1, fontWeight: 700 }}>
                            Add Interview Questions
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                                Enter questions separated by commas.
                            </Typography>
                            <TextField
                                label="Interview Questions"
                                value={interviewText}
                                onChange={(event) => setInterviewText(event.target.value)}
                                fullWidth
                                multiline
                                minRows={3}
                                placeholder="Question 1, Question 2, Question 3"
                            />
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={() => setInterviewTarget(null)} variant="outlined">
                                Cancel
                            </Button>
                            <Button onClick={handleAddInterviewQuestions} variant="contained">
                                Save Questions
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {error && (
                        <Alert severity="error" onClose={() => setError("")} sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Paper sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                            All Courses
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {loading ? (
                            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
                                <Loader />
                            </Box>
                        ) : courses.length === 0 ? (
                            <Typography sx={{ color: "text.secondary", textAlign: "center", py: 4 }}>
                                No courses found. Add your first course above.
                            </Typography>
                        ) : (
                            <Stack spacing={2}>
                                {courses.map((course) => (
                                    <Paper key={course._id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" } }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {course.courseName}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                    {course.chapters.length} chapters
                                                </Typography>
                                            </Box>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton color="primary" onClick={() => handleEdit(course)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => setDeleteTarget(course)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </Stack>

                                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                                            {course.chapters.map((chapter, chapterIndex) => (
                                                <Box key={chapterIndex} sx={{ pl: 2, borderLeft: "2px solid", borderColor: "divider" }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                        {chapter.title}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                                        {chapter.topics.length} topics
                                                    </Typography>
                                                    <Stack spacing={1} sx={{ mt: 1 }}>
                                                        {chapter.topics.map((topic, topicIndex) => (
                                                            <Box key={topicIndex}>
                                                                <Button
                                                                    size="small"
                                                                    variant="text"
                                                                    onClick={() => openInterviewDialog(course._id, chapterIndex, topicIndex)}
                                                                    sx={{ textTransform: "none", p: 0, justifyContent: "flex-start" }}
                                                                >
                                                                    Topic {topicIndex + 1}
                                                                    {topic.interviewQuestions?.length ? ` (${topic.interviewQuestions.length})` : ""}
                                                                </Button>
                                                                {topic.interviewQuestions?.length ? (
                                                                    <Stack component="ul" spacing={0.25} sx={{ pl: 2, m: 0, mt: 0.5 }}>
                                                                        {topic.interviewQuestions.map((question, qIndex) => (
                                                                            <Typography
                                                                                key={qIndex}
                                                                                component="li"
                                                                                variant="caption"
                                                                                sx={{ color: "text.secondary" }}
                                                                            >
                                                                                {question}
                                                                            </Typography>
                                                                        ))}
                                                                    </Stack>
                                                                ) : null}
                                                            </Box>
                                                        ))}
                                                    </Stack>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Paper>
                                ))}
                            </Stack>
                        )}
                    </Paper>
                </Stack>
            </Box>
        </Box>
    );
};

export default AdminCourseManager;
