import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../constants/Colors'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import WalletActions from '../../Redux-Saga/Store/Wallet/Actions'
const NewWallet = () => {
    const user = useSelector(state => state.user.user)

    const [name, setName] = useState("Especes")
    const [solde, setSolde] = useState()
    const Navigation = useNavigation()
    const dispatch = useDispatch()
    const onPressCreate = () => {
        const payload = {
            name: name,
            initialBalance: solde,
            userId: user._id
        }
        dispatch(WalletActions.newWallet(payload))
    }

    useEffect(() => {

        if (user.haveWallet) {
            Navigation.navigate('Drawer')
        }
    }, [user])


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>

            </View>
            <View style={styles.footer}>


                <View style={styles.view}>
                    <Text style={styles.text}>Nom du portefeuille</Text>
                    <CustomInput
                        value={name}
                        setValue={(name) => setName(name)}
                    />
                </View>
                <View style={styles.view}>
                    <Text style={styles.text}>Solde</Text>
                    <CustomInput
                        value={solde}
                        setValue={setSolde}
                        clavier={'numeric'}
                        placeholder="Enter your current Balance" />
                </View>
                <View style={styles.view}>
                    <CustomButton onPress={onPressCreate} text="Create Wallet" />
                </View>

            </View>
        </ScrollView>
    )
}

export default NewWallet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: { flex: 1 },
    footer: { flex: 1 },
    view: {
        padding: 10
    },
    text: {
        color: Colors.black,
        padding: 5,
        fontSize: 16,
        fontWeight: '700'
    }
})