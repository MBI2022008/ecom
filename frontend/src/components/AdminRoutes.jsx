import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

const AdminRoutes = () => {
    const {userInfo} = useSelector(state=>state.auth)
  return (
    userInfo?.isAdmin? <Outlet />: <Navigate to ='/login' replace />
  )
}

export default AdminRoutes