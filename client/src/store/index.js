import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleWare from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import {PostReducer, FetchPosts, FetchPost,  UpdatePost} from "./reducers/PostReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducers = combineReducers({
  AuthReducer,
  PostReducer,
  FetchPosts,
  FetchPost,
  UpdatePost
});

const middlewares = [thunkMiddleWare];
const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;
