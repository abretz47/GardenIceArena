import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme.tsx";
import SignUp from "./pages/SignUp.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import SignInSide from "./pages/SignInSide.tsx";
import WeatherForecast from "./components/WeatherForecast.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/sign-in",
        element: <SignInSide />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/weatherforecast",
        element: <WeatherForecast />,
    },
]);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
