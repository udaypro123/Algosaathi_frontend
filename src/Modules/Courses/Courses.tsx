import {
  Box,
  Paper,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Slider,
  Tabs,
  Tab,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import CoursesCarousel from "../../common/CoursesCarousel";
import Loader from "../../common/Loader";
import { useState, useMemo, useEffect } from "react";
import {
  getAllCourses,
} from "./api/api";
import type { CourseItem } from "./api/interface";

const Courses = () => {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | false>(false);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});
  // const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAllCourses();
        const list = Array.isArray(data) ? data : data?.data || data?.courses || [];
        setCourses(list);
        if (list.length > 0 && !selectedCourse) {
          setSelectedCourse(list[0]);
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course: CourseItem) => {
    setSelectedCourse(course);
    setExpandedChapter(false);
    setActiveTab(1);
  };

  const handleChapterChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedChapter(isExpanded ? panel : false);
    };

  const chapters = selectedCourse?.chapters ?? [];

  const courseKey = selectedCourse?._id ?? "";

  const progress = useMemo(() => {
    if (!chapters.length) return 0;

    const total = chapters.length;
    const completed = chapters.reduce((count, _, index) => {
      const key = `${courseKey}-${index}`;
      return count + (completedChapters[key] ? 1 : 0);
    }, 0);

    return Math.round((completed / total) * 100);
  }, [completedChapters, chapters, courseKey]);

  const toggleChapterComplete = (chapterIndex: number) => {
    const key = `${courseKey}-${chapterIndex}`;
    setCompletedChapters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isChapterComplete = (chapterIndex: number) => {
    const key = `${courseKey}-${chapterIndex}`;
    return !!completedChapters[key];
  };

  // const toggleTopicComplete = (chapterIndex: number, topicIndex: number) => {
  //   const key = `${courseKey}-${chapterIndex}-${topicIndex}`;
  //   setCompletedTopics((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };

  // const isTopicComplete = (chapterIndex: number, topicIndex: number) => {
  //   const key = `${courseKey}-${chapterIndex}-${topicIndex}`;
  //   return !!completedTopics[key];
  // };

  // const carouselCourses = courses.map((c) => ({
  //   title: c.courseName,
  //   image: `https://via.placeholder.com/600x370/000052/2563eb?text=${encodeURIComponent(c.courseName)}`,
  // }));

  return (
    <Box className="containerClass">
      <Box className="SubContainerClass" sx={{
        mt: "0 !important",
        margin:"0 auto"
      }} >
        {/* Hero */}

        <Paper
          elevation={4}
          sx={{
            p: 5,
            textAlign: "center",
            width:"95%",
             margin:"0 auto",
            color: "#fff",
            background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
          }}
        >


          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <SchoolIcon sx={{ fontSize: 60 }} /> <span style={{ marginLeft: "1rem", fontSize: 30, fontWeight: "bold" }}>  AlgoSaathi Courses</span>
          </Box>

          <Typography sx={{ mt: 2, opacity: 0.9 }}>
            Premium programming courses are currently under development.
            Our goal is to provide practical, project-based learning
            designed to help developers become job-ready.
          </Typography>

        </Paper>

        {/* Carousel */}

        {/* <CoursesCarousel upcomingCourses={carouselCourses} onCourseSelect={(course) => {
          const found = courses.find((c) => c.courseName === course.title);
          if (found) handleCourseSelect(found);
        }} /> */}

        {/* Features */}

        <Paper
          elevation={2}
          sx={{
            mt: 4,
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            width:"95%",
            margin:"10px auto",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              mb: 3,
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                fontWeight: 700,
                textTransform: "none",
              },
            }}
          >
            <Tab label="Available Courses" />
            <Tab label="Course Content" disabled={!selectedCourse} />
          </Tabs>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 6 }}>
              <Loader />
            </Box>
          ) : error ? (
            <Typography sx={{ color: "error.main", textAlign: "center", py: 4 }}>
              {error}
            </Typography>
          ) : (
            <>
              {activeTab === 0 && (
                <Box sx={{maxWidth:"50%"}}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                    Choose a course to start learning
                  </Typography>
                  <Stack spacing={1.5}>
                    {courses.map((course) => (
                      <Paper
                        key={course._id}
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          cursor: "pointer",
                          border: "1px solid",
                          borderColor: selectedCourse?._id === course._id ? "primary.main" : "divider",
                          bgcolor: selectedCourse?._id === course._id ? "primary.main" : "background.paper",
                          color: selectedCourse?._id === course._id ? "#fff" : "text.primary",
                          "&:hover": {
                            borderColor: "primary.main",
                          },
                        }}
                        onClick={() => handleCourseSelect(course)}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {course.courseName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: selectedCourse?._id === course._id ? "rgba(255,255,255,0.9)" : "text.secondary" }}>
                          {course.chapters.length} chapters
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}

              {activeTab === 1 && selectedCourse && (
                <Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      {selectedCourse.courseName} Progress
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Slider
                        value={progress}
                        sx={{ flex: 1 }}
                        valueLabelFormat={(value) => `${value}%`}
                        valueLabelDisplay="auto"
                      />
                      <Typography variant="body2" sx={{ minWidth: 40, textAlign: "right" }}>
                        {progress}%
                      </Typography>
                    </Stack>
                  </Box>

                  <Accordion defaultExpanded sx={{ boxShadow: "0px 5px 5px #dee0e0", border: "1px solid", borderColor: "divider", borderRadius: "12px !important", "&:before": { display: "none" }, "&.Mui-expanded": { margin: 0 } }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        px: 2,
                        py: 1,
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                          gap: 1,
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          Course Content
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {selectedCourse?.courseName ?? "Select a course"}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
                      {chapters.length === 0 ? (
                        <Typography sx={{ color: "text.secondary" }}>
                          No chapters available for this course.
                        </Typography>
                      ) : (
                        <Stack spacing={1.5}>
                          {chapters.map((chapter, index) => {
                            const panelId = `chapter-panel-${index}`;
                            const isExpanded = expandedChapter === panelId;
                            const complete = isChapterComplete(index);

                            return (
                              <Box
                                key={chapter.title}
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "flex-start",
                                  border: "1px solid",
                                  borderColor: complete ? "#16a34a" : "divider",
                                  borderRadius: "12px",
                                  bgcolor: complete ? "rgba(22, 163, 74, 0.04)" : "background.paper",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    pt: 2,
                                    pl: 1,
                                  }}
                                >
                                  <Checkbox
                                    size="small"
                                    checked={complete}
                                    onChange={() => toggleChapterComplete(index)}
                                    icon={<RadioButtonUncheckedIcon fontSize="small" />}
                                    checkedIcon={<CheckCircleIcon fontSize="small" />}
                                    sx={{ p: 0.5 , mt:3 }}
                                  />
                                </Box>

                                <Accordion
                                  expanded={isExpanded}
                                  onChange={handleChapterChange(panelId)}
                                  sx={{
                                    flex: 1,
                                    boxShadow: "none",
                                    border: "none",
                                    borderRadius: "12px !important",
                                    "&:before": {
                                      display: "none",
                                    },
                                    "&.Mui-expanded": {
                                      margin: 0,
                                    },
                                  }}
                                >
                                  <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                      px: 1,
                                      py: 1,
                                      minHeight: 56,
                                      "& .MuiAccordionSummary-content": {
                                        alignItems: "center",
                                        gap: 1,
                                      },
                                    }}
                                  >
                                    <Box sx={{ flex: 1 }}>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                        {chapter.title}
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{ color: "text.secondary", display: { xs: "none", md: "block" } }}
                                      >
                                        {chapter.description}
                                      </Typography>
                                    </Box>
                                  </AccordionSummary>
                                  <AccordionDetails sx={{ px: 1, pb: 2, pt: 0 }}>
                                    <Stack spacing={2.5} sx={{ pl: 0, m: 0 }}>
                                      {chapter.topics.map((topic, topicIndex) => {
                                        const topicComplete = undefined;

                                        return (
                                          <Box key={topicIndex} sx={{ mb: 1.5 }}>
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>
                                              <Box sx={{ flex: 1 }}>
                                                <Typography
                                                  variant="h6"
                                                  sx={{
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    lineHeight: 1.6,
                                                    minHeight: 24,
                                                    px: 1.5,
                                                    py: 0.75,
                                                    borderRadius: 1,
                                                    background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                                                    display: "inline-block",
                                                  }}
                                                >
                                                  {topic.title}
                                                </Typography>

                                                <Box sx={{ mt: 1.5, p: 2, borderRadius: 1.5, bgcolor: "rgba(248, 250, 252, 0.8)", border: "1px solid", borderColor: "divider" }}>
                                                  {topic.contentBlocks.map((block, blockIndex) => {
                                                    if (block.type === "text") {
                                                      const isHtml = block.format === "html";

                                                      if (isHtml) {
                                                        return (
                                                          <Box
                                                            key={blockIndex}
                                                            sx={{
                                                              textDecoration: topicComplete ? "line-through" : "none",
                                                              lineHeight: 1.8,
                                                              minHeight: 40,
                                                              mb: 1.5,
                                                              p: 1,
                                                              borderRadius: 1,
                                                              whiteSpace: "pre-wrap",
                                                              fontFamily: "monospace",
                                                              "& mark": {
                                                                backgroundColor: "#fef08a",
                                                                color: "#713f12",
                                                                padding: "2px 4px",
                                                                borderRadius: 1,
                                                              },
                                                            }}
                                                            dangerouslySetInnerHTML={{ __html: block.content }}
                                                          />
                                                        );
                                                      }

                                                      const blockStyle: React.CSSProperties = {
                                                        textDecoration: topicComplete ? "line-through" : "none",
                                                        lineHeight: 1.8,
                                                        minHeight: 40,
                                                        marginBottom: 12,
                                                        padding: 8,
                                                        borderRadius: 4,
                                                        whiteSpace: "pre-wrap",
                                                        fontFamily: "monospace",
                                                      };

                                                      if (block.textColor) {
                                                        blockStyle.color = block.textColor;
                                                      }

                                                      if (block.backgroundColor) {
                                                        blockStyle.backgroundColor = block.backgroundColor;
                                                      }

                                                      if (block.fontSize) {
                                                        blockStyle.fontSize = block.fontSize;
                                                      }

                                                      return (
                                                        <Typography
                                                          key={blockIndex}
                                                          variant="body2"
                                                          sx={blockStyle}
                                                        >
                                                          {block.content}
                                                        </Typography>
                                                      );
                                                    }

                                                    if (block.type === "image" && block.url) {
                                                      return (
                                                        <Box key={blockIndex} sx={{ mb: 1.5 }}>
                                                          <Box
                                                            component="img"
                                                            src={block.url}
                                                            alt={block.alt || "Topic image"}
                                                            sx={{
                                                              width: "100%",
                                                              maxHeight: 420,
                                                              objectFit: "contain",
                                                              borderRadius: 2,
                                                              border: "1px solid",
                                                              borderColor: "divider",
                                                              bgcolor: "background.default",
                                                            }}
                                                          />
                                                          {block.caption ? (
                                                            <Typography
                                                              variant="caption"
                                                              sx={{
                                                                color: "text.secondary",
                                                                display: "block",
                                                                textAlign: "center",
                                                                mt: 0.75,
                                                                fontStyle: "italic",
                                                              }}
                                                            >
                                                              {block.caption}
                                                            </Typography>
                                                          ) : null}
                                                        </Box>
                                                      );
                                                    }

                                                    return null;
                                                  })}
                                                </Box>

                                                {topic.interviewQuestions?.length ? (
                                                  <Box sx={{ mt: 1.5 }}>
                                                    <Typography variant="caption" sx={{
                                                      fontWeight: 700, color: "text.secondary", display: "block", mb: 0.5, fontSize: {
                                                        md: 16,
                                                        xs: 13,
                                                        lg: 20,
                                                      }
                                                    }}>
                                                      Interview Questions:
                                                    </Typography>
                                                    <Stack component="ul" spacing={0.5} sx={{ pl: 1.5, m: 0 }}>
                                                      {topic.interviewQuestions.map((question, qIndex) => (
                                                        <Typography
                                                          key={qIndex}
                                                          component="li"
                                                          variant="body2"
                                                          sx={{
                                                            color: "text.primary", fontSize: {
                                                              md: 14,
                                                              xs: 12,
                                                              lg: 16,
                                                            }
                                                          }}
                                                        >
                                                          {question}
                                                        </Typography>
                                                      ))}
                                                    </Stack>
                                                  </Box>
                                                ) : null}
                                              </Box>
                                            </Box>
                                          </Box>
                                        );
                                      })}
                                    </Stack>
                                  </AccordionDetails>
                                </Accordion>
                              </Box>
                            );
                          })}
                        </Stack>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              )}
            </>
          )}
        </Paper>

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
    </Box>
  );
};

export default Courses;
