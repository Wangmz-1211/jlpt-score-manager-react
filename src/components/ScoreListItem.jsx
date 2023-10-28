import React, { lazy, useState } from 'react'
import { Card, Statistic } from 'antd'
import './ScoreListItem.css'
import { connect } from 'react-redux'
import actions from '../store/actions'

const ScoreRecordDetails = lazy(() => import('./ScoreRecordDetails'))

function ScoreListItem(props) {
	let { record } = props
	let [modalVisible, setModalVisible] = useState(false),
		[modalLoading, setModalLoading] = useState(false)
	return (
		<React.Fragment>
			<Card
				bordered={false}
				style={{ width: 246 }}
				onClick={() => {
					setModalVisible(true)
				}}
			>
				<Statistic
					title={record.title}
					value={record.total_score}
					precision={0}
					suffix='/ 180'
				></Statistic>
			</Card>
			{/* score record detail Modal */}
			<ScoreRecordDetails
				record={record}
				modalVisible={modalVisible}
				modalLoading={modalLoading}
				setModalVisible={setModalVisible}
				setModalLoading={setModalLoading}
			/>
		</React.Fragment>
	)
}

export default connect((status) => status.score, actions.score)(ScoreListItem)
