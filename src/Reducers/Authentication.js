import {REQUEST_AUTH, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT} from '../Actions/Authentication'

const initState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: null
}

const Authentication = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {...state, isAuthenticating: true};
    case AUTH_SUCCESS:
      return {...state, isAuthenticating: false, isAuthenticated: true, token: action.data.Token}
    case AUTH_FAILURE:
      return {...state, isAuthenticated: false, isAuthenticating: false, token: null}
    case LOGOUT:
      return initState;
    default:
      return state;
  }
}

export default Authentication;
