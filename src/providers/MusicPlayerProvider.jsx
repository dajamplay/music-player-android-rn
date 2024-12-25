import TrackPlayer, {useTrackPlayerEvents, Event} from 'react-native-track-player';
import React, {useEffect} from 'react';
import * as libActions from '../store/actions/LibActions';
import {useDispatch} from 'react-redux';
import * as queueActions from '../store/actions/queueActions';
import {changeStateMusicPlayerAction} from "../store/reducers/musicPlayerSlice";


export const MusicPlayerProvider = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(libActions.fetchTracksAction());
        dispatch(queueActions.loadQueueFromLocalStorageAction());
    }, []);

    const events = [
        Event.PlaybackError,
        Event.PlaybackQueueEnded,
        Event.RemoteNext,
        Event.RemotePrevious,
        Event.PlaybackState,
    ];

    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            dispatch(queueActions.playNextQueueTrack());
        }
        if (event.type === Event.PlaybackQueueEnded) {
            dispatch(queueActions.playNextQueueTrack());
        }
        if (event.type === Event.RemoteNext) {
            dispatch(queueActions.playNextQueueTrack());
        }
        if (event.type === Event.RemotePrevious) {
            dispatch(queueActions.playPrevQueueTrack());
        }
        if (event.type === Event.PlaybackState) {
            if (event.state === 'playing') {
                dispatch(changeStateMusicPlayerAction(true));
            } else {
                dispatch(changeStateMusicPlayerAction(false));
            }
        }
    });

    return(<>{children}</>);
};
