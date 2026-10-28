import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import {
  createRoadmapCourse,
  deleteRoadmapCourse,
  deleteRoadmapDocument,
  formatFileSize,
  getRoadmaps,
  updateRoadmapCourse,
  updateRoadmapDocument,
  uploadRoadmapDocument,
  type RoadmapCourse,
  type RoadmapDocument,
} from "./api";

const DOCUMENT_ACCEPT =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.odt,.ods,.odp,.txt,.rtf,.csv,.md,.epub,.zip";

const getErrorMessage = (error: unknown, fallback: string) => {
  const responseMessage = (
    error as { response?: { data?: { message?: string } } }
  )?.response?.data?.message;
  return responseMessage || fallback;
};

const AdminRoadmapManager = () => {
  const [courses, setCourses] = useState<RoadmapCourse[]>([]);
  const [documentCourseName, setDocumentCourseName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [courseSaving, setCourseSaving] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [editingCourse, setEditingCourse] = useState<RoadmapCourse | null>(null);
  const [editRoadmapCourseName, setEditRoadmapCourseName] = useState("");
  const [editingDocument, setEditingDocument] = useState<RoadmapDocument | null>(null);
  const [editCourseName, setEditCourseName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadRoadmaps = async () => {
    try {
      setCourses(await getRoadmaps());
    } catch (loadError) {
      setError(getErrorMessage(loadError, "Could not load uploaded roadmap documents."));
    } finally {
      setLoadingDocuments(false);
    }
  };

  useEffect(() => {
    let active = true;
    getRoadmaps()
      .then((roadmaps) => {
        if (active) setCourses(roadmaps);
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(getErrorMessage(loadError, "Could not load uploaded roadmap documents."));
        }
      })
      .finally(() => {
        if (active) setLoadingDocuments(false);
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

    if (!documentCourseName.trim() || !title.trim() || !file) {
      setError("Enter a course name, add a document title, and choose a file.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError("The maximum document size is 25 MB.");
      return;
    }

    setSaving(true);
    try {
      await uploadRoadmapDocument(documentCourseName, title, description, file);
      setTitle("");
      setDescription("");
      setFile(null);
      formElement.reset();
      setMessage("Roadmap document uploaded successfully.");
      await loadRoadmaps();
    } catch (uploadError) {
      setError(getErrorMessage(uploadError, "Upload failed. Check the file format and try again."));
    } finally {
      setSaving(false);
    }
  };

  const handleCreateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const courseName = newCourseName.trim();
    if (!courseName) {
      setError("Enter a course name.");
      return;
    }

    setError("");
    setMessage("");
    setCourseSaving(true);
    try {
      await createRoadmapCourse(courseName);
      setNewCourseName("");
      setMessage("Roadmap course created.");
      await loadRoadmaps();
    } catch (createError) {
      setError(getErrorMessage(createError, "Unable to create the roadmap course."));
    } finally {
      setCourseSaving(false);
    }
  };

  const handleUpdateCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingCourse || !editRoadmapCourseName.trim()) {
      setError("Enter a course name.");
      return;
    }

    setError("");
    setMessage("");
    setCourseSaving(true);
    try {
      await updateRoadmapCourse(editingCourse.id, editRoadmapCourseName.trim());
      setEditingCourse(null);
      setMessage("Roadmap course updated.");
      await loadRoadmaps();
    } catch (updateError) {
      setError(getErrorMessage(updateError, "Unable to update the roadmap course."));
    } finally {
      setCourseSaving(false);
    }
  };

  const handleDeleteCourse = async (course: RoadmapCourse) => {
    if (course.documents.length > 0) {
      setError("Delete the course's roadmap documents before deleting the course.");
      return;
    }
    if (!window.confirm(`Permanently delete the roadmap course "${course.courseName}"?`)) return;

    setError("");
    setMessage("");
    setDeletingId(course.id);
    try {
      await deleteRoadmapCourse(course.id);
      setMessage("Roadmap course deleted.");
      await loadRoadmaps();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Unable to delete the roadmap course."));
    } finally {
      setDeletingId(null);
    }
  };

  const openEditDialog = (courseName: string, document: RoadmapDocument) => {
    setEditingDocument(document);
    setEditCourseName(courseName);
    setEditTitle(document.title);
    setEditDescription(document.description);
    setReplacementFile(null);
    setError("");
    setMessage("");
  };

  const closeEditDialog = () => {
    if (saving) return;
    setEditingDocument(null);
    setReplacementFile(null);
  };

  const handleUpdateDocument = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingDocument || !editCourseName.trim() || !editTitle.trim()) {
      setError("Enter a course name and document title.");
      return;
    }
    if (replacementFile && replacementFile.size > 25 * 1024 * 1024) {
      setError("The maximum document size is 25 MB.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      await updateRoadmapDocument(
        editingDocument.id,
        editCourseName,
        editTitle,
        editDescription,
        replacementFile ?? undefined
      );
      setEditingDocument(null);
      setReplacementFile(null);
      setMessage("Roadmap document updated.");
      await loadRoadmaps();
    } catch (updateError) {
      setError(getErrorMessage(updateError, "Unable to update this roadmap document."));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDocument = async (document: RoadmapDocument) => {
    if (!window.confirm(`Permanently delete "${document.title}"?`)) return;
    setError("");
    setMessage("");
    setDeletingId(document.id);
    try {
      await deleteRoadmapDocument(document.id);
      setCourses((current) =>
        current
          .map((course) => ({
            ...course,
            documents: course.documents.filter((item) => item.id !== document.id),
          }))
      );
      setMessage("Roadmap document deleted.");
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Unable to delete this roadmap document."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", py: { xs: 1, md: 2 } }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          mb: 3,
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          color: "white",
          background: "linear-gradient(125deg, #172554, #1d4ed8 58%, #0284c7)",
          boxShadow: "0 16px 36px rgba(29, 78, 216, 0.18)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.07)",
            top: -110,
            right: -40,
          }}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ position: "relative", alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              display: "grid",
              flexShrink: 0,
              placeItems: "center",
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <RouteRoundedIcon sx={{ fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
              Roadmap Library
            </Typography>
            <Typography sx={{ mt: 0.75, maxWidth: 620, color: "rgba(255,255,255,0.82)" }}>
              Share helpful course guides with learners. Upload once and make them available to download.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

      <Card
        elevation={0}
        sx={{
          mb: 3,
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          boxShadow: "0 12px 36px rgba(15, 23, 42, 0.06)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 3.5 } }}>
          <Typography variant="h5" sx={{ fontWeight: 750 }}>
            Roadmap courses
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
            Manage the course groups shown on the public roadmaps page. These are separate from regular courses.
          </Typography>
          <Box component="form" onSubmit={(event) => void handleCreateCourse(event)}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                label="New roadmap course"
                placeholder="e.g. Data Structures and Algorithms"
                value={newCourseName}
                onChange={(event) => setNewCourseName(event.target.value)}
                required
                fullWidth
                slotProps={{ htmlInput: { maxLength: 120 } }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={courseSaving}
                startIcon={courseSaving ? <CircularProgress size={18} color="inherit" /> : <AddCircleOutlineRoundedIcon />}
                sx={{ minWidth: { sm: 180 }, textTransform: "none", fontWeight: 700 }}
              >
                Add course
              </Button>
            </Stack>
          </Box>
          {courses.length > 0 && (
            <Stack spacing={1} sx={{ mt: 2 }}>
              {courses.map((course) => (
                <Stack
                  key={course.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{
                    p: 1.5,
                    border: "1px solid #e2e8f0",
                    borderRadius: 2.5,
                    alignItems: { xs: "stretch", sm: "center" },
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 650, overflowWrap: "anywhere" }}>
                      {course.courseName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {course.documents.length} roadmap {course.documents.length === 1 ? "document" : "documents"}
                      {course.managed === false ? " · Legacy group" : ""}
                    </Typography>
                  </Box>
                  {course.managed !== false && (
                    <Stack direction="row" spacing={0.5} sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
                      <IconButton
                        aria-label={`Rename ${course.courseName}`}
                        disabled={courseSaving || deletingId !== null}
                        onClick={() => {
                          setEditingCourse(course);
                          setEditRoadmapCourseName(course.courseName);
                        }}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label={`Delete ${course.courseName}`}
                        disabled={course.documents.length > 0 || courseSaving || deletingId !== null}
                        onClick={() => void handleDeleteCourse(course)}
                      >
                        {deletingId === course.id
                          ? <CircularProgress size={20} color="inherit" />
                          : <DeleteOutlineRoundedIcon />}
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      <Card
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1180,
          mx: "auto",
          border: "1px solid #e2e8f0",
          borderRadius: 4,
          boxShadow: "0 12px 36px rgba(15, 23, 42, 0.06)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 4 } }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                display: "grid",
                placeItems: "center",
                borderRadius: 2.5,
                color: "#1d4ed8",
                bgcolor: "#eff6ff",
              }}
            >
              <CloudUploadRoundedIcon />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 750 }}>
                Upload a roadmap
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add a document and associate it with a course.
              </Typography>
            </Box>
          </Stack>

          <Box component="form" onSubmit={(event) => void handleUpload(event)}>
            <Stack spacing={2.25}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  "& > *": { flex: 1, minWidth: 0 },
                }}
              >
                <TextField
                  label="Course name"
                  placeholder="e.g. Frontend Development"
                  value={documentCourseName}
                  onChange={(event) => setDocumentCourseName(event.target.value)}
                  required
                  fullWidth
                  slotProps={{ htmlInput: { maxLength: 120 } }}
                />
                <TextField
                  label="Document title"
                  placeholder="e.g. React Learning Path"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  fullWidth
                  slotProps={{ htmlInput: { maxLength: 120 } }}
                />
              </Stack>
              <TextField
                label="Description"
                placeholder="Briefly describe what learners will find in this document"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                multiline
                minRows={3}
                slotProps={{ htmlInput: { maxLength: 500 } }}
                fullWidth
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<InsertDriveFileOutlinedIcon />}
                sx={{
                  justifyContent: "flex-start",
                  minHeight: 56,
                  px: 2,
                  borderRadius: 2.5,
                  borderStyle: "dashed",
                  textTransform: "none",
                  overflow: "hidden",
                  color: file ? "text.primary" : "text.secondary",
                  "&:hover": { borderStyle: "dashed", bgcolor: "#f8fafc" },
                }}
              >
                {file ? `${file.name} · ${formatFileSize(file.size)}` : "Choose a roadmap document"}
                <input
                  hidden
                  type="file"
                  accept={DOCUMENT_ACCEPT}
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </Button>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between" }}
              >
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "text.secondary" }}>
                  <VerifiedRoundedIcon sx={{ fontSize: 18, color: "#16a34a" }} />
                  <Typography variant="caption">
                    PDF, Office, text, CSV, EPUB, ZIP · Up to 25 MB
                  </Typography>
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <CloudUploadRoundedIcon />}
                  disabled={saving}
                  sx={{
                    minHeight: 46,
                    px: 3,
                    borderRadius: 2.5,
                    alignSelf: { xs: "stretch", sm: "auto" },
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "0 6px 16px rgba(29, 78, 216, 0.2)",
                  }}
                >
                  {saving ? "Uploading..." : "Upload document"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", mb: 1.75 }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 750 }}>
              Uploaded roadmaps
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Edit document details, replace files, or remove old uploads.
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {courses.reduce((total, course) => total + course.documents.length, 0)} documents
          </Typography>
        </Stack>

        {loadingDocuments ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : courses.length === 0 ? (
          <Alert severity="info">No roadmap documents have been uploaded yet.</Alert>
        ) : (
          <Stack spacing={2}>
            {courses.map((course) => (
              <Card
                key={course.id}
                elevation={0}
                sx={{ border: "1px solid #e2e8f0", borderRadius: 3, overflow: "hidden" }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {course.courseName}
                  </Typography>
                  <Stack spacing={1}>
                    {course.documents.map((document) => (
                      <Stack
                        key={document.id}
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{
                          p: 1.5,
                          border: "1px solid #e2e8f0",
                          borderRadius: 2.5,
                          alignItems: { xs: "stretch", sm: "center" },
                        }}
                      >
                        <InsertDriveFileOutlinedIcon color="action" />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography sx={{ fontWeight: 650 }} noWrap title={document.title}>
                            {document.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", overflowWrap: "anywhere" }}
                          >
                            {document.fileName} · {formatFileSize(document.fileSize)}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={0.5} sx={{ alignSelf: { xs: "flex-end", sm: "auto" } }}>
                          <IconButton
                            aria-label={`Edit ${document.title}`}
                            onClick={() => openEditDialog(course.courseName, document)}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            aria-label={`Delete ${document.title}`}
                            disabled={deletingId !== null}
                            onClick={() => void handleDeleteDocument(document)}
                          >
                            {deletingId === document.id
                              ? <CircularProgress size={20} color="inherit" />
                              : <DeleteOutlineRoundedIcon />}
                          </IconButton>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      <Dialog open={editingDocument !== null} onClose={closeEditDialog} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={(event) => void handleUpdateDocument(event)}>
          <DialogTitle sx={{ fontWeight: 750 }}>Edit roadmap document</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Course name"
                value={editCourseName}
                onChange={(event) => setEditCourseName(event.target.value)}
                required
                fullWidth
                slotProps={{ htmlInput: { maxLength: 120 } }}
              />
              <TextField
                label="Document title"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                required
                fullWidth
                slotProps={{ htmlInput: { maxLength: 120 } }}
              />
              <TextField
                label="Description"
                value={editDescription}
                onChange={(event) => setEditDescription(event.target.value)}
                multiline
                minRows={2}
                fullWidth
                slotProps={{ htmlInput: { maxLength: 500 } }}
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<InsertDriveFileOutlinedIcon />}
                sx={{ justifyContent: "flex-start", minHeight: 50, textTransform: "none" }}
              >
                {replacementFile
                  ? `Replace with ${replacementFile.name} · ${formatFileSize(replacementFile.size)}`
                  : "Keep current file or choose a replacement"}
                <input
                  hidden
                  type="file"
                  accept={DOCUMENT_ACCEPT}
                  onChange={(event) => setReplacementFile(event.target.files?.[0] ?? null)}
                />
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={closeEditDialog} disabled={saving} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <EditOutlinedIcon />}
              sx={{ textTransform: "none" }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={editingCourse !== null}
        onClose={() => {
          if (!courseSaving) setEditingCourse(null);
        }}
        fullWidth
        maxWidth="xs"
      >
        <Box component="form" onSubmit={(event) => void handleUpdateCourse(event)}>
          <DialogTitle sx={{ fontWeight: 750 }}>Rename roadmap course</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Course name"
              value={editRoadmapCourseName}
              onChange={(event) => setEditRoadmapCourseName(event.target.value)}
              required
              fullWidth
              slotProps={{ htmlInput: { maxLength: 120 } }}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button
              onClick={() => setEditingCourse(null)}
              disabled={courseSaving}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={courseSaving}
              startIcon={courseSaving ? <CircularProgress size={16} color="inherit" /> : <EditOutlinedIcon />}
              sx={{ textTransform: "none" }}
            >
              Save changes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdminRoadmapManager;
