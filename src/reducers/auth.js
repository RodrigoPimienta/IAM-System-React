export const initialState = {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const LOGIN_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
}

export const authReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action;
    switch (actionType) {
        case LOGIN_ACTIONS.SET_LOADING:
            return { ...state, loading: actionPayload, error: null };
        case LOGIN_ACTIONS.SET_ERROR:
            return { isLoggedIn: false, user: null, token: null, loading: false, error: actionPayload };
        case LOGIN_ACTIONS.LOGIN:
            const newUser = {
                id: actionPayload.id,
                username: actionPayload.name,
                email: actionPayload.email,
                status: actionPayload.status
            };
            return { isLoggedIn: true, user: newUser, token: actionPayload.token, loading: false, error: null };
        case LOGIN_ACTIONS.LOGOUT:
            return { isLoggedIn: false, user: null, token: null, loading: false, error: null };
        default:
            return state;
    }
}; 