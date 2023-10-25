import React from 'react'
import ScoreList from '../components/ScoreList'
import LoginAsFoo from '../components/LoginAsFoo'

function TestView() {
	return (
		<div>
			This is a view for development use only.
			<LoginAsFoo></LoginAsFoo>
			<ScoreList></ScoreList>
		</div>
	)
}

export default TestView
