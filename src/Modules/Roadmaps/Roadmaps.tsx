import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import {
  downloadRoadmapDocument,
  formatFileSize,
  getRoadmaps,
  type RoadmapCourse,
  type RoadmapDocument,
} from "./api";

const Roadmaps = () => {
  const [courses, setCourses] = useState<RoadmapCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoadmaps = async () => {
      try {
        setCourses(await getRoadmaps());
      } catch {
        setError("Roadmaps could not be loaded. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadRoadmaps();
  }, []);

  const handleDownload = async (document: RoadmapDocument) => {
    setDownloadingId(document.id);
    setError("");
    try {
      await downloadRoadmapDocument(document);
    } catch {
      setError(`Unable to download ${document.fileName}. Please try again.`);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 1240, mx: "auto", py: { xs: 1, md: 2 } }}>
      <Box
        sx={{
          mb: 3,
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          color: "white",
          background: "linear-gradient(125deg, #172554, #1d4ed8 58%, #0284c7)",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <RouteRoundedIcon sx={{ fontSize: { xs: 34, md: 42 } }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 750 }}>
              Course Roadmaps
            </Typography>
            <Typography sx={{ mt: 0.75, color: "rgba(255,255,255,0.82)" }}>
              Download learning guides and plan your next steps for every course.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : courses.length === 0 ? (
        <Alert severity="info">No courses are available yet.</Alert>
      ) : (
        <Grid container spacing={2.5}>
          {courses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  transition: "transform 160ms ease, box-shadow 160ms ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          color: "#1d4ed8",
                          bgcolor: "#eff6ff",
                        }}
                      >
                        <RouteRoundedIcon />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
                          {course.courseName}
                        </Typography>
                        <Chip
                          size="small"
                          label={`${course.documents.length} ${
                            course.documents.length === 1 ? "resource" : "resources"
                          }`}
                          sx={{ mt: 0.5, bgcolor: "#f1f5f9" }}
                        />
                      </Box>
                    </Stack>

                    {course.documents.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Roadmap documents for this course will be available here soon.
                      </Typography>
                    ) : (
                      <Stack spacing={1.25}>
                        {course.documents.map((document) => (
                          <Box
                            key={document.id}
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={1.25}
                              sx={{
                                alignItems: { xs: "stretch", sm: "center" },
                                justifyContent: "space-between",
                              }}
                            >
                              <Stack direction="row" spacing={1} sx={{ minWidth: 0, alignItems: "center" }}>
                                <InsertDriveFileOutlinedIcon color="action" />
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography sx={{ fontWeight: 650 }} noWrap>{document.title}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {document.fileName} · {formatFileSize(document.fileSize)}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={
                                  downloadingId === document.id
                                    ? <CircularProgress size={16} />
                                    : <DownloadRoundedIcon />
                                }
                                disabled={downloadingId !== null}
                                onClick={() => void handleDownload(document)}
                                sx={{ flexShrink: 0, textTransform: "none" }}
                              >
                                Download
                              </Button>
                            </Stack>
                            {document.description && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1, whiteSpace: "pre-wrap" }}
                              >
                                {document.description}
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Roadmaps;
