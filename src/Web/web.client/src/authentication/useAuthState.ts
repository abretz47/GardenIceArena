import { useCallback, useEffect, useState } from "react";
import { LoginCredentials, User } from "../types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

export function useAuthState() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const getAuth = useCallback(async () => {
        try {
            const response = await axios.get("/getauth", {
                withCredentials: true,
            });
            if (response.status === 200) {
                setUser(response.data);
                setIsLoggedIn(!!response.data);
            } else {
                console.log(response);
            }
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getAuth()
            .catch((err: AxiosError<{ error: string }>) => {
                setError(err?.response?.data?.error || "Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    function register() {}

    const login = useCallback(async (input: LoginCredentials) => {
        setIsLoading(true);
        const data = {
            email: input.usernameOrEmail,
            password: input.password,
        };
        const reqConfig: AxiosRequestConfig = {
            url: setLoginUrl(input.rememberMe),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data,
            withCredentials: true,
        };
        try {
            const response = await axios(reqConfig);
            if (response.status === 200) {
                navigate("/");
            } else {
                setError("Error Logging In.");
            }
        } catch (err: any) {
            setError(`Error Logging In: ${err}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    function logout() {}

    return {
        user,
        isLoading,
        isLoggedIn,
        login,
        logout,
        register,
        error,
    };
}

export type AuthState = ReturnType<typeof useAuthState>;

function setLoginUrl(rememberMe: boolean) {
    if (rememberMe == true) {
        return "/signin?useCookies=true";
    }
    return "/signin?useSessionCookies=true";
}
