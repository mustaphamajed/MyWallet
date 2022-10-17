import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../constants/Colors'

const CustomIcons = ({ item, onPress }) => {
    const Navigation = useNavigation()
    return (
        <Pressable style={styles.container} onPress={onPress}>

            <MaterialIcon name={item.IconName} color={item.color ? item.color : 'black'} size={28} onPress={onPress} />
            <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 16, fontWeight: '500' }}>{item.name ? item.name : null}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: Colors.gray,
        backgroundColor: Colors.white

    }
})

export default CustomIcons