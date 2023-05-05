import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'

export const store = configureStore({
	reducer: {
		form: formReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
