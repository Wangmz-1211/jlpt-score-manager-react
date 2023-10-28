import React, { useState } from 'react'
import { Card, Modal, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { createBlankScoreRecord } from '../api/score.ts'
import { connect } from 'react-redux'
import actions from '../store/actions'

function ScoreRecordCreateCard(props) {
	let [modalVisible, setModalVisible] = useState(false),
		[modalLoading, setModalLoading] = useState(false),
		[title, setTitle] = useState('')
	return (
		<React.Fragment>
			<Card
				bordered={false}
				style={{ width: 246 }}
				onClick={() => {
					setModalVisible(true)
				}}
			>
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

			<Modal
				title='Create score record'
				open={modalVisible}
				confirmLoading={modalLoading}
				onCancel={() => {
					setTitle('')
					setModalVisible(false)
				}}
				onOk={async () => {
					if (title === '') {
						message.error('Please input the title!', 2)
						return
					}
					console.log(title)
					setModalLoading(true)
					const blankRecord = await createBlankScoreRecord(title)
					// insert the new blank record to old results
					const newRecordList = [
						...props.score.scoreRecords,
						blankRecord,
					]
					props.setScoreRecords(newRecordList)
					setTitle('')
					setModalLoading(false)
					setModalVisible(false)
				}}
			>
				<span
					style={{
						display: 'inline-block',
						width: 100,
						textAlign: 'right',
						paddingRight: 20,
					}}
				>
					title
				</span>
				<Input
					style={{ width: 300 }}
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
					}}
				/>
			</Modal>
		</React.Fragment>
	)
}

export default connect(state => state, actions.score)(ScoreRecordCreateCard)
