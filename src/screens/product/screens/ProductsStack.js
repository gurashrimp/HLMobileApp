
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
const Stack = createNativeStackNavigator();

import List from "./List";
import Detail from "./Detail";
const ProductsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Detail" component={Detail} />
      
    </Stack.Navigator>
  )
}

export default ProductsStack;