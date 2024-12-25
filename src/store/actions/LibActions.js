import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiGetTracksUrl, serverUrl} from '../../config/app';

export const fetchTracksAction = createAsyncThunk(
    'tracks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(apiGetTracksUrl);
            let data = response.data;
            data = data.map( (track) => {
                return {
                    ...track,
                    url: serverUrl + track.url,
                    artwork: serverUrl + track.artwork,
                    track_id: track.id,
                };
            });
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка. Попробуйте подключиться позднее.');
        }
    }
);
