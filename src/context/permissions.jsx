import { createContext, useReducer } from "react";
import { permissionsReducer, initialState, PERMISSIONS_ACTIONS  } from "../reducers/permissions";
import { useFetch } from "../hooks/useFetch";
export const PermissionsContext = createContext(null);

function usePermissionsReducer() {
    // Implement the usePermissionsReducer hook
    const [state, dispatch] = useReducer(permissionsReducer, initialState);
    const { requestGet } = useFetch(); // Usa el hook useFetch
    const update = async () => {
        dispatch({ type: PERMISSIONS_ACTIONS.SET_LOADING, payload: true });
        try{
            const response = await requestGet('http://localhost:8000/api/auth/permissions');
            console.log(response);
            if(response.error === false){
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