import { Route } from "react-router-dom";
import Profile from "../Pages/Profile/Profile";
import AuthMiddleware from "../Middlewares/AuthMiddleware";

export const protectedRoutes = (
    <Route element={<AuthMiddleware />}>
        <Route path="/ca-nhan" element={<Profile />}/>
    </Route>
);