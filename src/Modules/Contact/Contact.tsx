import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from "@mui/material";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CodeIcon from "@mui/icons-material/Code";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import "../Templates/css/TemplateLibrary.css"

const contacts = [
  {
    title: "Email",
    value: "chauhanuday842@gmail.com",
    icon: <EmailIcon />,
    link: "mailto:chauhanuday842@gmail.com",
    color: "#1976d2",
  },
  {
    title: "Phone",
    value: "+91 7827443304",
    icon: <PhoneIcon />,
    link: "tel:+917827443304",
    color: "#2e7d32",
  },
  {
    title: "GitHub",
    value: "github.com/udaypro123",
    icon: <GitHubIcon />,
    link: "https://github.com/udaypro123",
    color: "#24292e",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/uday-chauhan-here",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/uday-chauhan-here/",
    color: "#0a66c2",
  },
];

const socialLinks = [
  { icon: <GitHubIcon />, label: "GitHub", link: "https://github.com/udaypro123" },
  { icon: <LinkedInIcon />, label: "LinkedIn", link: "https://www.linkedin.com/in/uday-chauhan-here/" },
  { icon: <CodeIcon />, label: "LeetCode", link: "https://leetcode.com/u/chauhanuday842/" },
];

const Contact = () => {
  return (
    <Box
      sx={{
        width: { xs: "92%", sm: "90%", md: "84%", lg: "78%" },
        maxWidth: "1250px",
        mx: "auto",
        py: { xs: 3, md: 6 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 4, md: 6 },
          p: { xs: 3, sm: 5, md: 7 },
          color: "#fff",
          background: "linear-gradient(135deg,#075d7e 0%,#106477 50%,#096381 100%)",
          boxShadow: "0 25px 70px rgba(7,93,126,0.28)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            top: -130,
            right: -80,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            bottom: -90,
            left: -50,
          }}
        />

        <Grid
          container
          spacing={{ xs: 4, md: 7 }}
          sx={{ position: "relative", zIndex: 2, alignItems: "center" }}
        >
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Chip
                icon={<Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: "#7CFFB2" }} />}
                label="Available for opportunities"
                sx={{
                  width: "fit-content",
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(10px)",
                  fontWeight: 600,
                  "& .MuiChip-icon": { ml: 1 },
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "2.3rem", sm: "3rem", md: "4rem" },
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-2px",
                  }}
                >
                  Let&apos;s build
                  <br />
                  something
                  <Box component="span" sx={{ display: "block", color: "#bcefff" }}>
                    meaningful.
                  </Box>
                </Typography>
              </Box>

              <Typography
                sx={{
                  maxWidth: 580,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                Have a project, collaboration idea, or an exciting opportunity? Let&apos;s connect and turn your idea into something impactful.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                <Button
                  component="a"
                  href="mailto:chauhanuday842@gmail.com"
                  variant="contained"
                  endIcon={<ArrowOutwardIcon />}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: "#fff",
                    color: "#075d7e",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    "&:hover": {
                      bgcolor: "#f5fbfd",
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                    },
                    transition: "0.3s",
                  }}
                >
                  Start a Conversation
                </Button>

                <Button
                  component="a"
                  href="tel:+917827443304"
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                  sx={{
                    width: { xs: "100%", sm: "auto" },
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  Let&apos;s Talk
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  p: 3,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.11)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(20px)",
                  color: "#fff",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 2,
                        fontSize: 38,
                        fontWeight: 800,
                        bgcolor: "#fff",
                        color: "#075d7e",
                        border: "5px solid rgba(255,255,255,0.18)",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
                      }}
                    >
                      U
                    </Avatar>

                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Uday Chauhan
                    </Typography>

                    <Typography sx={{ mt: 0.5, color: "rgba(255,255,255,0.72)" }}>
                      Full Stack Developer
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: "rgba(255,255,255,0.14)" }} />

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <LocationOnIcon sx={{ color: "#bcefff" }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
                          Based in
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>India</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <RocketLaunchIcon sx={{ color: "#bcefff" }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
                          Focus
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>Software &amp; Product Development</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    {socialLinks.map((social) => (
                      <IconButton
                        key={social.label}
                        component="a"
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.label}
                        sx={{
                          width: 48,
                          height: 48,
                          color: "#fff",
                          bgcolor: "rgba(255,255,255,0.09)",
                          border: "1px solid rgba(255,255,255,0.13)",
                          transition: "0.3s",
                          "&:hover": {
                            bgcolor: "#fff",
                            color: "#075d7e",
                            transform: "translateY(-5px)",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#075d7e",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Get in touch
            </Typography>

            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800, letterSpacing: "-1px" }}>
              Contact Information
            </Typography>
          </Box>

          <Typography color="text.secondary" sx={{ maxWidth: 380, lineHeight: 1.7 }}>
            Choose any channel that works best for you. I&apos;m just a message away.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {contacts.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "rgba(7,93,126,0.1)",
                  background: "linear-gradient(145deg,#ffffff,#f8fbfc)",
                  transition: "all 0.35s ease",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 4,
                    height: "100%",
                    background: "linear-gradient(180deg,#075d7e,#16a0c4)",
                  },
                  "&:hover": {
                    transform: "translateY(-7px)",
                    borderColor: "rgba(7,93,126,0.2)",
                    boxShadow: "0 18px 45px rgba(7,93,126,0.13)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 55,
                      height: 55,
                      bgcolor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Avatar>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.3 }}>
                      {item.title}
                    </Typography>

                    <Link
                      href={item.link}
                      underline="hover"
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      sx={{
                        display: "block",
                        fontWeight: 700,
                        color: "#075d7e",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "100%",
                      }}
                    >
                      {item.value}
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          mt: { xs: 5, md: 7 },
          p: { xs: 3.5, md: 5 },
          borderRadius: 5,
          color: "#fff",
          background: "linear-gradient(135deg,#075d7e,#106477,#096381)",
          boxShadow: "0 20px 55px rgba(7,93,126,0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            right: -70,
            top: -100,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              Have something exciting in mind?
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 650, lineHeight: 1.7 }}>
              Whether it&apos;s a new product, software project, collaboration, or opportunity, let&apos;s make it happen.
            </Typography>
          </Box>

          <Button
            component="a"
            href="mailto:chauhanuday842@gmail.com"
            variant="contained"
            endIcon={<ArrowOutwardIcon />}
            sx={{
              flexShrink: 0,
              px: 3,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#fff",
              color: "#075d7e",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#f4fbfd",
                transform: "translateY(-3px)",
              },
              transition: "0.3s",
            }}
          >
            Let&apos;s Connect
          </Button>
        </Box>


      </Paper>

    </Box>
  );
};

export default Contact;