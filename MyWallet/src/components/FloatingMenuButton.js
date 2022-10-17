import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Modal } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/Colors'

const FloatingMenuButton = ({ style, open }) => {
    const Navigation = useNavigation()



    const animation = new Animated.Value(0)

    const togglemenu = () => {

        if (open === true) {
            Animated.timing(animation, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true
            }).start()
            open = !open
        } else {
            Animated.timing(animation, {
                toValue: 0,
                friction: 5,
                useNativeDriver: true
            }).start()
            open = !open
        }



    }
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }

        ]
    }
    const arrowUpStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20]
                })
            }

        ]
    }
    const arrowDownStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                })
            }

        ]
    }
    return (

        <View style={[styles.container, style]}>
            <TouchableWithoutFeedback onPress={() => Navigation.navigate('NewPrete')}>
                <Animated.View style={[styles.button, styles.secondary, arrowUpStyle]}>
                    <AntDesign name="arrowup" size={20} color={Colors.red} />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Navigation.navigate('NewEmprunte')}>
                <Animated.View style={[styles.button, styles.secondary, arrowDownStyle]}>
                    <AntDesign name="arrowdown" size={20} color={Colors.green} />
                </Animated.View>

            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={togglemenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>
                    <AntDesign name="plus" size={24} color="#FFF" />
                </Animated.View>
            </TouchableWithoutFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute'
    },
    button: {
        // position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#F02A4B',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    menu: {
        backgroundColor: '#F02A4B'
    },
    secondary: {
        width: 48,
        height: 48,
        marginVertical: 5,
        borderRadius: 48 / 2,
        backgroundColor: '#FFF'
    },

})

export default FloatingMenuButton