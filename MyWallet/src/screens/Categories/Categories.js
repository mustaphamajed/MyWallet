import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import MenuButton from '../../components/MenuButton'
import CustomIcons from '../../components/CustomIcons'
import { useDispatch, useSelector } from 'react-redux';

const ListIcon = [{ id: 1, IconName: 'shopping-bag', color: 'red', name: "Achats", size: 28 }, { id: 2, IconName: 'home', color: 'blue', name: 'Logement', size: 28 }, { id: 3, IconName: 'directions-bus', color: 'black', name: 'Transport', size: 28 }]
const Categories = () => {
    const Navigation = useNavigation()
    const dispatch = useDispatch()
    const NewIcon = { IconName: 'playlist-add', color: 'black', name: "Autres", size: 28 }
    const rows = useSelector(state => state.categorie.rows)

    useEffect(() => {


    }, [rows])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <MenuButton />
            </View>
            <View style={styles.footer}>
                <View style={{ color: 'black', padding: 10 }}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: '700' }}>TOUTES CATEGORIES</Text>
                </View>
                <View>
                    <FlatList
                        data={rows}
                        renderItem={({ item }) => (
                            <CustomIcons item={item} onPress={()=>Navigation.navigate('UpdateCategorie',{item})}/>
                        )}
                        keyExtractor={(item) => item._id}

                    />
                </View>
                <Pressable style={{ flex: 0.15 }} >
                    <CustomIcons item={NewIcon} onPress={() => Navigation.navigate('NewCategorie')}/>
                </Pressable>
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5
    }
})