import { httpService } from "../../services/http";
import {
  FETCHING_TEMPLATES,
  FETCHING_TEMPLATES_SUCCESS,
  FETCHING_TEMPLATES_FAILED
} from "./types";

export const fetching_init = () => {
  return {
    type: FETCHING_TEMPLATES
  };
};

export const fetching_success = results => {
  return {
    type: FETCHING_TEMPLATES_SUCCESS,
    payload: results
  };
};

export const fetching_fail = err => {
  return {
    type: FETCHING_TEMPLATES_FAILED,
    error: err
  };
};

export const fetchTemplates = async dispatch => {
  dispatch(fetching_init());
  try {
    const results = await httpService.get(`/api/templates`);
    dispatch(fetching_success(results.data));
  } catch (err) {
    dispatch(fetching_fail(err));
  }
};
