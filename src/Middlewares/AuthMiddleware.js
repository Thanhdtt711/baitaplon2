import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Url from '../Services/Helpers/Url/Url'

const url = new Url();

export const isLogin = () => {
  return false;
}

export default function AuthMiddleware() {
  const isAuth = isLogin();
  return isAuth ? <Outlet /> : <Navigate to={url.login} />
}
