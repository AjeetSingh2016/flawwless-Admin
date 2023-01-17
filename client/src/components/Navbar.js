import React from "react";
import "../index.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const logOut = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: "CLEAR_TOKEN" });
    console.log("Hello");
  };

  return (
    <div className="w-full drop-shadow-lg bg-white navbar flex justify-between px-2 ">

      <NavLink to="/dashboard" className="w-20 logo"></NavLink>

      <div className="h-full flex flex-row justify-around
       w-6/12 md:w-2/6 sm:w-4/12 xl:w-1/5 items-center">
        {!user ? (
          <>
            <NavLink to="/register" key="DATA">
              <button className="text-lg font-medium linkBtn">Register</button>
            </NavLink>
            <NavLink to="/login" key="DATA1">
              <button className="text-lg font-medium linkBtn">Login</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/home" key="DATA1">
              <button className=" font-medium linkBtn">Home</button>
            </NavLink>
            <NavLink to="/dashboard" key="DATA2">
              <button className="font-medium linkBtn">Dashboard</button>
            </NavLink>
            <button className="font-medium linkBtn" onClick={logOut}>Log out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
