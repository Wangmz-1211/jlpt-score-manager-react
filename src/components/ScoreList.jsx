import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getScoreListByUserId } from '../api/score.ts'
import ScoreListItem from './ScoreListItem.jsx'
import { Row, Col, Card, Typography } from 'antd'
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import './ScoreList.css'
import actions from '../store/actions'

const { Title, Paragraph } = Typography
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
				{!props.score.scoreRecords
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
				)}
			</Row>
		</div>
	)
}

export default connect((state) => state, { ...actions.score })(ScoreList)
