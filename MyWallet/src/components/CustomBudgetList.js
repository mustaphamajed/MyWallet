import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'

const CustomBudgetList = ({ props, onPress }) => {

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.black }}>Budget Name: </Text>
                <Text style={{ color: Colors.black }}>{props.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.black }}>initialBudget: </Text>
                <Text style={{ color: Colors.black }}>{props.initialBudget}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.black }}>Finale Budget: </Text>
                <Text style={{ color: Colors.black }}>{props.finalBudget}</Text>
            </View>

        </Pressable>
    )
}

export default CustomBudgetList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 10,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: '#FFF',
    }
})