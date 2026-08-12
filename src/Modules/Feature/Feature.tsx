import {
  Box,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DevicesIcon from "@mui/icons-material/Devices";
import CodeIcon from "@mui/icons-material/Code";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const features = [
  {
    title: "Programming Courses",
    description:
      "Learn modern web development with structured and project-based courses.",
    icon: <SchoolIcon color="primary" sx={{ fontSize: 40 }} />,
  },
  {
    title: "AI Powered Learning",
    description:
      "Get AI assistance for coding, debugging and interview preparation.",
    icon: <SmartToyIcon color="success" sx={{ fontSize: 40 }} />,
  },
  {
    title: "Real Projects",
    description:
      "Build production-ready applications using modern technologies.",
    icon: <CodeIcon color="warning" sx={{ fontSize: 40 }} />,
  },
  {
    title: "Responsive Platform",
    description:
      "Access the platform smoothly on desktop, tablet and mobile devices.",
    icon: <DevicesIcon color="secondary" sx={{ fontSize: 40 }} />,
  },
  {
    title: "Premium Resources",
    description:
      "Download notes, interview sheets, PDFs and learning resources.",
    icon: <WorkspacePremiumIcon color="error" sx={{ fontSize: 40 }} />,
  },
  {
    title: "More Coming Soon",
    description:
      "Many exciting features are currently under development.",
    icon: <AutoAwesomeIcon color="info" sx={{ fontSize: 40 }} />,
  },
];

const Feature = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "80%" },
        mx: "auto",
        py: 4,
      }}
    >
      {/* Hero */}

      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          color: "#fff",
          background:
            "linear-gradient(135deg,#075d7e,#106477,#096381)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold" }}
        >
          AlgoSaathi Features
        </Typography>

        <Typography
          sx={{
            mt: 2,
            opacity: 0.9,
          }}
        >
          We're building a modern platform that combines learning,
          software products, AI tools, and developer resources in one place.
        </Typography>
      </Paper>

      {/* Feature Cards */}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {features.map((feature) => (
          <Grid
            key={feature.title}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                transition: ".3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >
              <Box sx={{ mb: 2 }}>
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                {feature.title}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Bottom */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
        >
          🚀 More Features Coming Soon
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          AlgoSaathi is continuously evolving. New courses, AI tools,
          coding challenges, interview preparation, mobile applications,
          and software products will be added in future updates.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Feature;