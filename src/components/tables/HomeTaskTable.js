import { useState } from 'react';
import { useGetAllTasksQuery } from '../../redux';

import { Table, Checkbox, Popover } from 'antd';

const HomeTaskTable = () => {
	const [page, setPage] = useState(1);
	const [sortField, setSortField] = useState('');
	const [sortDirection, setSortDirection] = useState('');

	const { data, isLoading } = useGetAllTasksQuery({
		page,
		sortField,
		sortDirection,
	});

	const columns = [
		{
			title: 'Name',
			dataIndex: 'username',
			sorter: true,
			key: 'username',
			width: '20%',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			sorter: true,
			width: '15%',
		},
		{
			title: 'Task description',
			dataIndex: 'text',
			key: 'text',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '5%',
			align: 'center',
			sorter: true,
			render: status => {
				let message = '';
				let checkedValue = false;

				switch (status) {
					case 0:
						message = 'The task is not completed';
						checkedValue = false;
						break;
					case 1:
						message = 'The task is not completed, edited by admin';
						checkedValue = false;
						break;
					case 10:
						message = 'The task is completed';
						checkedValue = true;
						break;
					case 11:
						message = 'The task is completed, edited by admin';
						checkedValue = true;
						break;
					default:
						message = 'The task is not completed';
				}
				let popoverContent = (
					<div>
						<p>{message}</p>
					</div>
				);
				return (
					<Popover content={popoverContent}>
						<Checkbox checked={checkedValue} disabled></Checkbox>
					</Popover>
				);
			},
		},
	];

	const tableData = data?.message.tasks.map(item => ({
		key: item.id,
		id: item.id,
		username: item.username,
		email: item.email,
		text: item.text,
		status: item.status,
		remove: item.id,
	}));

	const handleTableChange = (pagination, filters, sorter) => {
		setPage(pagination.current);

		if (sorter.hasOwnProperty('column') && sorter.column) {
			setSortField(sorter.field);
			setSortDirection(sorter.order === 'ascend' ? 'asc' : 'desc');
		} else {
			setSortField('');
			setSortDirection('');
		}
	};

	return (
		<Table
			columns={columns}
			rowKey={record => record.key}
			dataSource={tableData}
			pagination={{
				current: page,
				pageSize: 3,
				total: data?.message.total_task_count,
				position: ['topLeft'],
			}}
			loading={isLoading}
			onChange={handleTableChange}
		/>
	);
};

export default HomeTaskTable;
