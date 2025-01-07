/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Spend} from '../util/db/models/spend';
import {
  deleteSpend,
  getHistoricalSpends,
  getHistoricalTotalSpends,
  getUser,
} from '../util/db/repository';
import {Button, Portal, Text, Modal, useTheme} from 'react-native-paper';
import {handleInputChange} from '../util/currencyInputHandler';
import moment from 'moment';
import {AccountifyUser} from '../util/db/models/accountifyUser';
import DropdownField from './common/DropdownField';
import {historySpendConfig} from '../util/historySpendConfig';

const categoryConfig = [
  {value: '0', label: 'All'},
  {value: '1', label: 'Needs'},
  {value: '2', label: 'Wants'},
  {value: '3', label: 'Savings'},
];

const HistoryScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [spends, setSpends] = useState<Spend[]>([]);
  const [settings, setSettings] = useState<AccountifyUser>();
  const [visible, setVisible] = useState(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState('');
  const [totalMonthSpends, setTotalMonthSpends] = useState(0);
  const [historyConfig, setHistoryConfig] = useState('0');
  const [category, setCategory] = useState('0');

  useEffect(() => {
    (async () => {
      const userSettings = await getUser();
      const totalSpends = await getHistoricalTotalSpends(
        parseInt(historyConfig),
        parseInt(category),
      );
      if (userSettings && userSettings.length > 0) {
        setSettings(userSettings[0].rows.raw()[0]);
      }
      const userSpends = await getHistoricalSpends(
        parseInt(historyConfig),
        parseInt(category),
      );
      if (userSpends && userSpends.length > 0 && totalSpends) {
        setSpends(userSpends[0].rows.raw());
        console.log({historyConfig, spends: userSpends[0].rows.raw()});
        setTotalMonthSpends(totalSpends[0].rows.raw()[0].total || 0);
      }
    })();
  }, [historyConfig]);

  function handleEditButton(spendId: string) {
    navigation.push('AddSpend', {
      spendId,
    });
  }

  function handleDeleteButton(spendId: string) {
    setVisible(true);
    setIdToBeDeleted(spendId);
  }

  async function handleModalButtons(removeSpend: boolean) {
    if (removeSpend) {
      await deleteSpend(idToBeDeleted);
      setSpends(spends.filter(spend => spend.id !== idToBeDeleted));
      setVisible(false);
      navigation.push('Home');
    } else {
      setVisible(false);
    }
  }

  const hideModal = () => setVisible(false);

  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20};

  const theme = useTheme();
  return (
    <ScrollView
      style={{
        paddingLeft: 10,
        paddingRight: 10,
      }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={{color: 'black', marginBottom: 20}}>
            Are you sure you want to delete this spend?
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <Button
              onPress={() => handleModalButtons(false)}
              style={{backgroundColor: 'white'}}>
              No
            </Button>
            <Button
              onPress={() => handleModalButtons(true)}
              style={{backgroundColor: 'red'}}>
              Yes
            </Button>
          </View>
        </Modal>
      </Portal>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 40,
        }}>
        <Text style={{fontSize: 30}}>History</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          zIndex: 4000,
        }}>
        <DropdownField
          items={historySpendConfig}
          setItem={(value: string) => setHistoryConfig(value)}
          placeholderText="How far back do you want to go?"
          labelText="How far back?"
          value={historyConfig.toString()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          zIndex: 4000,
        }}>
        <DropdownField
          items={categoryConfig}
          setItem={(value: string) => setCategory(value)}
          placeholderText="Choose category"
          labelText="Category"
          value={category.toString()}
        />
      </View>
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          overflow: 'scroll',
          margin: 20,
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>{`Total spends: ${settings?.defaultCurrency} ${handleInputChange(
          (Math.round(totalMonthSpends * 100) / 100).toString(),
        )}`}</Text>
      </View>
      {spends && spends.length > 0 ? (
        <View
          style={{
            overflow: 'scroll',
            paddingBottom: 10,
          }}>
          <ScrollView>
            {spends.map((spend, i) => (
              <View key={i}>
                <View
                  style={{
                    backgroundColor: theme.colors.onTertiary,
                    borderRadius: 30,
                    paddingLeft: 20,
                    marginBottom: 20,
                    paddingTop: 10,
                    paddingRight: 20,
                  }}>
                  <Text style={{fontSize: 30}}>
                    {spend.spendTitle.length > 0
                      ? spend.spendTitle
                      : spend.category.charAt(0).toUpperCase() +
                        spend.category.slice(1)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    {`${settings?.defaultCurrency} ${handleInputChange(
                      spend.amount.toString(),
                    )}`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    {moment(spend.dateAdded).format('MMMM Do YYYY, h:mm a')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontStyle: 'italic',
                    }}>
                    {spend.category.charAt(0).toUpperCase() +
                      spend.category.slice(1)}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 20,
                    }}>
                    <Button onPress={() => handleEditButton(spend.id)}>
                      Edit
                    </Button>
                    <Button
                      onPress={() => handleDeleteButton(spend.id)}
                      style={{backgroundColor: 'red'}}>
                      Delete
                    </Button>
                  </View>
                </View>
              </View>
            ))}
            <View style={{height: 200}}></View>
          </ScrollView>
        </View>
      ) : (
        <Text style={{fontSize: 20, textAlign: 'center'}}>No history yet</Text>
      )}
    </ScrollView>
  );
};

export default HistoryScreen;
