import React, {useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import { Spend } from '../util/db/models/spend';
import { deleteSpend, getAllSpends, getUser } from '../util/db/repository';
import { Button, Portal, Text, Modal, useTheme } from 'react-native-paper';
import { handleInputChange } from '../util/currencyInputHandler';
import moment from 'moment'
import { AccountifyUser } from '../util/db/models/accountifyUser';
import DatePicker from 'react-native-date-picker';

const HistoryScreen: React.FC<{ navigation: any}> = ({navigation}) => {
    const [spends, setSpends] = useState<Spend[]>([]);
    const [settings, setSettings] = useState<AccountifyUser>();
    const [visible, setVisible] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState('');
    const [isDateModalOpen, setIsDateModalOpen] = useState(false); 

    useEffect(() => {
        (async () => {
            const userSettings = await getUser();
            if(userSettings && userSettings.length > 0){
                setSettings(userSettings[0].rows.raw()[0]);
            }
            const userSpends = await getAllSpends();
            if(userSpends && userSpends.length > 0){
             setSpends(userSpends[0].rows.raw());
            }
        })();
    }, []);

    function handleEditButton(spendId: string){
        navigation.push('AddSpend', {
            spendId
        })
    }

    function handleDeleteButton(spendId: string){
        setVisible(true);
        setIdToBeDeleted(spendId);
    }

    async function handleModalButtons(removeSpend: boolean){
        if(removeSpend){
            await deleteSpend(idToBeDeleted);
            setSpends(spends.filter(spend => spend.id !== idToBeDeleted))
            setVisible(false);
            navigation.push("Home");
        }
        else setVisible(false)
    }


    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20};

    const theme = useTheme();
    return (
    <ScrollView
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: theme.colors.background,
          overflow: 'scroll'
        }}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{color: 'black', marginBottom: 20}}>
                    Are you sure you want to delete this spend?
                </Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button onPress={() => handleModalButtons(false)} style={{backgroundColor: 'white'}}>No</Button>
                    <Button onPress={() => handleModalButtons(true)} style={{backgroundColor: 'red'}}>Yes</Button>
                </View>
                </Modal>
            </Portal>
            <DatePicker 
                modal
                open={isDateModalOpen}
                date={new Date()}
                maximumDate={new Date()}
                onCancel={() => setIsDateModalOpen(false)}
            />
            <View
                style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 40
                }}>
                <Text style={{fontSize: 30}}>History</Text>
            </View>
            {
                spends.map((spend, i) => (
                    <View
                    key={i}>
                        <View
                        style={{
                            backgroundColor: theme.colors.onPrimary,
                            borderRadius: 10,
                            paddingLeft: 20,
                            marginBottom: 20,
                            paddingTop: 10
                        }}>
                        <Text style={{fontSize: 35}}>{spend.spendTitle.length > 0 ? spend.spendTitle : spend.category}</Text>
                        <Text
                            style={{
                            fontSize: 25,
                            }}>
                            {`${settings?.defaultCurrency} ${handleInputChange(spend.amount.toString())}`}
                        </Text>
                        <Text
                            style={{
                            fontSize: 25,
                            }}>
                            {moment(spend.dateAdded).format('MMMM Do YYYY, h:mm a')}
                        </Text>
                        <Text
                            style={{
                                fontSize: 25,
                            }}>
                            {spend.category.charAt(0).toUpperCase() + spend.category.slice(1)}
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 20
                        }}>
                            <Button onPress={() => handleEditButton(spend.id)}>Edit</Button>
                            <Button onPress={() => handleDeleteButton(spend.id)} style={{backgroundColor: 'red'}}>Delete</Button>
                        </View>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
    }

export default HistoryScreen;