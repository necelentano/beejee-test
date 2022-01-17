import { Row, Col, Typography } from 'antd';

import AdminTaskTable from '../components/tables/AdminTaskTable';

const { Title } = Typography;

const Admin = () => {
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
							Admin Dashboard
						</Title>
					</div>
				</Col>
			</Row>
			<Row>
				<Col
					xl={{ span: 16, offset: 4 }}
					lg={{ span: 20, offset: 2 }}
					md={{ span: 20, offset: 2 }}
					xs={{ span: 20, offset: 2 }}
				>
					<AdminTaskTable />
				</Col>
			</Row>
		</>
	);
};

export default Admin;
