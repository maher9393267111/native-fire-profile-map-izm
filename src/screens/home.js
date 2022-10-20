import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import uuid from "react-native-uuid";
import { db, storage } from "../utils/firebase";
import * as Location from "expo-location";
import { setLocation } from "../store";

const Home = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.auth.user);
  const location = useSelector((state) => state.location.locationItem);
  const [uploading, setUploading] = useState(false);
  const [lat,setLat] = useState(null)
  const [lang,setLang] = useState(null)

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      handleImagePicked(result);
    }
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        addImageToStorage(uploadUrl);
        console.log("UplaodImagge----->>>> 💠🔘💠🔘💠🔘")
      }
    } catch (error) {
      console.log(error);
      Alert("Upload failed, sorry 💠🔘💠🔘💠🔘💠🔘💠🔘 " , error);
    } finally {
      setUploading(false);
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

 

  
  const addImageToStorage = async (uploadUrl) => {
    console.log('START SEND IMAGE DOC')
    console.log('LOCATION IN IMAGE---->>' , location , lang, lat)

if (lat || lang) {

  console.log('theris Location Founded 🔹️🔺️🔹️🔺️')

    await addDoc(collection(db, `image`), {
      userID: user.id,
      photoURL: uploadUrl,
      latitude: lat || 'no latitude',
      longitude: lang ||  ' np longitude',
    }).then((response) => {

console.log('image Doc Added to Firebase successfully 🔹️🔺️🔹️🔺️')

    });


  }



if (!location) {


await  getLocation();

console.log('NOOOOO LOCATION FOUUUND_________>>>>>1212' ,location)


}



  };
  





  const maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLang(location.coords.longitude)
    setLat(location.coords.latitude)
    console.log('locationnnn---->>>>' , lang,lat)
  };

  useEffect(() => {
    getLocation();
    
  });

  return (
    <View
      style={[styles.homeContainer, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.userTitle, { color: theme.color }]}>
        Welcome {user?.firstName}!
      </Text>
      <Text style={[styles.pageTitle, { color: theme.color }]}>
        Share Photo
      </Text>
      {maybeRenderUploadingOverlay()}
      <Pressable style={styles.homeButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Select from library</Text>
      </Pressable>
      <Pressable style={styles.homeButton} onPress={openCamera}>
        <Text style={styles.buttonText}>Open camera</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 30,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 120,
  },
  userTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom:20,
  },
  homeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#06B6D4",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default Home;
