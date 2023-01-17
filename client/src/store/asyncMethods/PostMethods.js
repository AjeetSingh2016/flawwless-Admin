import axios from "axios";

export const createPost = (postData) => {
  return async (dispatch, getState) => {
    const {AuthReducer: {token}} = getState();
  
    dispatch({ type: "SET_LOADER" });
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: {msg} } = await axios.post("/create_post", postData, config);
      dispatch({ type: "CLOSE_LOADER"});
      dispatch({ type: "REMOVE_ERROR"});
      dispatch({ type: "REDIRECT_TRUE"});
      dispatch({ type: "SET_MESSAGE", payload: msg});
    } catch (error) {
      dispatch({ type: "CLOSE_LOADER" });
      dispatch({ type: "CREATE_ERROR", payload: error.response.data.errors});
      console.log(error.response.data.msg);
    }
  };
};


export const fetchPosts = (id) =>{
  return async (dispatch, getState) =>{
    const {AuthReducer: {token}} = getState();
    dispatch({type: "SET_LOADER"})
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data: {response}} = await axios.get(`/posts/${id}`, config)
      dispatch({type: "CLOSE_LOADER"})
      dispatch({type: "SET_POSTS", payload: response})
    } catch (error) {
      dispatch({type: "CLOSE_LOADER"})
    }
  }
}

export const fetchPost = (id) =>{
  return async (dispatch, getState) =>{
    const {AuthReducer: {token}} = getState();
    dispatch({type: "SET_LOADER"})
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data:{post}} = await axios.get(`/post/${id}`, config);
      console.log(post);
      dispatch({type: "CLOSE_LOADER"})
      dispatch({type: "SET_POST", payload: post})
      dispatch({type: "POST_REQUEST"})
    } catch (error) {
      dispatch({type: "CLOSE_LOADER"})
      console.log(error.message);
    }
  }
}

export const updatePost = (editData) => {
  return async (dispatch, getState) => {
    const {AuthReducer: {token}} = getState();
    dispatch({type: "SET_LOADER"})
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post('/update', editData, config);
      dispatch({type: "CLOSE_LOADER"})
      dispatch({ type: "REDIRECT_TRUE"});
      dispatch({ type: "SET_MESSAGE", payload: data.msg})
      console.log(data);
    } catch (error) {
      dispatch({type: "CLOSE_LOADER"})
      dispatch({type: "SET_UPDATE_ERRORS", payload:error.response.data.errors })
      console.log(error.response.data.errors);
    }
  }
}


export const deletePost =  (id) =>{
  return async (dispatch, getState) =>{
  const {AuthReducer: {token}} = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios.get(`/delete/${id}`, config)
    console.log(data);
    dispatch({ type: "SET_MESSAGE", payload: data.msg})
  } catch (error) {
    console.log(error);
  }
  }
}


export const homePost = () =>{
  return async (dispatch)=>{
    dispatch({ type: "SET_LOADER"})
    try {
      const {data: {response}} = await axios.get('/home')
      console.log(response);
      dispatch({type: "CLOSE_LOADER"})
      dispatch({type: "SET_POSTS", payload: response})
    } catch (error) {
      dispatch({type: "CLOSE_LOADER"})
      console.log(error);
    }
  }
}
