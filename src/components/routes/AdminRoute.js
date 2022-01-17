import React from 'react';

import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../../pages/Login';

const AdminRoute = () => {
	const { isAuthenticated } = useSelector(state => state.auth);

	return isAuthenticated ? <Outlet /> : <Login />;
};

export default AdminRoute;
