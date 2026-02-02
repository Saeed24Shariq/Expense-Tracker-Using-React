import { createSlice } from '@reduxjs/toolkit'

const NavBarSlice = createSlice({
    name: 'navbar',
    initialState: {
        value: {
            name: "Dashboard",
            download: false,
            add: true,
            delete: false,
            select: false   // for seelecting the items in transaction
        }
    },
    reducers: {
        setNavbar: (state, action) => {
            state.value.name = action.payload;
            if (state.value.name === 'Transactions') {
                state.value.download = true;
                state.value.add = true;
                state.value.delete = true;
            }
            else if (state.value.name === 'Reports') {
                state.value.download = true;
                state.value.add = false;
                state.value.delete = false;
            }
            else {
                state.value.download = false;
                state.value.add = false;
                state.value.delete = false;
            }
        },
        setSelect: (state) => {
            state.value.select = !state.value.select;
        }
    }
})

export const { setNavbar, setSelect } = NavBarSlice.actions;

export default NavBarSlice.reducer;
