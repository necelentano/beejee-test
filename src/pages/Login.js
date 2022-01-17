import { Row, Col, Typography } from 'antd';

import LoginForm from '../components/LoginForm';

const { Title } = Typography;

const Login = () => {
	return (
		<>
			<Row>
				<Col
					xl={{ span: 16, offset: 4 }}
					lg={{ span: 20, offset: 2 }}
					md={{ span: 20, offset: 2 }}
					xs={{ span: 20, offset: 2 }}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Title size={3} style={{ fontSize: 20, margin: '20px 0' }}>
							Please Login
						</Title>
					</div>
					<LoginForm />
				</Col>
			</Row>
		</>
	);
};

export default Login;
