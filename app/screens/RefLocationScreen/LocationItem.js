import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Picker } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AwesomeAlert from "react-native-awesome-alerts";
import Modal from "react-native-modal";
import { BranchContext } from "../../shared/contexts/BranchContext";
import { LocationContext } from "../../shared/contexts/LocationContext";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
function LocationItem({ data }) {
  const { storeBranches, fetchBranches } = useContext(BranchContext);
  const { updateRefLoc } = useContext(LocationContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(data.detail);
  const [deliveryTime, setDeliveryTime] = useState(data.delivery_time);
  const convertToBranchName = (key) => {
    const pbranch = storeBranches.filter((branch) => {
      return branch.key == key;
    });

    if (pbranch.length > 0) {
      return pbranch[0].name;
    }
    return "None";
  };

  const [primaryBranchName, setPrimaryBranch] = useState(
    convertToBranchName(data.primary_branch)
  );
  const [secondaryBranchName, setSecondaryBranch] = useState(
    convertToBranchName(data.secondary_branch)
  );

  const [primaryBranchKey, setPrimaryBranchKey] = useState(
    data.primary_branch || "None"
  );
  const [secondaryBranchKey, setSecondaryBranchKey] = useState(
    data.secondary_branch || "None"
  );

  const prices = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
  const dtime = ["10", "20", "30", "40", "50", "60", "Today", "Tomorrow"];

  const handleRefUpdate = () => {
    var updates = {
      detail: deliveryFee,
      delivery_time: deliveryTime,
      primary_branch: primaryBranchKey,
    };
    if (secondaryBranchKey != "None") {
      updates.secondary_branch = secondaryBranchKey;
    }
    setModalVisible(false);
    updateRefLoc(data, updates)
      .then(() => {
        setIsVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const color =
    data.detail == "Sorry, we cannot deliver to this area" ? "red" : "green";

  return (
    <View style={styles.item__container}>
      <View style={styles.text__group}>
        <Text style={styles.location__text}>{data.name}</Text>

        <Text style={{ color: color, fontSize: RFValue(13) }}>
          {data.detail}
        </Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="edit" size={RFValue(20)} color={"#F79346"}></Icon>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modal__container}>
          <Text style={styles.modal__header}>Update Location</Text>
          <View style={styles.separator}></View>
          <View style={styles.modal__content}>
            <View style={styles.pickers__container}>
              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Delivery Fee</Text>
                <View style={styles.picker__wrapper}>
                  <Picker
                    selectedValue={deliveryFee}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDeliveryFee(itemValue)}
                  >
                    {prices.map((num) => {
                      return <Picker.Item label={num} value={num} key={num} />;
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>
                  Delivery Time (minutes)
                </Text>
                <View style={styles.picker__wrapper}>
                  <Picker
                    selectedValue={deliveryTime}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setDeliveryTime(itemValue);
                    }}
                  >
                    {dtime.map((time) => {
                      return (
                        <Picker.Item key={time} label={time} value={time} />
                      );
                    })}
                  </Picker>
                </View>
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Primary Branch</Text>
                <View style={styles.picker__wrapper}>
                  <Picker
                    selectedValue={primaryBranchKey}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setPrimaryBranchKey(itemValue);

                      console.log("itemvalue - ", itemValue);
                    }}
                  >
                    <Picker.Item
                      label={primaryBranchName}
                      value={primaryBranchKey}
                    />
                    {storeBranches
                      .filter((branch) => {
                        return branch.name != primaryBranchName;
                      })
                      .map((branch) => {
                        return (
                          <Picker.Item
                            key={branch.key}
                            label={branch.name}
                            value={branch.key}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <View style={styles.picker__group}>
                <Text style={styles.picker__label}>Secondary Branch</Text>
                <View style={styles.picker__wrapper}>
                  <Picker
                    enabled={false}
                    selectedValue={secondaryBranchKey}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setSecondaryBranchKey(itemValue);
                    }}
                  >
                    <Picker.Item label={"None"} value={"None"} />

                    {storeBranches
                      .filter((branch) => {
                        return branch.name != secondaryBranchName;
                      })
                      .map((branch) => {
                        return (
                          <Picker.Item
                            key={branch.key}
                            label={branch.name}
                            value={branch.key}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>
            </View>
            <View style={styles.modal__buttonGroup}>
              <TouchableOpacity
                style={[styles.submitReport__button, styles.modal__button]}
                onPress={() => setIsVisible(true)}
              >
                <Text style={{ color: "white" }}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.closeModal__button, styles.modal__button]}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AwesomeAlert
        show={isVisible}
        showProgress={false}
        title="Update Locations Settings"
        message="Updates will be implemented!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Confirm"
        confirmButtonColor="#63a34b"
        onCancelPressed={() => {
          setIsVisible(false);
        }}
        onConfirmPressed={() => {
          handleRefUpdate();
        }}
      />
    </View>
  );
}

export default React.memo(LocationItem);
