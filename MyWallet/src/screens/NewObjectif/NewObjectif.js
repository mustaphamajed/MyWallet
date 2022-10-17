import { StyleSheet, Text, Dimensions, TouchableOpacity, View, Pressable, ScrollView, Modal, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import Colors from '../../constants/Colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
const height = Dimensions.get('screen').height
import FontAwesom5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomIcons from '../../components/CustomIcons'
import ListIcon from '../../constants/ListIcon'
import ListColor from '../../constants/ListColor'
import CustomColorPicker from '../../components/CustomColorPicker'
import { useDispatch } from 'react-redux'
import GoalActions from '../../Redux-Saga/Store/Goal/Actions'
const NewObjectif = ({ route }) => {
    const dispatch = useDispatch()
    const Navigation = useNavigation()
    const [name, setName] = useState()
    const [note, setNote] = useState('')
    const [montantciblee, setMontantCiblee] = useState()
    const [dejaenregistree, setDejaEnregistree] = useState()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [iconModal, setIconModal] = useState(false)
    const [icon, setIcon] = useState()
    const [colorModal, setColorModal] = useState(false)
    const [color, setColor] = useState()
    const item = route.params
    const [err, setErr] = useState({
        n: false,
        m: false,
        d: false,
        no: false

    })
    const parseDate = date => {
        var d = Date.parse(date);
        var year = new Date(d).getFullYear().toString();
        var month = new Date(d).getMonth().toString();
        var day = new Date(d).getDate().toString();

        return day + '-' + month + '-' + year;
    };
    const addGoal = () => {
        if (!name) {
            setErr({ ...err, n: true })
        } else if (!montantciblee) {
            setErr({ ...err, m: true })
        } else if (!dejaenregistree) {
            setErr({ ...err, d: true })
        } else if (!note) {
            setErr({ ...err, no: true })
        } else {
            const payload = {
                name: name,
                MontantCible: montantciblee,
                Enregistre: dejaenregistree,
                date: parseDate(date),
                icon: icon.IconName,
                color: color,
                note: note

            }
            dispatch(GoalActions.newGoal(payload))
        }

    }
    useEffect(() => {


        if (typeof item === 'string') {
            setName(item)
        } else {
            setName(item.name);
            setColor(item.color);
            setIcon({ ...icon, IconName: item.IconName })
        }

    }, [])

    const changeColor = (name) => {
        setColor(name);
        setColorModal(false);

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
                <AntDesign
                    name="check"
                    size={28}
                    style={{
                        padding: 6,
                        position: 'absolute',
                        right: 0,
                        zIndex: 2,
                    }}
                    color={'#FFF'}
                    onPress={() => {
                        addGoal()
                    }}

                />
            </View>
            <ScrollView style={styles.footer}>
                <View style={styles.view}>
                    <Text style={styles.text}>Nom </Text>
                    <CustomInput
                        placeholder={'nom de l objectif'}
                        value={name}
                        setValue={(name) => setName(name)}
                        error={err.n}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>Montant cible</Text>
                    <CustomInput
                        value={montantciblee}
                        setValue={(montantciblee) => setMontantCiblee(montantciblee)}
                        clavier={'numeric'}
                        error={err.m}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Déja enregistré</Text>
                    <CustomInput
                        value={dejaenregistree}
                        setValue={(dejaenregistree) => setDejaEnregistree(dejaenregistree)}
                        clavier={'numeric'}
                        error={err.d}
                    />
                </View>

                <View style={styles.view}>
                    <Text style={styles.text}>Date désirée </Text>

                    <Pressable
                        style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, padding: 10, backgroundColor: '#fff' }}
                        onPress={() => setOpen(true)}>
                        <Text style={{ color: '#000' }}>{parseDate(date)}</Text>

                        <DateTimePickerModal
                            isVisible={open}
                            mode="date"

                            onConfirm={(date) => {
                                setDate(date)
                                setOpen(false)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                    </Pressable>
                </View>
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <View>
                        <Text style={{ color: Colors.black, padding: 5, fontSize: 15, fontWeight: '700' }}>Choisir un couleur</Text>

                        {!color ?
                            <TouchableOpacity style={{ ...styles.circle, backgroundColor: '#000' }} onPress={() => setColorModal(true)} /> :
                            <TouchableOpacity style={{ ...styles.circle, backgroundColor: color }} onPress={() => setColorModal(true)} />}




                    </View>
                    <View>
                        <Text style={{ color: Colors.black, padding: 5, fontSize: 15, fontWeight: '700' }}>Choisir un icon</Text>

                        {!icon ?
                            <FontAwesom5 name='sort-amount-down' size={35} style={styles.icon} color='black' onPress={() => setIconModal(true)} />
                            :
                            <MaterialIcons name={icon.IconName} size={35} style={styles.icon} color='black' onPress={() => setIconModal(true)} />}
                    </View>



                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Note </Text>
                    <CustomInput
                        placeholder={'note'}
                        value={note}
                        setValue={(note) => setNote(note)}
                        error={err.no}
                    />
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
            <Modal visible={colorModal} transparent={true} animationType='fade'>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',

                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={styles.modal1}>
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
                                setColorModal(false)
                            }}
                        />
                        <FlatList
                            data={ListColor}
                            renderItem={({ item }) => (
                                <CustomColorPicker color={item.colorName} onPress={() => { changeColor(item.colorName) }} />
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

export default NewObjectif

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,
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
    modal: {
        width: 90,
        height: 250,
        backgroundColor: '#FFFF',
        borderRadius: 10,
        top: height / 4,
        borderStyle: 'solid',
        elevation: 50,
    },
    modal1: {
        paddingVertical: 10,
        width: 150,
        height: 250,
        backgroundColor: '#FFFF',
        borderRadius: 5,
        top: height / 4,
        borderStyle: 'solid',
        elevation: 50,
    },
    icon: { marginVertical: 20, alignSelf: 'center' },
    circle: { width: 90, height: 25, borderRadius: 5, borderWidth: 0.5, margin: 10 }
})