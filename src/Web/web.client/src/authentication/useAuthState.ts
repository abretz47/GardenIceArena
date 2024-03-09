import { useCallback, useEffect, useState } from "react";
import { LoginCredentials, RegisterRequest, User, UserInfo, defaultUserInfo } from "../types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AUTH_ENDPOINTS = {
    login: "/api/Account/login",
    logOut: "/api/Account/logout",
    getCurrentUser: "/api/Account/getCurrentUser",
    register: "/api/Account/register",
};

export interface AuthStateProps {
    initialUserInfo: UserInfo;
}

export function useAuthState({ initialUserInfo }: AuthStateProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const navigate = useNavigate();

    const getAuth = useCallback(async () => {
        const { userName, role, isAuthenticated }: UserInfo = await getUserInfo();
        setUser({ userName, role });
        setIsLoggedIn(isAuthenticated);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const { userName, role, isAuthenticated } = initialUserInfo;
        setUser({ userName, role });
        setIsLoggedIn(isAuthenticated);
        setIsLoading(false);
    }, []);

    const register = useCallback(async (input: RegisterRequest) => {
        setIsLoading(true);
        const data: RegisterRequest = {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: input.password,
        };
        const config: AxiosRequestConfig = {
            method: "POST",
            url: AUTH_ENDPOINTS.register,
            headers: {
                "Content-Type": "application/json",
            },
            data,
        };
        try {
            const response = await axios(config);
            if (response.status === 200) {
                navigate("/signin");
            }
        } catch (err: any) {
            if (err instanceof AxiosError && err.response) {
                toast.error(`Unable to register: ${err.response.data}`);
            } else {
                toast.error("Something went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(async (input: LoginCredentials) => {
        setIsLoading(true);
        const data = {
            email: input.email,
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
            getAuth();
            navigate("/dashboard");
        } catch (err: any) {
            if (err instanceof AxiosError && err.response && err.response.status === 401) {
                toast.error("Unable to login with provided email and password.");
            } else {
                toast.error("Something went wrong.");
            }
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
    };
}

export type AuthState = ReturnType<typeof useAuthState>;

function setLoginUrl(rememberMe: boolean) {
    let cookiePersistence = rememberMe ? "useCookies=true" : "useSessionCookies=true";
    return `${AUTH_ENDPOINTS.login}?${cookiePersistence}`;
}

export async function getUserInfo(): Promise<UserInfo> {
    try {
        const config: AxiosRequestConfig = {
            method: "GET",
            url: AUTH_ENDPOINTS.getCurrentUser,
            withCredentials: true,
        };
        const response = await axios(config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err: any) {}
    return defaultUserInfo;
}
