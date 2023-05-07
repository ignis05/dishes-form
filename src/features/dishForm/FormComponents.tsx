import { HTMLInputTypeAttribute } from 'react'
import { WrappedFieldProps } from 'redux-form'
import styles from './DishForm.module.css'

type inputFieldProps = {
	label: string
	type: HTMLInputTypeAttribute
	required: boolean
	extraHtmlAttributes: { min?: number; max?: number; placeholder: string }
}
const inputField = ({ input, label, type, required, meta, extraHtmlAttributes }: inputFieldProps & WrappedFieldProps) => (
	<div>
		<label>{label}</label>
		<div>
			<input {...input} type={type} {...extraHtmlAttributes} required={required} />
			{meta.touched && meta.error && <div className={styles.formErrorField}>* {meta.error}</div>}
		</div>
	</div>
)

type selectFieldProps = {
	label: string
	required: boolean
	children: JSX.Element[]
}
const selectField = ({ input, label, required, meta, children }: selectFieldProps & WrappedFieldProps) => (
	<div>
		<label>{label}</label>
		<div>
			<select {...input} required={required}>
				{children}
			</select>
			{meta.touched && meta.error && <div className={styles.formErrorField}>* {meta.error}</div>}
		</div>
	</div>
)

export { inputField, selectField }
