import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import * as Constants from "../constants/Constants";

import imageNotFound from "../assets/image_error.jpeg";
const imageNotFoundUri = Image.resolveAssetSource(imageNotFound).uri;

const ImageCard = (props) => {
  const { name, url, status } = props;

  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: url ? url : imageNotFoundUri }}
        transition={false}
      />
      <View
        style={{
          borderRadius: 4,
          position: "absolute",
          alignItems: "flex-end",
          backgroundColor: status === Constants.BORED ? "#FF4500" : "#007fff",
          marginTop: 5,
          padding: 5,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>{status}</Text>
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageContainer: {
    padding: 5,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    elevation: 5,
  },

  image: { height: 180, width: 180, backgroundColor: "#e8f3f7" },

  name: {
    fontSize: 18,
  },
});
