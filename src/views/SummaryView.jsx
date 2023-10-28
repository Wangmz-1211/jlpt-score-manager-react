import React, { lazy } from 'react'
import './SummaryView.css'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SummaryChart = lazy(() => import('../components/SummaryChart'))
function SummaryView(props) {
	const navigate = useNavigate()
	if(props.user._id === '') navigate('/noUser')
	return (
		<React.Fragment>
			<div className='summary-view-box'>
				<SummaryChart level='N2'></SummaryChart>
			</div>
		</React.Fragment>
	)
}

export default connect((state) => state, null)(SummaryView)
