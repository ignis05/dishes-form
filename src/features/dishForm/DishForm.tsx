import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

let DishForm = (props: InjectedFormProps) => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="firstName">First Name</label>
				<Field name="firstName" component="input" type="text" />
			</div>
		</form>
	)
}

export default reduxForm({
	// a unique name for the form
	form: 'dish-form',
})(DishForm)
