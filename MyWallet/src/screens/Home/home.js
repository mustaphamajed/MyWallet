import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuButton from '../../components/MenuButton'
import { useDispatch, useSelector } from 'react-redux'
import WalletActions from '../../Redux-Saga/Store/Wallet/Actions'
import CategorieActions from '../../Redux-Saga/Store/Categorie/Actions'
import BudgetActions from '../../Redux-Saga/Store/Budget/Actions'
import EventActions from '../../Redux-Saga/Store/Event/Actions'
import Colors from '../../constants/Colors'
import ProgressCircle from 'react-native-progress-circle'

const Home = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const budget = useSelector(state => state.budget.budgets)

    const allIncomes = budget[0] ? (budget[0].incomes.reduce((acc, a) => acc + a.amount, 0)) : null
    const allDep = budget[0] ? (budget[0].expenses.reduce((acc, a) => acc + a.amount, 0)) : null
    const initial = budget[0] ? (budget[0].initialBudget) : null
    const final = budget[0] ? (budget[0].finalBudget) : null
    useEffect(() => {

        const payload1 = {
            userId: user._id
        }

        dispatch(BudgetActions.getBudgets(payload1))
        dispatch(CategorieActions.fetch())
        dispatch(EventActions.getEvent(payload1))


    }, [budget])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <MenuButton />
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 1, flexDirection: 'row', padding: 8, backgroundColor: Colors.white }}>
                    <View style={{ flex: 0.5, padding: 5 }}>
                        <ProgressCircle
                            percent={0}
                            radius={80}
                            borderWidth={12}
                            color="#8BED4F"
                            shadowColor={Colors.gray}
                            bgColor="#fff"
                        >
                            <View style={styles.pieFill}>

                                <Text style={styles.pieFillText}> Economie</Text>
                                <Text style={styles.pieFillText}> +{initial}TND </Text>

                            </View>
                        </ProgressCircle>
                        <View style={{ top: 50 }}>
                            <View style={{ borderWidth: 0.5, borderColor: '#8BED4F', padding: 5, marginVertical: 5 }}>
                                <Text style={{ color: Colors.gray }}>
                                    Revenus Depensé
                                </Text>
                                <Text style={{ color: Colors.black }}>
                                    0%
                                </Text>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#8BED4F', padding: 5, marginVertical: 5 }}>
                                <Text style={{ color: Colors.gray }}>
                                    Revenus net disponible
                                </Text>
                                <Text style={{ color: Colors.black }}>
                                    {initial}
                                </Text>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#8BED4F', padding: 5, marginVertical: 5 }}>
                                <Text style={{ color: Colors.gray }}>
                                    Depenses totales
                                </Text>
                                <Text style={{ color: Colors.black }}>
                                    {allIncomes}
                                </Text>
                            </View>
                        </View>



                    </View>
                    <View style={{ flex: 0.5, padding: 5 }}>
                        <ProgressCircle
                            percent={0}
                            radius={80}
                            borderWidth={12}
                            color="red"
                            shadowColor={Colors.gray}
                            bgColor="#fff"
                        >
                            <View style={styles.pieFill}>

                                <Text style={styles.pieFillText}> budget Depensé</Text>
                                <Text style={styles.pieFillText}> 0.0% </Text>

                            </View>
                        </ProgressCircle>
                        <View style={{ top: 50 }}>
                            <View style={{ borderWidth: 0.5, borderColor: Colors.red, padding: 5, marginVertical: 5 }}>
                                <Text style={{ color: Colors.gray }}>
                                    Reste a depenser
                                </Text>
                                <Text style={{ color: Colors.black }}>
                                    {allDep}
                                </Text>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: Colors.red, padding: 5, marginVertical: 5 }}>
                                <Text style={{ color: Colors.gray }}>
                                    Solde provisoire
                                </Text>
                                <Text style={{ color: Colors.black }}>
                                    {final}
                                </Text>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: Colors.red, padding: 5, marginVertical: 5 }}>
                                <Text style={{ color: Colors.gray }}>
                                    Total budgete
                                </Text>
                                <Text style={{ color: Colors.black }}>
                                    {allDep}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5
    },
    pieFill: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pieFillTextAmount: {
        fontSize: 18,
        lineHeight: 23,
        color: Colors.black,
    },
    pieFillText: {
        fontSize: 12,
        lineHeight: 15,
        color: Colors.black,
        textAlign: 'center',
    },
})