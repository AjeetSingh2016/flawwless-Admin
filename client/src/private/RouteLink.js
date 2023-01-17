import { useSelector } from "react-redux";
import {Navigate, Route } from "react-router-dom";
// import { Dashboard } from "../screens";

const RouteLink = (props) =>{

    const {user}= useSelector((state) => state.AuthReducer)
    
    return user ? (
        <Navigate to="/dashboard" />
    ) : (
        <Route exact path={props.path} element={props.element} />
    )
    
}
export default RouteLink;