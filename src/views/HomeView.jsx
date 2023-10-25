import React from 'react'
import { Typography } from 'antd'
import './HomeView.css'

const { Title, Paragraph } = Typography

function HomeView() {
	return (
		<div className='home-view-box'>
			<Typography>
				<Title>Welcome to JLPT score manager</Title>
				<Paragraph>
					This is a project for my Japanese study, as well as react,
					express study.
				</Paragraph>
			</Typography>
		</div>
	)
}

export default HomeView
