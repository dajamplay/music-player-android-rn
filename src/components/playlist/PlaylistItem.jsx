import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TrackItem} from './TrackItem';
import {useDispatch} from 'react-redux';
import DragList from 'react-native-draglist';
import {useNavigation} from '@react-navigation/native';


export const PlaylistItem = ({playlist}) => {

    const [tracksVisible, setTracksVisible] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // const showTracks = () => {
    //     setTracksVisible(state => !state);
    // };

    const showTracks = () => {
        navigation.navigate('TracksScreen', {playlist: playlist});
    };

    const addManyTracksToQueue = () => {

    };

    async function onReordered(fromIndex, toIndex) {
        console.log(fromIndex, toIndex);
        // Since we remove the element first, account for its index shift
        // const finalIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
        // const copy = [...data];		// Don't modify react data in-place
        // const removed = copy.splice(fromIndex, 1);
        //
        // copy.splice(finalIndex, 0, removed[0]);	// Now insert at the new pos
        // setData(copy);
    }

    return (
        <>
            <TouchableOpacity onPress={showTracks}>
                <View style={style.container}>
                    <Text>{playlist.name}</Text>
                    <Text>{playlist.tracks.length}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const style = StyleSheet.create({
    container: {
        // backgroundColor: '#eee',
        borderRadius: 25,
        minHeight: 50,
        margin: 5,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#999',
        borderWidth: 1,
    },
});
