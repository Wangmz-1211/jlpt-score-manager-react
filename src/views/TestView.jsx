import React from 'react'
import ScoreListItem from '../components/ScoreListItem'
import ScoreList from '../components/ScoreList'
import { Typography } from 'antd'

const { Title } = Typography

function TestView() {
	return (
		<div>
			<Title level={2}>Test View</Title>
			<ScoreList></ScoreList>
		</div>
	)
}

export default TestView
