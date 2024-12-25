import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TracksScreen} from './playlist/TracksScreen';
import {stackHeaderStyle} from './styles';
import {PlaylistsScreen} from './playlist/PlaylistsScreen';
import TabScreenLayout from './TabScreenLayout';

export const PlaylistScreen = () => {
    const Stack = createNativeStackNavigator();

    return(
        <TabScreenLayout>
            <Stack.Navigator>
                <Stack.Screen
                    name={'PlaylistsScreen'}
                    component={PlaylistsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name={'TracksScreen'} component={TracksScreen} options={{...stackHeaderStyle}}/>
            </Stack.Navigator>
        </TabScreenLayout>
    );
};
