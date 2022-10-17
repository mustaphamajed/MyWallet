import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View, Animated, Text } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';





const TabBarAdvancedButton = ({ bgColor, open,
    ...props }) => {
    const Navigation = useNavigation()






    return (



        <View
            style={styles.container}

        >



            <TouchableWithoutFeedback
                style={styles.button}
            >
                <Animated.View style={styles.button}>
                    <AntDesign name="plus" size={24} color="#FFF" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>

    )
}
export default TabBarAdvancedButton
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 75,
        alignSelf: 'center',

    },
    background: {
        position: 'absolute',
        top: 0,
    },
    view: {
        top: -110,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 0.5,
        alignItems: 'center'


    },

    button: {
        top: -100,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        backgroundColor: '#F02A4B',

    },
    menu: {
        backgroundColor: '#F02A4B',
        alignItems: 'center',
    },
    buttonIcon: {
        fontSize: 16,
        color: '#F6F7EB'
    }
});