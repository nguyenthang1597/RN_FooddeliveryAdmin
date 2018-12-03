export const REQUEST_AUTH = 'REQUEST_AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const requestAuth = () => ({type: REQUEST_AUTH});

const authSuccess = data => {
  console.log('data', data);
  return ({type: AUTH_SUCCESS, data})
};

const authFailure = () => ({type: AUTH_FAILURE});

const authenticate = (username, password) => dispatch => {
  dispatch(requestAuth());
  let info = {Username: username, Password: password};
  return fetch(`https://fooddeliveryadmin.herokuapp.com/auth/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(info)
  })
  .then(res => res.json())
  .then(res => dispatch(authSuccess(res)))
  .catch(err => authFailure())
}

export default authenticate;
