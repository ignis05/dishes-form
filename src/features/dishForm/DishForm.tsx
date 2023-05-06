import React from 'react'
import { Field, InjectedFormProps, formValueSelector, reduxForm } from 'redux-form'
import { inputField, selectField } from './FormComponents'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../../app/store'

const DishForm = (props: InjectedFormProps & HeaderProps) => {
	const { handleSubmit, pristine, submitting, dishTypeValue, spicinessValue } = props
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Field component={inputField} name="name" label="Dish Name" type="text" required={true} />
				<Field component={inputField} name="preparation_time" label="Preparation Time" placeholder="00:00:00" type="text" required={true} />

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
