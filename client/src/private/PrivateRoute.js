import { useSelector } from "react-redux";
import {Navigate } from "react-router-dom";

const PrivateRoute = ({ children, path }) =>{
    const {user}= useSelector((state) => state.AuthReducer)
    
    return user ? children :  <Navigate to={path} />
    
}
export default PrivateRoute;