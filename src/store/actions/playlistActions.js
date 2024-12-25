import {createAsyncThunk} from '@reduxjs/toolkit';

export const createPlaylistAction = createAsyncThunk(
    'tracks/createPlaylistAction',
    async ({name}, thunkAPI) => {
        try {
            const playlist = {
                id: Date.now(),
                name: name,
                tracks: [],
            };
            return playlist;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);
