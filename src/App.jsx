import React, { lazy, Suspense } from 'react'
import { Layout } from 'antd'
import { Provider } from 'react-redux'
import './App.css'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavigateBar from './components/NavigateBar'
import UserInfo from './components/UserInfo'
import HomeView from './views/HomeView'
import store from './store'

const { Header, Content, Footer } = Layout
const LoginView = lazy(() => import('./views/LoginView'))
const TestView = lazy(() => import('./views/TestView'))
const ScoreView = lazy(() => import('./views/ScoreView'))
const SummaryView = lazy(() => import('./views/SummaryView'))

function App() {
	return (
		<Provider store={store}>
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
								<Route path='/' element={<HomeView />} />
								<Route
									path='/summary'
									element={<SummaryView />}
								/>
								<Route path='/score' element={<ScoreView />} />
								<Route path='/test' element={<TestView />} />
								<Route path='/login' element={<LoginView />} />
								<Route
									path='*'
									element={<Navigate to='/' replace={true} />}
								/>
							</Routes>
						</Content>
						<Footer style={{ textAlign: 'center' }}>
							code by wangmz
						</Footer>
					</div>
				</Suspense>
			</HashRouter>
		</Provider>
	)
}

export default App
