import { combineReducers } from 'redux'
import userReducer from './user'
import scoreReducer from './score'

const reducer = combineReducers({
	user: userReducer,
	score: scoreReducer,
})

export default reducer
