import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Text, TextInput, View, StyleSheet} from 'react-native';
import LibItem from '../components/lib/LibItem';
import {useActiveTrack, usePlaybackState, State} from 'react-native-track-player';
import {useSelector} from 'react-redux';
import {screenCommonStyles} from './styles';
import TabScreenLayout from './TabScreenLayout';


export const LibScreen = () => {
    const {tracks} = useSelector(state => state.lib);
    const [searchText, setSearchText] = useState('');
    const [filteredTracks, setFilteredTracks] = useState([]);
    const activeTrack = useActiveTrack();
    const playerState = usePlaybackState();

    useEffect(() => {
        setFilteredTracks(tracks);
    }, [tracks]);

    useEffect( () => {
        if (searchText === '') {
            setFilteredTracks(tracks);
        } else {
            const data = tracks.filter( (item) => {
                return item.title.toLowerCase().includes(searchText.toLowerCase())
                    || item.artist.toLowerCase().includes(searchText.toLowerCase());
            });
            setFilteredTracks(data);
        }

    }, [searchText]);

    const getTrackPlayerState = useCallback( (item_id) => {
        if (item_id === activeTrack?.track_id) {
            return playerState.state === State.Playing;
        } else {
            return false;
        }
    }, [playerState, activeTrack]);

    return (
        <TabScreenLayout>
            <View style={{flex: 1}}>
                <TextInput
                    onChangeText={ (text) => {setSearchText(text);}}
                    value={searchText}
                    style={styles.searchInput}
                    placeholder={'Введите название песни или исполнителя'}
                />

                <FlatList
                    data={filteredTracks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <LibItem
                        track={item}
                        isActive={activeTrack?.track_id === item.id}
                        isPlaying={getTrackPlayerState(item.id)}
                    />}
                />
                <View style={styles.trackCountContainer}>
                    <Text>Найдено треков: {filteredTracks.length}</Text>
                </View>
            </View>
        </TabScreenLayout>
    );
};

const styles = StyleSheet.create({
    searchInput: {
        // backgroundColor: '#eee',
        padding: 5,
        // borderBottomWidth: 0.5,
        borderColor: '#999',
    },
    trackCountContainer: {
        // backgroundColor: '#ddd',
        borderBottomWidth: 0.5,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
    },
});
