import React from 'react'
import { Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './UserInfo.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../store/actions'
import { logout } from '../api/authentication.ts'
import { useNavigate } from 'react-router-dom'

const handleLogout = async (logoutAction, navigate) => {
	await logout()
	logoutAction()
	navigate('/')
}

function UserInfo(props) {
	const navigate = useNavigate()

	const items = [
		{
			key: 'username',
			label: <b>{props.username}</b>,
			disabled: true,
		},
		{
			key: 'logout',
			label: (
				<span onClick={() => handleLogout(props.clearUser, navigate)}>
					logout
				</span>
			),
			danger: true,
		},
	]
	return (
		<div className='user-info-box'>
			{props._id === '' ? (
				// haven't logged in
				<Link to='/login'>
					<Avatar size={48} icon={<UserOutlined />} />
				</Link>
			) : (
				// logged in
				<Dropdown menu={{ items }}>
					<Avatar
						src={props.avatar}
						icon={<UserOutlined />}
						size={48}
					/>
				</Dropdown>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return state.user
}

const mapDispatchToProps = { ...actions.user }

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
