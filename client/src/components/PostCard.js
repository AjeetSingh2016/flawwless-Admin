import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {deletePost, fetchPosts } from "../store/asyncMethods/PostMethods";
import moment from "moment";


const PostCard = ({data, _id}) => {

    const dispatch = useDispatch();
    const dPost = (id) =>{
        console.log(id);
        const confirm = window.confirm('Are you sure you want to delete this Post?');
        if(confirm){
            dispatch(deletePost(id));
            dispatch(fetchPosts(_id));
        }
    }

  return (

    <div className="w-3/5 shadow-md bg-white p-4 flex h-16 flex justify-around items-center h-fit">

        <div className="w-10/12 flex flex-col justify-between ">
            <span className="font-semibold">
            {data.title}
            </span>
            <br />
            <span>{moment(data.updatedAt).fromNow()}</span>
        </div>

        <div className="w-2/12 flex justify-around items-center">
            <NavLink to={`/edit/${data._id}`}>
                <BsFillPencilFill />
            </NavLink>
            <NavLink to="/">
                <AiFillDelete onClick={() => dPost(data._id)} />
            </NavLink>
        </div>
    </div>

  );
};

export default PostCard;
