import {createSlice} from '@reduxjs/toolkit';
import {createPlaylistAction} from '../actions/playlistActions';

const initialState = {
    playlists: [],
};

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPlaylistAction.fulfilled, (state, action) => {
            state.playlists.push(action.payload);
        });
    },
});

export default playlistSlice.reducer;
