// import { LOGIN, LOGOUT } from './authAction';

// const initialState = {
//   isAuthenticated: !!localStorage.getItem('token'),
//   token: localStorage.getItem('token') || '',
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN:
//       return {
//         ...state,
//         isAuthenticated: true,
//         token: action.payload,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         token: '',
//       };
//       case 'LOGIN_USER':
//       return {
//         ...state,
//         userId: action.payload.userId,
//         companyId: action.payload.companyId,
//       };
//     default:
//       return state;
//   }
// };
// export default authReducer;

// src/redux/authReducer.js

import { LOGIN, LOGOUT,SET_SELECTED_USER } from "./authAction";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  email: localStorage.getItem("email") || null,
  userId: localStorage.getItem("userId") || null,
  name: localStorage.getItem("Name") || null,
  companyId: localStorage.getItem("companyId") || null,
  selectedUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: "",
      };
    case "LOGIN_USER":
      return {
        ...state,
        userId: action.payload.userId,
        companyId: action.payload.companyId,
        name: action.payload.name,
        email: action.payload.email,
      };
    case "USERPROFILE":
      return {
        ...state,
        userId: action.payload.userId,
        companyId: action.playload.companyId,
        name: action.payload.name,
        email: action.payload.email,
      };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
