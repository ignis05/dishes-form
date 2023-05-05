import React from 'react'
import './App.css'
import DishForm from './features/dishForm/DishForm'

function App() {
	return (
		<div>
			<DishForm onSubmit={console.log} />
		</div>
	)
}

export default App
