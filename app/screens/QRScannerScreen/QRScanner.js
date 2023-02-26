import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import CryptoJS from 'crypto-js';
import {OrderContext} from '../../shared/contexts/OrderContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalView from '../../components/ModalView/ModalView';
import BarCodeScanner from 'react-native-qrcode-scanner';

export default function QRScanner({route, navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {product} = route.params;
  const {moveToOnTransit} = useContext(OrderContext);

  const [confirmAlert, setConfirmAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message:
            'App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Camera permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Camera permission denied with never ask again');
        // Prompt the user to manually enable the camera permission in the app settings
        Linking.openSettings();
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);

    let bytes = CryptoJS.AES.decrypt(data.toString(), 'davaomarket');

    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    moveToOnTransit(product, decryptedData)
      .then(isSuccess => {
        if (isSuccess) {
          setSuccessAlert(true);
        } else {
          setConfirmAlert(true);
        }
      })
      .catch(err => console.log('err in scanner', err));
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        // onRead={}={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <AwesomeAlert
        show={confirmAlert}
        showProgress={false}
        title="Invalid QR"
        message="Perform scan again ?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        cancelButtonColor={'#FF2D00'}
        confirmText="Confirm"
        confirmButtonColor="#63a34b"
        onCancelPressed={() => {
          navigation.goBack();
        }}
        onConfirmPressed={() => {
          setConfirmAlert(false);
          setScanned(false);
        }}
      />

      <ModalView
        visible={successAlert}
        description={'QR Successfully scanned!'}
        onClose={() => {}}
        ok_text="Confirm"
        onPress1={() => {
          setSuccessAlert(false);
          navigation.navigate('On Transit');
        }}
        okTextStyle={{color: '#FEC636'}}
        width="85%"
        animationIn="fadeIn"
        animationOut="fadeOut"
        logoName="success"
      />
    </View>
  );
}
