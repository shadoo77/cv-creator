import axios from "axios";
import { userService } from "./user";

axios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    userService.deleteAuthToken();
    window.location.href = "/";
    // userService.logout();
  }

  return Promise.reject(error);
});

// Add auth jwt to every request
axios.interceptors.request.use(
  reqConfig => {
    const headers = {
      Authorization: userService.getAuthToken()
    };
    reqConfig.headers = headers;
    return reqConfig;
  },
  error => Promise.reject(error)
);

export const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
