import {
  Box,
  Paper,
  Typography,
  Link,
  Stack,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CodeIcon from "@mui/icons-material/Code";

const contacts = [
  {
    title: "Email",
    value: "chauhanuday842@gmail.com",
    icon: <EmailIcon color="primary" />,
    link: "mailto:chauhanuday842@gmail.com",
  },
  {
    title: "Phone",
    value: "+91 7827443304",
    icon: <PhoneIcon color="success" />,
    link: "tel:+917827443304",
  },
  {
    title: "GitHub",
    value: "github.com",
    icon: <GitHubIcon />,
    link: "https://github.com/udaypro123",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com",
    icon: <LinkedInIcon color="primary" />,
    link: "https://www.linkedin.com/in/uday-chauhan-here/",
  },
];

const Contact = () => {


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
        <Avatar
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 2,
            fontSize: 35,
            bgcolor: "#fff",
            color: "#075d7e",
          }}
        >
          U
        </Avatar>

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Let's Connect 👋
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.9 }}>
          Have an exciting project, collaboration opportunity, or just
          want to say hello? I'd love to hear from you.
        </Typography>

        <Stack
          direction="row"
         
          spacing={2}
          sx={{ mt: 3,  justifyContent:"center"}}
        >
          <IconButton
            component="a"
            href="https://github.com/udaypro123"
            target="_blank"
            sx={{
              color: "#fff",
              "&:hover": {
                transform: "scale(1.15)",
              },
            }}
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.linkedin.com/in/uday-chauhan-here/"
            target="_blank"
            sx={{
              color: "#fff",
              "&:hover": {
                transform: "scale(1.15)",
              },
            }}
          >
            <LinkedInIcon />
          </IconButton>

          <IconButton
            component="a"
            href="https://leetcode.com/u/chauhanuday842/"
            target="_blank"
            sx={{
              color: "#fff",
              "&:hover": {
                transform: "scale(1.15)",
              },
            }}
          >
            <CodeIcon />
          </IconButton>
        </Stack>
      </Paper>

      {/* Contact Cards */}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {contacts.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar>{item.icon}</Avatar>

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>

                  <Link
                    href={item.link}
                    underline="hover"
                    target={
                      item.link.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                  >
                    {item.value}
                  </Link>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Message */}

      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Open to Opportunities 🚀
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          I'm always interested in exciting projects, freelance work,
          collaborations, and full-time software engineering
          opportunities. Feel free to reach out anytime.
        </Typography>
      </Paper>
    </Box>
  );
};
export default Contact;