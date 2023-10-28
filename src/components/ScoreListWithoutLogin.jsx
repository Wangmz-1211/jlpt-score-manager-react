import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

function ScoreListWithoutLogin() {
	return (
		<Typography>
			<Title>You should login first!</Title>
			<Paragraph>
				Please click on the <UserOutlined /> icon the the top right of
				the page, then you will be navigated to the{' '}
				<Link to='/login'>login</Link> page.
			</Paragraph>
			<Paragraph>
				If you do not have an account yet, you could find a&nbsp;
				<Link to='/register'>register</Link> button on the{' '}
				<Link to='/login'>login</Link> page. Or you could just click the{' '}
				<Link to='/register'>register</Link> link here.
			</Paragraph>
		</Typography>
	)
}

export default ScoreListWithoutLogin
