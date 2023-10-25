const initialState = {
	scoreRecords: [
		{
			_id: ''
		}
	],
}

const scoreReducer = (state = initialState, { type, payload }) => {
	const pattern = /SCORE*/
	if(!pattern.test(type)) return state
	state = {...state}
	state.scoreRecords = payload
	return state
}

export default scoreReducer
