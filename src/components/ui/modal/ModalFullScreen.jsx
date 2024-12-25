import {Modal, SafeAreaView, Text, View, StyleSheet, Button} from 'react-native';

export const ModalFullScreen = (props) => {
    return(
        <Modal
            {...props}
            animationType="slide"
            onRequestClose={() => {props?.setVisible(false);}}
        >
            <SafeAreaView style={style.container}>
                <View style={style.titleContainer}>
                    <Text  style={style.title}>{props?.title}</Text>
                </View>
                <View style={style.childrenContainer}>
                    {props?.children}
                </View>
                <View>
                    <Button title={'Закрыть'} onPress={ () => {props?.setVisible(false);}}/>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '100%',
    },
    childrenContainer: {
        flex: 1,
        padding: 6,
    },
    titleContainer: {
        height: 50,
        backgroundColor: 'tomato',
        color: '#aaa',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 30,
        fontWeight: '500',
    }
});
