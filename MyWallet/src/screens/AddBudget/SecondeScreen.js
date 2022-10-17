import { StyleSheet, Text, View, ScrollView, SafeAreaView, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Colors from '../../constants/Colors'
import CustomCat from '../../components/CustomCat'
import { useNavigation } from '@react-navigation/native'

import CustomInput from '../../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import BudgetActions from '../../Redux-Saga/Store/Budget/Actions'
import { set } from 'react-native-reanimated'
const SecondScreen = ({ route }) => {
    const dispatch = useDispatch()
    const Navigation = useNavigation()
    const [modal, setModal] = useState(false)

    const [desc, setDesc] = useState()
    const [budget, setBudget] = useState()
    const [type, setType] = useState()
    const params = route.params
    const user = useSelector(state => state.user.user)
    const [incomes, setIncomes] = useState([])
    const [outcomes, setOucomes] = useState([])

    const addIncomes = () => {
        if (type === 'Depense') {
            outcomes.push({ name: desc, amount: parseInt(budget) })
            setBudget()
            setDesc()
            setModal(false)
        } else {
            incomes.push({ name: desc, amount: parseInt(budget) })
            setBudget()
            setDesc()
            setModal(false)
        }

    }
    const Add = () => {
        const payload = {
            name: params.nom,
            startDate: params.data.startDate,
            endDate: params.data.endDate,
            userId: user._id,
            incomes: incomes,
            expenses: outcomes,
            initialBudget: parseInt(params.initialBudget)
        }
        console.log(payload)
        dispatch(BudgetActions.newBudget(payload))
    }
    useEffect(() => {


    }, [incomes, outcomes])

    return (
        <SafeAreaView style={styles.container}>
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
                <Text style={{ alignSelf: 'center', color: Colors.white, fontSize: 18, fontWeight: '700' }}>Revenus et Depenses</Text>
                <AntDesign
                    name="check"
                    size={28}
                    style={{
                        padding: 12,
                        position: 'absolute',
                        top: 6,
                        right: 0,
                        zIndex: 2,
                    }}
                    color={'#FFF'}
                    onPress={() => {
                        Add()
                    }}
                />
            </View>
            <ScrollView style={styles.footer}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '600' }}>Revenu disponible</Text>
                        <AntDesign name="plus" size={25}
                            style={{ right: 10, top: 10, position: 'absolute' }}
                            color={Colors.green2}
                            onPress={() => { setType('Revenu'); setModal(true) }}
                        />
                    </View>
                    <View>
                        {incomes.map((item) => {
                            return (
                                <CustomCat name={item.name} montant={item.amount} type={'Revenu'} color={Colors.green2} key={item.name} />
                            )
                        })}

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: '600' }}>Depenses disponible</Text>
                        <AntDesign name="plus" size={25}
                            style={{ right: 10, top: 10, position: 'absolute' }}
                            color={Colors.green2}
                            onPress={() => { setType('Depense'); setModal(true) }}
                        />
                    </View>
                    <View>
                        {outcomes.map((item) => {
                            return (
                                <CustomCat name={item.name} montant={item.amount} type={'Depense'} color={Colors.bleu} key={item.name} />
                            )
                        })}
                    </View>
                </View>



            </ScrollView>
            <Modal visible={modal} transparent={true} animationType='fade'>
                <View style={{
                    flex: 1,

                    justifyContent: 'center',


                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={{ height: 250, marginHorizontal: 30, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}>

                        <View style={{ flex: 0.3, padding: 10 }}>
                            <Text>Description</Text>
                            <CustomInput value={desc} setValue={setDesc} placeholder='nom' />
                        </View>
                        <View style={{ flex: 0.3, padding: 10 }}>
                            <Text>budget</Text>
                            <CustomInput value={budget} setValue={setBudget} placeholder='amount' clavier={'numeric'} />
                        </View>
                        <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10 }}>
                            <TouchableOpacity style={{ right: 20 }} onPress={() => setModal(false)}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>ANNULER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => addIncomes()}>
                                <Text style={{ color: 'blue', fontWeight: '600', fontSize: 16 }}>SAUVEGARDER</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>

        </SafeAreaView >
    )
}

export default SecondScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,
    },
})