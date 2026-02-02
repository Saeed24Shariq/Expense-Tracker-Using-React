import { createSlice } from '@reduxjs/toolkit'


const expnseSlice = createSlice({
    name: 'expense',
    initialState: {
        value: []
    },
    reducers: {
        addValue: (state, action) => {
            state.value.push(action.payload);
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
        deleteValue: (state,  action) => {
            console.log(action.payload)
            state.value = state.value.filter( (item) => {
                return (
                    item.Name != action.payload.Name
                )
            }
            )
        }
    }
})

export const { addValue, setValue, deleteValue } = expnseSlice.actions;

export default expnseSlice.reducer;
