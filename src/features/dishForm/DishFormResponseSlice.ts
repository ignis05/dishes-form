import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DishFormResponseState {
	formResponse: any
}

const initialState: DishFormResponseState = {
	formResponse: undefined,
}

export const DishFormResponseSlice = createSlice({
	name: 'DishFormResponse',
	initialState,
	reducers: {
		reset: (state) => {
			state.formResponse = undefined
		},
		set: (state, action: PayloadAction<any>) => {
			state.formResponse = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { reset, set } = DishFormResponseSlice.actions

export default DishFormResponseSlice.reducer
