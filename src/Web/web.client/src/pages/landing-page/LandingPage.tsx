import * as React from "react";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import getLPTheme from "./getLPTheme";
import AppAppBar from "./components/AppBar";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>("dark");
    const LPtheme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Hero />
            <Box sx={{ bgcolor: "background.default" }}>
                <LogoCollection />
                <Features />
                <Divider />
                <Testimonials />
                <Divider />
                <Highlights />
                <Divider />
                <Pricing />
                <Divider />
                <FAQ />
                <Divider />
                <Footer />
            </Box>
        </ThemeProvider>
    );
}
