//sanika ->sn820051@dal.ca
import axios from "axios";
import { login_fail, login_request,login_success,logout_success,register_fail,register_request,
  registered,update_failed,update_request,update_success,} from "../Constants/userConstants";

//register api
export const register = (name, email, ispatient, password) => async (dispatch) => {
  try {
    dispatch({ type: register_request });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, ispatient, password },
      config
    );

    dispatch({ type: registered, payload: data });
    dispatch({ type: login_success, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: register_fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//login api
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: login_request });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: login_success, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: login_fail,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: logout_success });
};

//profile api
export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: update_request });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: update_success, payload: data });

    dispatch({ type: login_success, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: update_failed,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
