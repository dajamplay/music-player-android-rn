import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LibScreen} from '../screens/LibScreen';
import {PlaylistScreen} from '../screens/PlaylistScreen';
import {QueueScreen} from '../screens/QueueScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import FeatherIcons from 'react-native-vector-icons/Feather';
import SettingsScreen from '../screens/SettingsScreen';


export const Navigator = (props) => {
    const TabStack = createBottomTabNavigator();
    const sizeIcon = 24;

    return (
        <TabStack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#222',
                height: 22,
                shadowColor: '#222',
            },
            headerTitleStyle: {
                fontSize: 16,
                color: 'tomato',
            },
            tabBarStyle: {
                position: 'absolute',
                height: 50,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: '#333',
            },
            tabBarActiveTintColor: '#eee',
            tabBarActiveBackgroundColor: 'tomato',
            tabBarLabelStyle: {
                fontSize: 10,
                marginBottom: 7,
            },
        }}>
            <TabStack.Screen
                name={'QueueScreen'}
                component={QueueScreen}
                options={{
                    title: 'Очередь',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="play" color={color} size={sizeIcon} />
                    )
                }}/>
            <TabStack.Screen
                name={'PlaylistScreen'}
                component={PlaylistScreen}
                options={{
                    title: 'Плейлисты',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="playlist-music" color={color} size={sizeIcon} />
                    ),
                }}/>
            <TabStack.Screen
                initialParams={{ tracks: props.tracks }}
                name={'LibScreen'}
                component={LibScreen}
                options={{
                    title: 'Библиотека',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="earth" color={color} size={sizeIcon} />
                    ),
                }}/>
            <TabStack.Screen
                name={'SettingsScreen'}
                component={SettingsScreen}
                options={{
                    title: 'Настройки',
                    tabBarIcon: ({ color, size }) => (
                        <FeatherIcons name="settings" color={color} size={sizeIcon} />
                    ),
                }}/>
        </TabStack.Navigator>
    );
}
