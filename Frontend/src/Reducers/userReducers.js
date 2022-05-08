//sanika -> sn820051@dal.ca
//Use of constants to make cases, for what happens when the system gets that type of situation. 
//Reference -> https://redux-toolkit.js.org/api/createslice
import {login_fail,login_request,login_success,logout_success,register_fail,register_request,registered,
  update_failed,update_request,update_success} from "../Constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case login_request:
      return { loading: true };
    case login_fail:
      return { loading: false, error: action.payload };
    case login_success:
      return { loading: false, userInfo: action.payload };
    case logout_success:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case register_request:
      return { loading: true };
    case register_fail:
      return { loading: false, error: action.payload };
    case registered:
      return { loading: false, userInfo: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case update_request:
      return { loading: true };
    case update_failed:
        return { loading: false, error: action.payload, success: false };
    case update_success:
      return { loading: false, userInfo: action.payload, success: true };
    default:
      return state;
  }
};
