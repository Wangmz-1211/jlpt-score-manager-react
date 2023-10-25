import React from 'react'
import LoginAsFoo from '../components/LoginAsFoo'
import { connect } from 'react-redux'

function TestView(props) {
	console.log(props);
	return (
		<div>
			This is a view for development use only.
			<LoginAsFoo></LoginAsFoo>
		</div>
	)
}

export default connect((state)=> state.user, null)(TestView)
