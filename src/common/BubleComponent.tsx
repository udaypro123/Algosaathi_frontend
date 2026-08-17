import { Box } from '@mui/material'
import { bubbles } from './Bubule'

const BubleComponent = () => {
    return (
        <Box  sx={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
            }}>
            {/* =====================================================
                WATER BUBBLES
            ====================================================== */}

            {bubbles.map(
                (bubble, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "absolute",

                            width: bubble.size,
                            height: bubble.size,

                            left: bubble.left,
                            top: bubble.top,
                            borderRadius:  "50%",
                            background:  "radial-gradient(circle at 30% 25%, rgba(4, 185, 235, 0.78), rgba(248, 140, 8, 0.71) 35%, rgba(9, 152, 209, 0.9) 50%)",

                            border:"1px solid rgba(186,230,253,0.32)",

                            // backdropFilter:"blur(5spx)",

                            opacity: 0.5,

                            pointerEvents: "none",

                            zIndex: 0,

                            animation: `
                                bubbleFloat ${bubble.duration}
                                ease-in-out infinite,
                                bubbleGlow 4s ease-in-out infinite
                            `,

                            animationDelay: `${bubble.delay}, ${bubble.delay}`,

                            "@media (max-width: 600px)": {
                                opacity: 0.15,
                                transform:
                                    "scale(0.7)"
                            }
                        }}
                    />
                )
            )}

        </Box>
    )
}

export default BubleComponent