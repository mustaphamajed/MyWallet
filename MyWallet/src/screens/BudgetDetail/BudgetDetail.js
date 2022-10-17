import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import BudgetActions from '../../Redux-Saga/Store/Budget/Actions'
import Colors from '../../constants/Colors'
import CustomButton from '../../components/CustomButton'
import ProgressCircle from 'react-native-progress-circle'
const BudgetDetail = ({ route }) => {
    const Navigation = useNavigation()
    const budget = useSelector(state => state.budget.budget)

    const dispatch = useDispatch()
    const params = route.params.id
    const [inc, setInc] = useState(budget.incomes)
    const [dep, setDep] = useState(budget.expenses)
    const allIncomes = inc ? (inc.reduce((acc, a) => acc + a.amount, 0) + budget.initialBudget) : null
    const allDep = dep ? dep.reduce((acc, a) => acc + a.amount, 0) : null

    const remove = () => {
        const payload = {
            id: budget._id,
            user: {
                userId: budget.userId
            }

        }


        dispatch(BudgetActions.removeBudget(payload))

    }
    useEffect(() => {
        const payload = params

        dispatch(BudgetActions.fetchOne(payload))
        setInc(budget.incomes)
        setDep(budget.expenses)


    }, [budget])

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
                <Text style={{ alignSelf: 'center', color: Colors.white, fontSize: 18, fontWeight: '700' }}> Budget Detail</Text>
            </View>
            <View style={styles.footer}>
                <View style={{ borderRadius: 8, backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{}}>
                        <Text style={{ color: Colors.black }}>{allDep} Dt</Text>
                        <Text style={{ color: Colors.black }}>Total depenses</Text>

                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: Colors.black }}>{budget.name}</Text>
                    </View>

                    <View style={{}}>

                        <Text style={{ color: Colors.black }}>{allIncomes} Dt</Text>
                        <Text style={{ color: Colors.black }}> Total revenus</Text>
                    </View>
                </View>
                <View style={styles.pieChartContainer}>
                    <ProgressCircle
                        percent={(100 * allDep) / allIncomes}
                        radius={80}
                        borderWidth={12}
                        color="#8BED4F"
                        shadowColor={Colors.gray}
                        bgColor="#fff"
                    >
                        <View style={styles.pieFill}>

                            <Text style={styles.pieFillText}> {((100 * allDep) / allIncomes).toFixed(2)} % </Text>
                            <Text style={styles.pieFillText}> TND </Text>

                        </View>
                    </ProgressCircle>

                </View>

                <View style={{ top: 10, borderRadius: 8, backgroundColor: Colors.white }}>
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.bleu, fontSize: 16, fontWeight: '700' }}> Total revenus</Text>
                        <Text style={{ color: Colors.bleu, fontSize: 16, fontWeight: '700' }}>{allIncomes}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.black, fontWeight: '500', fontSize: 16, }}>initial Budget</Text>
                        <Text style={{ color: Colors.black, fontWeight: '500', fontSize: 16, }}>{budget.initialBudget}</Text>
                    </View>

                    {inc ? inc.map((i) => {
                        return (
                            <View key={i._id}>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.black, fontWeight: '500', fontSize: 16, }}>{i.name}</Text>
                                    <Text style={{ color: Colors.black, fontWeight: '500', fontSize: 16, }}>{i.amount}</Text>
                                </View>
                            </View>
                        )
                    }) : null}
                </View>
                <View style={{ top: 20, borderRadius: 8, backgroundColor: Colors.white }}>
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: Colors.bleu, fontSize: 16, fontWeight: '700' }}>Total depenses</Text>
                        <Text style={{ color: Colors.bleu, fontSize: 16, fontWeight: '700' }}>{allDep}</Text>
                    </View>

                    {dep ? dep.map((i) => {
                        return (
                            <View key={i._id} style={{}}>
                                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.black, fontWeight: '500', fontSize: 16, }}>{i.name}</Text>
                                    <Text style={{ color: Colors.black, fontWeight: '500', fontSize: 16, }}>{i.amount}</Text>
                                </View>

                            </View>
                        )
                    }) : null}
                </View>

                <View style={{ padding: 20 }}>
                    <CustomButton text={'delete'} type='TERTIARY' onPress={() => remove()} />
                </View>

            </View>
        </View >
    )
}

export default BudgetDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 10
    },
    pieChartContainer: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10

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