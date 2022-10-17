import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/login';
import Register from '../screens/Register/register';
import { NavigationContainer } from '@react-navigation/native';
import NewWallet from '../screens/NewWallet/newWallet';
import Drawer from './drawer';
import FirstScreen from '../screens/AddBudget/FirstScreen';
import SecondScreen from '../screens/AddBudget/SecondeScreen';
const AuthStack = createNativeStackNavigator()

const Navigation = () => {
    return (

        <AuthStack.Navigator screenOptions={{ headerShown: false }} >
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="FirstScreen" component={FirstScreen} />
            <AuthStack.Screen name="SecondScreen" component={SecondScreen} />
            <AuthStack.Screen name="Drawer" component={Drawer} />
        </AuthStack.Navigator>

    )
}
export default Navigation;