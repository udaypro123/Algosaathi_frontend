import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import PsychologyIcon from "@mui/icons-material/Psychology";

const upcomingCourses = [
  "JavaScript Mastery",
  "React.js",
  "Node.js & Express",
  "MongoDB",
  "System Design",
  "Data Structures & Algorithms",
  "TypeScript",
  "AWS Deployment",
  "React Native",
  "AI Integration",
];

const Courses = () => {
 

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
        <SchoolIcon sx={{ fontSize: 70 }} />

        <Typography
          variant="h3"
          sx={{ fontWeight: "bold",  mt:2}}
         
        >
          AlgoSaathi Courses
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.9 }}>
          Premium programming courses are currently under development.
          Our goal is to provide practical, project-based learning
          designed to help developers become job-ready.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            bgcolor: "#fff",
            color: "#075d7e",
            fontWeight: "bold",
          }}
        >
          🚀 Coming Soon
        </Button>
      </Paper>

      {/* Upcoming */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Upcoming Courses
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 3 }}
        >
          These are some of the courses planned for the first release.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap", gap: 1 }}
        >
          {upcomingCourses.map((course) => (
            <Chip
              key={course}
              label={course}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </Paper>

      {/* Features */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          What You'll Learn
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box  sx={{alignItems:"center", display:"flex", gap:2}} >
            <CodeIcon color="primary" />
            <Typography>Real-world projects with production-level code</Typography>
          </Box>

          <Box sx={{alignItems:"center", display:"flex", gap:2}}>
            <StorageIcon color="success" />
            <Typography>Backend development with Node.js & MongoDB</Typography>
          </Box>

          <Box sx={{alignItems:"center", display:"flex", gap:2}}>
            <CloudIcon color="warning" />
            <Typography>AWS deployment and DevOps basics</Typography>
          </Box>

          <Box sx={{alignItems:"center", display:"flex", gap:2}}>
            <PsychologyIcon color="secondary" />
            <Typography>System Design, DSA & Interview Preparation</Typography>
          </Box>

          <Box sx={{alignItems:"center", display:"flex", gap:2}}>
            <RocketLaunchIcon color="error" />
            <Typography>Build complete web & mobile applications from scratch</Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Footer */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          🚀 Launching Soon
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          AlgoSaathi is currently building high-quality programming
          courses focused on practical learning, interview preparation,
          and real-world software development.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Courses;