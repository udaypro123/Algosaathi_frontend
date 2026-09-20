import { useEffect, useState } from "react";
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
import { getAllNews } from "./api.ts/api";



// ======================================================
// TYPES
// ======================================================

interface NewsItem {
  _id: string;
  id: string;

  title: string;
  shortDescription: string;
  content: string;

  category: string;
  subCategory?: string;

  // IMPORTANT: API is returning string[]
  images: string[];

  tags?: string[];

  slug: string;

  isPublished: boolean;

  publishedAt?: string;
  createdAt: string;
  updatedAt: string;

  views: number;

  author?: {
    name: string;
    profileImage: string;
  };

  source?: {
    name: string;
    url: string;
  };

  video?: {
    url: string;
    thumbnail: string;
  };

  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
  };
}


// ======================================================
// HELPERS
// ======================================================

const truncate = (
  text: string = "",
  length: number
) => {
  return text.length <= length
    ? text
    : `${text.slice(0, length).trim()}...`;
};


const formatDate = (date?: string) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};


// ======================================================
// COMPONENT
// ======================================================

const News = () => {

  // ==================================================
  // STATES
  // ==================================================

  const [newsList, setNewsList] =
    useState<NewsItem[]>([]);

  const [fetchingNews, setFetchingNews] =
    useState(false);

  const [error, setError] =
    useState("");

  // Which news is active in main hero
  const [activeSlide, setActiveSlide] =
    useState(0);

  const carouselNews =
    newsList.slice(0, 5);

  const carouselCount =
    carouselNews.length;

  // Which image of current hero news
  const [activeImage, setActiveImage] =
    useState(0);

  // Selected news for Read More
  const [selectedArticle, setSelectedArticle] =
    useState<NewsItem | null>(null);

  // Image inside Read More dialog
  const [selectedImage, setSelectedImage] =
    useState(0);

  const [commentText, setCommentText] =
    useState("");

  const [comments, setComments] =
    useState<string[]>([]);

  const [shareMessage, setShareMessage] =
    useState("");


  // ==================================================
  // FETCH NEWS
  // ==================================================

  const fetchNews = async () => {

    try {

      setFetchingNews(true);

      setError("");

      const response = await getAllNews();

      console.log(
        "NEWS RESPONSE:",
        response
      );


      if (!response.success) {

        throw new Error(
          response?.message ||
          "Failed to fetch news"
        );

      }


      const news =
        response?.data || [];


      console.log(
        "NEWS DATA:",
        news
      );


      setNewsList(
        Array.isArray(news)
          ? news
          : []
      );

    } catch (err) {

      const message =
        err instanceof Error
          ? err.message
          : "Failed to fetch news";

      setError(message);

    } finally {

      setFetchingNews(false);

    }

  };


  // ==================================================
  // FETCH ON MOUNT
  // ==================================================

  useEffect(() => {

    fetchNews();

  }, []);


  // ==================================================
  // MAIN HERO NEWS AUTO SLIDER
  // ==================================================

  useEffect(() => {

    if (carouselCount <= 1) {
      return;
    }


    const interval =
      window.setInterval(() => {

        setActiveSlide(
          (current) =>
            (current + 1) %
            carouselCount
        );

        setActiveImage(0);

      }, 3000);


    return () => {

      window.clearInterval(
        interval
      );

    };

  }, [carouselCount]);


  // ==================================================
  // MAIN HERO NEXT NEWS
  // ==================================================

  const handleNextNews = () => {

    if (!carouselCount) {
      return;
    }


    setActiveSlide(
      (current) =>
        (current + 1) %
        carouselCount
    );


    setActiveImage(0);

  };


  // ==================================================
  // MAIN HERO PREVIOUS NEWS
  // ==================================================

  const handlePreviousNews = () => {

    if (!carouselCount) {
      return;
    }


    setActiveSlide(
      (current) =>
        (current -
          1 +
          carouselCount) %
        carouselCount
    );


    setActiveImage(0);

  };


  // ==================================================
  // OPEN ARTICLE
  // ==================================================

  const handleOpenArticle = (
    article: NewsItem
  ) => {

    setSelectedArticle(article);

    // Always start dialog from first image
    setSelectedImage(0);

    setCommentText("");

    setComments([]);

    setShareMessage("");

  };


  // ==================================================
  // CLOSE ARTICLE
  // ==================================================

  const handleCloseArticle = () => {

    setSelectedArticle(null);

    setSelectedImage(0);

  };


  // ==================================================
  // NEXT IMAGE IN DIALOG
  // ==================================================

  const handleNextSelectedImage = () => {

    if (!selectedArticle) {
      return;
    }


    if (
      selectedArticle.images.length <= 1
    ) {
      return;
    }


    setSelectedImage(
      (current) =>
        (current + 1) %
        selectedArticle.images.length
    );

  };


  // ==================================================
  // PREVIOUS IMAGE IN DIALOG
  // ==================================================

  const handlePreviousSelectedImage = () => {

    if (!selectedArticle) {
      return;
    }


    if (
      selectedArticle.images.length <= 1
    ) {
      return;
    }


    setSelectedImage(
      (current) =>
        (current -
          1 +
          selectedArticle.images.length) %
        selectedArticle.images.length
    );

  };


  // ==================================================
  // POST COMMENT
  // ==================================================

  const handlePostComment = () => {

    if (!commentText.trim()) {
      return;
    }


    setComments((previous) => [
      commentText.trim(),
      ...previous,
    ]);


    setCommentText("");

  };


  // ==================================================
  // SHARE
  // ==================================================

  const handleShare = async () => {

    if (!selectedArticle) {
      return;
    }


    const url =
      window.location.href;


    const payload = {

      title:
        selectedArticle.title,

      text:
        selectedArticle.shortDescription,

      url,

    };


    // Native share
    if (navigator.share) {

      try {

        await navigator.share(
          payload
        );


        setShareMessage(
          "Shared successfully."
        );


        return;

      } catch {
        // User cancelled share
      }

    }


    // Clipboard fallback
    try {

      await navigator.clipboard.writeText(
        `${selectedArticle.title} - ${url}`
      );


      setShareMessage(
        "Link copied to clipboard."
      );

    } catch {

      setShareMessage(
        "Unable to copy link."
      );

    }

  };


  // ==================================================
  // LOADING
  // ==================================================

  if (fetchingNews) {

    return (

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "var(--global-bg)",
        }}
      >

        <Typography>
          Loading news...
        </Typography>

      </Box>

    );

  }


  // ==================================================
  // ERROR
  // ==================================================

  if (error) {

    return (

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "var(--global-bg)",
          px: 3,
        }}
      >

        <Typography
          color="error"
          sx={{ textAlign: "center" }}
        >
          {error}
        </Typography>

      </Box>

    );

  }


  // ==================================================
  // EMPTY NEWS
  // ==================================================

  if (!newsList.length) {

    return (

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "var(--global-bg)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection:
              "column",
            textAlign: "center",
          }}
        >

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 32,
              },
              fontWeight: 900,
            }}
          >

            News hub for

            <Box
              component="span"
              sx={{
                color:
                  "#ea580c",
                ml: "5px",
              }}
            >
              Everyone
            </Box>

          </Typography>


          <Typography
            sx={{
              fontSize: {
                xs: 16,
                md: 18,
              },
              color: "grey",
              textAlign:
                "center",
              mt: 0.5,
            }}
          >

            Everyone deserves to
            know what's going on
            in real time.

          </Typography>

        </Box>

        <Typography variant="h3" sx={{ mt: 5 }}>
          No news available.
        </Typography>

      </Box>

    );

  }


  // ==================================================
  // ACTIVE NEWS
  // ==================================================

  const activeNews =
    carouselNews[activeSlide] ||
    carouselNews[0];


  const latestNews =
    newsList[0];


  // ==================================================
  // RETURN
  // ==================================================

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background:
          "var(--global-bg)",
        color:
          "var(--global-text)",
        pb: 10,
      }}
    >

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          pt: {
            xs: 12,
            md: 14,
          },
        }}
      >

        {/* ==================================================
                    HEADER
                ================================================== */}

        <Box
          sx={{
            mb: 5,
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection:
                "column",
              textAlign: "center",
            }}
          >

            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  md: 32,
                },
                fontWeight: 900,
              }}
            >

              News hub for

              <Box
                component="span"
                sx={{
                  color:
                    "#ea580c",
                  ml: "5px",
                }}
              >
                Everyone
              </Box>

            </Typography>


            <Typography
              sx={{
                fontSize: {
                  xs: 16,
                  md: 18,
                },
                color: "grey",
                textAlign:
                  "center",
                mt: 0.5,
              }}
            >

              Everyone deserves to
              know what's going on
              in real time.

            </Typography>

          </Box>

        </Box>


        {/* ==================================================
                    HERO + LATEST
                ================================================== */}

        <Box
          sx={{
            mb: 6,
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            alignItems: "stretch",
          }}
        >

          {/* ==================================================
                        HERO NEWS
                    ================================================== */}

          <Box
            sx={{
              position:
                "relative",
              borderRadius: 4,
              overflow: "hidden",
              minHeight: {
                xs: 420,
                md: 470,
              },
            }}
          >

            {/* HERO IMAGE */}

            <Box
              component="img"
              src={
                activeNews
                  .images?.[
                activeImage
                ] || ""
              }
              alt={
                activeNews.title
              }
              sx={{
                width: "100%",
                height: "100%",
                minHeight: {
                  xs: 420,
                  md: 470,
                },
                maxHeight: {
                  xs: 420,
                  md: 470,
                },
                objectFit:
                  "cover",
                display:
                  "block",
                transition:
                  "opacity 0.4s ease",
              }}
            />


            {/* DARK OVERLAY */}

            <Box
              sx={{
                position:
                  "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(229, 131, 25, 0.04) 0%, rgba(15, 23, 42, 0.6) 65%)",
              }}
            />


            {/* HERO CONTENT */}

            <Box
              sx={{
                position: "absolute",
                left: {
                  xs: 20,
                  md: 40,
                },
                right: {
                  xs: 20,
                  md: 40,
                },
                bottom: {
                  xs: 50,
                  md: 55,
                },
              }}
            >


              <Typography
                sx={{
                  color: "#fff",
                  fontSize: {
                    xs: 20,
                    sm: 24,
                    md: 30,
                  },
                  fontWeight: 600,
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >

                {
                  activeNews.title
                }

              </Typography>


              <Button
                variant="contained"
                sx={{borderRadius:"30%",boxShadow: "rgba(241, 236, 236, 0.81) 0px 22px 70px 4px", border:"1px solid white"}}
                onClick={() =>
                  handleOpenArticle(
                    activeNews
                  )
                }
              >
                Read full story
              </Button>

            </Box>


            {/* ==================================================
                            CHANGE NEWS
                        ================================================== */}

            {newsList.length > 1 && (
              <>
                <IconButton
                  onClick={
                    handlePreviousNews
                  }
                  sx={{
                    position:
                      "absolute",
                    left: {
                      xs: 55,
                      md: 70,
                    },
                    top: "95%",
                    transform:
                      "translateY(-50%)",
                    bgcolor: "rgb(255, 255, 255)",
                    color: "#00083d",
                    zIndex: 4,
                    "&:hover":
                    {
                      bgcolor: "rgba(12, 3, 139, 0.7)",
                      color: "white",
                      border: "1px solid white"
                    },
                  }}
                >
                  <KeyboardArrowLeftIcon />
                </IconButton>


                <IconButton
                  onClick={
                    handleNextNews
                  }
                  sx={{
                    position:
                      "absolute",
                    right: {
                      xs: 55,
                      md: 70,
                    },
                    top:
                      "95%",
                    transform:
                      "translateY(-50%)",
                    bgcolor: "rgb(255, 255, 255)",
                    color: "#00083d",
                    zIndex: 4,
                    "&:hover":
                    {
                      bgcolor: "rgba(12, 3, 139, 0.7)",
                      color: "white",
                      border: "1px solid white"
                    },
                  }}
                >
                  <KeyboardArrowRightIcon />
                </IconButton>
              </>
            )}


            {/* ==================================================
                            IMAGE COUNT
                        ================================================== */}

            {activeNews.images?.length >
              1 && (

                <Chip
                  label={`${activeImage + 1} / ${activeNews.images.length}`}
                  size="small"
                  sx={{
                    position:
                      "absolute",
                    top: 15,
                    right: 15,
                    backgroundColor:
                      "rgba(0,0,0,0.65)",
                    color:
                      "#fff",
                    zIndex: 5,
                  }}
                />

              )}


          </Box>


          {/* ==================================================
                        LATEST NEWS CARD
                    ================================================== */}

          <Card
            sx={{
              borderRadius: 4,
              boxShadow:
                "0 24px 60px rgba(15, 23, 42, 0.08)",
              display:
                "flex",
              flexDirection:
                "column",
              minHeight: {
                xs: 350,
                md: 470,
              },
              overflow:
                "hidden",
            }}
          >

            {/* Latest Image */}

            <CardMedia
              component="img"
              image={
                latestNews
                  .images?.[0] ||
                ""
              }
              alt={
                latestNews.title
              }
              sx={{
                height: 190,
                objectFit:
                  "cover",
              }}
            />


            <CardContent
              sx={{
                flexGrow: 1,
              }}
            >

              <Chip
                label="Latest News"
                color="warning"
                size="small"
                sx={{
                  mb: 1.5,
                }}
              />


              <Typography
                sx={{
                  color:
                    "#0f172a",
                  fontWeight:
                    900,
                  fontSize: {
                    xs: 20,
                    md: 24,
                  },
                  mb: 1.5,
                  lineHeight:
                    1.2,
                }}
              >

                {
                  latestNews.title
                }

              </Typography>


              <Typography
                sx={{
                  color:
                    "#475569",
                  lineHeight:
                    1.7,
                  mb: 2,
                }}
              >

                {truncate(
                  latestNews.shortDescription,
                  130
                )}

              </Typography>


              <Typography
                variant="caption"
                sx={{
                  color:
                    "#64748b",
                }}
              >

                {formatDate(
                  latestNews.publishedAt ||
                  latestNews.createdAt
                )}

              </Typography>

            </CardContent>


            <CardActions
              sx={{
                p: 3,
              }}
            >

              <Button
                variant="contained"
                fullWidth
                onClick={() =>
                  handleOpenArticle(
                    latestNews
                  )
                }
              >
                Read Latest News
              </Button>

            </CardActions>

          </Card>

        </Box>


        {/* ==================================================
                    ALL NEWS CARDS
                ================================================== */}

        <Box sx={{ mb: 6 }}>

          <Typography
            sx={{
              fontSize: {
                xs: 22,
                md: 28,
              },
              fontWeight:
                900,
              mb: 3,
            }}
          >
            Latest & Featured Stories ({newsList?.length})
          </Typography>


          <Box
            sx={{
              display:
                "grid",
              gap: 3,
              gridTemplateColumns:
              {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
            }}
          >

            {newsList.map(
              (article) => (

                <Card
                  key={
                    article.id ||
                    article._id
                  }
                  sx={{
                    borderRadius:
                      3,
                    boxShadow:
                      "0 24px 60px rgba(15, 23, 42, 0.08)",
                    height:
                      "100%",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    overflow:
                      "hidden",
                  }}
                >

                  {/* CARD IMAGE */}

                  <Box
                    sx={{
                      position:
                        "relative",
                    }}
                  >

                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        article
                          .images?.[0] ||
                        ""
                      }
                      alt={
                        article.title
                      }
                      sx={{
                        objectFit:
                          "cover",
                      }}
                    />


                    {/* Image count */}

                    {article
                      .images
                      ?.length >
                      1 && (

                        <Chip
                          label={`+${article.images.length - 1} images`}
                          size="small"
                          sx={{
                            position:
                              "absolute",
                            bottom: 10,
                            right: 10,
                            backgroundColor:
                              "rgba(0,0,0,0.7)",
                            color:
                              "#fff",
                          }}
                        />

                      )}

                  </Box>


                  <CardContent
                    sx={{
                      flexGrow:
                        1,
                    }}
                  >

                    <Box
                      sx={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "center",
                        gap: 1,
                        mb: 1.5,
                      }}
                    >

                      <Chip
                        label={
                          article.category ||
                          "News"
                        }
                        color="warning"
                        size="small"
                      />


                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            "#64748b",
                        }}
                      >

                        {formatDate(
                          article.publishedAt ||
                          article.createdAt
                        )}

                      </Typography>

                    </Box>


                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight:
                          800,
                        mb: 1.5,
                        lineHeight:
                          1.3,
                      }}
                    >

                      {
                        article.title
                      }

                    </Typography>


                    <Typography
                      sx={{
                        color:
                          "#475569",
                        mb: 2,
                        lineHeight:
                          1.6,
                      }}
                    >

                      {truncate(
                        article.shortDescription,
                        110
                      )}

                    </Typography>

                  </CardContent>


                  <CardActions
                    sx={{
                      justifyContent:
                        "flex-end",
                      px: 2,
                      pb: 2,
                    }}
                  >

                    <Button
                      size="small"
                      onClick={() =>
                        handleOpenArticle(
                          article
                        )
                      }
                    >
                      Read More
                    </Button>

                  </CardActions>

                </Card>

              )
            )}

          </Box>

        </Box>

      </Box>


      {/* ==================================================
                READ MORE DIALOG
            ================================================== */}

      <Dialog
        open={
          Boolean(
            selectedArticle
          )
        }
        onClose={
          handleCloseArticle
        }
        fullWidth
        maxWidth="md"
      >

        {selectedArticle && (

          <>

            <DialogTitle
              sx={{
                fontWeight:
                  800,
                fontSize: {
                  xs: 20,
                  md: 26,
                },
              }}
            >

              {
                selectedArticle.title
              }

            </DialogTitle>


            <DialogContent
              dividers
            >

              {/* ==================================================
                                FULL IMAGE CAROUSEL
                            ================================================== */}

              {selectedArticle
                .images
                ?.length > 0 && (

                  <Box
                    sx={{
                      position:
                        "relative",
                      width:
                        "100%",
                      mb: 3,
                      borderRadius:
                        2,
                      overflow:
                        "hidden",
                    }}
                  >

                    {/* IMAGE */}

                    <Box
                      component="img"
                      src={
                        selectedArticle
                          .images[
                        selectedImage
                        ]
                      }
                      alt={
                        selectedArticle.title
                      }
                      sx={{
                        width:
                          "100%",
                        height: {
                          xs: 250,
                          sm: 350,
                          md: 430,
                        },
                        objectFit:
                          "cover",
                        display:
                          "block",
                      }}
                    />


                    {/* IMAGE COUNT */}

                    {selectedArticle
                      .images
                      .length >
                      1 && (

                        <Chip
                          label={`${selectedImage + 1} / ${selectedArticle.images.length}`}
                          size="small"
                          sx={{
                            position:
                              "absolute",
                            top: 12,
                            right: 12,
                            backgroundColor:
                              "rgba(0,0,0,0.7)",
                            color:
                              "#fff",
                          }}
                        />

                      )}


                    {/* PREVIOUS IMAGE */}

                    {selectedArticle
                      .images
                      .length >
                      1 && (

                        <IconButton
                          onClick={
                            handlePreviousSelectedImage
                          }
                          sx={{
                            position:
                              "absolute",
                            left: 12,
                            top:
                              "95%",
                            transform:
                              "translateY(-50%)",
                            bgcolor: "rgb(255, 255, 255)",
                            color: "#00083d",
                            "&:hover":
                            {
                              bgcolor: "rgb(7, 4, 97)",
                              color: "#ffffff",
                            },
                          }}
                        >

                          <KeyboardArrowLeftIcon />

                        </IconButton>

                      )}


                    {/* NEXT IMAGE */}

                    {selectedArticle
                      .images
                      .length >
                      1 && (

                        <IconButton
                          onClick={
                            handleNextSelectedImage
                          }
                          sx={{
                            position:
                              "absolute",
                            right: 12,
                            top:
                              "95%",
                            transform:
                              "translateY(-50%)",
                            bgcolor: "rgb(255, 255, 255)",
                            color: "#00083d",
                            "&:hover":
                            {
                              bgcolor: "rgb(7, 4, 97)",
                              color: "#ffffff",
                            },
                          }}
                        >

                          <KeyboardArrowRightIcon />

                        </IconButton>

                      )}


                    {/* DOTS */}

                    {selectedArticle
                      .images
                      .length >
                      1 && (

                        <Box
                          sx={{
                            position:
                              "absolute",
                            bottom: 12,
                            left:
                              "50%",
                            transform:
                              "translateX(-50%)",
                            display:
                              "flex",
                            gap: 1,
                          }}
                        >

                          {selectedArticle.images.map(
                            (
                              _,
                              index
                            ) => (

                              <Box
                                key={
                                  index
                                }
                                onClick={() =>
                                  setSelectedImage(
                                    index
                                  )
                                }
                                sx={{
                                  width:
                                    index ===
                                      selectedImage
                                      ? 24
                                      : 9,
                                  height: 9,
                                  borderRadius:
                                    10,
                                  bgcolor:
                                    index ===
                                      selectedImage
                                      ? "#ea580c"
                                      : "rgba(255,255,255,0.75)",
                                  cursor:
                                    "pointer",
                                  transition:
                                    "all 0.3s ease",
                                }}
                              />

                            )
                          )}

                        </Box>

                      )}

                  </Box>

                )}


              {/* ==================================================
                                CATEGORY + DATE
                            ================================================== */}

              <Typography
                sx={{
                  color:
                    "#64748b",
                  mb: 2,
                }}
              >

                {
                  selectedArticle.category
                }

                {" • "}

                {formatDate(
                  selectedArticle.publishedAt ||
                  selectedArticle.createdAt
                )}

              </Typography>


              {/* ==================================================
                                CONTENT
                            ================================================== */}

              <Typography
                sx={{
                  mb: 3,
                  color:
                    "#475569",
                  lineHeight:
                    1.8,
                  whiteSpace:
                    "pre-line",
                }}
              >

                {
                  selectedArticle.content
                }

              </Typography>


              <Divider
                sx={{
                  my: 3,
                }}
              />


              {/* ==================================================
                                COMMENTS
                            ================================================== */}

              <Typography
                sx={{
                  fontWeight:
                    700,
                  mb: 2,
                }}
              >
                Comments
              </Typography>


              <Box
                sx={{
                  display:
                    "grid",
                  gap: 2,
                }}
              >

                <TextField
                  label="Write a comment"
                  multiline
                  minRows={3}
                  value={
                    commentText
                  }
                  onChange={(
                    e
                  ) =>
                    setCommentText(
                      e
                        .target
                        .value
                    )
                  }
                  fullWidth
                />


                <Box
                  sx={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    gap: 2,
                    flexWrap:
                      "wrap",
                  }}
                >

                  <Button
                    variant="contained"
                    onClick={
                      handlePostComment
                    }
                    disabled={
                      !commentText.trim()
                    }
                  >
                    Post comment
                  </Button>


                  <Button
                    startIcon={
                      <ShareIcon />
                    }
                    onClick={
                      handleShare
                    }
                  >
                    Share story
                  </Button>

                </Box>


                {shareMessage && (

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        "#16a34a",
                    }}
                  >
                    {
                      shareMessage
                    }
                  </Typography>

                )}


                {/* COMMENTS LIST */}

                {comments.length >
                  0 ? (

                  <Box
                    sx={{
                      display:
                        "grid",
                      gap: 2,
                    }}
                  >

                    {comments.map(
                      (
                        item,
                        index
                      ) => (

                        <Box
                          key={
                            index
                          }
                          sx={{
                            p: 2,
                            borderRadius:
                              2,
                            bgcolor:
                              "#f8fafc",
                            border:
                              "1px solid #e2e8f0",
                          }}
                        >

                          <Box
                            sx={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >

                            <CommentIcon
                              sx={{
                                fontSize:
                                  18,
                                color:
                                  "#0f172a",
                              }}
                            />


                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight:
                                  700,
                              }}
                            >
                              You
                            </Typography>

                          </Box>


                          <Typography
                            sx={{
                              color:
                                "#475569",
                            }}
                          >
                            {
                              item
                            }
                          </Typography>

                        </Box>

                      )
                    )}

                  </Box>

                ) : (

                  <Typography
                    sx={{
                      color:
                        "#64748b",
                    }}
                  >
                    No comments yet.
                    Be the first
                    to share your
                    take.
                  </Typography>

                )}

              </Box>

            </DialogContent>


            <DialogActions>

              <Button
                onClick={
                  handleCloseArticle
                }
              >
                Close
              </Button>

            </DialogActions>

          </>

        )}

      </Dialog>

    </Box>

  );
};


export default News;