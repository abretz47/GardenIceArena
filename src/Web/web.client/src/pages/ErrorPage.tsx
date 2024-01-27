import { Box, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <Typography component="h1" variant="h5" gutterBottom>
                Oops
            </Typography>
            <Typography component="h1" variant="h6" gutterBottom>
                Sorry, an unexpected error has occurred
            </Typography>
            <Typography fontStyle="italic">{error.statusText || error.message}</Typography>
        </Box>
    );
}
