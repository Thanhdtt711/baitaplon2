import { Routes, Route } from "react-router-dom";
import { protectedRoutes } from "./ProtectedRoute";
import Error404 from "../Pages/Errors/Error404";
import Home from "../Pages/Home/Home";
import Single from "../Pages/Single/Single";
import Search from "../Pages/Search/Search";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import Categories from "../Pages/Categories/Categories";
import Category from "../Pages/Categories/Category";
import Playlist from "../Pages/Playlists/Playlist";

export const routes = (
  <Routes>
    <Route path="*" element={<Error404 />} />
    <Route path="/" element={<Home />} />
    <Route path="/ca-sy/:id" element={<Single />} />
    <Route path="/tim-kiem" element={<Search />} />
    <Route path="/the-loai">
      <Route path="" element={<Categories />} />
      <Route path=":id" element={<Category />} />
    </Route>

    <Route path="/auth">
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>

    <Route path='/danh-sach-phat/:id' element={<Playlist />}/>

    {protectedRoutes}
  </Routes>
);
