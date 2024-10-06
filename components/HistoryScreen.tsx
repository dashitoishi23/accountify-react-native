import React, {useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import { Spend } from '../util/db/models/spend';
import { getAllSpends, getUser } from '../util/db/repository';
import { Button, Text, useTheme } from 'react-native-paper';
import { handleInputChange } from '../util/currencyInputHandler';
import moment from 'moment'
import { AccountifyUser } from '../util/db/models/accountifyUser';

const HistoryScreen: React.FC<{ navigation: any}> = ({navigation}) => {
    const [spends, setSpends] = useState<Spend[]>([]);
    const [settings, setSettings] = useState<AccountifyUser>();

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

    const theme = useTheme();
    return (
    <ScrollView
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: theme.colors.background,
          overflow: 'scroll'
        }}>
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
                            {spend.category}
                        </Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginBottom: 20
                        }}>
                            <Button onPress={() => handleEditButton(spend.id)}>Edit</Button>
                            <Button style={{backgroundColor: 'red'}}>Delete</Button>
                        </View>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
    )
    }

export default HistoryScreen;