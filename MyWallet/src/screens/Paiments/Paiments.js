import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect, useDebugValue } from 'react'
import MenuButton from '../../components/MenuButton'
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import PaymentActions from '../../Redux-Saga/Store/Payment/Actions'
import { v4 as uuidv4 } from 'uuid'
import CustomPaymentList from '../../components/CustomPaymentList'
const Paiments = () => {
    const dispatch = useDispatch()
    const budgets = useSelector(state => state.budget.budgets)
    const payments = useSelector(state => state.payment.payments)

    const [status, setStatus] = useState('Tous');
    const List = [
        { id: 1, status: 'Tous' },
        { id: 2, status: 'Revenus' },
        { id: 3, status: 'Dépenses' },
    ]


    useEffect(() => {

        dispatch(PaymentActions.getPayment(budgets[0]._id))
    }, [budgets, payments])


    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <MenuButton />
            </View>
            <View style={styles.footer}>


                <FlatList
                    data={payments}
                    renderItem={({ item }) => (
                        <CustomPaymentList item={item} />
                    )}
                    keyExtractor={(item) => item._id}

                />

            </View>

        </View>
    )
}

export default Paiments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    ListTab: {

        flex: 0.9,
        backgroundColor: Colors.white,
        flexDirection: 'row',

        borderWidth: 1,
        borderColor: Colors.bleu


    },
    btnTab: {
        flex: 1,
        backgroundColor: Colors.white,

        borderColor: Colors.bleu,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTab: {
        alignSelf: 'center', color: Colors.bleu, fontSize: 16, fontWeight: '600',

    },
    textTabActive: {
        alignSelf: 'center', color: Colors.white, fontSize: 16, fontWeight: '600',

    },
    btnTabActive: {
        backgroundColor: Colors.bleu,
        elevation: 3,


    },
})