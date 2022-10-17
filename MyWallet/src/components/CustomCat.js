import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'

const CustomCat = ({ name, montant, type, color }) => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.02, backgroundColor: color }} />
            <View style={{ flex: 0.1, justifyContent: 'center', paddingHorizontal: 10 }}>

            </View>
            <View style={{ flex: 0.6, padding: 10, flexDirection: 'column' }}>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '600' }}>{name}</Text>
                <Text style={{ color: Colors.black, fontSize: 16 }}>Actuel: {montant}</Text>
            </View>
            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: color }}>{type}</Text>
            </View>

        </View>
    )
}

export default CustomCat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginTop: 5,


    }
})