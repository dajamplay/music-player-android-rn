import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    serverUrl: '',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(addTrackToQueueAction.fulfilled, (state, action) => {
        //     state.tracks.push(action.payload);
        // });
        // builder.addCase(reorderQueueTracks.fulfilled, (state, action) => {
        //     state.tracks = action.payload;
        // });
    },
});

export default settingsSlice.reducer;
