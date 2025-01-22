import * as React from "react";
import { useState } from "react";
import { useAuth } from "../../authentication/authContext";
import SimpleBackdrop from "../../components/Backdrop";
import { toast } from "react-toastify";
import { CssBaseline, Stack } from "@mui/material";
import Content from "./components/Content";
import SignInCard from "./components/SignInCard";
import AppTheme from "../../theme/AppTheme";

export default function SignInSide() {
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            toast.warning("Please fill in all fields", {
                autoClose: 1000,
            });
        } else {
            login({
                email: email,
                password: password,
                rememberMe: rememberMe,
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
        if (name === "rememberMe") {
            setRememberMe(e.target.checked);
        }
    };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <SimpleBackdrop open={isLoading} />
            <Stack
                direction="column"
                component="main"
                sx={[
                    {
                        justifyContent: "center",
                        height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
                        marginTop: "max(40px - var(--template-frame-height, 0px), 0px)",
                        minHeight: "100%",
                    },
                    (theme) => ({
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            zIndex: -1,
                            inset: 0,
                            backgroundImage:
                                "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
                            backgroundRepeat: "no-repeat",
                            ...theme.applyStyles("dark", {
                                backgroundImage:
                                    "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
                            }),
                        },
                    }),
                ]}
            >
                <Stack
                    direction={{ xs: "column-reverse", md: "row" }}
                    sx={{
                        justifyContent: "center",
                        gap: { xs: 6, sm: 12 },
                        p: 2,
                        mx: "auto",
                    }}
                >
                    <Stack
                        direction={{ xs: "column-reverse", md: "row" }}
                        sx={{
                            justifyContent: "center",
                            gap: { xs: 6, sm: 12 },
                            p: { xs: 2, sm: 4 },
                            m: "auto",
                        }}
                    >
                        <Content />
                        <SignInCard />
                    </Stack>
                </Stack>
            </Stack>
        </AppTheme>
    );
}
