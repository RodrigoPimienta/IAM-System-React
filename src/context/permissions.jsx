import { createContext, useReducer } from "react";
import { permissionsReducer, initialState, PERMISSIONS_ACTIONS  } from "../reducers/permissions";
import { CheckPermission } from "../services/auth";
import { useAuth } from "../hooks/useAuth"; // Importa el hook de AuthContext

export const PermissionsContext = createContext(null);

function usePermissionsReducer() {
    // Implement the usePermissionsReducer hook
    const [state, dispatch] = useReducer(permissionsReducer, initialState);
    const { auth } = useAuth(); // Obtén el estado de autenticación (incluyendo el token)

    const update = async (permissions) => {
        dispatch({ type: PERMISSIONS_ACTIONS.SET_LOADING, payload: true });
        try{
            const response = await CheckPermission(auth.token);
            if(response.error === false){
                console.log('Permissions granted');
                console.log(response.data);
                dispatch({ type: PERMISSIONS_ACTIONS.SET_PERMISSIONS, payload: response.data });
            }else{
                dispatch({ type: PERMISSIONS_ACTIONS.SET_ERROR, payload: response.message });
            }
        }catch (error) {
            dispatch({ type: PERMISSIONS_ACTIONS.SET_ERROR, payload: "Unexpected error occurred" });
        }finally{
            dispatch({ type: PERMISSIONS_ACTIONS.SET_LOADING, payload: false });
        }
    }

    return { state, update };
} 

export function PermissionsProvider({children}) {
    const { state, update } = usePermissionsReducer();
    return (
        <PermissionsContext.Provider value={{permissions: state.permissions, updatePermissions: update}}>
            {children}
        </PermissionsContext.Provider>
    )
}