import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Form, Input } from 'antd'
import './LoginView.css'
import { login } from '../api/authentication.ts'
import actions from '../store/actions'

const { Title } = Typography

export const LoginView = (props) => {
	const navigate = useNavigate()
	const handleFinish = async (v) => {
		const userInfo = await login(v.email, v.password)
		if (!userInfo) return
		props.setUser(userInfo)
		navigate('/')
	}

	return (
		<div className='login-view-box'>
			<Title
				level={3}
				style={{
					textAlign: 'center',
				}}
			>
				WELCOME
			</Title>
			<Form
				colon={false}
				labelCol={{ span: 8 }}
				labelAlign='left'
				style={{ maxWidth: 500, marginTop: 20 }}
				wrapperCol={{ span: 16 }}
				onFinish={handleFinish}
			>
				<Form.Item name='email' label='email'>
					<Input></Input>
				</Form.Item>
				<Form.Item name='password' label='password'>
					<Input.Password></Input.Password>
				</Form.Item>
				<Form.Item
					style={{
						display: 'flex',
						justifyContent: 'right',
					}}
				>
					<Button type='primary' htmlType='submit'>
						LOGIN
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps, actions.user)(LoginView)
