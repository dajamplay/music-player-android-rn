import {Button, FlatList, SafeAreaView, Text, View} from 'react-native';
import {PlaylistItem} from '../../components/playlist/PlaylistItem';
import {screenCommonStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import prompt from 'react-native-prompt-android';
import {createPlaylistAction} from '../../store/actions/playlistActions';


export const PlaylistsScreen = ({navigation}) => {
    const playlists = useSelector(state => state.playlist.playlists);
    const dispatch = useDispatch();
    console.log(playlists);
    const createPlaylist = () =>
        prompt(
            'Новый плейлист',
            'Введите название плейлиста',
            [
                {text: 'Отменить', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Создать', onPress: name => dispatch(createPlaylistAction({name: name}))},
            ],
            {
                // type: 'numeric',
                cancelable: false,
                defaultValue: '',
                placeholder: 'Введите название плейлиста',
            }
        );

    return(
        <SafeAreaView style={screenCommonStyles}>
            <Button title={'Create playlist'} onPress={createPlaylist}/>
            {playlists.length <= 0 &&
                <View>
                    <Text>Плейлистов нет</Text>
                </View>
            }
            <FlatList
                data={playlists}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PlaylistItem playlist={item}/>}
            />
        </SafeAreaView>
    );
};
