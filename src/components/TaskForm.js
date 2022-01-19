import { Form, Input, Button, notification } from 'antd';

import { useAddTaskMutation } from '../redux';

import { sanitizeHtmlTags } from '../utils/helpers';

const TaskForm = () => {
	const [addTask, { isLoading }] = useAddTaskMutation();
	const [form] = Form.useForm();

	const formItemLayout = {
		labelCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 24,
			},
			md: {
				span: 12,
				offset: 6,
			},
			lg: {
				span: 12,
				offset: 6,
			},
		},
		wrapperCol: {
			xs: {
				span: 24,
			},
			sm: {
				span: 24,
			},
			md: {
				span: 16,
				offset: 4,
			},
			lg: {
				span: 16,
				offset: 4,
			},
		},
	};
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 24,
				offset: 0,
			},
			md: {
				span: 12,
				offset: 6,
			},
			lg: {
				span: 12,
				offset: 6,
			},
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
			{...formItemLayout}
			name='task-form'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			form={form}
			layout='vertical'
		>
			<Form.Item
				{...tailFormItemLayout}
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
				{...tailFormItemLayout}
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
				{...tailFormItemLayout}
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
			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit' loading={isLoading}>
					Save task
				</Button>
			</Form.Item>
		</Form>
	);
};

export default TaskForm;
