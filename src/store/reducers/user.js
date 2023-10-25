const initialState = {
	_id: '',
	email: '',
	username: '',
	_v: 0,
}

const userReducer = (state = initialState, { payload }) => {
	state = { ...state, ...payload }
	return state
}

export default userReducer
