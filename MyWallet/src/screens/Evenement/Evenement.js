import React, { useState, useMemo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native'
import MenuButton from '../../components/MenuButton'
import { Agenda } from 'react-native-calendars';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { addDays, format } from 'date-fns';
import Colors from '../../constants/Colors';
import CustomInput from '../../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import EventActions from '../../Redux-Saga/Store/Event/Actions'
import CustomButtom from '../../components/CustomButton'

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};
const Evenement = () => {


    const [items, setItems] = useState({});
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [modal1, setModal1] = useState(false)

    const [name, setName] = useState()
    const [date, setDate] = useState(new Date())
    const [it,setIt] = useState()
    const dispatch = useDispatch()
    const events = useSelector(state => state.event.events)
    const user = useSelector(state => state.user.user)
    const newEv = () => {
        const payload = {
            name: name,
            Date: format(date, 'yyyy-MM-dd').toString(),
            userId: user._id
        }
        setModal(false)
        dispatch(EventActions.newEvent(payload))

    }
    const parseDate = date => {
        var d = Date.parse(date);
        var year = new Date(d).getFullYear().toString();
        var month = new Date(d).getMonth().toString();
        var day = new Date(d).getDate().toString();

        return day + '-' + month + '-' + year;
    };

    const remove = (item) => {
        const payload = {
            id: item._id,
            user: {
                userId: user._id
            }

        }


        dispatch(EventActions.removeEvent(payload))
        setModal1(false)
    }

    
    const update = (item) => {

        const payload = {
            id: item._id,
            event: {
                userId: user._id,
                name: name,
                Date:date
            }

        }


        dispatch(EventActions.updateEvent(payload))
        setModal1(false)
    }

    useEffect(() => {

        const getData = async () => {

            const data = [{ name: 'ddd', date: '2022-04-25' }, { name: 'dsss', date: '2022-04-26' }]

            const mappedData = events.map((post, index) => {
                const dates = new Date(events[index].Date)

                return {
                    ...post,
                    date: format(dates, 'yyyy-MM-dd'),
                };
            });

            const reduced = mappedData.reduce(
                (acc, currentItem) => {
                    const { date, ...coolItem } = currentItem;

                    acc[date] = [coolItem];

                    return acc;
                },
                {},
            );

            setItems(reduced ? reduced : null)

        }
        getData()
        console.log(events)
    }, [events])




    const renderItem = (item) => {
        return (
            <View style={styles.itemContainer}>
                <View>
                    <Text style={{ color: Colors.accent }}>{item.name}</Text>

                </View>
                <View>
                    <View style={{flexDirection:'row'}}>
                    <View style={{  flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10 }}>
                            <TouchableOpacity style={{ right: 20 }} onPress={() => remove(item)}>
                                <Text style={{ color: 'red', fontWeight: '600', fontSize: 16 }}>delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setIt(item),setModal1(true)}}>
                                <Text style={{ color: 'blue', fontWeight: '600', fontSize: 16 }}>Update</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>

            </View>
        );
    };
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
                    onPress={() => setModal(true)}
                />
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 1 }}>
                    <Agenda
                        items={items}

                        renderItem={renderItem}

                    />
                </View>
            </View>

            <Modal visible={modal} transparent={true} animationType='fade'>
                <View style={{
                    flex: 1,

                    justifyContent: 'center',


                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={{ height: 250, marginHorizontal: 30, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}>

                        <View style={{ padding: 8 }}>
                            <Text style={{ color: '#000' }}>Description</Text>
                            <CustomInput value={name} setValue={setName} placeholder='nom' />
                        </View>
                        <Pressable
                            style={{ borderRadius: 8, borderWidth: 0.5, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, padding: 10, backgroundColor: '#fff' }}
                            onPress={() => setOpen(true)}>
                            <Text style={{ color: '#000' }}>{parseDate(date)}</Text>

                            <DateTimePickerModal
                                isVisible={open}
                                mode="date"

                                onConfirm={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />

                        </Pressable>

                        <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10 }}>
                            <TouchableOpacity style={{ right: 20 }} onPress={() => setModal(false)}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>ANNULER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => newEv()}>
                                <Text style={{ color: 'blue', fontWeight: '600', fontSize: 16 }}>SAUVEGARDER</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>
            <Modal visible={modal1} transparent={true} animationType='fade'>
                <View style={{
                    flex: 1,

                    justifyContent: 'center',


                    backgroundColor: 'rgba(52, 52, 52, 0.4)'
                }}>
                    <View style={{ height: 250, marginHorizontal: 30, borderRadius: 8, justifyContent: 'center', backgroundColor: '#FFF' }}>

                        <View style={{ padding: 8 }}>
                            <Text style={{ color: '#000' }}>Description</Text>
                            <CustomInput value={name} setValue={setName} placeholder='desc' />
                        </View>
                        <Pressable
                            style={{ borderRadius: 8, borderWidth: 0.5, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, padding: 10, backgroundColor: '#fff' }}
                            onPress={() => setOpen(true)}>
                            <Text style={{ color: '#000' }}>{parseDate(date)}</Text>

                            <DateTimePickerModal
                                isVisible={open}
                                mode="date"

                                onConfirm={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />

                        </Pressable>

                        <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10 }}>
                            <TouchableOpacity style={{ right: 20 }} onPress={() => setModal1(false)}>
                                <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>ANNULER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => update(it)}>
                                <Text style={{ color: 'blue', fontWeight: '600', fontSize: 16 }}>SAUVEGARDER</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F02A4B',
    },
    footer: {
        flex: 0.9, backgroundColor: Colors.gray, borderTopLeftRadius: 5, borderTopRightRadius: 5,

    },
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})

export default Evenement