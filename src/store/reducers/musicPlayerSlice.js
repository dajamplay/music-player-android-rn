import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isPlaying: false,
};

export const musicPlayerSlice = createSlice({
    name: 'musicPlayer',
    initialState,
    reducers: {
        changeStateMusicPlayerAction: (state, action) => {
            state.isPlaying = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(changeStateMusicPlayerAction.fulfilled, (state, action) => {
        //     state.isPlaying = action.payload;
        // });
        // builder.addCase(reorderQueueTracks.fulfilled, (state, action) => {
        //     state.tracks = action.payload;
        // });
    },
});

export const {
    changeStateMusicPlayerAction
} = musicPlayerSlice.actions;

export default musicPlayerSlice.reducer;
