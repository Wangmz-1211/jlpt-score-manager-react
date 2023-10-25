const userAction = {
	setUser(userInfo) {
		return {
			type: 'USER_SET',
			payload: { ...userInfo },
		}
	},
}

export default userAction
