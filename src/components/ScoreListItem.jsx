import React, { useState } from 'react'
import { Card, Statistic, Modal, Button, Typography, InputNumber , message} from 'antd'
import { deleteScoreRecord, updateScoreRecord } from '../api/score.ts'
import './ScoreListItem.css'
import { connect } from 'react-redux'
import actions from '../store/actions'

const { Title } = Typography
const titleStyle = {
	display: 'flex',
	justifyContent: 'space-between',
}
const numberInputStyle = {
	width: 65,
	margin: '0 10px',
}
const recordCopy = (record) => {
	return {
		...record,
		vocabulary: { ...record.vocabulary },
		grammar: { ...record.grammar },
		reading: { ...record.reading },
		listening: { ...record.listening },
	}
}
function ScoreListItem(props) {
	let { record } = props
	let [modalVisible, setModalVisible] = useState(false),
		[modalLoading, setModalLoading] = useState(false),
		[formData, setFormData] = useState(recordCopy(record))
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
			<Modal
				title={record.title}
				open={modalVisible}
				onCancel={() => {
					setModalVisible(false)
				}}
				onOk={async () => {
					// todo: update the information
					const newRecord = await updateScoreRecord(
						record._id,
						formData
					)
					if (newRecord) {
						props.replaceScoreRecordById(
							record._id,
							newRecord,
							props.scoreRecords
						)
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
				width={600}
			>
				<Typography
					style={{
						padding: '0 20px',
					}}
				>
					<Title level={5} style={titleStyle}>
						<span>Vocabulary</span>
						<span>{record.vocabulary_score}</span>
					</Title>
					<InputNumber
						min={0}
						max={5}
						defaultValue={record.vocabulary.v1}
						onChange={(v) => {
							formData.vocabulary.v1 = v
						}}
						style={numberInputStyle}
					/>
					<InputNumber
						min={0}
						max={5}
						defaultValue={record.vocabulary.v2}
						onChange={(v) => {
							formData.vocabulary.v2 = v
						}}
						style={numberInputStyle}
					/>
					<InputNumber
						min={0}
						max={5}
						defaultValue={record.vocabulary.v3}
						onChange={(v) => {
							formData.vocabulary.v3 = v
						}}
						style={numberInputStyle}
					/>
					<InputNumber
						min={0}
						max={7}
						defaultValue={record.vocabulary.v4}
						onChange={(v) => {
							formData.vocabulary.v4 = v
						}}
						style={numberInputStyle}
					/>
					<InputNumber
						min={0}
						max={5}
						defaultValue={record.vocabulary.v5}
						onChange={(v) => {
							formData.vocabulary.v5 = v
						}}
						style={numberInputStyle}
					/>
					<InputNumber
						min={0}
						max={5}
						defaultValue={record.vocabulary.v6}
						onChange={(v) => {
							formData.vocabulary.v6 = v
						}}
						style={numberInputStyle}
					/>
					<Title level={5} style={titleStyle}>
						<span>Grammar</span>
						<span>{record.grammar_score}</span>
					</Title>
					<Title level={5} style={titleStyle}>
						<span>Reading</span>
						<span>{record.reading_score}</span>
					</Title>
					<Title level={5} style={titleStyle}>
						<span>Listening</span>
						<span>{record.listening_score}</span>
					</Title>
				</Typography>
			</Modal>
		</React.Fragment>
	)
}

export default connect((status) => status.score, actions.score)(ScoreListItem)
