import { StatusBar } from "expo-status-bar";

import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

import MainStackNavigation from "./src/navigation/mainStackNavigation";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <MainStackNavigation />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
