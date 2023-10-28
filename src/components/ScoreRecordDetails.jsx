import React, { lazy, Suspense } from 'react'
import { Modal, Button, message, Skeleton } from 'antd'
import { deleteScoreRecord, updateScoreRecord } from '../api/score.ts'
import { connect } from 'react-redux'
import actions from '../store/actions'

const recordCopy = (record) => {
	return {
		...record,
		vocabulary: { ...record.vocabulary },
		grammar: { ...record.grammar },
		reading: { ...record.reading },
		listening: { ...record.listening },
	}
}

const ScoreRecordDetailContent = lazy(() =>
	import('./ScoreRecordDetailContent')
)

/**
 * The score detail editing modal.
 * @param {{
 * record: Record<string, any> ,
 * modalVisible: boolean,
 * modalLoading: boolean,
 * setModalLoading: React.Dispatch<React.SetStateAction<boolean>>,
 * setModalVisible: React.Dispatch<React.SetStateAction<boolean>>}} props
 * @returns
 */
export const ScoreRecordDetails = (props) => {
	let {
		record,
		modalVisible,
		modalLoading,
		setModalLoading,
		setModalVisible,
	} = props
	let formData = recordCopy(record)
	return (
		<Modal
			title={record.title}
			open={modalVisible}
			onCancel={() => {
				setModalVisible(false)
			}}
			confirmLoading={modalLoading}
			onOk={async () => {
				const newRecord = await updateScoreRecord(record._id, formData)
				if (newRecord) {
					props.replaceScoreRecordById(
						record._id,
						newRecord,
						props.scoreRecords
					)
					message.success('The score has updated.', 2)
				} else {
					message.error('update failure')
				}
				setModalLoading(true)
				setModalLoading(false)
				setModalVisible(false)
			}}
			okText='Edit'
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
										const code = await deleteScoreRecord(
											record._id
										)
										if (code === 200) {
											// remove the record from the store
											const newScoreRecords =
												props.scoreRecords.filter(
													(r) => r._id !== record._id
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
			width={600}
		>
			<Suspense fallback={<Skeleton active paragraph={{ rows: 7 }} />}>
				<ScoreRecordDetailContent record={record} formData={formData} />
			</Suspense>
		</Modal>
	)
}

export default connect(
	(state) => state.score,
	actions.score
)(ScoreRecordDetails)
