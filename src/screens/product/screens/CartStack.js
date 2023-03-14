
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
const Stack = createNativeStackNavigator();

import Cart from './Cart';
const ProductsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />

    </Stack.Navigator>
  )
}

export default ProductsStack;