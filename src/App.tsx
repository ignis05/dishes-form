import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import DishForm from './features/dishForm/DishForm'
import FormSubmitted from './features/dishForm/FormSubmitted'

function App() {
	const res = useSelector((state: RootState) => state.dishFormResponse.formResponse)

	return (
		<div className="appRoot">
			{res && <FormSubmitted res={res} />}
			{!res && <DishForm />}
		</div>
	)
}

export default App
