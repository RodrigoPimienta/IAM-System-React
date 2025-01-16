import {  createContext, useReducer } from "react"
import { authReducer, initialState  } from "../reducers/auth";
export const AuthContext = createContext(null);

function useAuthReducer(){
    const [state, dispatch] = useReducer(authReducer, initialState );

    const login = (user) => dispatch({type: 'LOGIN', payload: user});

    const logout = () => dispatch({type: 'LOGOUT'});

    return {state, login, logout}
}

export function AuthProvider({children}){
    const {state, login, logout} = useAuthReducer();
    return (
        <AuthContext.Provider value={{auth: state, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}