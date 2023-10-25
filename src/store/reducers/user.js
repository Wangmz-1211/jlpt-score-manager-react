const initialState = {
	_id: '',
	email: '',
	username: '',
	_v: 0,
}

const userReducer = (state = initialState, { type, payload }) => {
	const pattern = /USER*/
	if (!pattern.test(type)) return state
	state = { ...state, ...payload }
	return state
}

export default userReducer
