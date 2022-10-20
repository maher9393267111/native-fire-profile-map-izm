import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  Alert
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { db, storage } from "../utils/firebase";
import { useForm, Controller } from "react-hook-form";
import { updateUser } from "../store";

const ProfileSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.activeTheme);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user,
    },
  });

  const [image, setImage] = useState(user?.photoURL);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      Alert("Upload failed, sorry :(");
    } finally {
      setUploading(false)
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
    // blob.close();

    return await getDownloadURL(fileRef);
  }

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

  const handleUpdateProfile = async (data) => {
    const docRef = doc(db, "user", user.id);
    await updateDoc(docRef, {
      ...data,
      photoURL: image,
    }).then((response) => {
      dispatch(updateUser({ ...data, photoURL: image }));

      goBack();
    });
  };

  return (
    <View
      style={[
        styles.profileContainer,
        { backgroundColor: theme?.backgroundColor },
      ]}
    >
      <View style={styles.formArea}>
        <Pressable onPress={pickImage}>
          <Image style={styles.profileImage} source={{ uri: image }} />
        </Pressable>
        {maybeRenderUploadingOverlay()}
        <Text style={[styles.textInfo, { color: theme.color }]}>
          Click to image for upload a new photo
        </Text>
        <Controller
          control={control}
          name="firstName"
          rules={{
            required: { value: true, message: "First Name is required" },
          }}
          render={({ field }) => {
            return (
              <>
                <Text style={[styles.inputLabel, { color: theme.color }]}>
                  First Name
                </Text>
                <TextInput
                  style={[styles.input, { color: theme.color }]}
                  {...field}
                  onChangeText={field.onChange}
                />
              </>
            );
          }}
        />
        {errors.firstName ? (
          <Text style={{ color: "red" }}>{errors.firstName.message}</Text>
        ) : null}
        <Controller
          control={control}
          name="lastName"
          rules={{
            required: { value: true, message: "Last Name is required" },
          }}
          render={({ field }) => {
            return (
              <>
                <Text style={[styles.inputLabel, { color: theme.color }]}>
                  Last Name
                </Text>
                <TextInput
                  style={[styles.input, { color: theme.color }]}
                  {...field}
                  onChangeText={field.onChange}
                />
              </>
            );
          }}
        />
        {errors.lastName ? (
          <Text style={{ color: "red" }}>{errors.lastName.message}</Text>
        ) : null}
        <Controller
          control={control}
          name="location"
          rules={{
            required: { value: true, message: "Location is required" },
          }}
          render={({ field }) => {
            return (
              <>
                <Text style={[styles.inputLabel, { color: theme.color }]}>
                  Location
                </Text>
                <TextInput
                  style={[styles.input, { color: theme.color }]}
                  {...field}
                  onChangeText={field.onChange}
                />
              </>
            );
          }}
        />
        {errors.location ? (
          <Text style={{ color: "red" }}>{errors.location.message}</Text>
        ) : null}
        <Pressable
          style={styles.button}
          onPress={handleSubmit(handleUpdateProfile)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flex: 1,
  },
  formArea: {
    width: "90%",
    height: "90%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneArea: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 20,
  },
  picker: {
    width: "35%",
    borderWidth: 1,
    borderColor: "#686868",
    borderRadius: 4,
  },
  phoneInput: {
    width: "62%",
    height: 50,
    borderWidth: 1,
    borderColor: "#686868",
    fontSize: 20,
    padding: 10,
    borderRadius: 4,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#686868",
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  inputLabel: {
    display: "flex",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  phoneLabel: {
    display: "flex",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#06B6D4",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  errorText: {
    color: "#ff3333",
    marginTop: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginBottom: 10,
    borderWidth:3,
    borderColor: "#06B6D4"
  },
  textInfo: {
    marginBottom: 30,
  },
});

export default ProfileSettings;
