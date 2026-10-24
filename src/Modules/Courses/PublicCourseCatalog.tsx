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
import systemDesignImage from "../../assets/cardone.png";
import frontendImage from "../../assets/front-end-programming.png";
import backendImage from "../../assets/backend.png";
import fullStackImage from "../../assets/cardtwo.png";
import dsaImage from "../../assets/DSA.png";
import otherSkillsImage from "../../assets/cardthree.png";

const courseCategories = [
  {
    title: "System Design",
    description: "Learn to design scalable, reliable applications and services.",
    image: systemDesignImage,
    imageFit: "cover",
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
    imageFit: "cover",
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
    imageFit: "cover",
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
    <Box sx={{ minHeight: "70vh", bgcolor: "#f5f7fa", py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: "center" }}>
          <SchoolIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, mb: 1, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Explore Our Courses
          </Typography>
          <Typography color="text.secondary">
            Choose a learning path. Sign in or create an account to access course content.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {courseCategories.map((category) => (
            <Grid key={category.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: 3,
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.title}
                  sx={{
                    height: 190,
                    p: category.imageFit === "contain" ? 3 : 0,
                    objectFit: category.imageFit,
                    bgcolor: category.imageFit === "contain" ? "#eef3fb" : "grey.100",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {category.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={requestCourseAccess}
                    startIcon={<LockOutlinedIcon />}
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Login to access
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
