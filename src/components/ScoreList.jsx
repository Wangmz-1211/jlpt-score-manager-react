import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getScoreListByUserId } from '../api/score.ts'
import ScoreListItem from './ScoreListItem.jsx'
import { Row, Col, Card, Statistic } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './ScoreList.css'
import actions from '../store/actions'


function ScoreList(props) {
	useEffect(() => {
		const fetchScoreList = async () => {
			const list = await getScoreListByUserId()
			props.setScoreRecords(list ? list : [{ _id: '' }])
		}
		fetchScoreList()
	}, [])

	return (
		<div className='score-list-box'>
			<Row gutter={[30, 30]}>
				{props.score.scoreRecords
					? props.score.scoreRecords.map((rec) => {
							if (rec._id === '') return null
							return (
								<Col key={rec._id}>
									<ScoreListItem
										key={rec._id}
										totalScore={rec.total_score}
									/>
								</Col>
							)
					  })
					: null}
				<Col>
					<Card bordered={false} style={{ width: 246 }}>
						<div
							style={{
								height: 63,
								display: 'flex',
								flexDirection: 'column',
								alignContent: 'center',
							}}
						>
							<div className='title'>Create a new record</div>
							<div className='icon'></div>
							<PlusOutlined
								style={{
									fontSize: 32,
									color: 'rgba(0,0,0,0.45)',
								}}
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default connect((state) => state, { ...actions.score })(ScoreList)
