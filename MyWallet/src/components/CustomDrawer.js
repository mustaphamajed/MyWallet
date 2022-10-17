import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

const backgroundImage = require('../assets/images/menu-bg.jpeg')
const userImage = require('../assets/images/user-profile.jpg')
const CustomDrawer = (props) => {
    const user = useSelector(state => state.user.user)
    const wallet = useSelector(state => state.wallet.wallet)
    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.containerBackground}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.imageBackground}>
                    <Image
                        source={userImage}
                        style={styles.image}
                    />
                    <Text
                        style={styles.usetText}>
                        {user.prenom}{' '}{user.nom}
                    </Text>
                    <Text
                        style={styles.usetText}>
                        {wallet.name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={styles.amountText}>
                            {wallet.initialBalance} TND
                        </Text>
                        <FontAwesome5 name="coins" size={14} color="#fff" />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerBackground: {
        backgroundColor: '#8200d6'
    },
    imageBackground: { padding: 20 },
    image: { height: 80, width: 80, borderRadius: 40, marginBottom: 10 },
    usetText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5,
    },
    amountText: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        marginRight: 5,
    }
})

export default CustomDrawer