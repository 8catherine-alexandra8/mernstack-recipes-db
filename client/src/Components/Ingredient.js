import React from 'react'

export default function Ingredient({ name, amount }) {
	return (
		<div className='ingredient'>
			<span className='name'>{name}</span>
			<span className='amount'>{amount}</span>
		</div>
	)
}
