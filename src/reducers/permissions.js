export const initialState = {
    permissions: null,
    loading: false,
    error: null,
};

export const PERMISSIONS_ACTIONS = {
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    SET_PERMISSIONS: "SET_PERMISSIONS",
};

export const permissionsReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;
    switch (actionType) {
        case PERMISSIONS_ACTIONS.SET_LOADING:
            return { ...state, loading: actionPayload };
        case PERMISSIONS_ACTIONS.SET_ERROR:
            return { ...state, error: actionPayload };
        case PERMISSIONS_ACTIONS.SET_PERMISSIONS:
            console.log(actionPayload.access);
            return { ...state, permissions: actionPayload.access, loading: false, error: null };
        default:
            return state;
    }
}