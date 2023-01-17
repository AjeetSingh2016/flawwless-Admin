import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Register, Login, Home, Dashboard, CreateArticles, Edit, NotAuthorized} from "./screens";
import { Provider } from "react-redux";
import Store from "./store";
import  PrivateRoute from "./private/PrivateRoute";
import "./index.css"

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/register" element={<NotAuthorized />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<CreateArticles />} />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute path="/login">
                <Home />
              </PrivateRoute>
            }
          />
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
