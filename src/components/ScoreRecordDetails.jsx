import React from 'react'
import { Typography, Modal, Button, InputNumber, message, Tooltip } from 'antd'
import { deleteScoreRecord, updateScoreRecord } from '../api/score.ts'
import { connect } from 'react-redux'
import actions from '../store/actions'

const { Title } = Typography
const recordCopy = (record) => {
	return {
		...record,
		vocabulary: { ...record.vocabulary },
		grammar: { ...record.grammar },
		reading: { ...record.reading },
		listening: { ...record.listening },
	}
}
const titleStyle = {
	display: 'flex',
	justifyContent: 'space-between',
}
const numberInputStyle = {
	width: 65,
	margin: '0 10px',
}

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
				<InputNumber
					min={0}
					max={12}
					defaultValue={record.grammar.g7}
					onChange={(v) => {
						formData.grammar.g7 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={5}
					defaultValue={record.grammar.g8}
					onChange={(v) => {
						formData.grammar.g8 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={5}
					defaultValue={record.grammar.g9}
					onChange={(v) => {
						formData.grammar.g9 = v
					}}
					style={numberInputStyle}
				/>
				<Title level={5} style={titleStyle}>
					<span>Reading</span>
					<span>{record.reading_score}</span>
				</Title>
				<InputNumber
					min={0}
					max={5}
					defaultValue={record.reading.r10}
					onChange={(v) => {
						formData.reading.r10 = v
					}}
					style={numberInputStyle}
				/>
				<Tooltip
					placement='top'
					title='The first and second questions of three articles.'
				>
					<InputNumber
						min={0}
						max={6}
						defaultValue={record.reading.r11_1}
						onChange={(v) => {
							formData.reading.r11_1 = v
						}}
						style={numberInputStyle}
					/>
				</Tooltip>
				<Tooltip
					placement='top'
					title='The third question of three articles.'
				>
					<InputNumber
						min={0}
						max={3}
						defaultValue={record.reading.r11_2}
						onChange={(v) => {
							formData.reading.r11_2 = v
						}}
						style={numberInputStyle}
					/>
				</Tooltip>
				<InputNumber
					min={0}
					max={2}
					defaultValue={record.reading.r12}
					onChange={(v) => {
						formData.reading.r12 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={3}
					defaultValue={record.reading.r13}
					onChange={(v) => {
						formData.reading.r13 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={2}
					defaultValue={record.reading.r14}
					onChange={(v) => {
						formData.reading.r14 = v
					}}
					style={numberInputStyle}
				/>
				<Title level={5} style={titleStyle}>
					<span>Listening</span>
					<span>{record.listening_score}</span>
				</Title>
				<InputNumber
					min={0}
					max={5}
					defaultValue={record.listening.l1}
					onChange={(v) => {
						formData.listening.l1 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={6}
					defaultValue={record.listening.l2}
					onChange={(v) => {
						formData.listening.l2 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={5}
					defaultValue={record.listening.l3}
					onChange={(v) => {
						formData.listening.l3 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={12}
					defaultValue={record.listening.l4}
					onChange={(v) => {
						formData.listening.l4 = v
					}}
					style={numberInputStyle}
				/>
				<InputNumber
					min={0}
					max={4}
					defaultValue={record.listening.l5}
					onChange={(v) => {
						formData.listening.l5 = v
					}}
					style={numberInputStyle}
				/>
			</Typography>
		</Modal>
	)
}

export default connect(
	(state) => state.score,
	actions.score
)(ScoreRecordDetails)
