import jwt_decode from "jwt-decode";
// Services
import { httpService } from "./http";
//import { historyService } from "./history";

async function login(account) {
  const response = await httpService.post(`api/auth/login`, account);
  localStorage.setItem("token", response.data);
  return jwt_decode(response.data);
}

// function logout() {
//   const user = getCurrentUser();
//   if (user) {
//     httpService.delete(`${apiUrl}/auth/logout/${user._id}`);
//   }
//   deleteAuthToken();
//   historyService.push(
//     user.role === userRoles.STUDENT
//       ? `${routeUrls.student.auth.login}`
//       : `${routeUrls.admin.auth.login}`
//   );
// }

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("jwtToken");
    if (jwt) {
      return jwt_decode(jwt);
    }
    return null;
  } catch (ex) {
    return ex;
  }
}

function getCurrentUserId() {
  const user = getCurrentUser();
  if (!user) {
    return null;
  }
  return user._id;
}

function getAuthToken() {
  try {
    return localStorage.getItem("jwtToken");
  } catch (ex) {
    return ex;
  }
}

function deleteAuthToken() {
  try {
    localStorage.removeItem("jwtToken");
    return;
  } catch (ex) {
    return ex;
  }
}

export const userService = {
  login,
  //logout,
  getCurrentUser,
  getCurrentUserId,
  getAuthToken,
  deleteAuthToken
};
