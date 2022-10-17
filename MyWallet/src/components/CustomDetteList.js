import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import CustomButtom from '../components/CustomButton'
import { useDispatch } from 'react-redux'
import DebtActions from '../Redux-Saga/Store/Debt/Actions'
import { useNavigation } from '@react-navigation/native'
const CustomDetteList = ({ item }) => {
    const Navigation = useNavigation()
    const dispatch = useDispatch()
    const remove = () => {
        const payload = {
            id: item._id,
            budget: {
                budgetId: item.budget._id
            }

        }


        dispatch(DebtActions.removeDebt(payload))

    }
    const c = item.type === "PRETE" ? Colors.red : Colors.green
    const updateD = () => {
        Navigation.navigate('UpdateDette',{item})
    }
    return (
        <Pressable style={{ backgroundColor: Colors.white, padding: 8, margin: 5, borderRadius: 8, elevation: 5 }} onPress={updateD}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: c, fontSize: 16, fontWeight: '700' }}>{item.type}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                {item.type === "PRETE" ?
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '700' }}>{item.name} ME DOIT</Text>
                    : <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '700' }}>JE DOIS {item.name}</Text>
                }


            </View>

            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ color: Colors.black, fontSize: 16, }}>{item.name}</Text>
                    <Text style={{ color: Colors.black }}>description: {item.description}</Text>
                </View>

                <Text style={{ color: Colors.black, fontSize: 16, }}>{item.amount} Dt</Text>
            </View>

            <View>
                <CustomButtom text={'delete'} type='TERTIARY' onPress={() => remove()} />
            </View>


        </Pressable>
    )
}

export default CustomDetteList

const styles = StyleSheet.create({})