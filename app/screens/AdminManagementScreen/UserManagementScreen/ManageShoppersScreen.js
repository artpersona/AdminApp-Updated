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
const mockOrders = [
  {
    id: 'Order 1',
    image: 'https://via.placeholder.com/150',
    detail: 'Vintage Camera',
    amount: '$120.00',
    quantity: 2,
  },
  {
    id: 'Order 2',
    image: 'https://via.placeholder.com/150',
    detail: 'Leather Wallet',
    amount: '$40.00',
    quantity: 1,
  },
  // Add more mock orders as needed
];
const ManageShoppersScreen = () => {
  const [search, setSearch] = useState('');
  const [shoppers, setShoppers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, Anytown, USA',
      orders: mockOrders,
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      address: '456 Elm St, Anytown, USA',
      orders: mockOrders,
    },
    {
      id: '3',
      name: 'Alice Smith',
      email: 'alice@example.com',
      address: '789 Pine St, Anytown, USA',
      orders: mockOrders,
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShopperOrders, setSelectedShopperOrders] = useState([]);
  const [editShopper, setEditShopper] = useState(null);

  const filteredShoppers = shoppers.filter(shopper =>
    shopper.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = id => {
    Alert.alert(
      'Delete Shopper',
      'Are you sure you want to delete this shopper?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () =>
            setShoppers(shoppers.filter(shopper => shopper.id !== id)),
        },
      ],
    );
  };
  const handleEditPress = shopper => {
    setEditShopper(shopper);
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

  const handleShowOrders = orders => {
    setSelectedShopperOrders(orders);
    setModalVisible(true);
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItemContainer}>
      <Image source={{uri: item.image}} style={styles.orderItemImage} />
      <View style={styles.orderItemDetail}>
        <Text>{item.detail}</Text>
        <Text>Amount: {item.amount}</Text>
        <Text>Quantity: {item.quantity}</Text>
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
          <TouchableOpacity onPress={() => handleShowOrders(item.orders)}>
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
        placeholder="Search Shoppers"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredShoppers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {editShopper ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditShopper(null); // Reset editShopper when closing the modal
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Edit Shopper</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={editShopper.name}
                onChangeText={text =>
                  setEditShopper({...editShopper, name: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={editShopper.email}
                onChangeText={text =>
                  setEditShopper({...editShopper, email: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={editShopper.address}
                onChangeText={text =>
                  setEditShopper({...editShopper, address: text})
                }
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // Update shopper details in the state
                  const updatedShoppers = shoppers.map(shopper =>
                    shopper.id === editShopper.id ? editShopper : shopper,
                  );
                  setShoppers(updatedShoppers);
                  setModalVisible(!modalVisible);
                  setEditShopper(null); // Reset editShopper after updating
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
              <Text style={styles.modalText}>Order History</Text>
              <FlatList
                data={selectedShopperOrders}
                renderItem={renderOrderItem}
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

export default ManageShoppersScreen;
