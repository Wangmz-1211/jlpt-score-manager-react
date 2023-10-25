import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getScoreListByUserId, createBlankScoreRecord } from '../api/score.ts'
import ScoreListItem from './ScoreListItem.jsx'
import { Row, Col, Card, Typography, Modal, Input, message } from 'antd'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import './ScoreList.css'
import actions from '../store/actions'

const { Title, Paragraph } = Typography
function ScoreList(props) {
	let [modalVisible, setModalVisible] = useState(false),
		[modalLoading, setModalLoading] = useState(false),
		[title, setTitle] = useState('')
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
										record={rec}
										totalScore={rec.total_score}
										title={rec.title}
									/>
								</Col>
							)
					  })
					: null}
				{props.user._id === '' ? (
					<Typography>
						<Title>You should login first!</Title>
						<Paragraph>
							Please click on the <UserOutlined /> icon the the
							top right of the page, then you will be navigated to
							the <Link to='/login'>login</Link> page.
						</Paragraph>
						<Paragraph>
							If you do not have an account yet, you could find
							a&nbsp;
							<Link to='/register'>register</Link> button on the{' '}
							<Link to='/login'>login</Link> page. Or you could
							just click the <Link to='/register'>register</Link>{' '}
							link here.
						</Paragraph>
					</Typography>
				) : (
					<Col>
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
					</Col>
				)}
			</Row>
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
		</div>
	)
}

export default connect((state) => state, { ...actions.score })(ScoreList)
