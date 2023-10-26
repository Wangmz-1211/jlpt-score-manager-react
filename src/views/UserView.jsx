import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Avatar, Form, Input, Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { changeAvatar, changeUsername } from '../api/authentication.ts'
import './UserView.css'
import actions from '../store/actions'

export const UserView = (props) => {
	return (
		<div className='user-view-box'>
			<div className='user-view-sider'>
				<Avatar
					src={props.user.avatar}
					icon={<UserOutlined />}
					size={160}
				></Avatar>
				<div className='user-view-username'>{props.user.username}</div>
			</div>
			<div className='user-view-content'>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}
					colon={false}
					onFinish={async (v) => {
						let newUserInfo = { ...props.user }
						let changed = false
						if (v.avatar && v.avatar !== props.user.avatar) {
							// update avatar
							const resChangeAvatar = await changeAvatar(
								props.user.email,
								v.avatar
							)
							newUserInfo.avatar = v.avatar
							changed = true
						}
						if (v.username && v.username !== props.user.username) {
							const resChangeUsername = await changeUsername(
								props.user.email,
								v.username
							)
							newUserInfo.username = v.username
							changed = true
						}
						if (changed) {
							message.success(
								'Update user information successfully.'
							)
							props.setUser(newUserInfo)
						}
					}}
				>
					<Form.Item name='email' label='Email'>
						{props.user.email}
					</Form.Item>
					<Form.Item
						name='username'
						label='Username'
						initialValue={props.user.username}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='avatar'
						label='Avatar Url'
						initialValue={props.user.avatar}
					>
						<Input />
					</Form.Item>
					<Form.Item
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Button type='primary' htmlType='submit'>
							UPDATE
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default connect((state) => state, actions.user)(UserView)
