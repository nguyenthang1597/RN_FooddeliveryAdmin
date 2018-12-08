import Login from '../API/Login'

export const REQUEST_AUTH = 'REQUEST_AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT'



const requestAuth = () => ({type: REQUEST_AUTH});

const authSuccess = data => {
  return ({type: AUTH_SUCCESS, data})
};

export const logout = () => ({type: LOGOUT});

const authFailure = () => ({type: AUTH_FAILURE});

const authenticate = (username, password) => dispatch => {
  dispatch(requestAuth());
  let info = {Username: username, Password: password};
  return Login(info)
  .then(res => res.json())
  .then(res => dispatch(authSuccess(res)))
  .catch(err => authFailure())
}

export default authenticate;
