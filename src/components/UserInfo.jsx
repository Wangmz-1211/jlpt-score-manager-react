import React from 'react'
import { Avatar, Dropdown } from 'antd'
import './UserInfo.css'
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

function UserInfo() {
	return (
		<div className='user-info-box'>
			<Dropdown menu={{ items }}>
				<Avatar
					src={
						'http://wangmz-markdown.oss-cn-shanghai.aliyuncs.com/img/image-20231025145302312.png'
					}
					size={48}
				/>
			</Dropdown>
		</div>
	)
}

export default UserInfo
