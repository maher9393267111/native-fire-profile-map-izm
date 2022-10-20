import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

import SettingStackNavigation from "./settingStackNavigation";
import HomeScreen from "../screens/home";
import MapScreen from "../screens/map";

const BottomNav = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);

  return (
    <BottomNav.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.backgroundColor },
        tabBarInactiveTintColor: theme.color,
        tabBarActiveTintColor: theme.activeTintColor
      }}
    >
      <BottomNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Ionicons name="home-sharp" size={25} color={theme.color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: () => (
            <Ionicons name="map-sharp" size={25} color={theme.color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="Setting"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: () => (
            <Ionicons name="settings-sharp" size={25} color={theme.color} />
          ),
        }}
        component={SettingStackNavigation}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabNavigation;
