import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigation/Navigator';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {MusicPlayerProvider} from './src/providers/MusicPlayerProvider.jsx';
import {MusicPlayerControl} from './src/components/player/MusicPlayerControl.jsx';
import {setupPlayer} from './src/services/trackPlayerServices';
import {AppLoading} from './src/components/ui/loading/AppLoading.tsx';
import {Appearance} from "react-native";


function App(): React.JSX.Element {
    const [playerIsReady, setPlayerIsReady] = useState(false);

    const playerInit = async () => {
        const isSetup = await setupPlayer();
        setPlayerIsReady(isSetup);
    };

    useEffect(() => {
        playerInit();
    }, []);

    const theme = {
        ...DefaultTheme,
        dark: true,
        colors: {
            ...DefaultTheme.colors,
            background:'#222',
            // card: '#555',
        },
    };

    // const colorScheme = Appearance.getColorScheme();
    Appearance.setColorScheme('dark');

    if (!playerIsReady) {
        return(<AppLoading/>);
    }

    return(
        <Provider store={store}>
            <MusicPlayerProvider>
                <NavigationContainer theme={theme}>
                    <Navigator/>
                </NavigationContainer>
                <MusicPlayerControl/>
            </MusicPlayerProvider>
        </Provider>
    );
}

export default App;
