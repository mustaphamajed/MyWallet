import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../constants/Colors'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ProgressCircle from 'react-native-progress-circle'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import GoalActions from '../../Redux-Saga/Store/Goal/Actions'
import { useDispatch, useSelector } from 'react-redux'
const ObjectifDetail = ({ route }) => {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [mont, setMont] = useState()

    const sliceColor = [Colors.green, Colors.gray]
    const item = route.params.item
    const series = [item.Enregistre, item.MontantCible]
    const goals = useSelector(state => state.goal.goals)
    const goal = useSelector(state => state.goal.goal)
    const Navigation = useNavigation()

    const update = () => {
        const payload = {
            id: item._id,
            new: {
                Enregistre: parseInt(item.Enregistre) + parseInt(mont)
            }
        }

        dispatch(GoalActions.updateGoal(payload))
        setModal(false)
    }
    useEffect(() => {
        const payload1 = {
            id: item._id
        }
        dispatch(GoalActions.oneGoal(payload1))

    }, [goals, goal])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.1 }}>
                <Entypo
                    name="cross"
                    size={28}
                    style={{
                        padding: 6,
                        position: 'absolute',
                        top: 12,
                        left: 0,
                        zIndex: 2,
                    }}
                    color={'#FFF'}
                    onPress={() => {
                        Navigation.goBack(-1)
                    }}
                />
            </View>
            <View style={styles.footer}>
                <View style={{ backgroundColor: Colors.white, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.head}>

                        <MaterialIcon name={goal.icon} color={goal.color ? goal.color : 'black'} size={30} />
                        <Text style={{ color: 'black', marginHorizontal: 10, fontSize: 16, fontWeight: '500' }}>{goal.name ? goal.name : null}</Text>
                    </View>


                    <View style={styles.pieChartContainer}>
                        <ProgressCircle
                            percent={(100 * goal.Enregistre) / goal.MontantCible}
                            radius={80}
                            borderWidth={12}
                            color="#8BED4F"
                            shadowColor={Colors.gray}
                            bgColor="#fff"
                        >
                            <View style={styles.pieFill}>

                                <Text style={styles.pieFillText}> {((100 * goal.Enregistre) / goal.MontantCible).toFixed(2)} % </Text>
                                <Text style={styles.pieFillTextAmount}> {goal.Enregistre}/{goal.MontantCible}</Text>
                                <Text style={styles.pieFillText}> TND </Text>

                            </View>
                        </ProgressCircle>

                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 16 }}>Total Enregistre</Text>
                            <Text style={{ color: Colors.black, fontWeight: '700' }}>{goal.Enregistre} TND</Text>
                        </View>

                    </View>

                </View>
                <View style={{ margin: 10 }}>
                    <CustomButton text={'AUGMENTER LE MONTANT ENREGISTRE'} onPress={() => setModal(true)} />
                </View>
            </View>
            <Modal visible={modal} transparent={true} animationType='fade' >
                <View style={{
                    flex: 1,

                    justifyContent: 'center',


                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={{ height: 250, marginHorizontal: 50, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo
                                name="cross"
                                size={28}
                                style={{
                                    padding: 6,
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    zIndex: 2,
                                }}
                                color={'#000'}
                                onPress={() => {
                                    setModal(false)
                                }}
                            />
                            <Text style={{ color: 'black' }}> Entre le montant </Text>
                        </View>
                        <View style={{ flex: 0.8, top: 10, padding: 10, justifyContent: 'space-around' }}>
                            <CustomInput value={mont}
                                setValue={(mont) => setMont(mont)}
                                placeholder="entre le montant a ajouter" />
                            <CustomButton text={'augmenter'} onPress={() => update()} />
                        </View>





                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default ObjectifDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 8,
    },
    head: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    pieChartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    pieFill: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pieFillTextAmount: {
        fontSize: 18,
        lineHeight: 23,
        color: Colors.black,
    },
    pieFillText: {
        fontSize: 12,
        lineHeight: 15,
        color: Colors.black,
        textAlign: 'center',
    },
})