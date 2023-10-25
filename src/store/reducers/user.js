const initialState = {
	_id: '',
	email: '',
	username: '',
	_v: 0,
}

const userReducer = (state = initialState, { payload }) => {
	console.log(payload)
	state = { ...state, ...payload }
	console.log(state)
	return state
}

export default userReducer
