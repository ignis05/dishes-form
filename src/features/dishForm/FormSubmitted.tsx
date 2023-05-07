import React from 'react'
import { useDispatch } from 'react-redux'
import { reset } from './DishFormResponseSlice'
import styles from './DishForm.module.css'

type FormSubmittedProps = {
	res: any
}
function FormSubmitted(props: FormSubmittedProps) {
	const dispatch = useDispatch()
	const fileds: [string, string][] = Object.entries(props.res)

	return (
		<div className={`${styles.formCard} ${styles.responseCard}`}>
			<h2>Your response has been submitted!</h2>
			<div>
				<table>
					<tbody>
						{fileds.map((f) => {
							return (
								<tr key={f[0]}>
									<td>{f[0]}:</td>
									<td style={{ color: 'green' }}>{f[1]}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<button onClick={(e) => dispatch(reset())}>Back to form</button>
		</div>
	)
}

export default FormSubmitted
