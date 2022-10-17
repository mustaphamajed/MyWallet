import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import Colors from '../../constants/Colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux'
import DebtActions from '../../Redux-Saga/Store/Debt/Actions'
const NewPrete = () => {
    const budgets = useSelector(state => state.budget.budgets)
    const dispatch = useDispatch()
    const Navigation = useNavigation()
    const [name, setName] = useState()
    const [modal, setModal] = useState(false)
    const [description, setDescription] = useState()
    const [compte, setCompte] = useState(budgets[0].name)
    const [budget, setBudget] = useState(0)
    const [solde, setSolde] = useState()
    const [date, setDate] = useState(new Date())
    const [duedate, setDueDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [err, setErr] = useState({
        n: false,
        d: false,
        s: false,

    })
    const parseDate = date => {
        var d = Date.parse(date);
        var year = new Date(d).getFullYear().toString();
        var month = new Date(d).getMonth().toString();
        var day = new Date(d).getDate().toString();

        return day + '-' + month + '-' + year;
    };

    const [data, setData] = useState({ date: parseDate(date), duedate: parseDate(duedate) })
    const newDebt = () => {
        if (!name) {
            setErr({ ...err, n: true })
        } else if (!description) {
            setErr({ ...err, d: true })
        } else if (!solde) {
            setErr({ ...err, s: true })
        } else {
            setErr({ ...err, n: false, d: false, s: false })
            const payload = {
                name: name, description: description, budget: budget, type: "PRETE", amount: solde, date: data.date, dueDate: data.duedate

            }
            dispatch(DebtActions.newDebt(payload))
        }

    }
    useEffect(() => {


    }, [budgets])

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
                <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}>J'ai preté</Text>
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
                    onPress={() => { newDebt() }}

                />
            </View>
            <ScrollView style={styles.footer}>
                <View style={styles.view}>
                    <Text style={styles.text}>Nom </Text>
                    <CustomInput
                        placeholder={'a qui avez-vous preté ?'}
                        value={name}
                        setValue={(name) => setName(name)}
                        error={err.n}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Description </Text>
                    <CustomInput
                        placeholder={'Quel est l objet de cette dette ?'}
                        value={description}
                        setValue={(description) => setDescription(description)}
                        error={err.d}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Compte </Text>

                    <TouchableOpacity style={{
                        backgroundColor: 'white',
                        width: '100%',
                        borderColor: '#e8e8e8',
                        borderRadius: 5,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        marginVertical: 5
                    }} onPress={() => setModal(true)} ><Text style={styles.text}>{compte}</Text></TouchableOpacity>


                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Solde</Text>
                    <CustomInput
                        value={solde}
                        setValue={(solde) => setSolde(solde)}
                        clavier={'numeric'}
                        error={err.s}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Date  </Text>

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
                <View style={styles.view}>
                    <Text style={styles.text}>Date d'échéance </Text>

                    <Pressable
                        style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, padding: 10, backgroundColor: '#fff' }}
                        onPress={() => setOpen1(true)}>
                        <Text style={{ color: '#000' }}>{parseDate(duedate)}</Text>

                        <DateTimePickerModal
                            isVisible={open1}
                            mode="date"

                            onConfirm={(date) => {
                                setDueDate(date)
                                setOpen1(false)
                            }}
                            onCancel={() => {
                                setOpen1(false)
                            }}
                        />

                    </Pressable>
                </View>
            </ScrollView>
            <Modal visible={modal} transparent={true} animationType='fade'>
                <View style={{
                    flex: 1,

                    justifyContent: 'center',


                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={{ height: 250, marginHorizontal: 80, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text> Choisir un compte</Text>
                        </View>
                        <View style={{ flex: 0.8, top: 10 }}>
                            {budgets.map((item) => {
                                return (
                                    <Pressable
                                        style={{ justifyContent: 'space-around', margin: 8, borderWidth: 0.5, borderRadius: 8, paddingVertical: 10, flexDirection: 'row' }}
                                        key={item._id} onPress={() => { setCompte(item.name); setBudget(item._id); setModal(false) }}>
                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>{item.finalBudget} Dt</Text>
                                    </Pressable>
                                )
                            })}
                        </View>





                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default NewPrete

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
    }

})