import React, { useEffect } from "react";
import { Navbar, HomePostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { homePost } from "../store/asyncMethods/PostMethods";


const Home = () => {

  const dispatch = useDispatch();  
  const {loading} = useSelector((state) =>state.PostReducer);

  const { posts } = useSelector((state) =>state.FetchPosts);


  useEffect(() => {
      dispatch(homePost());
  }, []);

  return (
    <div className="h-max bg-gray-300">
      <Navbar />
      <div className="section flex flex-col items-center pt-10 h-fit pb-5">
      {!loading
          ? posts.length > 0
            ? posts.slice(0).reverse().map((post) => <HomePostCard key={post._id} data={post} />)
            : "No Post Available"
          : "Loading...."}
      </div>
    </div>
  );
};

export default Home;
