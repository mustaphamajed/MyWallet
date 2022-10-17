import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
import UserActions from '../../Redux-Saga/Store/User/Actions'
import { useDispatch } from 'react-redux'
const Register = () => {
    const dispatch = useDispatch()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [password, setpassword] = useState()
    const [repassword, setRepassword] = useState()
    const Navigation = useNavigation()
    const [err, setErr] = useState({
        f: false,
        l: false,
        e: false,
        p: false,
        r: false,


    })
    const onPressRegister = () => {
        if (!firstname) {
            setErr({ ...err, f: true })
        } else if (!lastname) {
            setErr({ ...err, l: true })
        } else if (!email) {
            setErr({ ...err, e: true })
        } else if (!password) {
            setErr({ ...err, p: true })
        } else if (password !== repassword) {
            setErr({ ...err, r: true })
        } else {
            const payload = {
                prenom: firstname,
                nom: lastname,
                email: email,
                password: password,
            };

            dispatch(UserActions.register(payload));
        }

    }

    const onPressSignIp = () => {
        Navigation.navigate('Login')
    }
    const onTermsPressed = () => {
        console.warn("Terme pressed")
    }
    const onPrivacyPressed = () => {
        console.warn('onPrivacyPressed')
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.container}>
                <Text style={styles.title}>Create New Account</Text>

                <CustomInput
                    value={firstname}
                    setValue={setFirstname}
                    placeholder="firstname"
                    error={err.f} />
                <CustomInput
                    value={lastname}
                    setValue={setLastname}
                    placeholder="lastname"
                    error={err.l} />


                <CustomInput
                    value={email}
                    setValue={setEmail}
                    placeholder="Email"
                    error={err.e} />
                <CustomInput
                    value={password}
                    setValue={setpassword}
                    placeholder="Password"
                    secureTextEntry
                    error={err.p} />
                <CustomInput
                    value={repassword}
                    setValue={setRepassword}
                    placeholder="Repeat Password"
                    secureTextEntry
                    error={err.r} />
                <CustomButton onPress={onPressRegister} text="Register" />
                <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsPressed}>Terms of Use</Text> and {' '}
                    <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
                </Text>

                <CustomButton onPress={onPressSignIp} text="Have an account? Sign In" type="TERTIARY" />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10
    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    link: {
        color: '#FDB075'
    }
})
export default Register;