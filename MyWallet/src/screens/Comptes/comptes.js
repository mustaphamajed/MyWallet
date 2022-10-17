import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import MenuButton from '../../components/MenuButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import BudgetActions from '../../Redux-Saga/Store/Budget/Actions'
import CustomBudgetList from '../../components/CustomBudgetList'
import CategorieActions from '../../Redux-Saga/Store/Categorie/Actions'

const Comptes = () => {
    const dispatch = useDispatch()
    const Navigation = useNavigation()
    const addBudget = () => {
        Navigation.navigate('NewBudget')
    }
    const user = useSelector(state => state.user.user)
    const budget = useSelector(state => state.budget.budgets)

    useEffect(() => {
        const payload1 = {
            userId: user._id
        }



        dispatch(BudgetActions.getBudgets(payload1))
        dispatch(CategorieActions.fetch())

    }, [user, budget])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <MenuButton />
                <AntDesign name="plus" size={28}
                    style={{
                        padding: 12,
                        position: 'absolute',
                        top: 6,
                        right: 0,
                        zIndex: 2,
                    }}
                    color="#FFF"
                    onPress={addBudget} />
            </View>
            <View style={styles.footer}>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: Colors.black }}>List de Budget</Text>
                </View>

                <FlatList
                    data={budget}
                    renderItem={({ item }) => (
                        <CustomBudgetList props={item} onPress={() => { Navigation.navigate('BudgetDetail', { id: item._id }) }} />

                    )}
                    keyExtractor={(item) => item._id}

                />
            </View>
        </View>
    )
}

export default Comptes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,
    }
})