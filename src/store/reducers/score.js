const initialState = {
	scoreRecords: [],
}

const scoreReducer = (state = initialState, { payload }) => {
	state.scoreRecords = payload
	return state
}

export default scoreReducer
