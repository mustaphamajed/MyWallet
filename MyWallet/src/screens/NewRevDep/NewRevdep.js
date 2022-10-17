import { StyleSheet, Text, View, Pressable, ScrollView, KeyboardAvoidingView, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../../components/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import PaymentActions from '../../Redux-Saga/Store/Payment/Actions'
import Toast from 'react-native-simple-toast'
import Colors from '../../constants/Colors'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const NewRevdep = () => {
    const rows = useSelector(state => state.categorie.rows)
    const budgets = useSelector(state => state.budget.budgets)
    const dispatch = useDispatch()
    const Navigation = useNavigation()
    const [type, setType] = useState('Revenus');
    const [name, setName] = useState();
    const [categorie, setCategorie] = useState(rows && rows.length ? rows[0].name : null);
    const [cateid, setcatId] = useState(0)
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)
    const [montant, setMontant] = useState();
    const [compte, setCompte] = useState(budgets && budgets.length ? budgets[0].name : null)
    const [budget, setBudget] = useState(0)
    const [moyen, setMoyen] = useState();
    const List = [
        { id: 1, type: 'Revenus' },
        { id: 2, type: 'Dépenses' },
    ]
    const newPayment = () => {
        if (!name || !categorie || !montant || !compte || !budget || !moyen) {
            Toast.show('fill all the blanks')
        } else {
            const payload = {
                name: name,
                category: cateid,
                budget: budget,
                type: type,
                amount: montant,
                paymentMethod: moyen,


            }

            dispatch(PaymentActions.newPayment(payload))
            setName()
            setMontant()
            setMoyen()
        }

    }
    useEffect(() => {

    }, [rows, budget])


    return (
        <KeyboardAvoidingView style={styles.container} behavior={null}>
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
                <Text style={{ color: '#FFF', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}>Ajouter un paiment</Text>
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
                    onPress={() => { newPayment() }}

                />
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 0.08, justifyContent: 'center', padding: 10, }}>
                    <View style={styles.ListTab}>
                        {List.map(e =>
                            <Pressable style={[styles.btnTab, type === e.type && styles.btnTabActive]}
                                key={e.id}
                                onPress={(type) => setType(e.type)}>
                                <Text style={[styles.textTab, type === e.type && styles.textTabActive]}>{e.type}</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
                <ScrollView style={{ flex: 0.9 }}>


                    <View style={styles.view}>
                        <Text style={styles.text}>Nom </Text>
                        <CustomInput
                            value={name}
                            setValue={(name) => setName(name)}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Catégorie </Text>
                        <TouchableOpacity style={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderColor: '#e8e8e8',
                            borderRadius: 5,
                            borderWidth: 1,
                            paddingHorizontal: 10,
                            marginVertical: 5
                        }} onPress={() => { !rows.length ? Toast.show('ajouter une categorie d abord') : setModal(true) }} ><Text style={styles.text}>{categorie}</Text></TouchableOpacity>
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
                        }} onPress={() => { !rows.length ? Toast.show('ajouter un budget d abord') : setModal1(true) }} ><Text style={styles.text}>{compte}</Text></TouchableOpacity>
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Montant </Text>
                        <CustomInput
                            value={montant}
                            setValue={(montant) => setMontant(montant)}
                            placeholder={'Sélectionner un compte'}
                            clavier={'numeric'}
                        />
                    </View>
                    <View style={styles.view}>
                        <Text style={styles.text}>Moyen de Paiment </Text>
                        <CustomInput
                            value={moyen}
                            setValue={(moyen) => setMoyen(moyen)}
                            placeholder={'Sélectionner un moyen de paiment'}

                        />
                    </View>
                </ScrollView>
                <Modal visible={modal} transparent={true} animationType='fade' onRequestClose={() => setModal(true)}>
                    <View style={{
                        flex: 1,

                        justifyContent: 'center',


                        backgroundColor: 'rgba(52, 52, 52, 0.4)'
                    }}>
                        <View style={{ height: 250, marginHorizontal: 80, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Colors.black, fontWeight: '700' }}> Choisir un compte</Text>
                            </View>
                            <View style={{ flex: 0.8, }}>
                                <FlatList
                                    data={rows}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity key={item._id} style={styles.pres} onPress={() => { setCategorie(item.name); setcatId(item._id); setModal(false) }}>
                                            <MaterialIcon name={item.IconName} color={item.color ? item.color : 'black'} size={28} />
                                            <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 16, fontWeight: '500' }}>{item.name ? item.name : null}</Text>
                                        </TouchableOpacity>

                                    )}
                                    keyExtractor={(item) => item._id}

                                />

                            </View>





                        </View>
                    </View>

                </Modal>
                <Modal visible={modal1} transparent={true} animationType='fade'>
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
                                {budgets ? budgets.map((item) => {
                                    return (
                                        <Pressable
                                            style={{ justifyContent: 'space-around', margin: 8, borderWidth: 0.5, borderRadius: 8, paddingVertical: 10, flexDirection: 'row' }}
                                            key={item._id} onPress={() => { setCompte(item.name); setBudget(item._id); setModal1(false) }}>
                                            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>{item.name}</Text>

                                        </Pressable>
                                    )
                                }) : null}
                            </View>





                        </View>
                    </View>

                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

export default NewRevdep

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',

    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,
    },
    ListTab: {

        flex: 1,

        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.bleu


    },
    btnTab: {
        flex: 1,


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
    view: {
        paddingHorizontal: 10
    },
    text: {
        color: Colors.black,
        padding: 5,
        fontSize: 16,
        fontWeight: '700'
    }, pres: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: Colors.gray,
        backgroundColor: Colors.white
    }
})