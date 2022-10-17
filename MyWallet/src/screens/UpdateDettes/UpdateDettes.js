import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux'
import DebtActions from '../../Redux-Saga/Store/Debt/Actions'
const UpdateDettes = ({route}) => {
const Navigation = useNavigation()
const dispatch = useDispatch()
    const item = route.params.item
    const budget = useSelector(state => state.budget.budgets)
    const [name, setName] = useState()
   
    const [description, setDescription] = useState()
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
    const update =()=>{
        
        const payload = {
            id: item._id,
            dept:{
                name: name,
                description: description,
                budget:budget[0]._id,
                 type: item.type,
                  amount: solde,
                   date: data.date,
                    dueDate: data.duedate
            }
           

        }
        dispatch(DebtActions.updateDette(payload))
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
                <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}>Update</Text>
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
                    onPress={() => { update()}}

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
           
        </View>
  )
}

export default UpdateDettes


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