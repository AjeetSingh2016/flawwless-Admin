const initState = {
    loading: false,
    createErrors: [],
    redirect: false,
    message: '',
    posts: [],
    post: {},
    postStatus: false,
    updateErrors: []
}

export const PostReducer = (state = initState, action) => {
    if(action.type === "SET_LOADER") {
        return {
          ...state,
          loading: true,
        };
    }
    else if (action.type === "CLOSE_LOADER") {
        return {
          ...state,
          loading: false,
        };
    }
    else if (action.type === "CREATE_ERROR") {
        return {
            ...state,
            createErrors: action.payload
      
        }
    }
    else if (action.type === "REDIRECT_TRUE") {
        return {
            ...state,
            redirect: true,
      
        }
    }
    else if (action.type === "SET_MESSAGE") {
        return {
            ...state,
            message: action.payload      
        }
    }
    else if (action.type === "REMOVE_ERROR") {
        return {
            ...state,
            createErrors: []   
        }
    }
    else if (action.type === "REDIRECT_FALSE") {
        return {
            ...state,
            redirect: false,
        }
    }
    else if (action.type === "REMOVE_MESSAGE") {
        return {
            ...state,
            message: '',
        }
    }
    else{
        return state;
    }
    
}

export const FetchPosts = (state = initState, action)=>{
    if(action.type === 'SET_POSTS'){
        return {
            ...state,
            posts: action.payload
        }
    }
    else{
        return state;
    }
}

export const FetchPost = (state = initState, action)=>{
    if(action.type === 'SET_POST'){
        return {
            ...state,
            post: action.payload
        }
    }
    else if(action.type === 'POST_REQUEST'){
        return{
            ...state,
            postStatus: true,
        }
    }
    else if(action.type === 'POST_RESET'){
        return{
            ...state,
            postStatus: false,
        }
    }
    else{
        return state;
    }
}

export const UpdatePost = (state = initState, action)=>{
    if(action.type === 'SET_UPDATE_ERRORS'){
        return {
            ...state,
            updateErrors: action.payload
        }
    }
    else if(action.type === 'RESET_UPDATE_ERRORS'){
        return {
            ...state,
            updateErrors: []
        }
    }
    else{
        return state;
    }
}

