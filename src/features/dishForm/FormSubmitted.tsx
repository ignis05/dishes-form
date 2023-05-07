import React from 'react'
import { useDispatch } from 'react-redux'
import { reset } from './DishFormResponseSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import styles from './DishForm.module.css'

function FormSubmitted() {
	const dispatch = useDispatch()
	const res = useSelector((state: RootState) => state.dishFormResponse.formResponse)
	const fileds: [string, string][] = Object.entries(res)

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
