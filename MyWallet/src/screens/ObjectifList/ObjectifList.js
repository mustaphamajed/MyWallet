import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomButton from '../../components/CustomButton'
import CustomIconList from '../../components/CustomIconList'
import CustomInput from '../../components/CustomInput'
import Colors from '../../constants/Colors'
import ObjectifListIcon from '../../constants/ObjectifListIcon'
const ObjectifList = () => {
    const [name, setName] = useState('')
    const Navigation = useNavigation()
    const sendData = (item) => {
        Navigation.navigate('NewObjectif', item)
    }
    const sendName = (name) => {
        Navigation.navigate('NewObjectif', name)
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                <Entypo
                    name="cross"
                    size={28}
                    style={{
                        padding: 6,
                        position: 'absolute',

                        left: 0,
                        zIndex: 2,
                    }}
                    color={'#FFF'}
                    onPress={() => {
                        Navigation.goBack(-1)
                    }}
                />
                <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}>Nouvel Objectif</Text>

            </View>
            <View style={styles.footer}>
                <View style={styles.view1}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: Colors.black, top: 5 }}> Pour quoi économisez-vous?</Text>
                    <View style={styles.view}>
                        <Text style={styles.text}>Nom </Text>
                        <CustomInput
                            placeholder={'nom de l objectif'}
                            value={name}
                            setValue={(name) => setName(name)}
                        />
                    </View>
                    <View style={styles.view}>
                        <CustomButton onPress={() => { sendName(name) }} text="CRÉER UN OBJECTIF" />
                    </View>
                    <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: Colors.black, top: 5 }}>certaines choses pour lesquelles les gens économisent:</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <FlatList
                        data={ObjectifListIcon}
                        renderItem={({ item }) => (
                            <CustomIconList color={item.color} iconName={item.IconName} name={item.name} onPress={() => { sendData(item) }} />
                        )}
                        keyExtractor={(item) => item.id}
                        style={{ marginHorizontal: 10 }}
                    />

                </View>
            </View>
        </View>
    )
}
export default ObjectifList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,
    },
    view1: {

        padding: 5
    },

    view: {
        paddingHorizontal: 10,

    },
    text: {
        color: Colors.black,
        padding: 5,
        fontSize: 16,
        fontWeight: '700'
    },
})