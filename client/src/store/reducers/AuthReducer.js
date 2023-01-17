import jwt_decode from "jwt-decode";

const initState = {
  loading: false,
  registerError: [],
  loginErrors: [],
  token: "",
  user: "",
};

const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
    return null;
  } else {
    return decodedToken;
  }
};
const token = localStorage.getItem("myToken");

if (token) {
  const decoded = verifyToken(token);
  if(decoded) {
    initState.token = token;
    const { user } = decoded;
    initState.user = user;
  }
}

const AuthReducer = (state = initState, action) => {
  if (action.type === "SET_LOADER") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "CLOSE_LOADER") {
    return {
      ...state,
      loading: false,
    };
  } else if (action.type === "REGISTER_ERRORS") {
    return {
      ...state,
      registerError: action.payload,
    };
  } else if (action.type === "SET_TOKEN") {
    const decode = verifyToken(action.payload);
    const { user } = decode;
    return {
      ...state,
      user: user,
      token: action.payload,
      loginErrors: [],
      registerError: []
    };
  } else if (action.type === "CLEAR_TOKEN") {
    return {
      ...state,
      loading: false,
      token: "",
      user: "",

    };
  } else if(action.type === "LOGIN_ERRORS"){
    return {
      ...state,
      loginErrors: action.payload

    }
  }
  else {
    return state;
  }
};

export default AuthReducer;
