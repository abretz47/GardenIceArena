export interface User {
    userName: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
