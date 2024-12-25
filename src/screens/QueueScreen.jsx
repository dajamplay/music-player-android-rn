import {Button, View} from 'react-native';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback} from 'react';
import QueueItem from '../components/queue/QueueItem';
import DragList from 'react-native-draglist';
import {clearQueueAction, reorderQueueTracks} from '../store/actions/queueActions';
import TabScreenLayout from './TabScreenLayout';

export const QueueScreen = () => {
    const tracks = useSelector(state => state.queue.tracks);
    const activeTrack = useActiveTrack();
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.musicPlayer.isPlaying);

    const getTrackPlayerState = (item_id) => {
        if (item_id === activeTrack?.id) {
            return isPlaying;
        } else {
            return false;
        }
    };

    const isInPlaylist = () => {
        return false;
    };

    async function onReordered(fromIndex, toIndex) {
        dispatch(reorderQueueTracks({fromIndex, toIndex}));
    }

    async function clearQueueButtonHandler() {
        dispatch(clearQueueAction());
    }

    return (
        <TabScreenLayout>
            <View style={{paddingTop: 5, flex: 1}}>
                <Button title={'Очистить очередь'} onPress={clearQueueButtonHandler}/>
                <DragList
                    style={{marginBottom: 35}}
                    data={tracks}
                    keyExtractor={(item) => item.id}
                    onReordered={onReordered}
                    renderItem={(info) => <QueueItem
                        track={info.item}
                        index={info.index}
                        isPlaying={getTrackPlayerState(info.item.id)}
                        isActive={activeTrack?.id === info.item.id}
                        drag={info}
                        isInPlaylist={isInPlaylist()}
                    />}
                />
            </View>
        </TabScreenLayout>
    );
};
