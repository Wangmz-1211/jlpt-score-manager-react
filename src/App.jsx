import React from 'react'
import { Layout } from 'antd'
import TestView from './views/TestView'
import './App.css'
import LoginAsFoo from './components/LoginAsFoo'
import NavigateBar from './components/NavigateBar'
import UserInfo from './components/UserInfo'

const { Header, Content, Footer } = Layout

function App() {
	return (
		<div className='app'>
			<Header style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <NavigateBar></NavigateBar>
				<UserInfo></UserInfo>
			</Header>
			<Content style={{ height: 500 }}>
				<TestView></TestView>
			</Content>
			<Footer></Footer>
		</div>
	)
}

export default App
