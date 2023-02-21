import React, { useState } from "react";
import { View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors, Theme } from "../../config";
import { TouchableHighlight } from "react-native-gesture-handler";

import styles from "./styles";

function CustomHeader(props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
      <View style={[Theme.row, props.profileDisplay]}>
        <View style={{ width: "100%" }}>
          <View style={Theme.rowCenter}>
            <TouchableHighlight
              underlayColor="#E6E6E6"
              onPress={() => props.favorite.set(true)}
              style={[
                styles.filterContainer,
                {
                  backgroundColor:
                    props?.favorite?.get == true
                      ? Colors.primaryButton
                      : "white",
                },
              ]}
            >
              <Icon
                name="heart-o"
                size={25}
                style={{
                  color:
                    props?.favorite?.get == true
                      ? "white"
                      : Colors.primaryButton,
                }}
              />
            </TouchableHighlight>

            <View style={styles.profileImageContainer}>
              {!props?.profilePhoto ? (
                <Image source={require("../../assets/images/noimage.png")} style={styles.img} />
              ): (
                <Image source={{ uri: props.profilePhoto }} style={styles.img} />
              )}
            </View>
            <TouchableHighlight
              underlayColor="#E6E6E6"
              onPress={() => props.map.set(true)}
              style={[
                styles.filterContainer,
                {
                  backgroundColor:
                    props?.map?.get == true
                      ? Colors.primaryButton
                      : "white",
                },
              ]}
            >
              <Icon
                name="compass"
                size={25}
                style={{
                  color:
                    props?.map?.get == true
                      ? "white"
                      : Colors.primaryButton,
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  );
}

export default CustomHeader;
