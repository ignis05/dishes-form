import React from 'react'
import axios from 'axios'
import { ConnectedProps, connect, useDispatch } from 'react-redux'
import { Field, InjectedFormProps, SubmissionError, formValueSelector, reduxForm } from 'redux-form'
import { RootState } from '../../app/store'
import { set } from './DishFormResponseSlice'
import { inputField, selectField } from './FormComponents'
import styles from './DishForm.module.css'

const DishForm = (props: InjectedFormProps & HeaderProps) => {
	const { handleSubmit, pristine, submitting, dishTypeValue, spicinessValue } = props
	const dispatch = useDispatch()

	const submit = async (data: any) => {
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
		// throw any validation errors or dispatch positive server reponse
		let response = await axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', cleanData).catch((err) => {
			if (!err.response.data) throw err
			throw new SubmissionError(err.response.data)
		})
		if (!response) return
		dispatch(set(response.data))
	}

	const prepTimeFormatter = (value: string, prevValue: string) => {
		// only format if value didn't change, that's when user unfocused input
		if (value !== prevValue) return value

		let parts = value.split(':')
		let s = parts.at(-1) || '00'
		let m = parts.at(-2) || '00'
		let h = parts.at(-3) || '00'
		if (s.length < 2) s = '0' + s
		if (m.length < 2) m = '0' + m
		if (h.length < 2) h = '0' + h

		return `${h}:${m}:${s}`
	}

	return (
		<form onSubmit={handleSubmit(submit)} className={styles.formCard}>
			<div>
				<h2>Dish form</h2>
				<Field
					component={inputField}
					name="name"
					label="Dish Name"
					type="text"
					required={true}
					extraHtmlAttributes={{ placeholder: 'HexOcean Pizza' }}
				/>
				<Field
					component={inputField}
					name="preparation_time"
					label="Preparation Time"
					type="text"
					required={true}
					normalize={prepTimeFormatter}
					extraHtmlAttributes={{ placeholder: '00:00:00' }}
				/>

				<Field component={selectField} name="type" label="Dish type" required={true}>
					<option />
					<option value="pizza">Pizza</option>
					<option value="soup">Soup</option>
					<option value="sandwich">Sandwich</option>
				</Field>

				{dishTypeValue === 'pizza' && (
					<>
						<Field component={inputField} name="no_of_slices" label="# of slices" type="number" required={true} />
						<Field component={inputField} name="diameter" label="Diameter" type="number" required={true} />
					</>
				)}
				{dishTypeValue === 'soup' && (
					<Field
						component={inputField}
						name="spiciness_scale"
						label={`Spiciness scale (1-10): ${spicinessValue || '6'}`}
						type="range"
						extraHtmlAttributes={{ min: 1, max: 10 }}
						required={true}
					/>
				)}
				{dishTypeValue === 'sandwich' && (
					<Field component={inputField} name="slices_of_bread" label="Slices of bread: " type="number" required={true} />
				)}
			</div>
			<button type="submit" disabled={pristine || submitting}>
				Submit
			</button>
		</form>
	)
}

const selector = formValueSelector('dish-form')
const connector = connect((state: RootState) => {
	const dishTypeValue = selector(state, 'type')
	const spicinessValue = selector(state, 'spiciness_scale')
	return {
		dishTypeValue,
		spicinessValue,
	}
})
type HeaderProps = ConnectedProps<typeof connector>
const connectDecorated = connector(DishForm)

const reduxFormDecorated = reduxForm({ form: 'dish-form' })(connectDecorated)

export default reduxFormDecorated
