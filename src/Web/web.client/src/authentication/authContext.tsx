import { PropsWithChildren, createContext, useContext } from "react";
import { AuthState, useAuthState } from "./useAuthState";
import { useNavigate } from "react-router-dom";

export const initialAuthState: AuthState = {
    user: null,
    isLoading: true,
    isLoggedIn: false,
    login: async (_) => {},
    logout: () => {},
    register: () => {},
    error: "",
};

export const AuthContext = createContext<AuthState>(initialAuthState);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const state = useAuthState();

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
