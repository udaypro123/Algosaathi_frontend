import { useState } from "react";
import {
  Typography,
  Box,
} from "@mui/material";

type Course = {
  image: string;
  title: string;
  description?: string;
};


import { Button } from "@mui/material";



const CoursesCarousel = ({ upcomingCourses = [], onCourseSelect }: { upcomingCourses?: Course[]; onCourseSelect?: (course: Course, index: number) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % upcomingCourses.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + upcomingCourses.length) % upcomingCourses.length
    );
  };

  const getPosition = (index: number) => {
    const total = upcomingCourses.length;

    let position = index - activeIndex;

    if (position > Math.floor(total / 2)) {
      position -= total;
    }

    if (position < -Math.floor(total / 2)) {
      position += total;
    }

    return position;
  };

  const handleSelect = (course: Course, index: number) => {
    setActiveIndex(index);
    onCourseSelect?.(course, index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        py: 5,
        boxShadow: "0px 5px 5px #dee0e0",
        borderRadius:".5rem",
      }}
    >
      {/* Carousel */}
      <Box
        sx={{
          position: "relative",
          height: 350,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {upcomingCourses?.map((course, index) => {
          const position = getPosition(index);

          const isCenter = position === 0;

          return (
            <Box
              key={course.title}
              onClick={() => handleSelect(course, index)}
              sx={{
                position: "absolute",

                /* Main movement */
                left: "50%",
                top: "50%",

                transform: `
                  translate(
                    calc(-50% + ${position * 100}px),
                    -50%
                  )
                  scale(${isCenter ? 1 : Math.abs(position) === 1 ? 0.88 : 0.72})
                `,

                width: isCenter
                  ? 600
                  : Math.abs(position) === 1
                  ? 580
                  : 540,

                height: isCenter
                  ? 370
                  : Math.abs(position) === 1
                  ? 345
                  : 320,

                borderRadius: 2,

                overflow: "hidden",

                cursor: "pointer",

                zIndex: 10 - Math.abs(position),

                opacity: Math.abs(position) > 2 ? 0 : 1,

                boxShadow: isCenter
                  ? "0 12px 30px rgba(22, 3, 129, 0.35)"
                  : "0 6px 18px rgba(26, 0, 106, 0.25)",

                // border:"1rem solid #272bfb",
                filter: "brightness(1)",
                transition:
                  "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), width 700ms cubic-bezier(0.22, 1, 0.36, 1), height 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, box-shadow 700ms ease",

                "&:hover": {
                  filter: "brightness(0.7)",
                },
              }}
            >
              <Box
                component="img"
                src={course.image}
                alt={course.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              {/* Center title */}
              {isCenter && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 1.5,
                    background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {course.title}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={prevSlide}
          sx={{
            textTransform: "none",
            borderRadius: 1.5,
            px: 2.5,
            fontWeight: 600,
            background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",

            "&:hover": {
                  background: "linear-gradient(90deg, rgb(15, 15, 193) 0%, rgb(2, 2, 133) 60%, rgb(50, 50, 210) 100%)",
            },
          }}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          onClick={nextSlide}
          sx={{
            textTransform: "none",
            borderRadius: 1.5,
            px: 2.5,
            fontWeight: 600,
           background: "linear-gradient(90deg, rgba(0, 0, 82, 1) 0%, rgba(25, 25, 158, 1) 60%, rgba(0, 0, 82, 1) 100%)",

            "&:hover": {
                  background: "linear-gradient(90deg, rgb(15, 15, 193) 0%, rgb(2, 2, 133) 60%, rgb(50, 50, 210) 100%)",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CoursesCarousel;