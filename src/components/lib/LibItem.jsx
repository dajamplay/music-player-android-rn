import React, {memo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTrackToQueueAction} from '../../store/actions/queueActions';
import TrackItem from '../ui/track/TrackItem';
import {SwipeRow} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {logPlugin} from "@babel/preset-env/lib/debug";


const LibItem = ({track, isActive = false, isPlaying = false}) => {
    const dispatch = useDispatch();
    const ref = useRef(SwipeRow);
    let closeRowTimeout;

    const rowOpenHandler = () => {
        clearTimeout(closeRowTimeout);
        closeRowTimeout = setTimeout( () => {
            ref.current.closeRow();
        }, 5000);
    };

    const hiddenButtonHandler = () => {
        ref.current.closeRow();
        console.log(track.title);
    };

    const addTrackToQueue = () => {
        dispatch(addTrackToQueueAction(track));
    };

    return (
        <>
            <SwipeRow
                rightOpenValue={-180}
                leftOpenValue={180}
                closeOnRowPress={true}
                swipeToClosePercent={5}
                swipeToOpenPercent={5}
                ref={ref}
                onRowOpen={rowOpenHandler}
            >
                <TouchableOpacity
                    style={styles.hiddenContainer}
                    onPress={hiddenButtonHandler}
                >
                    <View style={styles.hiddenButtonContainer}>
                        <Text>Добавить в плейлист</Text>
                        <MaterialCommunityIcons
                            color={'tomato'}
                            size={40}
                            name={'playlist-plus'}
                            style={styles.addToPlaylistButton}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={addTrackToQueue}
                    style={styles.item}
                    activeOpacity={0.9}
                >
                    <TrackItem track={track} isActive={isActive} isPlaying={isPlaying}/>
                </TouchableOpacity>
            </SwipeRow>
        </>
    );
};

const styles = StyleSheet.create({
    hiddenContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    hiddenButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    addToPlaylistButton: {},
    item: {
        marginBottom: 7,
        marginHorizontal: 5,
    },
});

export default memo(LibItem);
