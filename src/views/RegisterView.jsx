import React from 'react'
import { Form, Space, Button, Input, Typography, message } from 'antd'
import { register } from '../api/authentication.ts'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const handleFinish = async (v, navigate) => {
	// avatar is optional
	let { email, username, password, avatar } = v
	if (!email || !username || !password)
		message.error('Please check your input!', 2)
	const user = await register(email, username, password, avatar)
	if (user) {
        message.success('Success! Please login.')
		navigate('/login')
	}
}

function RegisterView(props) {
	const navigate = useNavigate()
	return (
		<div className='register-view-box'>
			<Title
				level={3}
				style={{
					textAlign: 'center',
					paddingTop: 20,
				}}
			>
				WELCOME
			</Title>
			<Form
				colon={false}
				labelCol={{ span: 8 }}
				labelAlign='left'
				style={{ maxWidth: 520, marginTop: 20 }}
				wrapperCol={{ span: 16 }}
				onFinish={(v) => handleFinish(v, navigate)}
			>
				<Form.Item name='email' label='email'>
					<Input></Input>
				</Form.Item>
				<Form.Item name='username' label='username'>
					<Input></Input>
				</Form.Item>
				<Form.Item name='avatar' label='avatar url'>
					<Input></Input>
				</Form.Item>
				<Form.Item name='password' label='password'>
					<Input.Password></Input.Password>
				</Form.Item>
				<Form.Item>
					<Space
						style={{
							display: 'flex',
							justifyContent: 'right',
							width: 311,
						}}
					>
						<Button
							style={{ width: 100 }}
							type='primary'
							htmlType='submit'
						>
							REGISTER
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default RegisterView
