//sanika ->sn820051@dal.ca
//this file takes the user input from user authentication, and store it in localstorage in the name of userInfo. 
//further userInfo, is used in our frontend files to fetch the information of the logged in user.
//Refernce -> https://stackoverflow.com/questions/55027240/connecting-redux-devtools-and-thunk-middleware-to-store
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {userLoginReducer,userRegisterReducer,userUpdateReducer,} from "./Reducers/userReducers";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userUpdate: userUpdateReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
