import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import SettingsScreen from "../screens/setting";
import ProfileSettingsScreen from "../screens/profileSettings";
import ThemeSettingsScreen from "../screens/themeSettings";

const SettingsStackNav = createStackNavigator();
const SettingStackNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);

  return (
    <SettingsStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.activeTintColor
      }}
    >
      <SettingsStackNav.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
      />
      <SettingsStackNav.Screen
        name="ThemeSettingsScreen"
        component={ThemeSettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          headerTitle: "Theme Setting",
        }}
      />
      <SettingsStackNav.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          headerTitle: "Profile Settings",
        }}
      />
    </SettingsStackNav.Navigator>
  );
};

export default SettingStackNavigation;
