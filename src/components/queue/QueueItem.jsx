import React, {memo, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import TrackItem from '../ui/track/TrackItem';
import {SwipeRow} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {deleteTrackFromQueueAction} from '../../store/actions/queueActions';
import AntDesign from 'react-native-vector-icons/AntDesign';


const QueueItem = ({drag, track, isActive = false, isPlaying = false, index, isInPlaylist = false}) => {
    // console.log('RENDER QueueItem');
    const ref = useRef(SwipeRow);
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    let closeRowTimeout;

    const trackBoxHandler = () => {
        if (isPlaying) {
            TrackPlayer.pause();
            return;
        }
        TrackPlayer.load(track).then( () => {
            TrackPlayer.play();
        });
    };

    const rowOpenHandler = () => {
        clearTimeout(closeRowTimeout);
        closeRowTimeout = setTimeout( () => {
            ref?.current?.closeRow();
        }, 5000);
    };

    const swapRowLeftHandler = () => {
        ref.current.closeRow();
        console.log(track.title);
    };

    const swapRowRightHandler = () => {
        setIsDeleting(true);
        dispatch(deleteTrackFromQueueAction({trackId: track.id}));
    };

    return (
        <>
            <SwipeRow
                rightOpenValue={-120}
                leftOpenValue={120}
                closeOnRowPress={true}
                swipeToClosePercent={1}
                swipeToOpenPercent={1}
                ref={ref}
                onRowOpen={rowOpenHandler}
            >
                <View style={styles.swipeRowContainer}>
                    <TouchableOpacity
                        style={[styles.swipeRowLeft, isInPlaylist && {backgroundColor: 'green'}]}
                        onPress={swapRowLeftHandler}
                    >
                        <MaterialCommunityIcons
                            color={!isInPlaylist ? 'white' : 'white'}
                            size={20}
                            name={'playlist-plus'}
                            style={styles.addToPlaylistButton}
                        />
                        {!isInPlaylist ?
                            <>
                                <Text>Добавить</Text>
                                <Text>в плейлист</Text>
                            </>
                            :
                            <>
                                <Text>Уже</Text>
                                <Text>в плейлисте</Text>
                            </>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.swipeRowRight}
                        onPress={swapRowRightHandler}
                    >
                        {!isDeleting ?
                            <AntDesign name={'delete'} color={'white'} size={20}/>
                            :
                            <ActivityIndicator size={20} color={'white'}/>
                        }
                        <Text>Удалить</Text>
                        <Text>из очереди</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    key={drag.item}
                    onLongPress={drag.onDragStart}
                    onPressOut={drag.onDragEnd}
                    onPress={trackBoxHandler}
                    style={[
                        styles.item,
                        isActive && styles.itemIsActive,
                        drag.isActive && styles.itemActiveDrag,
                    ]}
                >
                    <TrackItem track={track} isActive={isActive} isPlaying={isPlaying} index={index}/>
                </TouchableOpacity>
            </SwipeRow>
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        marginBottom: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0)',
        borderRadius: 5,
    },
    itemIsActive: {
        borderColor: '#111',
    },
    itemActiveDrag: {
        opacity: 0.7,
        borderColor: 'tomato',
        marginHorizontal: 2,
    },
    swipeRowContainer: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        flex: 1,
        marginTop: 4,
        marginBottom: 8,
        marginHorizontal: 11,
        justifyContent: 'space-between',
    },
    swipeRowLeft: {
        backgroundColor: '#5438c7',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
    swipeRowRight: {
        backgroundColor: '#c93c20',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
    },
});

export default memo(QueueItem);
