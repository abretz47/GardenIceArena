import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, styled } from "@mui/material";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [warning, setWarning] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            if (isValidEmail(value)) {
                setWarning("");
                setEmail(value);
            } else {
                setWarning("Please enter a valid email address.");
            }
        }
        if (name === "password") {
            if (isValidPassword(value)) {
                setWarning("");
                setPassword(value);
            } else {
                setWarning("Please enter a valid password.");
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password || warning) {
            setError("Please complete all fields");
        } else {
            const config: AxiosRequestConfig = {
                method: "POST",
                url: "/register",
                data: {
                    email,
                    password,
                },
            };
            try {
                const response = await axios(config);
                if (response.status === 200) {
                    navigate("/sign-in");
                }
            } catch (error) {
                setError("Error registering. Please try again.");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Alert variant="outlined" severity="info">
                                Password must contain:
                                <PasswordRequirements>
                                    <li>At least six characters</li>
                                    <li>Uppercase letter</li>
                                    <li>Lowercase letter</li>
                                    <li>Number</li>
                                    <li>Special character</li>
                                </PasswordRequirements>
                            </Alert>
                        </Grid>

                        {warning && (
                            <Grid item xs={12}>
                                <Alert severity="warning">{warning}</Alert>
                            </Grid>
                        )}
                        {error && (
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
}

function isValidPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(password)) {
        return true;
    }
    return false;
}

const PasswordRequirements = styled("ul")({
    margin: 0,
});
