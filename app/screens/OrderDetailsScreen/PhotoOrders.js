import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Colors } from "../../config";
import ImageViewer from "react-native-image-zoom-viewer";

function PhotoOrders({ orders }) {
  const images = orders.map((order) => {
    order.url = order.uri;
    return order;
  });
  const [showImage, setShowImage] = useState(false);
  return (
    <View style={styles.photo__container}>
      <TouchableOpacity
        style={styles.image__container}
        onPress={() => setShowImage(true)}
      >
        <Image
          source={{ uri: orders[0].uri }}
          style={{ width: "100%", height: "100%" }}
          onPress={() => console.log("hello")}
        />
      </TouchableOpacity>

      <Modal
        visible={showImage}
        transparent={true}
        onRequestClose={() => setShowImage(false)}
      >
        <ImageViewer imageUrls={images} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  photo__container: {
    alignSelf: "center",
    width: 170,
    minHeight: 150,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 19,
    margin: 5,
  },
  image__container: {
    alignSelf: "center",
    width: 150,
    height: 200,
    paddingVertical: 10,
  },
  photo__orderText: {
    fontSize: 20,

    textAlign: "center",
    color: Colors.secondary,
  },
  photo__orderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PhotoOrders;
