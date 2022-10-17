import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import UserActions from '../../Redux-Saga/Store/User/Actions'
const logo = require('../../assets/images/logo.jpg')
const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState()
    const Navigation = useNavigation()

    const onPressLogin = () => {
        const payload = {
            email: email,
            password: password,
        };
        dispatch(UserActions.login(payload));


    }
    const onPressForgotPassword = () => {
        console.warn('forgot password pressed')
    }
    const onPressSignUp = () => {
        Navigation.navigate('Register');
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : null} style={styles.container}>
                <Image source={logo} style={styles.logo} />
                <CustomInput
                    value={email}
                    setValue={(email) => setEmail(email)}
                    placeholder="Email" />
                <CustomInput
                    value={password}
                    setValue={(password) => setpassword(password)}
                    placeholder="Password"
                    secureTextEntry />
                <CustomButton onPress={onPressLogin} text="Sign In" />
                <CustomButton onPress={onPressForgotPassword} text="Forgot Password?" type="TERTIARY" />
                <CustomButton onPress={onPressSignUp} text="Don't Have an account? Create One" type="TERTIARY" />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

        padding: 20,
    },
    logo: {

        width: 200,
        height: 200,
        backgroundColor: '#000'
    }
})
export default Login;