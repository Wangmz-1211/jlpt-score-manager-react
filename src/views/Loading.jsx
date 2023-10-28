import React from 'react'
import { Spin } from 'antd'
import './Loading.css'

function Loading() {
	return (
		<div className='loading-box'>
			<Spin style={{
                paddingTop: 100
            }}/>
		</div>
	)
}

export default Loading
