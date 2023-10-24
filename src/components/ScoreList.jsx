import React, { useEffect, useState } from 'react'
import { getScoreListByUserId } from '../api/score.ts'
import ScoreListItem from './ScoreListItem.jsx'
import { Row, Col } from 'antd'

function ScoreList() {
	let [scoreList, setScoreList] = useState([])

	useEffect(() => {
		const fetchScoreList = async () => {
			const list = await getScoreListByUserId()
			setScoreList(list)
		}
		fetchScoreList()
	}, [])

	return (
		<div className='score-list-box'>
			<Row gutter={[30, 30]}>
				{scoreList.map((rec) => {
					return (
						<Col key={rec._id}>
							<ScoreListItem
								key={rec._id}
								totalScore={rec.total_score}
							/>
						</Col>
					)
				})}
			</Row>
		</div>
	)
}

export default ScoreList
