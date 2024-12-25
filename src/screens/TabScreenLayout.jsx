import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTracksAction} from '../store/actions/LibActions';

const TabScreenLayout = ({children}) => {

    const tracksIsLoading = useSelector(state => state.lib.isLoading);
    const tracksLoadingError = useSelector(state => state.lib.error);
    const dispatch = useDispatch();

    const reconnectButtonHandler = () => {
        dispatch(fetchTracksAction());
    };

    const goToSettingsButtonHandler = () => {
        console.log('Настройки');
    };

    if (tracksIsLoading) {
        return(
            <View style={styles.errorContainer}>
                <Text>{tracksLoadingError}</Text>
                <Button title={'Переподключиться'} onPress={reconnectButtonHandler}/>
                <Text>---</Text>
                <Text>Можно поменять сервер в настройках</Text>
                <Button title={'Смена сервера'} onPress={goToSettingsButtonHandler}/>
            </View>
        );
    }

    return(
        <View style={styles.screenContainer}>
            {children}
        </View>);
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        marginBottom: 130,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 130,
    },
});

export default TabScreenLayout;
