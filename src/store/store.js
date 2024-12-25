import {configureStore} from '@reduxjs/toolkit';
import libReducer from './reducers/libSlice';
import queueReducer from './reducers/queueSlice';
import settingsReducer from './reducers/settingsSlice';
import musicPlayerReducer from './reducers/musicPlayerSlice';
import playlistReducer from './reducers/playlistSlice';

export const store = configureStore({
    reducer: {
        lib: libReducer,
        queue: queueReducer,
        settings: settingsReducer,
        musicPlayer: musicPlayerReducer,
        playlist: playlistReducer,
    },
});
