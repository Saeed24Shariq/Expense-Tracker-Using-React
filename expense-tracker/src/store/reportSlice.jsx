import { createSlice } from '@reduxjs/toolkit'


const reportSlice = createSlice({
    name: 'report',
    initialState: {
        value:
        {
            labels: [],
            dataInValue: [],
            dataOutValue: [],
        }
    },
    reducers: {
        setTotalIn: (state, action) => {
            state.value.dataInValue = action.payload;
        },
        setTotalOut: (state, action) => {
            state.value.dataOutValue = action.payload;
        },
        setLabels: (state, action) => {
            state.value.labels = action.payload;
        }
    }
})

export const { setTotalIn, setTotalOut, setLabels } = reportSlice.actions;

export default reportSlice.reducer;
