import React, {useState, useContext} from 'react';
import {View, KeyboardAvoidingView, Text, Image, Alert} from 'react-native';

import {Button} from 'react-native-elements';
import {Theme} from '../../../config';
import {useForm} from 'react-hook-form';
import ResponseModal from '../../../components/ResponseModal/ResponseModal';
import {CustomInput} from '../../../components/Main';
import {AuthContext} from '../../../shared/contexts/AuthContext';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import ModalView from '../../../components/ModalView/ModalView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

function LoginScreen() {
  const navigation = useNavigation();
  const {userInfoRole, userInfoStore, adminAuth} = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [icon, setIcon] = useState('eye-off');
  const [hidePassword, setHidePassword] = useState(true);
  const [showResponseModal, setShowResponseModal] = useState(false);

  const [modalState, setModalState] = useState({
    description: '',
    logoName: '',
    showModal: false,
    title: '',
  });

  const iconChange = () => {
    icon !== 'eye-off'
      ? (setIcon('eye-off'), setHidePassword(true))
      : (setIcon('eye'), setHidePassword(false));
  };

  const adminLogin = ({email, password}) => {
    setIsLoggingIn(true);
    adminAuth(email, password)
      .then(res => {})
      .catch(error => {
        Alert.alert('Sorry something wrong', error.message);
        setIsLoggingIn(false);
        const errorMessage = error.message;

        setModalState({
          showModal: true,
          logoName: 'error',
          description: errorMessage,
        });
      });
  };

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        title={'Success!'}
        subtitle={'Login Successful!'}
        onBackButtonPress={() => setShowResponseModal(false)}
      />
      <ModalView
        visible={modalState.showModal}
        description={modalState.description}
        onPress1={() => setModalState({showModal: false})}
        width="65%"
        animation="bounceIn"
        logoName={modalState.logoName}
      />
      <View style={styles.imageBackground}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={Theme.keyboardVerticalOffset}>
              <View style={Theme.center}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={[styles.img]}
                />
              </View>
              <Text style={Theme.headerText}>LOGIN ACCOUNT</Text>

              <View>
                <CustomInput
                  placeholder="E-MAIL"
                  style={styles.placeholder__text}
                  inputContainerStyle={
                    errors?.email
                      ? [styles.inputContainerStyle, {borderBottomColor: 'red'}]
                      : styles.inputContainerStyle
                  }
                  containerStyle={styles.containerStyle}
                  control={control}
                  name="email"
                  errorMessage={errors.email?.message}
                  rules={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Invalid email format',
                    },
                  }}
                  errorStyle={styles.errorStyle}
                  leftIcon={
                    <Ionicons name="mail-outline" size={26} color="black" />
                  }
                />

                <View style={{flexDirection: 'row'}}>
                  <CustomInput
                    placeholder="PASSWORD"
                    style={styles.placeholder__text}
                    inputContainerStyle={
                      errors?.password
                        ? [
                            styles.inputContainerStyle,
                            {borderBottomColor: 'red'},
                          ]
                        : styles.inputContainerStyle
                    }
                    secureTextEntry={hidePassword}
                    errorMessage={errors.password?.message}
                    control={control}
                    name="password"
                    rules={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                    containerStyle={styles.containerStyle}
                    errorStyle={styles.errorStyle}
                    leftIcon={
                      <Ionicons
                        name="lock-closed-outline"
                        size={26}
                        color="black"
                      />
                    }
                    rightIcon={
                      <MaterialCommunityIcons
                        name={icon}
                        size={25}
                        color={'black'}
                        onPress={iconChange}
                      />
                    }
                  />
                </View>

                <Text
                  style={styles.textForgotPass}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  Forgot Password?
                </Text>
                <Button
                  title="LOGIN"
                  buttonStyle={Theme.buttonPrimary}
                  containerStyle={styles.buttonContainer}
                  titleStyle={styles.titleStyle}
                  loading={isLoggingIn}
                  onPress={handleSubmit(adminLogin)}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </>
  );
}

export default LoginScreen;
