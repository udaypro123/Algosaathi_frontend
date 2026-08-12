import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  date: string;
}

const sliderItems = [
  {
    id: 1,
    tag: "Developer news",
    headline: "Engineering stories that shape your next sprint.",
    description:
      "Catch the biggest updates in AI tooling, cloud APIs, and frontend performance — all written for software engineers.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    tag: "Career insights",
    headline: "From code reviews to launch day, stay informed.",
    description:
      "Read actionable news about system design, team workflows, and production-ready software that matters for SDE roles.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    tag: "Product pulse",
    headline: "How modern teams ship software smarter.",
    description:
      "Explore the latest ideas in API design, deployment, and developer productivity through short, sharp headlines.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
];

const articles: Article[] = [
  {
    id: 1,
    title: "AI-assisted debugging reshapes developer workflows",
    summary:
      "Developers are using AI tools to catch bugs faster, write better tests, and keep production systems stable.",
    content:
      "AI-assisted debugging is improving developer productivity by surfacing code smells, recommending fixes, and suggesting test cases. Teams are now pairing with code intelligence to reduce cycle time while keeping review quality high. This trend is particularly strong in frontend and backend stacks where observability and error tracing combine with smart automation.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    category: "Developer Tools",
    date: "Aug 9, 2026",
  },
  {
    id: 2,
    title: "Cloud-native APIs power next-gen product launches",
    summary:
      "Modern APIs, serverless patterns, and edge delivery are enabling faster release cycles for software teams.",
    content:
      "Cloud-native API design is now the foundation for scalable product launches. Teams are moving away from monolithic backends and embracing microservices, GraphQL, and event-driven work streams. The result is faster iteration, greater reliability, and a tighter feedback loop between product and engineering.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    category: "Cloud",
    date: "Aug 8, 2026",
  },
  {
    id: 3,
    title: "Frontend performance wins: build for speed",
    summary:
      "Smaller bundles, smarter caching, and responsive animations are the real differentiators in web experiences.",
    content:
      "Performance matters more than ever. Teams are optimizing bundle size, prioritizing critical rendering paths, and using modern image formats to keep pages fast. The best frontend experiences balance speed with polish, delivering interfaces that feel instant across mobile and desktop.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    category: "Frontend",
    date: "Aug 7, 2026",
  },
];

const truncate = (text: string, length: number) =>
  text.length <= length ? text : `${text.slice(0, length).trim()}...`;

const News = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [shareMessage, setShareMessage] = useState("");

  const handlePrevSlide = () => {
    setActiveSlide((current) => (current - 1 + sliderItems.length) % sliderItems.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((current) => (current + 1) % sliderItems.length);
  };

  useEffect(() => {
    const interval = window.setInterval(handleNextSlide, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    setCommentText("");
    setComments([]);
    setShareMessage("");
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    setComments((prev) => [commentText.trim(), ...prev]);
    setCommentText("");
  };

  const handleShare = async () => {
    if (!selectedArticle) return;
    const url = window.location.href;
    const payload = {
      title: selectedArticle.title,
      text: selectedArticle.summary,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        setShareMessage("Shared successfully.");
        return;
      } catch {
        // ignore share failure
      }
    }

    navigator.clipboard.writeText(`${selectedArticle.title} - ${url}`);
    setShareMessage("Link copied to clipboard.");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", pb: 10 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 3, md: 4 }, pt: { xs: 12, md: 14 } }}>
        <Box sx={{ mb: 5, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
          <Box sx={{ width: "90%", display: "flex", flexDirection: "column", textAlign: "center" }}>
            <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 900, flex: 1 }}>
              News hub for
              <Box
                component="span"
                sx={{
                  color: "#ea580c",
                  marginLeft:"5px"
                }}
              >
                Everyone
              </Box>{" "}
            </Typography>
            <Typography sx={{ fontSize: { xs: 16, md: 18, color: "grey", textAlign: "center" }, flex: 1 }}>
              Everyone deserves to know what going on in real time.
            </Typography>
          </Box>

        </Box>


        <Box sx={{ mb: 6, display: "grid", gap: 3, gridTemplateColumns: { md: "2fr 1fr" }, alignItems: "stretch" }}>
          <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden", minHeight: { xs: 260, md: 300 } }}>
            <Box
              component="img"
              src={sliderItems[activeSlide].image}
              alt={sliderItems[activeSlide].headline}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.78) 70%)",
              }}
            />
            <Box sx={{ position: "absolute", left: { xs: 3, md: 6 }, bottom: { xs: 3, md: 6 }, right: { xs: 3, md: "auto" }, maxWidth: { xs: "unset", md: 520 } }}>
              <Chip label={sliderItems[activeSlide].tag} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.16)", color: "#f8fafc", border: "1px solid rgba(255,255,255,0.2)" }} />
              <Typography sx={{ color: "#fff", fontSize: { xs: 24, md: 34 }, fontWeight: 900, lineHeight: 1.05, mb: 2 }}>
                {sliderItems[activeSlide].headline}
              </Typography>
              <Typography sx={{ color: "#e2e8f0", fontSize: { xs: 14, md: 16 }, maxWidth: 560, mb: 3, lineHeight: 1.7 }}>
                {sliderItems[activeSlide].description}
              </Typography>
              <Button variant="contained" onClick={() => handleOpenArticle(articles[activeSlide] ?? articles[0])}>
                Read full story
              </Button>
            </Box>
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", px: 2 }}>
              <IconButton
                onClick={handlePrevSlide}
                sx={{ bgcolor: "rgba(255,255,255,0.88)", '&:hover': { bgcolor: "rgba(255,255,255,1)" } }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                onClick={handleNextSlide}
                sx={{ bgcolor: "rgba(255,255,255,0.88)", '&:hover': { bgcolor: "rgba(255,255,255,1)" } }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
            <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 1 }}>
              {sliderItems.map((item, index) => (
                <Box
                  key={item.id}
                  onClick={() => setActiveSlide(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: index === activeSlide ? "#ea580c" : "rgba(255,255,255,0.55)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>

          <Card sx={{ borderRadius: 4, boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: { xs: 260, md: 300 } }}>
            <CardContent>
              <Typography sx={{ color: "#0f172a", fontWeight: 900, fontSize: { xs: 22, md: 26 }, mb: 2 }}>
                Trending feature
              </Typography>
              <Typography sx={{ color: "#475569", mb: 3, lineHeight: 1.8 }}>
                Get the stories that matter most for software engineers right now: leadership hires, API launches, performance wins, and practical workflows.
              </Typography>
              <Box sx={{ display: "grid", gap: 2 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ea580c", mt: 0.75 }} />
                  <Typography sx={{ color: "#475569" }}>
                    Instant headlines for product and engineering teams.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#22c55e", mt: 0.75 }} />
                  <Typography sx={{ color: "#475569" }}>
                    Expert commentary on building fast, reliable systems.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#818cf8", mt: 0.75 }} />
                  <Typography sx={{ color: "#475569" }}>
                    Actionable insight to help you ship better software.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 3 }}>
              <Button variant="contained" onClick={() => handleOpenArticle(articles[0])} fullWidth>
                Read full story
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 900, mb: 2 }}>
            Feature stories
          </Typography>
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" } }}>
            {articles.map((article) => (
              <Card key={article.id} sx={{ borderRadius: 3, boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)", height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" height="200" image={article.image} alt={article.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Chip label={article.category} color="warning" size="small" />
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      {article.date}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    {article.title}
                  </Typography>
                  <Typography sx={{ color: "#475569", mb: 2 }}>
                    {truncate(article.summary, 100)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                  <Button size="small" onClick={() => handleOpenArticle(article)}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>

        <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)" }}>
          <CardMedia
            component="img"
            height="320"
            image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
            alt="Tech news image"
          />
          <CardContent>
            <Typography sx={{ color: "#0f172a", fontWeight: 800, mb: 2 }}>
              Featured story
            </Typography>
            <Typography sx={{ color: "#475569", mb: 3 }}>
              Deep dives and practical stories for engineers: architecture decisions, launch planning, and how dev teams ship quality software faster.
            </Typography>
            <Button variant="contained" size="large" onClick={() => handleOpenArticle(articles[0])}>
              Read full story
            </Button>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={Boolean(selectedArticle)} onClose={handleCloseArticle} fullWidth maxWidth="md">
        {selectedArticle && (
          <>
            <DialogTitle>{selectedArticle.title}</DialogTitle>
            <DialogContent dividers>
              <Typography sx={{ color: "#64748b", mb: 2 }}>
                {selectedArticle.category} • {selectedArticle.date}
              </Typography>
              <Typography sx={{ mb: 3, color: "#475569", lineHeight: 1.8 }}>
                {selectedArticle.content}
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Typography sx={{ fontWeight: 700, mb: 2 }}>Comments</Typography>
              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                  label="Write a comment"
                  multiline
                  minRows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  fullWidth
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                  <Button variant="contained" onClick={handlePostComment} disabled={!commentText.trim()}>
                    Post comment
                  </Button>
                  <Button startIcon={<ShareIcon />} onClick={handleShare}>
                    Share story
                  </Button>
                </Box>
                {shareMessage && (
                  <Typography variant="body2" sx={{ color: "#16a34a" }}>
                    {shareMessage}
                  </Typography>
                )}
                {comments.length > 0 ? (
                  <Box sx={{ display: "grid", gap: 2 }}>
                    {comments.map((item, index) => (
                      <Box key={index} sx={{ p: 2, borderRadius: 2, bgcolor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <CommentIcon sx={{ fontSize: 18, color: "#0f172a" }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            You
                          </Typography>
                        </Box>
                        <Typography sx={{ color: "#475569" }}>{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ color: "#64748b" }}>
                    No comments yet. Be the first to share your take.
                  </Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseArticle}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default News;
