import { useCallback, useEffect, useState } from "react";
import { LoginCredentials, User } from "../types";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

export interface AuthStateProps {
    initialUser: User | null;
}

export function useAuthState({ initialUser }: AuthStateProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(initialUser);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const getAuth = useCallback(async () => {
        const userData = await getUserInfo();
        setUser(userData);
        setIsLoggedIn(!!userData);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setIsLoggedIn(!!user);
        setIsLoading(false);
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
            await axios(reqConfig);
            console.log("successful login");
            getAuth();
            navigate("/dashboard");
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
        getAuth,
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

export async function getUserInfo(): Promise<User | null> {
    try {
        const response = await axios.get("/getauth", {
            withCredentials: true,
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (err: any) {
        console.log(err);
    }
    return null;
}
