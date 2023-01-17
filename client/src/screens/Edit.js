import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../store/asyncMethods/PostMethods";
import { Navbar } from "../components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Edit = () => {

  const [value, setValue] = useState("");
  const [state, setState] = useState({
    title: '',
    url: '',
    body: '',
    date: '',
    description: '',
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { updateErrors } = useSelector((state)=>state.UpdatePost);

  const{ post,postStatus } = useSelector((state)=>state.FetchPost);

  const {redirect} = useSelector((state) => state.PostReducer);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({
      title: state.title,
      body: value,
      description: state.description,
      url: state.url,
      date: state.date,
      id: post._id,
    }))
  };


  useEffect(() => {
    if(postStatus){
      setState({
        title: post.title,
        description: post.description,
        url: post.url,
        date: post.date

      })
      setValue(post.body)
      dispatch({type: "POST_RESET"});
    }
    else{
      dispatch(fetchPost(id));
    }
    
  }, [post, ]);

  useEffect(() => {
    if(updateErrors?.length > 0){
      updateErrors.map((error) => {
        return toast.error(error.msg);
        
      });
    }
    if(updateErrors.length > 0){
      dispatch({type: "RESET_UPDATE_ERRORS"});
    }
    

    if(redirect===true){
      navigate("/dashboard");
    }
  }, [updateErrors, redirect])
  

  return(
    <div className="h-screen bg-gray-100">
    <Navbar />
    <Toaster position="bottom-right" reverseOrder={false} />
    <div className="flex h-max justify-center w-full py-10 bg-gray-100">
      <div className="bg-white w-full form-wrapper p-3 w-11/12 md:w-10/12 lg:w-2/4 rounded-md">
        <h1 className="pb-8 font-bold text-xl">Update Article</h1>
        <form onSubmit={handleSubmit} action="/api/upload" enctype="multipart/form-data" method="post">

          {/* title */}

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
                onChange={(e)=>{
                  setState({...state, title: e.target.value})
                }}
                className="bg-slate-100"
              />
            </div>

            {/* Url */}

            <div>
              <label className="font-medium" htmlFor="url">
                Image Url
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={state.url}
                placeholder="Enter image URL"
                onChange={(e)=>{
                  setState({...state, url: e.target.value})
                }}
              />
            </div>

            {/* body */}

            <div className="py-6">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>

            {/* date */}

            <div>
              <label className="font-medium" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={state.date}
                placeholder="Enter date"
                onChange={(e)=>{
                  setState({...state, date: e.target.value})
                }}
              />
            </div>

            {/* description */}

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
                onChange={(e)=>{
                  setState({...state, description: e.target.value})
                }}
                onKeyUp={(e)=>{
                  setState({...state, description: e.target.value})
                }}
              ></textarea>
              <p>{state.description.length ? state.description.length : 0}</p>
            </div>

            <input
              className="bg-green-600 text-2xl text-white cursor-pointer  rounded-md"
              type="submit"
              value={"UPDATE ARTICLE"}/>
            

          </form>
      </div>
    </div>
  </div>
  )
};

export default Edit;
