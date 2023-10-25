import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavigateBar.css'

function NavigateBar() {
	return (
		<div className='nav-box'>
            <NavLink className='nav-item' to='/'>HOME</NavLink>
            <NavLink className='nav-item' to='/summary'>SUMMARY</NavLink>
            <NavLink className='nav-item' to='/score'>SCORE</NavLink>
            <NavLink className='nav-item' to='/test'>TEST</NavLink>
		</div>
	)
}

export default NavigateBar
