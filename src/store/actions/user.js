const userAction = {
	setUser(userInfo) {
		return {
			type: 'USER_SET',
			payload: { ...userInfo },
		}
	},
	clearUser() {
		const blankUserSchema = {
			_id: '',
			email: '',
			username: '',
			_v: 0,
		}
		return {
			type: 'USER_CLEAR',
			payload: { ...blankUserSchema },
		}
	},
}

export default userAction
