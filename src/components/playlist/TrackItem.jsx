import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';


export const TrackItem = (info) => {
    const {item, onStartDrag, isActive} = info;

    return(
        <TouchableOpacity
            key={item}
            style={styles.touchContainer}
            onLongPress={onStartDrag}
        >
            <View style={[styles.container, {backgroundColor: isActive ? 'tomato' : '#ddd'}]}>
                <Text>{item.artist}</Text>
                <Text>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        height: 50,
    },
    touchContainer: {
        flex: 1,
    },
});
