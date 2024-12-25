import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {useActiveTrack, usePlaybackState, State, useProgress} from 'react-native-track-player';
import {secondsToMinutes} from '../../utils/time';
import Slider from '@react-native-community/slider';
import {truncate} from '../../utils/string';
import {Artwork} from '../ui/images/Artwork';
import {useDispatch, useSelector} from 'react-redux';
import {playNextQueueTrack, playPrevQueueTrack} from '../../store/actions/queueActions';


export const MusicPlayerControl = () => {

    const track = useActiveTrack();
    const playerState = usePlaybackState();
    const { position, buffered, duration } = useProgress();
    const [slidePosition, setSlidePosition] = useState(null);
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.musicPlayer.isPlaying);
    const queue = useSelector(state => state.queue.tracks);

    console.log(playerState);

    const iconSize = 32;
    const iconColor = '#fff';

    const play = async () => {
        if (track === undefined && queue.length > 0) {
            await TrackPlayer.load(queue[0]);
        }
        await TrackPlayer.play();
    };

    const pause = async () => {
        await TrackPlayer.pause();
    };

    const next = async () => {
        dispatch(playNextQueueTrack());
    };

    const prev = async () => {
        dispatch(playPrevQueueTrack());
    };

    const slidingCompleteHandle = async (value) => {
        await TrackPlayer.seekTo(value);
        await TrackPlayer.play();
        setSlidePosition(null);
    };

    const slidingStartHandle = async (value) => {
        setSlidePosition(value);
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.duration}>
                        {slidePosition !== null ? secondsToMinutes(slidePosition) : secondsToMinutes(position)}
                    </Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name={'skip-previous'} size={24} color={iconColor} onPress={prev}/>
                    </TouchableOpacity>
                    <Slider
                        style={styles.slider}
                        step={1}
                        value={Math.round(position)}
                        minimumValue={0}
                        maximumValue={Math.round(duration)}
                        minimumTrackTintColor="tomato"
                        maximumTrackTintColor="#000000"
                        thumbTintColor={'tomato'}
                        onSlidingComplete={ (value) => {slidingCompleteHandle(value);}}
                        onValueChange={ (value) => {slidingStartHandle(value);}}
                    />
                    <TouchableOpacity>
                        <MaterialCommunityIcons name={'skip-next'} color={iconColor} size={24} onPress={next}/>
                    </TouchableOpacity>
                    <Text style={styles.duration}>{secondsToMinutes(duration)}</Text>
                </View>
                <View style={styles.bottomContainer}>
                    {track?.artwork &&
                        <View style={styles.artworkContainer}>
                            <Artwork url={track?.artwork} width={40} height={40}/>
                        </View>
                    }
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{truncate(track?.title, 33)}</Text>
                        <Text style={styles.artist}>{truncate(track?.artist, 36)}</Text>
                    </View>
                    <View style={styles.rightControlContainer}>
                        <TouchableOpacity style={styles.playButton}>
                            {isPlaying ?
                                <AntDesign name={'pausecircleo'} color={iconColor} size={iconSize} onPress={pause}/>
                                :
                                <AntDesign name={'caretright'} color={iconColor} size={iconSize} onPress={play}/>
                            }
                            {/*{playerState.state === State.Stopped && <AntDesign name={'caretright'} color={iconColor} size={iconSize} onPress={play}/>}*/}
                            {/*{playerState.state === State.Paused && <AntDesign name={'caretright'} color={iconColor} size={iconSize} onPress={play}/>}*/}
                            {/*{playerState.state === State.Playing && <AntDesign name={'pausecircleo'} color={iconColor} size={iconSize} onPress={stop}/>}*/}
                            {/*{playerState.state === State.Ready && <AntDesign name={'caretright'} color={iconColor} size={iconSize} onPress={play}/>}*/}
                            {/*{playerState.state === State.None && <AntDesign name={'caretright'} color={iconColor} size={iconSize} onPress={play}/>}*/}
                            {/*{playerState.state === State.Error && <AntDesign name={'clockcircle'} color={iconColor} size={iconSize} onPress={stop}/>}*/}
                            {/*{playerState.state === State.Loading && <AntDesign name={'clockcircle'} color={iconColor} size={iconSize} onPress={stop}/>}*/}
                            {/*{playerState.state === State.Buffering &&*/}
                            {/*    // <AntDesign name={'clockcircle'} size={40} onPress={stop}/>*/}
                            {/*    <ActivityIndicator size={iconSize} color={iconColor} />*/}
                            {/*}*/}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#333',
        bottom: 50,
        left: 0,
        right: 0,
        height: 80,
        paddingVertical: 4,
        borderTopWidth: 0.5,
        borderColor: 'rgb(0,0,0)',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
    },
    bottomContainer: {
        // backgroundColor: 'green',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 50,
        paddingLeft: 9,
    },
    rightControlContainer: {
        flexDirection: 'row',
    },
    artworkContainer: {
        paddingLeft: 5,
    },
    slider: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#eee',
    },
    artist: {
        color: '#888',
    },
    duration: {
        paddingHorizontal: 7,
        color: '#ddd',
        fontSize: 14,
    },
    playButton: {
        paddingRight: 20,
    },
});
