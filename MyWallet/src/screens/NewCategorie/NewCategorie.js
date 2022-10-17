import { StyleSheet, Text, View, FlatList, Dimensions, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesom5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import CustomIcons from '../../components/CustomIcons'
import CustomInput from '../../components/CustomInput'
import CustomColorPicker from '../../components/CustomColorPicker'
import ListIcon from '../../constants/ListIcon'
import ListColor from '../../constants/ListColor'
import { useDispatch } from 'react-redux'
import CategorieActions from '../../Redux-Saga/Store/Categorie/Actions'

const height = Dimensions.get('screen').height
const NewCategorie = () => {
    const dispatch = useDispatch()
    const Navigation = useNavigation();
    const [name, setName] = useState()
    const [couleur, setCouleur] = useState()
    const [iconModal, setIconModal] = useState(false)
    const [icon, setIcon] = useState()

    const addCategorie = () => {
        const payload = {
            name: name,
            color: couleur,
            IconName: icon.IconName
        }
        dispatch(CategorieActions.newCategorie(payload))
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <Entypo
                    name="cross"
                    size={28}
                    style={{
                        padding: 12,
                        position: 'absolute',
                        top: 6,
                        left: 0,
                        zIndex: 2,
                    }}
                    color={'#FFF'}
                    onPress={() => {
                        Navigation.goBack(-1)
                    }}
                />
                <Text style={{ alignSelf: 'center', color: Colors.white, fontSize: 18, fontWeight: '700' }}>Nouveau Categorie</Text>
                <AntDesign
                    name="check"
                    size={28}
                    style={{
                        padding: 12,
                        position: 'absolute',
                        top: 6,
                        right: 0,
                        zIndex: 2,
                    }}
                    color={'#FFF'}
                    onPress={() => {
                        addCategorie()
                    }}
                />
            </View>
            <ScrollView style={styles.footer}>
                <View style={{ flex: 0.5, margin: 10, borderRadius: 8, backgroundColor: Colors.white }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Colors.black, padding: 5, fontSize: 15, fontWeight: '700' }}>Choisir un icon</Text>
                        {!icon ?
                            <FontAwesom5 name='sort-amount-down' size={50} style={styles.icon} color='black' onPress={() => setIconModal(true)} />
                            :
                            <MaterialIcons name={icon.IconName} size={50} style={styles.icon} color='black' onPress={() => setIconModal(true)} />}

                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Colors.black, padding: 5, fontSize: 15, fontWeight: '700' }}>Choisir un couleur</Text>



                        <FlatList
                            data={ListColor}
                            renderItem={({ item }) => (
                                <CustomColorPicker color={item.colorName} onPress={() => setCouleur(item.colorName)} />
                            )}
                            keyExtractor={(item) => item.id}
                            style={{ marginVertical: 20, alignSelf: 'center' }}
                            horizontal
                        />


                    </View>

                </View>
                <View style={{ flex: 0.2, marginHorizontal: 10 }}>
                    <Text style={{ color: Colors.black, padding: 5, fontSize: 15, fontWeight: '700' }}>Entre un nom</Text>
                    <CustomInput placeholder='' value={name} setValue={setName} />
                </View>
            </ScrollView>
            <Modal visible={iconModal} transparent={true} animationType='fade'>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',

                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={styles.modal}>
                        <Entypo
                            name="cross"
                            size={28}
                            style={{
                                padding: 2,
                                position: 'absolute',

                                left: 0,
                                zIndex: 2,
                            }}
                            color={Colors.red}
                            onPress={() => {
                                setIconModal(false)
                            }}
                        />
                        <FlatList
                            data={ListIcon}
                            renderItem={({ item }) => (
                                <CustomIcons item={item} onPress={() => { setIcon(item); setIconModal(false); }} />
                            )}
                            keyExtractor={(item) => item.id}
                            style={{ marginHorizontal: 20 }}
                        />
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default NewCategorie

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    modal: {
        width: 90,
        height: 250,
        backgroundColor: '#FFFF',
        borderRadius: 10,
        top: height / 4,
        borderStyle: 'solid',
        elevation: 50,
    },
    icon: { marginVertical: 20, alignSelf: 'center' },
})