import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'QUEUE_KEY';

export const getQueue = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(QUEUE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e);
    }
};

export const addTrackQueue = async (track) => {
    try {
        const queue = await getQueue();
        queue.push(track);
        const jsonValue = JSON.stringify(queue);
        await AsyncStorage.setItem(QUEUE_KEY, jsonValue);
    } catch (e) {
        console.log(e);
    }
};

export const clearQueue = async () => {
    try {
        await AsyncStorage.setItem(QUEUE_KEY, '');
    } catch (e) {
        console.log(e);
    }
};

export const deleteTrackFromQueue = async (trackId) => {
    let queue = await getQueue();
    queue = queue.filter( (track) => {
        return track.id !== trackId;
    });
    const jsonValue = JSON.stringify(queue);
    await AsyncStorage.setItem(QUEUE_KEY, jsonValue);
};
