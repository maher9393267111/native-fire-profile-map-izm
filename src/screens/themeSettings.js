import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../store";

const ThemeSettings = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.themeContainer,
        { backgroundColor: theme?.backgroundColor },
      ]}
    >
      <Text style={[styles.themeText, { color: theme.color }]}>
        Change Theme
      </Text>
      <Pressable
        onPress={() => {
          dispatch(toggleTheme());
        }}
        style={[
          styles.themeButton,
          // eslint-disable-next-line react-native/no-inline-styles
          { backgroundColor: theme.type === "light" ? "#14202b" : "#FFF" },
        ]}
      >
        <Text
          style={[
            styles.colorText,
            // eslint-disable-next-line react-native/no-inline-styles
            { color: theme.type === "light" ? "#FFF" : "#14202b" },
          ]}
        >
          {theme.type === "light" ? "Dark" : "Light"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  themeContainer: {
    height: "100%",
    paddingBottom: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  themeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  colorText: {
    fontSize: 18,
  },
  themeButton: {
    width: 150,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default ThemeSettings;
