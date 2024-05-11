import React, {useEffect, useState} from 'react';
import {getSpendsObject} from '../util/getSpendsObject';
import {
  View,
  Text,
  Switch,
  GestureResponderEvent,
  ToastAndroid,
} from 'react-native';
import {Button, Checkbox, useTheme} from 'react-native-paper';
import MoneyAmountField from './common/MoneyAmountField';
import DropdownField from './common/DropdownField';
import {spendCategoryList} from '../util/spendCategoryList';
import {v4 as uuidv4} from 'uuid';
import {Spend} from '../util/db/models/spend';
import TextBox from './common/TextBox';
import DatePicker from 'react-native-date-picker';
import {currencyMasker} from '../util/currencyMasker';
import moment from 'moment';
import AffirmationButton from './common/AffirmationButton';
import {addSpend} from '../util/db/repository';

const AddSpendScreen: React.FC<{
  navigation: any;
  route: any;
}> = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [spend, setSpend] = useState<Spend>({
    amount: 0,
    category: 'needs',
    spendTitle: '',
    id: '',
    recurringSpend: false,
    timeAdded: Date.now(),
  });
  const [spendsObject, setSpendsObject] = useState<any>(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  useEffect(() => {
    console.log(route);
    getSpendsObject(route.params.currentUser).then(spendObject => {
      setSpendsObject(spendObject);
      setIsLoading(false);
    });
  }, []);

  const theme = useTheme();

  const handleSaveSpend = async (e: GestureResponderEvent) => {
    e.preventDefault();
    if (spend.amount > 0) {
      await addSpend({
        ...spend,
        id: uuidv4(),
      });
      navigation.push('Home', {currentUser: route.params.currentUser});
    } else {
      ToastAndroid.showWithGravity(
        'Amount should be greater than 0',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return !isLoading ? (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.background,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{fontSize: 30, color: 'white'}}>Add Spend</Text>
      </View>
      <MoneyAmountField
        amount={'0'}
        setAmount={(amount: string) => {
          setSpend({
            ...spend,
            amount: parseFloat(amount.split(',').join('')) as number,
          });
        }}
        label="Enter spend"
      />
      <View>
        <DropdownField
          items={spendCategoryList}
          setItem={(newValue: any) => {
            setSpend({
              ...spend,
              category: newValue,
            });
          }}
          placeholderText="Select default currency"
          labelText="Spend category"
          value={spend.category}
        />
        <Text
          style={{
            color: 'white',
          }}>{`${route.params.currentUser.defaultCurrency} ${currencyMasker(
          spendsObject[spend.category].remaining.toString(),
        )} available to spend`}</Text>
      </View>
      <TextBox
        label="Give the spend a name"
        text={spend.spendTitle}
        placeholder="Spend title"
        type="string"
        setText={(title: any): any => {
          setSpend({
            ...spend,
            spendTitle: title,
          });
        }}
      />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Text style={{color: 'white', fontSize: 20}}>Recurring spend</Text>
        <Switch
          value={spend.recurringSpend}
          onValueChange={value => {
            setSpend({
              ...spend,
              recurringSpend: !spend.recurringSpend,
            });
          }}
        />
      </View>
      <Button onPress={() => setIsDateModalOpen(!isDateModalOpen)}>
        {moment(spend.timeAdded).format('MMMM Do YYYY, h:mm a')}
      </Button>
      <DatePicker
        modal
        open={isDateModalOpen}
        date={new Date()}
        maximumDate={new Date()}
        onConfirm={date => {
          setSpend({
            ...spend,
            timeAdded: date.getTime(),
          });
          setIsDateModalOpen(false);
        }}
        onCancel={() => setIsDateModalOpen(false)}
      />
      <AffirmationButton text="Save spend" onPressCallback={handleSaveSpend} />
    </View>
  ) : null;
};

export default AddSpendScreen;
