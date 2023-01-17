import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../store/asyncMethods/AuthMethods";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = ({ props }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, registerError, user } = useSelector(
    (state) => state.AuthReducer
  );

  const dispatch = useDispatch();
  {
    const handleInputs = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(postRegister(state));
    };

    const navigate = useNavigate();

    useEffect(() => {
      if (registerError.length > 0) {
        registerError.map((error) => toast.error(error.msg));
      }
      if (user) {
        navigate("/home");
      }
    }, [registerError, user, navigate]);

    return (

      <div className="h-screen">
        <Navbar />
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className=" section  flex flex-row justify-around items-center bg-slate-100 ">
          <form
            onSubmit={handleSubmit}
            className="h-3/5 w-2/5 md:w-2/5 lg:w-1/4 flex flex-col justify-around bg-white p-8 items-center rounded-md  py-5 drop-shadow-xl"
          >
            <h1 className="text-2xl font-bold">Create Account</h1>

            <div>
              <input
                name="name"
                type="text"
                placeholder="Enter Name"
                onChange={handleInputs}
                value={state.name}
              />
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={handleInputs}
                value={state.email}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleInputs}
                value={state.password}
              />
            </div>
            <input
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-3/6 text-2xl text-white cursor-pointer  rounded-md"
              type="submit"
              value={loading ? "Loading..." : "Register"}
            />
          </form>
        </div>
      </div>
    );
  }
};

export default Register;
