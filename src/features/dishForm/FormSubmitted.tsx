import React from 'react'

type FormSubmittedProps = {
	res: any
	goBack: Function
}
function FormSubmitted(props: FormSubmittedProps) {
	const fileds: [string, string][] = Object.entries(props.res)
	return (
		<div>
			<h2>Your response has been submitted!</h2>
			<div>
				{fileds.map((f) => {
					return (
						<div key={f[0]}>
							<span>{f[0]}:</span>
							<span style={{ color: 'green' }}>{f[1]}</span>
						</div>
					)
				})}
			</div>
			<button onClick={(e) => props.goBack()}>Back to form</button>
		</div>
	)
}

export default FormSubmitted
