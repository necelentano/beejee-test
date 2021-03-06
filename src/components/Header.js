import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col, Button, Typography, notification } from 'antd';

import { deleteToken, setUrl } from '../redux';

const { Title } = Typography;

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(setUrl(location.pathname));
	}, [location, dispatch]);

	const onLogoutHandler = () => {
		dispatch(deleteToken());
		notification.success({
			message: 'Goodbye, Admin!',
		});
		navigate('/');
	};
	return (
		<Row style={{ backgroundColor: 'lightblue' }}>
			<Col
				xl={{ span: 8 }}
				lg={{ span: 8 }}
				md={{ span: 8, offset: 2 }}
				sm={{ span: 8, offset: 2 }}
				xs={{ span: 24 }}
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<Link to='/'>
					<Title level={1} style={{ margin: '20px 0 20px 20px', fontSize: 24 }}>
						BEEJEE TASK MANAGER
					</Title>
				</Link>
			</Col>
			<Col
				xl={{ span: 4, offset: 8 }}
				lg={{ span: 4, offset: 8 }}
				md={{ span: 6, offset: 8 }}
				sm={{ span: 8, offset: 6 }}
				xs={{ span: 24 }}
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				{!isAuthenticated && location.pathname === '/' && (
					<Link to='/login'>
						<Button type='primary' style={{ margin: '18px 0' }}>
							Login
						</Button>
					</Link>
				)}
				{isAuthenticated && location.pathname === '/' && (
					<Link to='/admin'>
						<Button type='primary' style={{ margin: '18px 0' }}>
							Dashboard
						</Button>
					</Link>
				)}
				{isAuthenticated && (
					<Button
						type='primary'
						style={{ margin: '18px 0' }}
						onClick={onLogoutHandler}
					>
						Logout
					</Button>
				)}
			</Col>
		</Row>
	);
};

export default Header;
