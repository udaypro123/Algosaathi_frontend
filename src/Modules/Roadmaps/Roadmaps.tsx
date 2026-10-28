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

    <>
      <Box className="containerClass" sx={{ pt: { xs: "96px", md: "112px" } }}>
        <Box className="SubContainerClass" sx={{
          mt: "0 !important",
          margin: "0 auto"
        }} >
          {/* Hero */}
          <Box
            sx={{
              mb: 3,
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              color: "white",
              background: "linear-gradient(125deg, #172554, #1d4ed8 58%, #0284c7)",
              boxShadow: "0 16px 36px rgba(29, 78, 216, 0.18)",
              position: "relative",
              overflow: "hidden",
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
                  Course Roadmaps
                </Typography>
                <Typography sx={{ mt: 0.75, maxWidth: 620, color: "rgba(255,255,255,0.82)" }}>
                  Browse and download learning guides for your courses.
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
                      borderRadius: 4,
                      background: "linear-gradient(180deg, #ffffff 0%, #fbfdff 100%)",
                      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
                      transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "#bfdbfe",
                        boxShadow: "0 16px 36px rgba(15, 23, 42, 0.09)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack spacing={2.25}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", minWidth: 0 }}>
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              flexShrink: 0,
                              borderRadius: 2.5,
                              display: "grid",
                              placeItems: "center",
                              color: "#1d4ed8",
                              bgcolor: "#eff6ff",
                              border: "1px solid #dbeafe",
                            }}
                          >
                            <RouteRoundedIcon />
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 750, letterSpacing: "-0.02em" }} noWrap>
                              {course.courseName}
                            </Typography>
                            <Chip
                              size="small"
                              label={`${course.documents.length} ${course.documents.length === 1 ? "document" : "documents"
                                }`}
                              sx={{ mt: 0.5, bgcolor: "#f1f5f9", fontWeight: 600 }}
                            />
                          </Box>
                        </Stack>

                        {course.documents.length > 0 ? (
                          <Stack spacing={1.25}>
                            {course.documents.map((document) => (
                              <Box
                                key={document.id}
                                sx={{
                                  p: 1.5,
                                  borderRadius: 2.5,
                                  border: "1px solid #e2e8f0",
                                  bgcolor: "#ffffff",
                                  transition: "border-color 160ms ease, background-color 160ms ease",
                                  "&:hover": { borderColor: "#bfdbfe", bgcolor: "#f8fbff" },
                                }}
                              >
                                <Stack
                                  direction={{ xs: "column", sm: "row" }}
                                  spacing={1.5}
                                  sx={{
                                    alignItems: { xs: "stretch", sm: "center" },
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    spacing={1.25}
                                    sx={{ minWidth: 0, flex: 1, alignItems: "center" }}
                                  >
                                    <Box
                                      sx={{
                                        width: 38,
                                        height: 38,
                                        flexShrink: 0,
                                        display: "grid",
                                        placeItems: "center",
                                        borderRadius: 2,
                                        color: "#2563eb",
                                        bgcolor: "#eff6ff",
                                      }}
                                    >
                                      <InsertDriveFileOutlinedIcon fontSize="small" />
                                    </Box>
                                    <Box sx={{ minWidth: 0, flex: 1 }}>
                                      <Typography sx={{ fontWeight: 700, lineHeight: 1.35 }} noWrap title={document.title}>
                                        {document.title}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ display: "block", overflowWrap: "anywhere", lineHeight: 1.45, mt: 0.3 }}
                                      >
                                        {document.fileName}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                                        {formatFileSize(document.fileSize)}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={
                                      downloadingId === document.id
                                        ? <CircularProgress size={16} />
                                        : <DownloadRoundedIcon />
                                    }
                                    disabled={downloadingId !== null}
                                    onClick={() => void handleDownload(document)}
                                    sx={{
                                      flexShrink: 0,
                                      minWidth: { xs: "100%", sm: 112 },
                                      textTransform: "none",
                                      fontWeight: 700,
                                      borderRadius: 2,
                                      boxShadow: "none",
                                    }}
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
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No roadmap documents are available for this course yet.
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <Box
          sx={{
            py: 4,

            textAlign: "center",

          }}
        >

          <Typography className="footer-tagline">
            Learn. Communicate. Build. Grow.
          </Typography>

          <Typography
            color="text.secondary"
            variant="caption"
          >
            © {new Date().getFullYear()} AlgoSaathi
          </Typography>

        </Box>
      </Box>
    </>


  );
};

export default Roadmaps;
