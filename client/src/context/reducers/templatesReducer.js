import {
  FETCHING_TEMPLATES,
  FETCHING_TEMPLATES_SUCCESS,
  FETCHING_TEMPLATES_FAILED
} from "../actions/types";
//import isEmpty from "../../services/isEmpty";

export default (state, action) => {
  switch (action.type) {
    case FETCHING_TEMPLATES:
      return {
        ...state,
        hasFailed: false,
        isLoading: true
      };
    case FETCHING_TEMPLATES_SUCCESS:
      return {
        ...state,
        hasFailed: false,
        isLoading: false,
        data: action.payload
      };
    case FETCHING_TEMPLATES_FAILED:
      return {
        ...state,
        hasFailed: true,
        isLoading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
