import { Form, Input, Button, notification } from 'antd';

import { useAddTaskMutation } from '../redux';

import { sanitizeHtmlTags } from '../utils/helpers';

const TaskForm = () => {
	const [addTask, { isLoading }] = useAddTaskMutation();
	const [form] = Form.useForm();

	const layout = {
		labelCol: {
			span: 8,
		},
		wrapperCol: {
			span: 8,
		},
	};

	const onFinish = async ({ name, email, description }) => {
		let formData = new FormData();
		formData.append('username', sanitizeHtmlTags(name));
		formData.append('email', sanitizeHtmlTags(email));
		formData.append('text', sanitizeHtmlTags(description));

		form.resetFields(['name', 'email', 'description']);

		await addTask(formData);

		notification.success({
			message: 'The task successffuly added!',
		});
	};
	const onFinishFailed = (values, errorFields) => {
		console.log('values ==>', values);
		console.log('errorFields ==>', errorFields);
	};

	return (
		<Form
			{...layout}
			name='task-form'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			form={form}
		>
			<Form.Item
				name='name'
				label='Name'
				rules={[
					{
						required: true,
						message: 'Please input name!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name='email'
				label='Email'
				rules={[
					{
						type: 'email',
						required: true,
						message: 'Please input valid email!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='description'
				label='Description'
				rules={[
					{
						required: true,
						message: 'Please input task description!',
					},
				]}
			>
				<Input.TextArea />
			</Form.Item>
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type='primary' htmlType='submit' loading={isLoading}>
					Save task
				</Button>
			</Form.Item>
		</Form>
	);
};

export default TaskForm;
