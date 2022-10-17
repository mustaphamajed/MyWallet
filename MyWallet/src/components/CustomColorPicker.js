import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CustomColorPicker = ({ color, onPress }) => {
    return (
        <TouchableOpacity style={{ ...styles.circle, backgroundColor: color }} onPress={onPress}>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    circle: { width: 90, height: 25, borderRadius: 5, borderWidth: 0.5, margin: 10 }
})

export default CustomColorPicker