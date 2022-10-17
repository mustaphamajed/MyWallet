import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'
const CustomIconList = ({ color, name, iconName, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', left: 10 }}>
                <MaterialIcons name={iconName} size={35} color={color} />
                <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '700', color: Colors.black, left: 10 }}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomIconList

const styles = StyleSheet.create({})