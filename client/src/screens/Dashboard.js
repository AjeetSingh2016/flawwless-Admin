import React, { useEffect } from "react";
import { Navbar, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { fetchPosts } from "../store/asyncMethods/PostMethods";
import parse from "html-react-parser";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, redirect, loading } = useSelector(
    (state) => state.PostReducer
  );

  const {
    user,
    user: { _id },
    token,
  } = useSelector((state) => state.AuthReducer);

  const { posts } = useSelector((state) => state.FetchPosts);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (redirect) {
      dispatch({ type: "REDIRECT_FALSE" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "REMOVE_MESSAGE" });
    }
    dispatch(fetchPosts(_id));
  }, [message, user]);

  return (
    <div className="h-screen bg-gray-300">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="section  flex flex-col items-center pt-10 h-fit pb-5">
        <NavLink
          to="/create"
          key="DATA1"
          className="w-64 bg-white text-center rounded cursor-p mb-5"
        >
          <button className=" font-medium">Create More</button>
        </NavLink>
        {!loading
          ? posts.length > 0
            ? posts
                .slice(0)
                .reverse()
                .map((post) => (
                  <PostCard key={post._id} data={post} _id={_id} />
                ))
            : "You dont have Post"
          : "Loading...."}
      </div>
    </div>
  );
};

export default Dashboard;
