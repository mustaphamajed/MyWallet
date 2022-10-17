import React from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
const MenuButton = () => {
    const Navigation = useNavigation()
    return (
        <View >
            <Feather
                name="menu"
                size={28}
                style={{
                    padding: 12,
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    zIndex: 2,
                }}
                color={'#FFF'}
                onPress={() => {
                    Navigation.openDrawer();
                }}
            />
        </View>
    )
}

export default MenuButton