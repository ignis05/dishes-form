import React from 'react'
import styles from './DishForm.module.css'

type FormSubmittedProps = {
	res: any
	goBack: Function
}
function FormSubmitted(props: FormSubmittedProps) {
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
			<button onClick={(e) => props.goBack()}>Back to form</button>
		</div>
	)
}

export default FormSubmitted
