import React from 'react'
import { Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './UserInfo.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const items = [
	{
		key: 'username',
		label: <b>username</b>,
		disabled: true,
	},
	{
		key: 'logout',
		label: <span>logout</span>,
		danger: true,
	},
]

function UserInfo(props) {
	console.log(props)
	return (
		<div className='user-info-box'>
			{props._id === '' ? (
				<Link to='/login'>
					<Avatar size={48} icon={<UserOutlined />} />
				</Link>
			) : (
				<Dropdown menu={{ items }}>
					<Avatar
						src={
							'http://wangmz-markdown.oss-cn-shanghai.aliyuncs.com/img/image-20231025145302312.png'
						}
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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
