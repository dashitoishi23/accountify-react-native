import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {handleInputChange} from '../util/currencyInputHandler';
import moment from 'moment';
import {
  deleteSpend,
  getAllSpendsByMonth,
  getHistoricalSpends,
  getHistoricalTotalSpends,
  getTotalSpendsInCurrentMonth,
  getUser,
} from '../util/db/repository';
import {AccountifyUser} from '../util/db/models/accountifyUser';
import {historySpendConfig} from '../util/historySpendConfig';
import {Spend} from '../util/db/models/spend';

const HistoryScreen: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const [spends, setSpends] = useState<Spend[]>([]);
  const [settings, setSettings] = useState<AccountifyUser>();
  const [modalVisible, setModalVisible] = useState(false);
  const [spendToDelete, setSpendToDelete] = useState<Spend>();
  const [totalMonthSpends, setTotalMonthSpends] = useState(0);
  const [historyConfig, setHistoryConfig] = useState('0');

  useEffect(() => {
    (async () => {
      const userSettings = await getUser();
      const totalSpends = await getHistoricalTotalSpends(
        parseInt(historyConfig),
      );
      if (userSettings && userSettings.length > 0) {
        setSettings(userSettings[0].rows.raw()[0]);
      }
      const userSpends = await getHistoricalSpends(parseInt(historyConfig));
      if (userSpends && userSpends.length > 0 && totalSpends) {
        setSpends(userSpends[0].rows.raw());
        setTotalMonthSpends(totalSpends[0].rows.raw()[0].total || 0);
      }
    })();
  }, [historyConfig]);

  const handleEditButton = (spendId: string) => {
    navigation.push('AddSpend', {spendId});
  };

  const handleDeleteButton = (spend: Spend) => {
    setSpendToDelete(spend);
    setModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteSpend(spendToDelete!.id);
    setSpends(spends.filter(spend => spend.id !== spendToDelete!.id));
    setModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>History</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => {
            // Implement dropdown functionality
          }}>
          <Text style={styles.dropdownText}>{historyConfig}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalSpendContainer}>
        <Text style={styles.totalSpendText}>
          Total spends: {settings?.defaultCurrency}{' '}
          {handleInputChange(totalMonthSpends.toString())}
        </Text>
      </View>
      <View style={styles.spendContainer}>
        {spends.map(spend => (
          <View key={spend.id} style={styles.spendItem}>
            <Text style={styles.spendTitle}>
              {spend.spendTitle.length > 0
                ? spend.spendTitle
                : spend.category.charAt(0).toUpperCase() +
                  spend.category.slice(1)}
            </Text>
            <Text style={styles.spendAmount}>
              {settings?.defaultCurrency}{' '}
              {handleInputChange(spend.amount.toString())}
            </Text>
            <Text style={styles.spendDate}>
              {moment(spend.dateAdded).format('MMMM Do YYYY, h:mm a')}
            </Text>
            <Text style={styles.spendCategory}>
              {spend.category.charAt(0).toUpperCase() + spend.category.slice(1)}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEditButton(spend.id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeleteButton(spend)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this spend?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={handleDeleteCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={handleDeleteConfirm}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  dropdownContainer: {
    padding: 8,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#fff',
  },
  totalSpendContainer: {
    marginBottom: 16,
  },
  totalSpendText: {
    fontSize: 16,
    color: '#fff',
  },
  spendContainer: {
    flex: 1,
  },
  spendItem: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  spendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  spendAmount: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  spendDate: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  spendCategory: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007bff',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  modalCancelButton: {
    backgroundColor: '#007bff',
    marginRight: 10,
  },
  modalDeleteButton: {
    backgroundColor: '#dc3545',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HistoryScreen;
