import {createSlice} from '@reduxjs/toolkit';
import {fetchTracksAction} from '../actions/LibActions';


const initialState = {
    tracks: [],
    error: '',
    isLoading: false,
};

export const libSlice = createSlice({
    name: 'lib',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracksAction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTracksAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.tracks = action.payload;
        });
        builder.addCase(fetchTracksAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default libSlice.reducer;
