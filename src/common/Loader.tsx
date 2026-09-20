import { motion, type Variants } from "framer-motion";
import { Box } from "@mui/material";

const helixHeight = 16;
const radius = 36;
const nodeCount = 14;
const nodeSize = 10;

const generateHelixPoints = () => {
    const points = [];

    for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (i / nodeCount) * helixHeight - helixHeight / 2;

        points.push({
            id: i,
            x,
            y,
            z,
            angle,
            delay: i * 0.08,
        });
    }

    return points;
};

const points = generateHelixPoints();

const containerVariants: Variants = {
    animate: {
        rotateY: [0, 360],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

const nodeVariants: Variants = {
    animate: (delay: number) => ({
        scale: [1, 1.6, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
        },
    }),
};

const Loader = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                perspective: 800,
            }}
        >
            <motion.div
                variants={containerVariants}
                animate="animate"
                style={{
                    position: "relative",
                    width: radius * 2 + nodeSize * 2,
                    height: helixHeight + nodeSize * 2,
                    transformStyle: "preserve-3d",
                }}
            >
                {points.map((point) => (
                    <motion.div
                        key={point.id}
                        custom={point.delay}
                        variants={nodeVariants}
                        animate="animate"
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: nodeSize,
                            height: nodeSize,
                            marginLeft: -nodeSize / 2,
                            marginTop: -nodeSize / 2,
                            transformStyle: "preserve-3d",
                            transform: `
                                translate3d(${point.x}px, ${point.y}px, ${point.z}px)
                                rotateX(70deg)
                            `,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg, #2F4BFF, #050D42)",
                                boxShadow: "0 0 12px rgba(47, 75, 255, 0.6)",
                            }}
                        />
                    </motion.div>
                ))}

                {points.map((point, index) => {
                    if (index % 2 === 0 && index + 1 < points.length) {
                        const next = points[index + 1];

                        const midX = (point.x + next.x) / 2;
                        const midY = (point.y + next.y) / 2;
                        const midZ = (point.z + next.z) / 2;

                        const dx = next.x - point.x;
                        const dy = next.y - point.y;
                        const dz = next.z - point.z;

                        const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        const safeLength = length === 0 ? 0.001 : length;

                        const rotateY = Math.atan2(dx, dz) * (180 / Math.PI);
                        const rotateX = -Math.asin(dy / safeLength) * (180 / Math.PI);

                        return (
                            <motion.div
                                key={`bar-${index}`}
                                custom={point.delay + 0.05}
                                variants={nodeVariants}
                                animate="animate"
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: safeLength,
                                    height: 3,
                                    marginLeft: -safeLength / 2,
                                    marginTop: -1.5,
                                    transformStyle: "preserve-3d",
                                    transform: `
                                        translate3d(${midX}px, ${midY}px, ${midZ}px)
                                        rotateX(70deg)
                                        rotateY(${rotateY}deg)
                                        rotateX(${rotateX}deg)
                                    `,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 2,
                                        background:
                                            "linear-gradient(90deg, rgba(47,75,255,0.4), rgba(47,75,255,0.8), rgba(47,75,255,0.4))",
                                    }}
                                />
                            </motion.div>
                        );
                    }

                    return null;
                })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Box
                    sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        background: "linear-gradient(90deg, #2F4BFF, #050D42)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    AlgoSaathi
                </Box>
            </motion.div>
        </Box>
    );
};



export default Loader;
