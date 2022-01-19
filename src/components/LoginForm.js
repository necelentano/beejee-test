import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, notification } from 'antd';

import { useLoginMutation } from '../redux';
import { setToken } from '../redux';

const LoginForm = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { data, isLoading }] = useLoginMutation();

	useEffect(() => {
		if (!data) return;

		if (data.status === 'error')
			return notification.error({
				message: 'Invalid credentials!',
			});
		if (data.status === 'ok') {
			dispatch(setToken(data.message.token));

			notification.success({
				message: 'Hello, admin!',
			});
			navigate('/admin');
		}
	}, [data, dispatch, navigate]);

	const onFinish = async ({ username, password }) => {
		let formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);

		form.resetFields(['username', 'password']);
		await login(formData);
	};
	const onFinishFailed = (values, errorFields) => {
		console.log('values ==>', values);
		console.log('errorFields ==>', errorFields);
	};

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

	return (
		<Form
			name='login'
			{...formItemLayout}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
			form={form}
			layout='vertical'
		>
			<Form.Item
				label='Username'
				name='username'
				rules={[{ required: true, message: 'Please input your username!' }]}
				{...tailFormItemLayout}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Password'
				name='password'
				rules={[{ required: true, message: 'Please input your password!' }]}
				{...tailFormItemLayout}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit' loading={isLoading}>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
