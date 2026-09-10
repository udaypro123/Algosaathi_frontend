
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
    const exploreLinks = [
        "Home",
        "About Us",
        "Solutions",
        "Learning",
        "Projects",
    ];

    return (
        <Box
            component="footer"
            sx={{
                position: "relative",
                overflow: "hidden",
                color: "#fff",
                background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                // borderRadius: "32px 32px 0 0",
            }}
        >
            {/* Decorative Glow */}
            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    // background: "rgba(59, 130, 246, 0.12)",
                    filter: "blur(90px)",
                    top: -180,
                    right: -100,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    background: "rgba(99, 102, 241, 0.08)",
                    filter: "blur(80px)",
                    bottom: -150,
                    left: -80,
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    px: { xs: 3, sm: 4, md: 6 },
                    py: { xs: 6, md: 8 },
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Footer Content */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "2fr 1fr 1fr",
                        },
                        gap: { xs: 5, md: 8 },
                    }}
                >
                    {/* Brand Section */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    xs: 28,
                                    md: 34,
                                },
                                fontWeight: 800,
                                letterSpacing: "-1px",
                                mb: 2,
                            }}
                        >
                            ✦ Algo<span style={{ color: "#ea580c" }}>Saathi</span>
                        </Typography>

                        <Typography
                            sx={{
                                maxWidth: 500,
                                color: "#ffffff",
                                fontSize: 15,
                                lineHeight: 1.8,
                            }}
                        >
                            Build the software solutions that make your
                            business and career stand out. Learn practical
                            skills, solve real-world problems, and turn ideas
                            into meaningful digital products.
                        </Typography>

                        <Typography
                            sx={{
                                mt: 3,
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#e2e8f0",
                            }}
                        >
                            Learn. Build. Solve. Stand Out.
                        </Typography>
                    </Box>

                    {/* Explore Section */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 700,
                                mb: 2.5,
                            }}
                        >
                            Explore
                        </Typography>

                        {exploreLinks.map((item) => (
                            <Typography
                                key={item}
                                sx={{
                                    mb: 1.4,
                                    color: "#dde2e8",
                                    fontSize: 14,
                                    cursor: "pointer",
                                    width: "fit-content",
                                    transition:
                                        "color 0.2s ease, transform 0.2s ease",

                                    "&:hover": {
                                        color: "#ffffff",
                                        transform: "translateX(5px)",
                                    },
                                }}
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>

                    {/* Contact Section */}
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 16,
                                fontWeight: 700,
                                mb: 2.5,
                            }}
                        >
                            Get In Touch
                        </Typography>

                        <Typography
                            sx={{
                                color: "#d6dce4",
                                fontSize: 16,
                                fontWeight: 600,
                                mb: 0.5,
                            }}
                        >
                            Owner :  <span
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color:"white"
                                }}
                            >
                                Uday Chauhan
                            </span>
                        </Typography>



                        <Link
                            href="mailto:chauhanuday842@gmail.com"
                            underline="none"
                            sx={{
                                color: "#60a5fa",
                                fontSize: 12,
                                wordBreak: "break-word",
                                transition: "color 0.2s ease",

                                "&:hover": {
                                    color: "#93c5fd",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                          email :  chauhanuday842@gmail.com
                        </Link>
                    </Box>
                </Box>

                {/* Divider */}
                <Box
                    sx={{
                        height: "1px",
                        background: "rgba(148, 163, 184, 0.15)",
                        my: 5,
                    }}
                />

                {/* Bottom Footer */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        flexDirection: {
                            xs: "column",
                            md: "row",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            color: "#64748b",
                            fontSize: 13,
                            textAlign: {
                                xs: "center",
                                md: "left",
                            },
                        }}
                    >
                        © 2026 algosaathi.com. All rights reserved.
                    </Typography>

                    <Typography
                        sx={{
                            color: "#64748b",
                            fontSize: 13,
                            textAlign: "center",
                        }}
                    >
                        Built with passion by{" "}
                        <Box
                            component="span"
                            sx={{
                                color: "#cbd5e1",
                                fontWeight: 600,
                            }}
                        >
                            Uday Chauhan
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;

