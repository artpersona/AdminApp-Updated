import React, {useEffect, useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

let mockInventoryItems = [
  // Dynamically generated mock inventory items
  // ...Array.from({length: 50}, (_, index) => ({
  //   id: `Item ${index + 3}`,
  //   image: `https://via.placeholder.com/150?text=Item+${index + 3}`,
  //   detail: `Product ${index + 3}`,
  //   price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
  //   quantity: Math.floor(Math.random() * 100 + 1),
  //   dateAdded: `2023-04-${String(Math.floor(index / 5) + 1).padStart(2, '0')}`,
  //   admin: `User ${(index % 20) + 1}`,
  //   company: `Company ${(index % 10) + 1}`,
  // })),
];

const fetchMockInventoryItems = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=50');
  const data = await response.json();
  return data.map((item, index) => ({
    id: `Item ${item.id}`,
    image: item.image,
    detail: item.title,
    price: `$${item.price.toFixed(2)}`,
    quantity: Math.floor(Math.random() * 100 + 1), // Assuming quantity is not provided by the API
    dateAdded: `2023-04-${String(Math.floor(index / 5) + 1).padStart(2, '0')}`, // Assuming dateAdded needs to be generated
    admin: `User ${(index % 20) + 1}`, // Assuming admin is not provided by the API
    company: `Company ${(index % 10) + 1}`, // Assuming company is not provided by the API
  }));
};

// Example usage
fetchMockInventoryItems().then(res => {
  mockInventoryItems = res;
});

const InventoryManagementScreen = () => {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [inventoryItems, setInventoryItems] = useState(mockInventoryItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [adminFilters, setAdminFilters] = useState([]);

  useEffect(() => {
    fetchMockInventoryItems().then(res => {
      setInventoryItems(res);
    });
  }, []);
  const addAdminFilter = filter => {
    setAdminFilters(prevFilters => [...prevFilters, filter]);
  };
  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };
  const filteredItems = inventoryItems.filter(
    item =>
      item.detail.toLowerCase().includes(search.toLowerCase()) &&
      (!dateFilter || item.dateAdded === dateFilter) &&
      (!companyFilter || item.company === companyFilter) &&
      (!userFilter || item.admin === userFilter),
  );

  const handleDelete = id => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () =>
          setInventoryItems(inventoryItems.filter(item => item.id !== id)),
      },
    ]);
  };

  const renderRightActions = id => (
    <TouchableOpacity
      onPress={() => handleDelete(id)}
      style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const handleShowDetails = details => {
    setSelectedItemDetails(details);
    setModalVisible(true);
  };

  const renderItem = ({item}) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.row}>
        <View style={[styles.cell, styles.firstColumn]}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
        </View>
        <View style={[styles.cell, styles.secondColumn]}>
          <Text>{item.detail}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Date Added: {item.dateAdded}</Text>
          <Text>Admin: {item.admin}</Text>
          <Text>Company: {item.company}</Text>
        </View>
        <View style={[styles.cell, styles.thirdColumn]}>
          <TouchableOpacity onPress={() => handleShowDetails(item)}>
            <Icon name="info" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  const handleResetFilters = () => {
    setSearch('');
    setDateFilter('');
    setCompanyFilter('');
    setUserFilter('');
    setAdminFilters([]);
  };

  const removeAdminFilter = index => {
    const filterToRemove = adminFilters[index];
    setAdminFilters(prevFilters => prevFilters.filter((_, i) => i !== index));

    // Determine the type of filter to remove (Date, Company, or User)
    const filterType = filterToRemove.split(':')[0];
    switch (filterType) {
      case 'Date':
        setDateFilter('');
        break;
      case 'Company':
        setCompanyFilter('');
        break;
      case 'User':
        setUserFilter('');
        break;
      default:
        // Handle unexpected filter types if necessary
        break;
    }
  };

  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          placeholder="Search Items"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.toggleFiltersButton}
          onPress={toggleFiltersVisibility}>
          <Text style={styles.toggleFiltersButtonText}>
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </Text>
        </TouchableOpacity>

        {filtersVisible && (
          <>
            <Picker
              selectedValue={dateFilter}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setDateFilter(itemValue);
                if (itemValue) addAdminFilter(`Date: ${itemValue}`);
              }}>
              <Picker.Item label="Filter by Date" value="" />
              {/* Dynamically generate date filter options based on inventory items */}
              {inventoryItems.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.dateAdded}
                  value={item.dateAdded}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={companyFilter}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setCompanyFilter(itemValue);
                if (itemValue) addAdminFilter(`Company: ${itemValue}`);
              }}>
              <Picker.Item label="Filter by Company" value="" />
              {/* Dynamically generate company filter options based on inventory items */}
              {inventoryItems.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.company}
                  value={item.company}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={userFilter}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setUserFilter(itemValue);
                if (itemValue) addAdminFilter(`User: ${itemValue}`);
              }}>
              <Picker.Item label="Filter by User" value="" />
              {/* Dynamically generate user filter options based on inventory items */}
              {inventoryItems.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.admin}
                  value={item.admin}
                />
              ))}
            </Picker>
          </>
        )}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetFilters}>
          <Text style={styles.resetButtonText}>Reset Filters</Text>
        </TouchableOpacity>
        <View style={styles.filtersContainer}>
          {adminFilters.map((filter, index) => (
            <TouchableOpacity key={index} style={styles.filterButton}>
              <Text style={styles.filterText}>{filter}</Text>
              <Icon
                name="times"
                size={15}
                color="white"
                onPress={() => removeAdminFilter(index)}
              />
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Item Details</Text>
              {/* Display selected item details */}
              <Text>Detail: {selectedItemDetails.detail}</Text>
              <Text>Price: {selectedItemDetails.price}</Text>
              <Text>Quantity: {selectedItemDetails.quantity}</Text>
              <Text>Date Added: {selectedItemDetails.dateAdded}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Add your styles here, you can use ManageShoppersScreen styles as a reference
  // Make sure to adjust styles according to the Inventory Management Screen requirements
  container: {
    padding: 10,
  },
  search: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
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
  itemImage: {
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
  resetButton: {
    backgroundColor: '#1480d0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toggleFiltersButton: {
    backgroundColor: '#1480d0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleFiltersButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#1480d0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {
    color: 'white',
    marginRight: 10,
  },
});

export default InventoryManagementScreen;
