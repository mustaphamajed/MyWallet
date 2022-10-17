import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import Colors from '../constants/Colors'
const CustomInput = ({ value, setValue, placeholder, secureTextEntry, clavier, error }) => {
    return (
        <View style={[styles.container, { borderColor: error === true ? 'red' : 'white' }]}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor="gray"
                keyboardType={clavier ? clavier : "default"}
                secureTextEntry={secureTextEntry}
                style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {
        color: Colors.black
    }
})

export default CustomInput