import React from 'react'
import { Card, Statistic } from 'antd'
import './ScoreListItem.css'

function ScoreListItem(props) {
	let { totalScore } = props
	return (
		<Card bordered={false} style={{ width: 280}}>
			<Statistic title={'N2-2015-12'}
			value={totalScore}
			precision={0}
			suffix='/ 180'
			></Statistic>
		</Card>
	)
}

export default ScoreListItem
