import { Row, Col, Typography } from 'antd';

import TaskForm from '../components/TaskForm';
import HomeTaskTable from '../components/tables/HomeTaskTable';
const { Title } = Typography;

const Home = () => {
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
							Add new task
						</Title>
					</div>
					<TaskForm />
				</Col>
			</Row>
			<Row>
				<Col
					xl={{ span: 16, offset: 4 }}
					lg={{ span: 20, offset: 2 }}
					md={{ span: 20, offset: 2 }}
					xs={{ span: 20, offset: 2 }}
				>
					<HomeTaskTable />
				</Col>
			</Row>
		</>
	);
};

export default Home;
