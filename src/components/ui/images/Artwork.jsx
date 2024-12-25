import {Image, StyleSheet} from 'react-native';
import React from 'react';

export const Artwork = ({url, width, height}) => {

    const styles = StyleSheet.create({
        artwork: {
            borderRadius: 10,
            width: width ?? 50,
            height: height ?? '100%',
            borderWidth: 1,
            borderColor: '#222',
        },
    });

    return(
        <>
            {url && <Image style={styles.artwork} source={{uri: url }}/>}
        </>
    );
};
