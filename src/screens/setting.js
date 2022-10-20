import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store";
import { auth } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    // Remove user from AsyncStorage
    await AsyncStorage.removeItem("user");
    dispatch(logOut()); // Delete user redux
    auth.signOut(); // Firebase authtentication signOut
  };

  return (
    <View
      style={[
        styles.settingContainer,
        { backgroundColor: theme?.backgroundColor },
      ]}
    >
      <View
        style={[
          styles.profileContainer,
          { backgroundColor: theme?.backgroundColor },
        ]}
      >
        <Text style={[styles.profileName, { color: theme?.color }]}>
          Welcome {user?.firstName}!
        </Text>
        <Image style={styles.profileImage} source={{ uri: user?.photoURL }} />
        <Pressable
          style={styles.settingButton}
          onPress={() => {
            navigate("ThemeSettingsScreen");
          }}
        >
          <Text style={styles.buttonText}>Theme</Text>
        </Pressable>
        <Pressable
          style={styles.settingButton}
          onPress={() => {
            navigate("ProfileSettingsScreen");
          }}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
      <Pressable style={[styles.settingButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
  },
  profileContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginBottom: 30,
    borderWidth:3,
    borderColor: "#06B6D4"
  },
  settingButton: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#06B6D4",
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom:10,
  }
});

export default Settings;
