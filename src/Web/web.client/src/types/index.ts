export interface User {
    userName: string;
    role: string;
}

export interface LoginCredentials {
    usernameOrEmail: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}
