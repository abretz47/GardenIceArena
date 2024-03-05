import { PropsWithChildren, createContext, useContext } from "react";
import { AuthState, AuthStateProps, useAuthState } from "./useAuthState";

export const initialAuthState: AuthState = {
    user: null,
    isLoading: true,
    isLoggedIn: false,
    getAuth: async () => {},
    login: async (_) => {},
    logout: () => {},
    register: () => {},
    error: "",
};

export const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthContextProvider = ({ children, initialUser }: PropsWithChildren<AuthStateProps>) => {
    const state = useAuthState({ initialUser });

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        console.warn(
            "AuthProvider context is undefined, please verify you are calling useAuth() as child of a <AuthProvider> component."
        );
    }
    return context;
}
