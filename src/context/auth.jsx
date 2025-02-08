// context/auth.js
import { createContext, useReducer } from "react";
import { authReducer, initialState, LOGIN_ACTIONS } from "../reducers/auth";
import { loginAPI } from "../services/auth";

export const AuthContext = createContext(null);

function useAuthReducer() {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (credentials) => {
        dispatch({ type: LOGIN_ACTIONS.SET_LOADING, payload: true });
        try {
            const response = await loginAPI(credentials);
            if (response.error === false) {
                dispatch({ type: LOGIN_ACTIONS.LOGIN, payload: response.data });
            } else {
                dispatch({ type: LOGIN_ACTIONS.SET_ERROR, payload: response.message });
            }
        } catch (error) {
            dispatch({ type: LOGIN_ACTIONS.SET_ERROR, payload: "Unexpected error occurred" });
        } finally {
            dispatch({ type: LOGIN_ACTIONS.SET_LOADING, payload: false });
        }
    };

    const logout = () => {
        dispatch({ type: LOGIN_ACTIONS.LOGOUT });
    };

    return { state, login, logout };
}

export function AuthProvider({ children }) {
    const { state, login, logout } = useAuthReducer();
    return (
        <AuthContext.Provider value={{ auth: state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
