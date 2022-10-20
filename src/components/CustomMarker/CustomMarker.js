import { View, Text, Image } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import styles from "./CustomMarker.style";
import { useNavigation } from "@react-navigation/core";
import Fontisto from "@expo/vector-icons/Fontisto";

const CustomMarker = ({ image, lat, long }) => {
  const { navigate } = useNavigation();
  return (
    <Marker
      onPress={() => navigate("ImageDetails", { imageItem: image })}
      style={styles.marker}
      coordinate={{
        latitude: lat,
        longitude: long,
      }}
    >
      {image.photoURL ? (
        <>
        <Image style={styles.markerImage} source={{ uri: image.photoURL }} />
        <Fontisto style={styles.markerBottom} name="map-marker" size={35} color={"#06B6D4"} />
        </>
      ) : (
        <View style={styles.markerView}>
          <Text style={styles.markerText}>userName</Text>
        </View>
      )}
    </Marker>
  );
};

export default CustomMarker;
