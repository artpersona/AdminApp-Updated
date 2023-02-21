import React, {useState, useContext, useEffect} from 'react';
import {View, KeyboardAvoidingView, FlatList} from 'react-native';
import styles from './styles';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
// import {Input, Icon, Item} from 'native-base';
import {ProductContext} from '../../shared/contexts/ProductContext';
import {AuthContext} from '../../shared/contexts/AuthContext';
import {RFValue} from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

import ProductItem from './ProducItem/ProductItem';
function Products() {
  const {storeProducts, productCategories} = useContext(ProductContext);
  const {userInfoRole, userInfoStore, userBranch} = useContext(AuthContext);

  const [filteredProducts, setFilteredProducts] = useState(storeProducts);
  const [searchText, setSearchText] = useState('');
  const [productCategoriesList, setProductCategoriesList] =
    useState(productCategories);
  const storeID =
    userInfoRole == 'branch_admin' ? String(userBranch) : String(userInfoStore);

  useEffect(() => {
    const tempProdCategories = ['All', ...productCategories];
    setProductCategoriesList(tempProdCategories);
  }, [productCategories]);

  useEffect(() => {
    if (searchText != '')
      setFilteredProducts(
        storeProducts.filter(prod => {
          return prod.name.toLowerCase().includes(searchText.toLowerCase());
        }),
      );
  }, [storeProducts, searchText]);

  const renderItem = ({item}) => (
    <ProductItem key={item.key} data={item} storeID={storeID} />
  );
  const keyExtract = (item, index) => item.key;

  const handleCategorySelect = item => {
    const tempItems = [...storeProducts];
    if (item.value != 'All') {
      setFilteredProducts(
        tempItems.filter(data => data.product_category_name == item.value),
      );
    } else {
      setFilteredProducts(tempItems);
    }
  };

  return (
    <>
      <CustomHeader></CustomHeader>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.search__container}>
          {/* <Item style={styles.search__section}>
            <Input
              placeholder="Search"
              onChangeText={(text) => {
                setSearchText(text);
              }}
              style={{ fontSize: RFValue(16) }}
            />
            <Icon name="ios-search" />
          </Item> */}
        </View>
        <DropDownPicker
          items={productCategoriesList.map((item, index) => {
            console.log('item is: ', item);
            const newArray = {
              label: item,
              value: item,
            };
            return newArray;
          })}
          placeholder="Select Category"
          containerStyle={styles.refLoc__container}
          itemStyle={styles.refLoc__dropdown_text}
          globalTextStyle={[styles.refLoc__dropdown_text, {color: 'black'}]}
          dropDownStyle={{backgroundColor: '#ffe8db'}}
          dropDownContainerStyle={{backgroundColor: 'red'}}
          onChangeItem={handleCategorySelect}
          style={{backgroundColor: '#ffe8db'}}
          arrowColor={'black'}
        />
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '90%',
            alignSelf: 'center',
          }}
          keyExtractor={keyExtract}
          removeClippedSubviews={false}
          maxToRenderPerBatch={8}
        />
      </KeyboardAvoidingView>
    </>
  );
}

export default Products;
