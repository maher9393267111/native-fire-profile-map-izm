import { StyleSheet, Alert } from "react-native";
import { View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import CustomMarker from "../components/CustomMarker/CustomMarker";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "../store";

const Map = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const images = useSelector((state) => state.images.imageItems);
  const mapRef = useRef();
  const dispatch = useDispatch();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    mapRef.current.animateToRegion({
      ...location.coords,
      duration: 300,
    });
  };

  const getImages = async () => {
    const q = query(collection(db, "image"));
    await getDocs(q).then((res) => {
      const _images = res.docs.map((item) => item.data());
      dispatch(setImages({ images: _images }));
    });
  };

  useEffect(() => {
    getLocation();
  });

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {}, [images]);

  return (
    <View>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsMyLocationButton
        showsScale
        showsUserLocation
        userInterfaceStyle={theme.type}
        minZoomLevel={5}
      >
        {images?.map((imageItem, index) => {
          return (
            <CustomMarker
              key={index}
              image={imageItem}
              lat={imageItem.latitude}
              long={imageItem.longitude}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
