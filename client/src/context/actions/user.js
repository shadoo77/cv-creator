import { httpService } from "../../services/http";
import setAuthToken from "../../services/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILED,
  SET_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

export const fetching_user_init = () => {
  return {
    type: FETCHING_USER
  };
};

export const fetching_user_success = results => {
  return {
    type: FETCHING_USER_SUCCESS,
    payload: results
  };
};

export const fetching_user_fail = err => {
  return {
    type: FETCHING_USER_FAILED,
    error: err
  };
};

export const registerUser = async (
  dispatch,
  userData,
  history,
  successConfirm
) => {
  try {
    await httpService.post("/api/user/register", userData);
    dispatch({
      type: CLEAR_ERRORS,
      payload: {}
    });
    successConfirm("success");
    setTimeout(() => {
      history.push(`/login`);
    }, 3000);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = async (dispatch, userData) => {
  try {
    const result = await httpService.post("/api/user/login", userData);
    const { token } = result.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
// Set loged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = (dispatch, history) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header from future requests
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated false
  dispatch(setCurrentUser({}));
  history.push("/");
};

export const fetchUser = async (dispatch, userId) => {
  dispatch(fetching_user_init());
  try {
    const results = await httpService.get(`/api/current/${userId}`);
    dispatch(fetching_user_success(results.data));
  } catch (err) {
    dispatch(fetching_user_fail(err));
  }
};
