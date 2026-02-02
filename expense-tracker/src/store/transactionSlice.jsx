import { createSlice } from '@reduxjs/toolkit'


const TransactionSlice = createSlice({
    name: 'navbar',
    initialState: {
        value: {
            isOpen: false
        }
    },
    reducers: {
        open: (state) => {
            state.value.isOpen = true;
        },
        close: (state) => {
            state.value.isOpen = false;
        }
    }
})

export const { open, close } = TransactionSlice.actions;

export default TransactionSlice.reducer;
