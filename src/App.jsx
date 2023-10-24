import React from 'react'
import TestView from './views/TestView'
import './App.css'
import LoginAsFoo from './components/LoginAsFoo'

function App() {
    return <div className="app">
        <LoginAsFoo></LoginAsFoo>
        <TestView></TestView>
    </div>
}

export default App
