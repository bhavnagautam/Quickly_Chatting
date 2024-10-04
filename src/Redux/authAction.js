export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CREATE_USER_GROUP = "CREATE_USER_GROUP";
export const USERPROFILE = "USERPROFILE";
export const SET_SELECTED_USER = 'SET_SELECTED_USER';

export const login = (token, userId, name, email) => {
  return {
    type: "LOGIN",
    payload: { token, userId, name, email },
  };
};

export const logout = () => ({
  type: LOGOUT,
});

export const Userprofile = (userprofile) => {
  return {
    type: "USERPROFILE",
    payload: userprofile,
  };
};
export const setSelectedUser = (user) => {
  return {
  type: "SET_SELECTED_USER",
  payload: user,
}
};

// actions.js
export const createUserGroup = (groupData) => {
  return {
    type: "CREATE_USER_GROUP",
    payload: groupData,
  };
};
