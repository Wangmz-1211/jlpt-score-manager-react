import React from 'react'
import ScoreList from '../components/ScoreList'
import './ScoreView.css'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ScoreView(props) {
	const navigate = useNavigate()
	if(props.user._id === '') navigate('/noUser')
	return (
		<div>
			<ScoreList></ScoreList>
		</div>
	)
}

export default connect((state) => state, null)(ScoreView)
