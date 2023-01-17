import React, { useState, useEffect} from "react";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../store/asyncMethods/AuthMethods";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

  const {loginErrors, user} = useSelector(
    (state) => state.AuthReducer
  );


  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleInputes = (e) =>{
    setState({
     ...state,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(state);
    dispatch(postLogin(state));

  }

  const navigate = useNavigate();

  useEffect(() => {
    if(loginErrors?.length > 0){
      loginErrors.map((error) => {
        return toast.error(error.msg);
        
      });

    }
    if (user) {
      navigate("/home");
    }
  }, [loginErrors,navigate,user])
  
  return (
    <div className="h-screen">
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className=" section  flex flex-row justify-around items-center bg-slate-100 ">
        <form
          onSubmit={handleSubmit}
          className="h-3/5 w-2/5 md:w-2/5 lg:w-1/4 flex flex-col justify-around bg-white p-2 items-center rounded-md py-5 drop-shadow-xl"
        >
          <h1 className="text-2xl font-bold">Access Workspace</h1>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={state.email}
              onChange={handleInputes}
            />
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={state.password}
              onChange={handleInputes}
            />
          </div>
          <input
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-3/6 text-2xl text-white  rounded-md cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
