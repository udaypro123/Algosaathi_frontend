import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import {
  deleteRoadmapDocument,
  formatFileSize,
  getRoadmaps,
  uploadRoadmapDocument,
  type RoadmapCourse,
  type RoadmapDocument,
} from "./api";

const DOCUMENT_ACCEPT =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.odt,.ods,.odp,.txt,.rtf,.csv,.md,.epub,.zip";

const AdminRoadmapManager = () => {
  const [courses, setCourses] = useState<RoadmapCourse[]>([]);
  const [courseName, setCourseName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      setCourses(await getRoadmaps());
      setError("");
    } catch {
      setError("Could not load courses and roadmap documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getRoadmaps()
      .then((roadmaps) => {
        if (!active) return;
        setCourses(roadmaps);
      })
      .catch(() => {
        if (active) setError("Could not load courses and roadmap documents.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError("");
    setMessage("");

    if (!courseName.trim() || !title.trim() || !file) {
      setError("Enter a course name, add a document title, and choose a file.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError("The maximum document size is 25 MB.");
      return;
    }

    setSaving(true);
    try {
      await uploadRoadmapDocument(courseName, title, description, file);
      setTitle("");
      setDescription("");
      setFile(null);
      formElement.reset();
      setMessage("Roadmap document uploaded successfully.");
      await loadData();
    } catch {
      setError("Upload failed. Check the file format and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (document: RoadmapDocument) => {
    if (!window.confirm(`Delete "${document.title}"?`)) return;
    setError("");
    setMessage("");
    try {
      await deleteRoadmapDocument(document.id);
      setCourses((current) =>
        current.map((course) => ({
          ...course,
          documents: course.documents.filter((item) => item.id !== document.id),
        }))
      );
      setMessage("Roadmap document deleted.");
    } catch {
      setError("Unable to delete this roadmap document.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", py: { xs: 1, md: 2 } }}>
      <Typography variant="h4" sx={{ mb: 0.75, fontWeight: 750 }}>
        Manage Roadmaps
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Upload downloadable learning documents to a course. Supported files include PDF,
        Word, PowerPoint, Excel, OpenDocument, text, CSV, EPUB and ZIP (up to 25 MB).
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <Card elevation={0} sx={{ mb: 3, border: "1px solid #e2e8f0", borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Add a course document
          </Typography>
          <Box component="form" onSubmit={(event) => void handleUpload(event)}>
            <Stack spacing={2}>
              <TextField
                label="Course name"
                placeholder="Type a course name"
                value={courseName}
                onChange={(event) => setCourseName(event.target.value)}
                required
                fullWidth
                helperText="Type an existing course name or create a roadmap group with a new name."
                slotProps={{ htmlInput: { maxLength: 120 } }}
              />
              <TextField
                label="Document title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                slotProps={{ htmlInput: { maxLength: 120 } }}
                fullWidth
              />
              <TextField
                label="Description (optional)"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                multiline
                minRows={2}
                slotProps={{ htmlInput: { maxLength: 500 } }}
                fullWidth
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<InsertDriveFileOutlinedIcon />}
                sx={{
                  justifyContent: "flex-start",
                  minHeight: 52,
                  textTransform: "none",
                  overflow: "hidden",
                }}
              >
                {file ? `${file.name} (${formatFileSize(file.size)})` : "Choose roadmap document"}
                <input
                  hidden
                  type="file"
                  accept={DOCUMENT_ACCEPT}
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <CloudUploadRoundedIcon />}
                disabled={saving}
                sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, textTransform: "none" }}
              >
                {saving ? "Uploading..." : "Upload document"}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
        Uploaded documents
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : courses.length === 0 ? (
        <Alert severity="info">No roadmap documents have been uploaded yet.</Alert>
      ) : (
        <Stack spacing={2}>
          {courses.map((course) => (
            <Card key={course.id} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                <Typography variant="subtitle1" sx={{ mb: 1.25, fontWeight: 700 }}>
                  {course.courseName}
                </Typography>
                {course.documents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No documents uploaded for this course.
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {course.documents.map((document) => (
                      <Stack
                        key={document.id}
                        direction="row"
                        spacing={1}
                        sx={{
                          p: 1.25,
                          border: "1px solid #e2e8f0",
                          borderRadius: 2,
                          alignItems: "center",
                        }}
                      >
                        <InsertDriveFileOutlinedIcon color="action" />
                        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                          <Typography sx={{ fontWeight: 600 }} noWrap>{document.title}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {document.fileName} · {formatFileSize(document.fileSize)}
                          </Typography>
                        </Box>
                        <IconButton
                          color="error"
                          aria-label={`Delete ${document.title}`}
                          onClick={() => void handleDelete(document)}
                        >
                          <DeleteOutlineRoundedIcon />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default AdminRoadmapManager;
