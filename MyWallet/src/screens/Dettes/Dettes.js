import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import FloatingMenuButton from '../../components/FloatingMenuButton';
import MenuButton from '../../components/MenuButton'
import CustomDetteList from '../../components/CustomDetteList'
import DebtActions from '../../Redux-Saga/Store/Debt/Actions'
const Dettes = () => {
    const dispatch = useDispatch()

    const budget = useSelector(state => state.budget.budgets)
    const debt = useSelector(state => state.debt.debts)

    useEffect(() => {


        dispatch(DebtActions.getAll(budget[0]._id))
    }, [budget, debt])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <MenuButton />
            </View>
            <View style={styles.footer}>

                <View style={{ flex: 0.8, justifyContent: 'center' }}>

                    <FlatList
                        data={debt}
                        renderItem={({ item }) => (
                            <CustomDetteList item={item} />

                        )}
                        keyExtractor={(item) => item._id}

                    />
                </View>

                <FloatingMenuButton style={{ alignSelf: 'flex-end', bottom: 50, right: 10 }} open={false} />
            </View>
        </View>
    )
}

export default Dettes;

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
    },
    ListTab: {
        flex: 0.1,

        flexDirection: 'row',
        elevation: 5,


    },
    btnTab: {
        flex: 1,
        backgroundColor: '#F35D76',

        justifyContent: 'center',
        alignItems: 'center'
    },
    textTab: {
        alignSelf: 'center', color: Colors.white, fontSize: 18, fontWeight: '700',

    },
    btnTabActive: {
        backgroundColor: '#F02A4B',
        elevation: 3,


    },
})