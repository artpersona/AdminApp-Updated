import React, {useState, useContext, useEffect} from 'react';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {Switch} from 'react-native-paper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import {StoreMenuContext} from '../../shared/contexts/StoreMenuContext';
import DraggableFlatList from 'react-native-draggable-flatlist';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import styles from './styles';
import {TouchableWithoutFeedback} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {ModalLoading} from '../../components/ModalView/ModalView';

function ShopMenu() {
  const {
    store,
    updateStoreStatus,
    removeBannerImage,
    changeBannerImagesPositioning,
    addOrEditImage,
  } = useContext(StoreMenuContext);
  const [data, setData] = useState(store.store_banners);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [currentRemoveIndex, setCurrentRemoveIndex] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);

  const [loadingVisible, setLoadingVisible] = useState(false);

  const [image, setImage] = useState(null);

  const handleStatusChange = () => {
    store.storeOpen == 'open'
      ? updateStoreStatus(store, 'close').then(() =>
          ToastAndroid.show(`Store Status changed to Close`, 3000),
        )
      : updateStoreStatus(store, 'open').then(() =>
          ToastAndroid.show(`Store Status changed to Open`, 3000),
        );
  };

  const renderItem = ({item, index, drag, isActive}) => {
    return (
      <TouchableWithoutFeedback onLongPress={drag}>
        <View style={styles.item}>
          <View style={styles.imager__container}>
            <Image
              style={styles.image}
              source={{
                uri: item?.uri
                  ? item.uri
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png',
              }}
            />
          </View>
          <View style={styles.options__container}>
            {!item?.uri ? (
              <TouchableOpacity
                onPress={() => {
                  setCurrentRemoveIndex(index);
                  setUploadModal(true);
                }}>
                <Icon
                  name="add-photo-alternate"
                  size={25}
                  color="green"
                  style={[styles.icon, {marginRight: '5%'}]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setCurrentRemoveIndex(index);
                  setUploadModal(true);
                }}>
                <Icon2
                  name="image-edit-outline"
                  size={25}
                  color="#1080D0"
                  style={[styles.icon, {marginRight: '5%'}]}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleRemovePress(index)}>
              <Icon2
                name="image-remove"
                size={25}
                color="red"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  // const pickFromGallery = async () => {
  //   const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (granted) {
  //     let data = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,

  //       aspect: [1, 1],
  //       quality: 0.5,
  //     });
  //     if (!data.cancelled) {
  //       setUploadModal(false);
  //       setLoadingVisible(true);
  //       addOrEditImage(data, currentRemoveIndex)
  //         .then(() => {
  //           console.log("success");
  //           setLoadingVisible(false);
  //         })
  //         .catch((err) => {
  //           setLoadingVisible(false);
  //           ToastAndroid.show(`Upload Failed`, 3000);
  //         });
  //     }
  //   } else {
  //     Alert.alert("Camera Permission Needed");
  //   }
  // };

  const handleDragEnd = ({data}) => {
    setData(data);
    changeBannerImagesPositioning(data);
  };

  const handleRemovePress = index => {
    setRemoveAlert(true);
    setCurrentRemoveIndex(index);
  };

  const handleRemoveImage = () => {
    setRemoveAlert(false);

    removeBannerImage(currentRemoveIndex)
      .then(() => {
        setCurrentRemoveIndex(null);
      })
      .catch(err => console.log(err));
  };

  const closeUploadModal = () => {
    setUploadModal(false);
  };

  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>Store Settings</Text>

          <View style={styles.shop__table}>
            <View style={styles.shop__headers}>
              <Text style={[styles.item__1, styles.header__text]}>Name</Text>
              <View style={styles.item__2}>
                <Text style={styles.header__text}>Store Status</Text>
              </View>
            </View>

            <View style={styles.shop__content}>
              <Text style={styles.item__1}>{store.name}</Text>
              <View style={styles.item__2}>
                <Switch
                  value={store.storeOpen == 'open'}
                  onValueChange={handleStatusChange}
                  style={[
                    {
                      transform: [{scaleX: 1.2}, {scaleY: 1.2}],
                    },
                  ]}
                />
              </View>
            </View>
          </View>
          <View style={styles.draggable__container}>
            <View style={styles.draggable__header}>
              <Text style={styles.header__text}>Banner Images</Text>
            </View>
            <View
              style={{
                height: 500,
                width: '80%',
                alignSelf: 'center',
              }}>
              <DraggableFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onDragEnd={handleDragEnd}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </View>

      <AwesomeAlert
        show={removeAlert}
        showProgress={false}
        title="Remove Banner Image ?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        cancelButtonColor="red"
        confirmText="Proceed"
        confirmButtonColor="#63a34b"
        onCancelPressed={() => {
          setRemoveAlert(false);
        }}
        onConfirmPressed={handleRemoveImage}
      />

      <Modal
        isVisible={uploadModal}
        // backdropTransitionOutTiming={0}
        animationInTiming={1}
        animationOutTiming={1}
        backdropOpacity={0.2}
        onBackdropPress={closeUploadModal}
        onBackButtonPress={closeUploadModal}>
        <View style={styles.upload__container}>
          <TouchableOpacity
            style={styles.upload__medium}
            // onPress={pickFromGallery}
          >
            <Icon
              name="image"
              size={25}
              color={'grey'}
              style={styles.upload__icon}
            />
            <Text>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ModalLoading visible={loadingVisible} message={'Uploading Image'} />
    </>
  );
}

export default ShopMenu;
