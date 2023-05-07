import React from 'react'
import { Field, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form'
import { inputField, selectField } from './FormComponents'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../../app/store'
import styles from './DishForm.module.css'

const DishForm = (props: InjectedFormProps & HeaderProps) => {
	const { handleSubmit, pristine, submitting, dishTypeValue, spicinessValue } = props

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
		<form onSubmit={handleSubmit} className={styles.formCard}>
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
						label={`Spiciness scale (1-10): ${spicinessValue || ''}`}
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
