import React, { useState } from 'react'
import { Card, Statistic, Modal, Button } from 'antd'
import { deleteScoreRecord } from '../api/score.ts'
import './ScoreListItem.css'
import { connect } from 'react-redux'
import actions from '../store/actions'

function ScoreListItem(props) {
	let { record } = props
	let [modalVisible, setModalVisible] = useState(false),
		[modalLoading, setModalLoading] = useState(false)
	return (
		// todo: click the card -> show the detail information, which could be edited
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
			<Modal
				title={record.title}
				open={modalVisible}
				onCancel={() => {
					setModalVisible(false)
				}}
				onOk={() => {
					setModalLoading(true)
					setModalLoading(false)
					setModalVisible(false)
				}}
				footer={(_, { OkBtn, CancelBtn }) => {
					return (
						<React.Fragment>
							<Button
								type='primary'
								danger
								onClick={() => {
									Modal.confirm({
										title: 'Confirm required',
										content:
											'Are you sure to delete record [' +
											record.title +
											']? The information can never be restored.',
										onOk: async () => {
											setModalLoading(true)
											const code =
												await deleteScoreRecord(
													record._id
												)
											if (code === 200) {
												// remove the record from the store
												const newScoreRecords =
													props.scoreRecords.filter(
														(r) =>
															r._id != record._id
													)
												props.setScoreRecords(
													newScoreRecords
												)
											}
											setModalLoading(false)
											setModalVisible(false)
										},
									})
								}}
							>
								Delete
							</Button>
							<CancelBtn />
							<OkBtn />
						</React.Fragment>
					)
				}}
			></Modal>
		</React.Fragment>
	)
}

export default connect((status) => status.score, actions.score)(ScoreListItem)
