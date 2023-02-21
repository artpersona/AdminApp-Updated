import React, { useState, useContext } from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { Theme, Colors } from "../../../config";
import Icon from "react-native-vector-icons/Feather";
import SocialIcons from "react-native-vector-icons/FontAwesome";
import SocialIcons2 from "react-native-vector-icons/Zocial";
import ResponseModal from "../../../components/ResponseModal/ResponseModal";
import styles from "./styles";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { AuthContext } from "../../../shared/contexts/AuthContext";

function SignupScreen({ navigation, props }) {
  const [isSigningUpGoogle, setIsSigningUpGoogle] = useState(false);
  const [isSigningUpFacebook, setIsSigningupFacebook] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const { setLoggedUser, customerAuth } = useContext(AuthContext);

  const handleFacebookLogin = async () => {
    setIsSigningupFacebook(true);
    console.log("pasok fb");
    Facebook.initializeAsync({
      appId: "841213123459448",
      appName: "DavaoMarket",
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    switch (type) {
      case "success": {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        customerAuth(credential)
          .then(() => {
            setIsSigningupFacebook(false);
            navigation.navigate("Shop");
          })
          .catch((error) => {
            setIsSigningupFacebook(false);
            console.log(error);
          });
      }

      case "cancel": {
        setIsSigningupFacebook(false);
        setLoggedUser(null);
        // Alert.alert("Oops!", "Login failed!")
      }
    }
  };

  async function signInWithGoogleAsync() {
    setIsSigningUpGoogle(true);
    setSignUpErrors(null);
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "292276894849-t6p3pmuf38ha9jqciiv832fjunbe1l4u.apps.googleusercontent.com",
        iosClientId:
          "292276894849-4sjveb8s29fp26b0egrbuhtn9op4ao7t.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("success po ako");
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        customerAuth(credential).then(() => {
          setIsSigningUpGoogle(false);
          navigation.navigate("Shop");
        });
      } else {
        setLoggedUser(null);
        return { cancelled: true };
      }
    } catch (error) {
      console.error({ error });
      setSignUpErrors(error);
      return { error: true };
    }
  }

  return (
    <>
      <ResponseModal
        show={showResponseModal}
        title={"Success!"}
        subtitle={
          "We’ve sent a confirmation link to your email address. Please don’t forget to confirm it!"
        }
        onBackButtonPress={() => setShowResponseModal(false)}
      />

      <ImageBackground
        style={styles.imageBackground}
        source={require("../../../assets/auth.png")}
      >
        {/* START:: Back button*/}
        <View
          style={{
            paddingHorizontal: 10,
            position: "absolute",
            left: 0,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="chevron-left"
              size={30}
              color={Colors.white}
              style={{ marginLeft: 10, marginTop: 34 }}
            />
          </TouchableOpacity>
        </View>
        {/* END:: Back button */}

        <View style={styles.container}>
          <View style={Theme.center}>
            <Image
              source={require("../../../assets/logo.png")}
              style={[styles.img]}
            />
          </View>
          <Text style={[Theme.headerText, { paddingBottom: 20 }]}>
            LOGIN ACCOUNT
          </Text>

          <Button
            title="SIGN IN WITH FACEBOOK"
            buttonStyle={Theme.buttonFacebook}
            containerStyle={styles.buttonContainer}
            // titleStyle={Theme.center}
            icon={<SocialIcons name="facebook" size={25} color={"white"} />}
            raised
            loading={isSigningUpFacebook}
            onPress={handleFacebookLogin}
          />

          <Button
            title="SIGN IN WITH GOOGLE"
            buttonStyle={Theme.buttonGoogle}
            containerStyle={styles.buttonContainer}
            icon={<SocialIcons name="google-plus" size={25} color={"white"} />}
            raised
            loading={isSigningUpGoogle}
            onPress={signInWithGoogleAsync}
          />

          <Button
            title="SIGN IN WITH PHONE"
            buttonStyle={Theme.buttonPhone}
            containerStyle={styles.buttonContainer}
            titleStyle={Theme.center}
            icon={<SocialIcons name="phone" size={25} color={"white"} />}
            raised
            disabled
            // loading={isSigningUpGoogle}
            onPress={signInWithGoogleAsync}
          />

          <Button
            title="SIGN IN WITH EMAIL"
            buttonStyle={Theme.buttonAdmin}
            containerStyle={[styles.buttonContainer, { marginTop: 50 }]}
            titleStyle={Theme.center}
            icon={<SocialIcons2 name="email" size={25} color={"white"} />}
            raised
            onPress={() => navigation.navigate("LogIn")}
          />
        </View>

        {/* <View style={styles.footerContainer}>
          <Text style={styles.textFooter}>Already Have an Account? </Text>
          <Text
            style={styles.textLogin}
            onPress={() => navigation.navigate("LogIn")}
          >
            Login
          </Text>
        </View> */}
      </ImageBackground>
    </>
  );
}

export default SignupScreen;
