import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {memo} from 'react';
import {Artwork} from '../images/Artwork';
import {secondsToMinutes} from '../../../utils/time';

const TrackItem = ({track, isActive = false, isPlaying = false, index = null}) => {
    return(
        <View style={[styles.container, isActive && styles.containerActive]}>

            <View style={styles.playContainer}>
                {isPlaying && isActive?
                    <View style={styles.trackNumberContainer}>
                        <AntDesign name={'pause'} size={20} color={'#fff'}/>
                    </View>
                    :
                    <View style={styles.trackNumberContainer}>
                        <AntDesign name={'caretright'} size={12} color={'#fff'}/>
                    </View>
                }
            </View>

            <View style={styles.artworkContainer}>
                <Artwork url={track?.artwork} width={60} height={60}/>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    {track.title}
                </Text>
                <Text style={styles.artist}>{track.artist}</Text>
            </View>

            <View style={styles.durationContainer}>
                <Text style={styles.duration}>{secondsToMinutes(track.duration)}</Text>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'orange',
        flex: 1,
        backgroundColor: '#444',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 60,
        padding: 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#333',
    },
    containerActive: {
        backgroundColor: '#de5026',
        // backgroundColor: 'rgb(252,220,213)',
    },
    playContainer: {
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 20,
    },
    artworkContainer: {
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    durationContainer: {
        // backgroundColor: 'brown',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    duration: {
        color: '#ddd',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#eee',
    },
    artist: {
        color: '#bbb',
    },
    trackNumberContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    trackNumber: {
        color: 'tomato',
        fontSize: 14,
    },
});

export default memo(TrackItem);
