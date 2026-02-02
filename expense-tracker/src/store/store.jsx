import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expenseSlice.jsx'
import navbarReducer from './NavBarSlice.jsx';
import transactionReducer from './transactionSlice.jsx'
import reportReducer from './reportSlice.jsx'


export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    navbar: navbarReducer,
    transaction: transactionReducer,
    report: reportReducer
  }
})