import React from "react";
import FirstScreen from "./src/components/FirstScreen";
import Main from "./src/components/Main";
import Search from "./src/components/Search";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"FirstScreen"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"FirstScreen"} component={FirstScreen} />
        <Stack.Screen name={"Search"} component={Search} />
        <Stack.Screen name={"Main"} component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
