import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllTasksQuery, useEditTaskMutation } from '../../redux';

import {
	Table,
	Checkbox,
	Popover,
	Modal,
	Input,
	Space,
	Typography,
	notification,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { sanitizeHtmlTags } from '../../utils/helpers';

const { Text } = Typography;

const AdminTaskTable = () => {
	const { token } = useSelector(state => state.auth);

	// Table
	const [page, setPage] = useState(1);
	const [sortField, setSortField] = useState('');
	const [sortDirection, setSortDirection] = useState('');

	// Modal state
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [taskText, setTaskText] = useState('');
	const [modalStatusMsg, setModalStatusMsg] = useState('');
	const [modalCheckboxValue, setModalCheckboxValue] = useState(null);
	const [editedTaskId, setEditedTaskId] = useState(null);
	const [newTaskStatus, setNewTaskStatus] = useState(0);

	const { data, isLoading } = useGetAllTasksQuery({
		page,
		sortField,
		sortDirection,
	});

	const [editPost, { isLoading: isEditLoading }] = useEditTaskMutation();

	useEffect(() => {
		let originalTask = data?.message.tasks.filter(
			task => task.id === editedTaskId
		)[0];

		if (originalTask?.text !== taskText) {
			setNewTaskStatus(1);
			if (modalCheckboxValue) {
				setNewTaskStatus(11);
			}
			return;
		}
		if (originalTask?.text === taskText) {
			setNewTaskStatus(0);
			if (modalCheckboxValue) {
				setNewTaskStatus(10);
			}
			return;
		}
	}, [taskText, editedTaskId, data, modalCheckboxValue, newTaskStatus]);

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
		{
			title: 'Action',
			dataIndex: 'id',
			key: 'action',
			width: '5%',
			align: 'center',
			render: (id, record) => {
				return <EditOutlined onClick={() => showModal(record)} />;
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

	const showModal = tableRowRecord => {
		// Fill all data in edit Modal
		setTaskText(tableRowRecord.text);
		setEditedTaskId(tableRowRecord.id);

		switch (tableRowRecord.status) {
			case 0:
				setModalStatusMsg('The task is not completed');
				setModalCheckboxValue(false);
				break;
			case 1:
				setModalStatusMsg('The task is not completed, edited by admin');
				setModalCheckboxValue(false);
				break;
			case 10:
				setModalStatusMsg('The task is completed');
				setModalCheckboxValue(true);
				break;
			case 11:
				setModalStatusMsg('The task is completed, edited by admin');
				setModalCheckboxValue(true);
				break;
			default:
				setModalStatusMsg('The task is not completed');
		}

		setIsModalVisible(true);
	};

	const handleOk = async () => {
		let editedTaskData = new FormData();

		editedTaskData.append('text', sanitizeHtmlTags(taskText));
		editedTaskData.append('status', newTaskStatus);
		editedTaskData.append('token', token);

		let id = editedTaskId;

		await editPost({ id, editedTaskData });
		notification.success({
			message: 'The task successffuly edited!',
		});

		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onCheckboxChange = e => {
		setModalCheckboxValue(e.target.checked);
	};

	const onTextInputChange = e => {
		setTaskText(e.target.value);
	};
	return (
		<>
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
				loading={isLoading || isEditLoading}
				onChange={handleTableChange}
			/>
			<Modal
				title='Edit task'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Edit'
			>
				<Space direction='vertical'>
					<Input.TextArea
						rows={4}
						value={taskText}
						style={{ width: '400px' }}
						onChange={onTextInputChange}
					/>
					<Checkbox
						checked={modalCheckboxValue}
						onChange={onCheckboxChange}
					></Checkbox>
					<Text>{modalStatusMsg}</Text>
				</Space>
			</Modal>
		</>
	);
};

export default AdminTaskTable;
