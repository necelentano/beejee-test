import { Routes, Route } from 'react-router-dom';

import AppHeader from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminRoute from './components/routes/AdminRoute';

function App() {
	return (
		<>
			<AppHeader />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route element={<AdminRoute />}>
					<Route path='/admin' element={<Admin />} />
				</Route>
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
}

export default App;
