import React, { lazy } from 'react'
import './SummaryView.css'

const SummaryChart = lazy(() => import('../components/SummaryChart'))
function SummaryView() {
	return (
		<React.Fragment>
			<div className='summary-view-box'>
				<SummaryChart level='N2'></SummaryChart>
			</div>
		</React.Fragment>
	)
}

export default SummaryView
