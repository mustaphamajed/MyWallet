import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Colors from '../../constants/Colors'

import DateTimePickerModal from "react-native-modal-datetime-picker";
const NewBudget = () => {
    const Navigation = useNavigation()
    const [nom, setNom] = useState()
    const [initialBudget, setInitialBudget] = useState()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [incomes, setIncomes] = useState([{ name: 'salaire', amount: 0 }])
    const [outcomes, setOucomes] = useState([{ name: 'habitat', amount: 0 }])
    const [err, setErr] = useState({
        n: false,
        i: false,


    })
    const parseDate = date => {
        var d = Date.parse(date);
        var year = new Date(d).getFullYear().toString();
        var month = new Date(d).getMonth().toString();
        var day = new Date(d).getDate().toString();

        return day + '-' + month + '-' + year;
    };
    const [data, setData] = useState({ startDate: parseDate(startDate), endDate: parseDate(endDate) })
    const Nav = () => {

        if (!nom) {
            setErr({ ...err, n: true })
        } else if (!initialBudget) {
            setErr({ ...err, i: true })
        } else {
            Navigation.navigate('RevAndDep', { nom, initialBudget, data })
        }

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1, justifyContent: 'center' }}>
                <AntDesign name="arrowleft" size={28}
                    style={{
                        padding: 12,
                        position: 'absolute',
                        top: 6,
                        left: 0,
                        zIndex: 2,
                    }}
                    color="#FFF"
                    onPress={() => Navigation.goBack(-1)}
                />
                <Text style={{ alignSelf: 'center', color: Colors.white, fontSize: 18, fontWeight: '700' }}>Nouveau Budget</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.view}>
                    <Text style={styles.text}>Nom </Text>
                    <CustomInput
                        value={nom}
                        setValue={(nom) => setNom(nom)}
                        error={err.n}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>initialBudget </Text>
                    <CustomInput
                        value={initialBudget}
                        setValue={(initialBudget) => setInitialBudget(initialBudget)}
                        clavier='numeric'
                        error={err.i}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Date Debut </Text>

                    <Pressable
                        style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, padding: 10, backgroundColor: '#fff' }}
                        onPress={() => setOpen(true)}>
                        <Text style={{ color: '#000', alignSelf: 'center' }}>{parseDate(startDate)}</Text>

                        <DateTimePickerModal
                            isVisible={open}
                            mode="date"

                            onConfirm={(date) => {
                                setStartDate(date)
                                setOpen(false)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />

                    </Pressable>
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Date Fin </Text>

                    <Pressable
                        style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, padding: 10, backgroundColor: '#fff' }}
                        onPress={() => setOpen1(true)}>
                        <Text style={{ color: '#000' }}>{parseDate(endDate)}</Text>

                        <DateTimePickerModal
                            isVisible={open1}
                            mode="date"

                            onConfirm={(date) => {
                                setEndDate(date)
                                setOpen1(false)
                            }}
                            onCancel={() => {
                                setOpen1(false)
                            }}
                        />

                    </Pressable>
                </View>
                <View style={styles.view}>
                    <CustomButton text={'Suivant'} onPress={() => Nav()} />
                </View>

            </View>
        </View>
    )
}

export default NewBudget

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,
    },
    view: {
        padding: 10
    },
    text: {
        color: Colors.black,
        padding: 5,
        fontSize: 16,
        fontWeight: '700'
    }
})