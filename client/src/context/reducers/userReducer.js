import {
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILED,
  SET_CURRENT_USER
} from "../actions/types";
import isEmpty from "../../services/isEmpty";

export default (state, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        hasFailed: false,
        isLoading: true
      };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        data: action.results
      };
    case FETCHING_USER_FAILED:
      return {
        ...state,
        hasFailed: true,
        isLoading: false,
        errorMessage: action.ex.message
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        data: action.payload
      };
    default:
      return state;
  }
};
