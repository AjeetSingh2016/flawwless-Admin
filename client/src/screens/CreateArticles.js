import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../store/asyncMethods/PostMethods";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";

const CreateArticles = () => {
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    date: '',
  });
  const [slug, setSlug] = useState("");

  const { user } = useSelector((state) => state.AuthReducer);
  const {createErrors, redirect} = useSelector((state) => state.PostReducer);
  const { _id, name } = user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    const createSlug = e.target.value.trim().split(" ").join("-");
    setSlug(createSlug);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const { description, title, image, url, date} = state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("body", value);
    formData.append("name", name);
    formData.append("id", _id);
    formData.append("url", url);
    formData.append("date", date);
    dispatch(createPost(formData));
  };

  useEffect(() => {
    if (createErrors.length > 0) {
      createErrors.map((error) => toast.error(error.msg));
    }
    if (!user) {
      navigate("/login");
    }
    if(redirect===true){
      navigate("/dashboard");
    }
  }, [user, navigate, createErrors, redirect]);

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
        <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex h-max justify-center w-full py-10 bg-gray-100">
        <div className="bg-white w-full form-wrapper p-3 w-11/12 md:w-10/12 lg:w-2/4 rounded-md">
          <h1 className="pb-8 font-bold text-xl ">Create New Article</h1>
          <form onSubmit={handleSubmit} action="/api/upload" enctype="multipart/form-data" method="post">
            <div>
              <label className="font-medium" htmlFor="title">
                Article Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter titile"
                value={state.title}
                onChange={handleInput}
                // className="bg-slate-100"
              />
            </div>

            <div>
              <label className="font-medium" htmlFor="url">
                Image Url
              </label>
              <input
                type="text"
                id="url"
                name="url"
                placeholder="Enter image URL"
                onChange={handleInput}
              />
            </div>

            <div className="py-6">
              <ReactQuill id="body" theme="snow" value={value} onChange={setValue} />
            </div>

            
            <div>
              <label className="font-medium" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                placeholder="Enter date"
                onChange={handleInput}
              />
            </div>

            <div>
              <label className="font-medium" htmlFor="description">
                Meta Description
              </label>
              <textarea
                placeholder="Enter Description..."
                name="description"
                id="description"
                cols="30"
                rows="10"
                maxLength="150"
                defaultValue={state.description}
                onChange={handleInput}
              ></textarea>
              <p>{state.description.length ? state.description.length : 0}</p>
            </div>


            <input
              className="bg-green-600 text-2xl text-white cursor-pointer  rounded-md"
              type="submit"
              value={"CREATE ARTICLE"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticles;
