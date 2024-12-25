import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from "react-native";


export const AppLoading = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color="tomato"/>
            <Text>Загрузка</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#222',
    },
});
