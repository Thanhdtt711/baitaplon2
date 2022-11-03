import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const init = {
    songs: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState: init,
    reducers: {
        doSearch: (state, action) => {
            state.songs = '123';
        }
    },
    extraReducers: {
        
    }
});

export const searchSelector = (state) => state.search.songs;

export const {doSearch} = searchSlice.actions;

export default searchSlice.reducer;