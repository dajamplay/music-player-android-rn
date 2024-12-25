import {View, Text, Button, SafeAreaView} from 'react-native';
import DragList from 'react-native-draglist';
import {TrackItem} from '../../components/playlist/TrackItem';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {screenCommonStyles} from '../styles';

export const TracksScreen = ({route, navigation}) => {
    const tracks = route.params.playlist.tracks;
    const dispatch = useDispatch();

    useEffect( () => {
        navigation.setOptions({ title: 'Плейлист: ' + route.params?.playlist.name });
    }, []);

    const playAll = () => {

    };

    return(
        <SafeAreaView style={screenCommonStyles}>
            <Button title={'Проиграть все'} onPress={playAll}/>
            <DragList
                data={tracks}
                keyExtractor={item => item.id}
                renderItem={TrackItem}
                // onReordered={onReordered}
            />
        </SafeAreaView>
    );
};
