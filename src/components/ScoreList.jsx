import React, { useEffect, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { getScoreListByUserId } from '../api/score.ts'
import { Row, Col, Skeleton, Card } from 'antd'
import './ScoreList.css'
import actions from '../store/actions'

const ScoreListItem = lazy(() => import('./ScoreListItem'))
const ScoreListWithoutLogin = lazy(() => import('./ScoreListWithoutLogin'))
const ScoreRecordCreateCard = lazy(() => import('./ScoreRecordCreateCard'))

function ScoreList(props) {
	useEffect(() => {
		const fetchScoreList = async () => {
			const list = await getScoreListByUserId()
			props.setScoreRecords(list ? list : [{ _id: '' }])
		}
		if (
			!props.scoreRecords ||
			props.scoreRecords.length === 0 ||
			props.scoreRecords[0]._id === ''
		)
			fetchScoreList()
	}, [])

	return (
		<div className='score-list-box'>
			<Row gutter={[30, 30]}>
				<Suspense
					fallback={
						<Card
							bordered={false}
							style={{ width: 246, height: 112 }}
						>
							<Skeleton.Button
								active
								block
								style={{ height: 64 }}
							></Skeleton.Button>
						</Card>
					}
				>
					{props.score.scoreRecords
						? props.score.scoreRecords.map((rec) => {
								if (rec._id === '') return null
								return (
									<Col key={rec._id}>
										<ScoreListItem
											key={rec._id}
											record={rec}
											totalScore={rec.total_score}
											title={rec.title}
										/>
									</Col>
								)
						  })
						: null}
				</Suspense>
				{props.user._id === '' ? (
					<ScoreListWithoutLogin />
				) : (
					<Col>
						<Suspense>
							<ScoreRecordCreateCard />
						</Suspense>
					</Col>
				)}
			</Row>
		</div>
	)
}

export default connect((state) => state, { ...actions.score })(ScoreList)
