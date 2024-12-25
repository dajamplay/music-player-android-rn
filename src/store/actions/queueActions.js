import {createAsyncThunk} from '@reduxjs/toolkit';
import TrackPlayer from 'react-native-track-player';
import {prepareTrackToAddQueue} from '../../utils/track';
import {Alert} from 'react-native';
import * as localStorage from '../../local_storage/localStorageActions';


export const loadQueueFromLocalStorageAction = createAsyncThunk(
    'queue/loadQueueFromLocalStorageAction',
    async (_, thunkAPI) => {
        try {
            return await localStorage.getQueue();
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const clearQueueAction = createAsyncThunk(
    'queue/clearQueueAction',
    async (_, thunkAPI) => {
        try {
            await localStorage.clearQueue();
            await TrackPlayer.reset();
            return [];
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const addTrackToQueueAction = createAsyncThunk(
    'queue/addTrack',
    async (track, thunkAPI) => {
        try {
            track = prepareTrackToAddQueue(track);
            // await TrackPlayer.load(track);
            // await TrackPlayer.play();
            await localStorage.addTrackQueue(track);
            Alert.alert('Трек добавлен в очередь',
                track.title + ' - ' + track.artist);
            return track;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const reorderQueueTracks = createAsyncThunk(
    'queue/reorderQueueTracks',
    async (args, thunkAPI) => {
        const state = await thunkAPI.getState();
        const queue = [...state.queue.tracks];
        try {
            const removed = queue.splice(args.fromIndex, 1);
            queue.splice(args.toIndex, 0, removed[0]);
            return queue;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const playNextQueueTrack = createAsyncThunk(
    'queue/playNextQueueTrack',
    async (_, thunkAPI) => {
        const state = await thunkAPI.getState();
        const queue = [...state.queue.tracks];
        const activeTrack = await TrackPlayer.getActiveTrack();

        try {
            if (queue.length <= 0) return undefined;

            if (activeTrack === undefined) {
                await TrackPlayer.load(queue[0]);
                await TrackPlayer.play();
                return queue[0];
            }

            let currentTrackIndex;
            queue.forEach( (item, index) => {
                if (item.id === activeTrack.id) {
                    currentTrackIndex = index;
                }
            });

            if (currentTrackIndex >= queue.length - 1) {
                await TrackPlayer.load(queue[0]);
                await TrackPlayer.play();
                return queue[0];
            } else {
                await TrackPlayer.load(queue[currentTrackIndex + 1]);
                await TrackPlayer.play();
                return queue[currentTrackIndex + 1];
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const playPrevQueueTrack = createAsyncThunk(
    'queue/playPrevQueueTrack',
    async (_, thunkAPI) => {
        const state = await thunkAPI.getState();
        const queue = [...state.queue.tracks];
        const activeTrack = await TrackPlayer.getActiveTrack();

        try {
            if (queue.length <= 0) return undefined;

            if (activeTrack === undefined) {
                await TrackPlayer.load(queue[0]);
                await TrackPlayer.play();
                return queue[0];
            }

            let currentTrackIndex;
            queue.forEach( (item, index) => {
                if (item.id === activeTrack.id) {
                    currentTrackIndex = index;
                }
            });

            if (currentTrackIndex <= 0) {
                await TrackPlayer.load(queue[queue.length - 1]);
                await TrackPlayer.play();
                return queue[queue.length - 1];
            } else {
                await TrackPlayer.load(queue[currentTrackIndex - 1]);
                await TrackPlayer.play();
                return queue[currentTrackIndex - 1];
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);

export const deleteTrackFromQueueAction = createAsyncThunk(
    'queue/deleteTrackFromQueueAction',
    async ({trackId}, thunkAPI) => {
        try {
            await TrackPlayer.reset();

            await localStorage.deleteTrackFromQueue(trackId);

            const state = await thunkAPI.getState();
            let queue = [...state.queue.tracks];

            queue = queue.filter( (track) => {
                return track.id !== trackId;
            });

            return queue;
        } catch (e) {
            return thunkAPI.rejectWithValue('Ошибка.');
        }
    }
);
