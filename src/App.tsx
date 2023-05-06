import React, { useState } from 'react'
import './App.css'
import DishForm from './features/dishForm/DishForm'
import axios from 'axios'
import { updateSyncErrors } from 'redux-form'
import FormSubmitted from './features/dishForm/FormSubmitted'

function App() {
	const [res, setRes] = useState<any>(undefined)

	const submitDishForm = async (data: any, dispatch: Function) => {
		// leave only fields matching dish type
		const cleanData: any = { name: data.name, preparation_time: data.preparation_time, type: data.type }
		switch (data.type) {
			case 'pizza':
				cleanData.no_of_slices = data.no_of_slices
				cleanData.diameter = data.diameter
				break
			case 'soup':
				cleanData.spiciness_scale = data.spiciness_scale || 6 // default value of range input
				break
			case 'sandwich':
				cleanData.slices_of_bread = data.slices_of_bread
				break
		}
		console.log(cleanData)
		let response = await axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', cleanData).catch((err) => {
			if (!err.response.data) throw err
			dispatch(updateSyncErrors('dish-form', err.response.data, undefined))
		})
		if (!response) return
		setRes(response.data)
	}

	const goBack = () => {
		setRes(undefined)
	}

	return (
		<div>
			{res && <FormSubmitted res={res} goBack={goBack} />}
			{!res && <DishForm onSubmit={submitDishForm} />}
		</div>
	)
}

export default App
