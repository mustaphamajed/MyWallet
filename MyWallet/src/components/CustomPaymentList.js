import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import CustomButton from './CustomButton'
import PaymentActions from '../Redux-Saga/Store/Payment/Actions'
import { useDispatch } from 'react-redux'
const CustomPaymentList = ({ item }) => {
    const dispatch = useDispatch()
    const remove = () => {
        const payload = {
            id: item._id,
            budget: {
                budgetId: item.budget
            }
        }
        dispatch(PaymentActions.removePayment(payload))

    }
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: 'bold' }}>{item.type}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                {item.type === 'Revenus' ?
                    <Text style={{ color: Colors.green, fontSize: 16, fontWeight: '600' }}>{item.amount} Dt</Text>
                    :
                    <Text style={{ color: Colors.red, fontSize: 16, fontWeight: '600' }}>-{item.amount} Dt</Text>
                }

            </View>
            <View>
                <CustomButton text={'delete'} type='TERTIARY' onPress={() => remove()} />
            </View>

        </View>
    )
}

export default CustomPaymentList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        margin: 10,
        padding: 8,
        borderRadius: 8
    }
})