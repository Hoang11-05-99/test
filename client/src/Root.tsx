import "./App.css";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import UpdateProfile from "./components/profile/UpdateProfile";
import CreateRecruitment from "./components/recruitment/CreateRecruitment";
import MyRecruitment from "./components/recruitment/MyRecruitment";
import RecruitmentNotAccept from "./components/recruitment/RecruitmentNotAccept";
import UpdateRecruitment from "./components/recruitment/UpdateRecruitment";
import ScrollBackTop from "./components/scroll_back_top/ScrollBackTop";
import DetailRecruitment from "./components/recruitment/DetailRecruitment";
import Cv from "./components/cv/Cv";
import "./App.css";

function Root() {
  function App({ children }: any) {
    return (
      <div className="App">
        <Header />
        {children}
        <ScrollBackTop />
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <App>
            <Home />
          </App>
        }
      />
      <Route
        path="/login"
        element={
          <App>
            <Login />
          </App>
        }
      />
      <Route
        path="/register"
        element={
          <App>
            <Register />
          </App>
        }
      />
      <Route
        path="/profile"
        element={
          <App>
            <Profile />
          </App>
        }
      />
      <Route
        path="/profile/createProfile"
        element={
          <App>
            <CreateProfile />
          </App>
        }
      />
      <Route
        path="/profile/updateProfile"
        element={
          <App>
            <UpdateProfile />
          </App>
        }
      />
      <Route
        path="/recruitment/create"
        element={
          <App>
            <CreateRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/detail/:id"
        element={
          <App>
            <DetailRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/update/:id"
        element={
          <App>
            <UpdateRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/myRecruitment"
        element={
          <App>
            <MyRecruitment />
          </App>
        }
      />
      <Route
        path="/recruitment/warning"
        element={
          <App>
            <RecruitmentNotAccept />
          </App>
        }
      />
      <Route
        path="/profile/manager"
        element={
          <App>
            <Cv />
          </App>
        }
      />
    </Routes>
  );
}

export default Root;
