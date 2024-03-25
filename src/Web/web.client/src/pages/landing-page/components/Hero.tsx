import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReactPlayer from "react-player";
import heroVideo from "../../../../public/videos/hockey_at_the_garden__1080p__246.mp4";
import { Stack, Typography } from "@mui/material";

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                minWidth: "600px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            })}
        >
            <Container maxWidth={false} disableGutters sx={{}}>
                <ReactPlayer url={heroVideo} playing loop muted width="100%" height="100%" />
            </Container>
            <Container
                maxWidth={false}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "black",
                    opacity: ".75",
                    pt: { xs: 2, sm: 3 },
                    pb: { xs: 2, sm: 3 },
                    position: "absolute",
                    bottom: "6px",
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignSelf: "center",
                            textAlign: "center",
                        }}
                    >
                        The Garden Ice Arena
                    </Typography>
                    <Typography variant="h6" textAlign="center" color="text.secondary">
                        This rink is a place our community can be built around <br />
                        We want to be one more place area children and adults can go for a positive, encouraging, and
                        fun atmosphere.
                    </Typography>
                </Stack>
            </Container>

            {/* <Container
                maxWidth={false}
                disableGutters
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        flexBasis: "40%",
                        flexDirection: "column",
                        alignItems: "center",
                        pt: { xs: 12, sm: 12 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
                        <Typography
                            component="h1"
                            variant="h1"
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignSelf: "center",
                                textAlign: "center",
                            }}
                        >
                            The Garden Ice Arena
                        </Typography>
                    </Stack>
                </Container>
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        display: "flex",
                        flexBasis: "60%",
                        flexDirection: "column",
                        alignItems: "center",
                        pt: { xs: 12, sm: 12 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <ReactPlayer url={heroVideo} playing loop muted width="100%" height="100%" />
                </Container>
            </Container> */}
            {/* <Box
                id="image"
                sx={(theme) => ({
                    mt: { xs: 8, sm: 10 },
                    alignSelf: "center",
                    height: { xs: 200, sm: 700 },
                    width: "100%",
                    borderRadius: "10px",
                    outline: "1px solid",
                    outlineColor: theme.palette.mode === "light" ? alpha("#BFCCD9", 0.5) : alpha("#9CCCFC", 0.1),
                    boxShadow:
                        theme.palette.mode === "light"
                            ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                            : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
                })}
            >
                <ReactPlayer url={heroVideo} playing loop muted width="100%" height="100%" />
            </Box> */}
        </Box>
    );
}

{
    /* <Container
sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pb: { xs: 2, sm: 3 },
}}
>
<Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
    <Typography
        component="h1"
        variant="h1"
        sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
        }}
    >
        The Garden Ice Arena
    </Typography>
    <Typography variant="body1" textAlign="center" color="text.secondary">
        This rink is a place our community can be built around <br />
        We want to be one more place area children and adults can go for a positive, encouraging,
        and fun atmosphere.
    </Typography>
</Stack>
</Container> */
}
