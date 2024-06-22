import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Swipeable} from 'react-native-gesture-handler';
const mockResellers = [
  {
    id: 'Reseller 1',
    image: 'https://via.placeholder.com/150',
    detail: 'Location: Downtown',
    amount: 'Managed Orders: 120',
    quantity: 'Active Since: 2 years',
  },
  {
    id: 'Reseller 2',
    image: 'https://via.placeholder.com/150',
    detail: 'Location: Uptown',
    amount: 'Managed Orders: 40',
    quantity: 'Active Since: 1 year',
  },
];
const ManageResellersScreen = () => {
  const [search, setSearch] = useState('');
  const [resellers, setResellers] = useState([
    {
      id: '1',
      name: 'Reseller 1',
      email: 'reseller1@example.com',
      address: '123 Main St, Anytown, USA',
      resellers: mockResellers,
    },
    {
      id: '2',
      name: 'Reseller 2',
      email: 'reseller2@example.com',
      address: '456 Elm St, Anytown, USA',
      resellers: mockResellers,
    },
    {
      id: '3',
      name: 'Reseller 3',
      email: 'reseller3@example.com',
      address: '789 Pine St, Anytown, USA',
      resellers: mockResellers,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResellerResellers, setSelectedResellerResellers] = useState(
    [],
  );
  const [editReseller, setEditReseller] = useState(null);

  const filteredResellers = resellers.filter(reseller =>
    reseller.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = id => {
    Alert.alert(
      'Delete Reseller',
      'Are you sure you want to delete this reseller?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () =>
            setResellers(resellers.filter(reseller => reseller.id !== id)),
        },
      ],
    );
  };
  const handleEditPress = reseller => {
    setEditReseller(reseller);
    setModalVisible(true);
  };

  const renderRightActions = id => {
    return (
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const handleShowResellers = resellers => {
    setSelectedResellerResellers(resellers);
    setModalVisible(true);
  };

  const renderResellerItem = ({item}) => (
    <View style={styles.orderItemContainer}>
      <Image source={{uri: item.image}} style={styles.orderItemImage} />
      <View style={styles.orderItemDetail}>
        <Text>{item.detail}</Text>
        <Text>{item.amount}</Text>
        <Text>{item.quantity}</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.row}>
        <View style={[styles.cell, styles.firstColumn]}>
          <Image
            source={{uri: 'https://via.placeholder.com/50'}}
            style={styles.userImage}
          />
        </View>
        <View style={[styles.cell, styles.secondColumn]}>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text>{item.address}</Text>
        </View>
        <View style={[styles.cell, styles.thirdColumn]}>
          <TouchableOpacity
            onPress={() => {
              handleEditPress(item);
            }}>
            <Icon name="edit" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowResellers(item.resellers)}>
            <Icon name="history" size={20} color="purple" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search Resellers"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredResellers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {editReseller ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditReseller(null);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Reseller</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editReseller.name}
                onChangeText={text =>
                  setEditReseller({...editReseller, name: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editReseller.email}
                onChangeText={text =>
                  setEditReseller({...editReseller, email: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={editReseller.address}
                onChangeText={text =>
                  setEditReseller({...editReseller, address: text})
                }
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  const updatedResellers = resellers.map(reseller =>
                    reseller.id === editReseller.id ? editReseller : reseller,
                  );
                  setResellers(updatedResellers);
                  setModalVisible(!modalVisible);
                  setEditReseller(null);
                }}>
                <Text style={styles.textStyle}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Reseller History</Text>
              <FlatList
                data={selectedResellerResellers}
                renderItem={renderResellerItem}
                keyExtractor={item => item}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  search: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondColumn: {
    flex: 2,
    alignItems: 'flex-start',
  },
  thirdColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 80,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
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

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  orderItem: {
    padding: 10,
    fontSize: 16,
  },
  orderItemContainer: {
    color: 'black',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  orderItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemTitle: {
    fontWeight: 'bold',
  },
});

export default ManageResellersScreen;
