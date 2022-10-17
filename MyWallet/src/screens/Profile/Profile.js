import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuButton from '../../components/MenuButton'
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import UserActions from '../../Redux-Saga/Store/User/Actions'
import { Use } from 'react-native-svg'
import NavigationService from '../../Redux-Saga/Service/NavigationService'
const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [oldpassword, setOldPassword] = useState()
    const [newpassword, setNewPassword] = useState()
    const [err, setErr] = useState({
        n: false,
        o: false,


    })
    useEffect(() => {

    }, [user])
    const deconnexion = () => {
        NavigationService.navigateAndReset('Login')

    }
    const updatePass = () => {
        if (!oldpassword) {
            setErr({ ...err, o: true })
        } else if (!newpassword) {
            setErr({ ...err, n: true })
        } else {
            const payload = {
                id: user._id,
                data: {
                    oldPassword: oldpassword,
                    newPassword: newpassword
                }
            }




            dispatch(UserActions.updateUser(payload))
        }

    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <MenuButton />
            </View>
            <ScrollView style={styles.footer}>
                <View style={{ marginHorizontal: 10, padding: 8 }}>
                    <Text style={{ color: Colors.gray, fontSize: 16 }}>Firstname</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, padding: 8 }}>{user.prenom}</Text>
                    <View style={{ borderWidth: 0.5, marginHorizontal: 8, borderColor: Colors.gray }} />
                </View>
                <View style={{ marginHorizontal: 10, padding: 8 }}>
                    <Text style={{ color: Colors.gray, fontSize: 16 }}>lastname</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, padding: 8 }}>{user.nom}</Text>
                    <View style={{ borderWidth: 0.5, marginHorizontal: 8, borderColor: Colors.gray }} />
                </View>
                <View style={{ marginHorizontal: 10, padding: 8 }}>
                    <Text style={{ color: Colors.gray, fontSize: 16 }}>Email</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, padding: 8 }}>{user.email}</Text>
                    <View style={{ borderWidth: 0.5, marginHorizontal: 8, borderColor: Colors.gray }} />
                </View>
                <View style={{ margin: 20 }}>
                    <CustomButton text={'Deconnexion'} onPress={() => deconnexion()} />
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "700" }}>Update Password</Text>
                </View>
                <View style={{ margin: 10 }}>
                    <CustomInput value={oldpassword} setValue={setOldPassword} placeholder={'old password'} error={err.o} />
                </View>
                <View style={{ margin: 10 }}>
                    <CustomInput value={newpassword} setValue={setNewPassword} placeholder={'new password'} error={err.n} />
                </View>
                <View style={{ margin: 20 }}>
                    <CustomButton text={'update password'} type={'TERTIARY'} onPress={() => updatePass()} />
                </View>

            </ScrollView>
        </View >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.white, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: Colors.white
    }
})