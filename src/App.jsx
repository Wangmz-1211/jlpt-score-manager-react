import React, { lazy, Suspense } from 'react'
import { Layout } from 'antd'
import './App.css'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginAsFoo from './components/LoginAsFoo'
import NavigateBar from './components/NavigateBar'
import UserInfo from './components/UserInfo'
import HomeView from './views/HomeView'

const { Header, Content, Footer } = Layout
const TestView = lazy(() => import('./views/TestView'))
const ScoreView = lazy(() => import('./views/ScoreView'))
const SummaryView = lazy(() => import('./views/SummaryView'))

function App() {
	return (
		<HashRouter>
			<Suspense>
				<div className='app'>
					<Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<NavigateBar></NavigateBar>
						<UserInfo></UserInfo>
					</Header>
					<Content
						style={{
							height: 500,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Routes>
							<Route path='/' element={<HomeView />}></Route>
							<Route path='/summary' element={<SummaryView/>}></Route>
							<Route
								path='/score'
								element={<ScoreView />}
							></Route>
							<Route path='/test' element={<TestView />}></Route>
							<Route
								path='*'
								element={<Navigate to='/' replace={true} />}
							></Route>
						</Routes>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						code by wangmz
					</Footer>
				</div>
			</Suspense>
		</HashRouter>
	)
}

export default App
