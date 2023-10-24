import React from 'react'
import { Button } from 'antd'
import { login } from '../api/authentication.ts'

const email = 'foo@code.com'
const password = 'foo'

const loginAsFoo = async () => {
	const userInfo = await login(email, password)
	console.log(userInfo)
}

function LoginAsFoo() {
	return <Button onClick={loginAsFoo}>Login</Button>
}

export default LoginAsFoo
