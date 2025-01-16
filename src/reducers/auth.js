export const initialState  = {
    isLoggedIn: false,
    user: null
};

export const LOGIN_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_ACTIONS.LOGIN:
            return { ...state, isLoggedIn: true, user: action.payload };
        case LOGIN_ACTIONS.LOGOUT:
            return { ...state, isLoggedIn: false, user: null };
        default:
            return state;
    }
  };