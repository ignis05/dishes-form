import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import dishFormResponseReducer from '../features/dishForm/DishFormResponseSlice'

export const store = configureStore({
	reducer: {
		form: formReducer,
		dishFormResponse: dishFormResponseReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
