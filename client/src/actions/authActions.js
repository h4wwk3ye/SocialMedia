import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispath => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login')
    )
    .catch(err => {
      dispath({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Login  - get user token
export const loginUser = (userData) => dispath => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // save token
      const { token } = res.data
      // set token to ls
      localStorage.setItem('jwtToken', token)
      // set it as authHeader
      setAuthToken(token);
      // decoding token to get user data
      const decoded = jwt_decode(token)
      // set current user
      dispath(setCurrentUser(decoded))
    })
    .catch(err => {
      dispath({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// log out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false);
  dispatch(setCurrentUser({}))
}
