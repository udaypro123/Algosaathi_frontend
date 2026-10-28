import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import systemDesignImage from "../../assets/system_design.png";
import frontendImage from "../../assets/front-end-programming.png";
import backendImage from "../../assets/backend.jpg";
import fullStackImage from "../../assets/full stack.png";
import dsaImage from "../../assets/DSA.png";
import otherSkillsImage from "../../assets/skills.png";

const courseCategories = [
  {
    title: "System Design",
    description: "Learn to design scalable, reliable applications and services.",
    image: systemDesignImage,
    imageFit: "contain",
  },
  {
    title: "Frontend Development",
    description: "Build responsive, accessible interfaces for the modern web.",
    image: frontendImage,
    imageFit: "contain",
  },
  {
    title: "Backend Development",
    description: "Create APIs, services, and data-driven applications.",
    image: backendImage,
    imageFit: "contain",
  },
  {
    title: "Full Stack Development",
    description: "Bring frontend and backend skills together in real projects.",
    image: fullStackImage,
    imageFit: "contain",
  },
  {
    title: "Data Structures & Algorithms",
    description: "Strengthen problem-solving skills and prepare for interviews.",
    image: dsaImage,
    imageFit: "contain",
  },
  {
    title: "Other Tech Skills",
    description: "Explore practical tools and skills for your software career.",
    image: otherSkillsImage,
    imageFit: "contain",
  },
];

const PublicCourseCatalog = () => {
  const navigate = useNavigate();

  const requestCourseAccess = () => {
    navigate("/login", {
      state: {
        from: {
          pathname: "/courses",
        },
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        background:
          "radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.08), transparent 30%), #f5f7fa",
        pt: { xs: 12, md: 14 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 7 }, textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 58,
              height: 58,
              mb: 2,
              borderRadius: 3,
              color: "primary.main",
              bgcolor: "rgba(25, 118, 210, 0.1)",
            }}
          >
            <SchoolIcon sx={{ fontSize: 34 }} />
          </Box>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: { xs: "-0.03em", md: "-0.045em" },
              mb: 1.5,
              fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.25rem" },
              color: "#111827",
            }}
          >
            Explore Our Courses
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 620, mx: "auto", lineHeight: 1.7, fontSize: { xs: 15, md: 17 } }}
          >
            Choose a learning path. Sign in or create an account to access course content.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {courseCategories.map((category) => (
            <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: 405,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  border: "1px solid rgba(15, 23, 42, 0.07)",
                  borderRadius: 3.5,
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.05)",
                  transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "rgba(25, 118, 210, 0.25)",
                    boxShadow: "0 14px 32px rgba(15, 23, 42, 0.12)",
                  },
                  "&:focus-within": {
                    outline: "3px solid rgba(25, 118, 210, 0.35)",
                    outlineOffset: 2,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{
                    height: { xs: 190, md: 205 },
                    width: "100%",
                    objectFit: category.imageFit,
                    objectPosition: "center",
                    display: "block",
                    bgcolor: "#edf3fb",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, px: { xs: 2.5, md: 3 }, pt: 2.5, pb: 1 }}>
                  <Typography
                    component="h2"
                    variant="h5"
                    sx={{ fontWeight: 750, letterSpacing: "-0.02em", mb: 1, fontSize: { xs: 20, md: 22 } }}
                  >
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {category.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: { xs: 2.5, md: 3 }, pt: 1, pb: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={requestCourseAccess}
                    startIcon={<LockOutlinedIcon />}
                    sx={{
                      minHeight: 46,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      boxShadow: "0 4px 10px rgba(25, 118, 210, 0.2)",
                      "&:hover": {
                        boxShadow: "0 7px 16px rgba(25, 118, 210, 0.28)",
                      },
                    }}
                  >
                    Sign in to explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PublicCourseCatalog;
