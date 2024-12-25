import {createSlice} from '@reduxjs/toolkit';
import {
    addTrackToQueueAction,
    playNextQueueTrack,
    reorderQueueTracks,
    playPrevQueueTrack,
    loadQueueFromLocalStorageAction, clearQueueAction, deleteTrackFromQueueAction,
} from '../actions/queueActions';

const initialState = {
    tracks: [],
};

export const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTrackToQueueAction.fulfilled, (state, action) => {
            state.tracks.push(action.payload);
        });
        builder.addCase(reorderQueueTracks.fulfilled, (state, action) => {
            state.tracks = action.payload;
        });
        builder.addCase(loadQueueFromLocalStorageAction.fulfilled, (state, action) => {
            state.tracks = action.payload;
        });
        builder.addCase(clearQueueAction.fulfilled, (state, action) => {
            state.tracks = [];
        });
        builder.addCase(deleteTrackFromQueueAction.fulfilled, (state, action) => {
            state.tracks = action.payload;
        });
        // builder.addCase(playNextQueueTrack.fulfilled, (state, action) => {
        //     //
        // });
        // builder.addCase(playPrevQueueTrack.fulfilled, (state, action) => {
        //     //
        // });
    },
});

export default queueSlice.reducer;
