import React, {useState, useContext, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import styles from './styles';

import {ProductContext} from '../../../shared/contexts/ProductContext';

function ProductItem({data, storeID}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const {updateProduct} = useContext(ProductContext);

  const [stock, setStock] = useState('' + data.stock[`${storeID}`]);
  const [productName, setProductName] = useState(data.name);
  const [storePrice, setStorePrice] = useState(data.storePrice);
  const [sellingPriceMargin, setSellingPriceMargin] = useState(
    data.storePrice + 5,
  );
  const [discountedPrice, setDiscountedPrice] = useState(data.discountPrice);
  const [discountPriceMargin, setDiscountPriceMargin] = useState(
    data.discountPrice + 5,
  );

  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    if (data.storePrice == '0') {
      setTextColor('red');
    } else {
      data?.discountPrice ? setTextColor('green') : setTextColor('black');
    }
  }, [data.storePrice, data.discountPrice]);

  const handleInputChange = (text, setData, type) => {
    if (
      type === 'stock' ||
      type === 'store_price' ||
      type === 'discount_price'
    ) {
      if (/^\d+$/.test(text) || text === '') {
        setData(text);
        if (type === 'store_price') {
          if ((text = '')) {
            setSellingPriceMargin(null);
          } else {
            setSellingPriceMargin(parseInt(text) + 5);
          }
        } else if (type === 'discount_price') {
          if ((text = '')) {
            setSellingPriceMargin(null);
          } else {
            setDiscountPriceMargin(parseInt(text) + 5);
          }
        }
      }
    } else {
      setData(text);
    }
  };

  const handleStockUpdate = () => {
    const updateData = {
      stock,
      name: productName,
      storePrice,
      price: sellingPriceMargin,
      discountPrice: discountedPrice,
      discountSellingPrice: discountPriceMargin,
    };
    updateProduct(data, updateData, storeID)
      .then(() => {
        setModalVisible(false);
        setConfirmAlert(false);
        ToastAndroid.show(`Product Updated`, 3000);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleConfirmAlert = () => {
    setConfirmAlert(!confirmAlert);
  };

  const handleModalVisible = () => {
    console.log('clicked!');
    setModalVisible(!modalVisible);
  };

  return (
    <View
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={
        data.stock[`${storeID}`] == 0
          ? [styles.product__container, {backgroundColor: '#ffe8db'}]
          : styles.product__container
      }>
      <View style={styles.product__wrapper}>
        <View style={styles.product__info}>
          <FastImage
            source={{uri: data.file}}
            cacheKey={`${data.key}t`}
            style={styles.product__image}
          />
          <View>
            <Text style={[styles.product__title, {color: textColor}]}>
              {data.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.stock__text}>Stocks Left: </Text>
              {data.stock[`${storeID}`] < 10 ? (
                <Text style={{color: 'red', fontSize: 13}}>
                  {data.stock[`${storeID}`]}
                </Text>
              ) : (
                <Text style={{color: 'green', fontSize: 13}}>
                  {data.stock[`${storeID}`]}
                </Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={handleModalVisible}>
          <Icon name="edit" size={RFValue(20)} color={'#F79346'}></Icon>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}>
        <View style={styles.modal__container}>
          <Text style={styles.modal__header}>{data.name}</Text>
          <View style={styles.separator}></View>
          <View style={styles.modal__content}>
            <View style={styles.pickers__container}>
              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Product Name</Text>
                <TextInput
                  style={styles.stocks__input}
                  onChangeText={text =>
                    handleInputChange(text, setProductName, 'name')
                  }
                  value={productName}
                />
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Available Stocks</Text>
                <TextInput
                  style={styles.stocks__input}
                  keyboardType="numeric"
                  onChangeText={text =>
                    handleInputChange(text, setStock, 'stock')
                  }
                  value={stock}
                />
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Store Price</Text>
                <TextInput
                  style={styles.stocks__input}
                  onChangeText={text =>
                    handleInputChange(text, setStorePrice, 'store_price')
                  }
                  value={storePrice.toString()}
                />
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Selling Price Margin</Text>
                <TextInput
                  style={[
                    styles.stocks__input,
                    {backgroundColor: '#dedede', opacity: 0.5},
                  ]}
                  onChangeText={text =>
                    handleInputChange(text, setProductName, 'string')
                  }
                  value={
                    sellingPriceMargin ? sellingPriceMargin.toString() : ''
                  }
                  editable={false}
                />
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Store Discounted Price</Text>
                <TextInput
                  style={styles.stocks__input}
                  onChangeText={text =>
                    handleInputChange(
                      text,
                      setDiscountedPrice,
                      'discount_price',
                    )
                  }
                  value={discountedPrice.toString()}
                />
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>
                  Discounted Price Margin
                </Text>
                <TextInput
                  style={[
                    styles.stocks__input,
                    {backgroundColor: '#dedede', opacity: 0.5},
                  ]}
                  onChangeText={text =>
                    handleInputChange(text, setDiscountPriceMargin, 'string')
                  }
                  value={
                    discountPriceMargin ? discountPriceMargin.toString() : ''
                  }
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.modal__buttonGroup}>
              <TouchableOpacity
                style={
                  typeof sellingPriceMargin == 'undefined' ||
                  typeof discountPriceMargin == 'undefined'
                    ? [
                        styles.submitReport__button,
                        styles.modal__button,
                        {backgroundColor: 'grey'},
                      ]
                    : [styles.submitReport__button, styles.modal__button]
                }
                onPress={handleConfirmAlert}
                disabled={
                  typeof sellingPriceMargin == 'undefined' ||
                  typeof discountPriceMargin == 'undefined'
                }>
                <Text style={{color: 'white'}}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleModalVisible}
                style={[styles.closeModal__button, styles.modal__button]}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AwesomeAlert
        show={confirmAlert}
        showProgress={false}
        title="Update Product"
        message="Product details will be updated!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Proceed"
        confirmButtonColor="#63a34b"
        onCancelPressed={handleConfirmAlert}
        onConfirmPressed={handleStockUpdate}
      />
    </View>
  );
}

export default ProductItem;
