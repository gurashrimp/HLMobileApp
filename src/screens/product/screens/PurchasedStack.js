
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
const Stack = createNativeStackNavigator();

import Purchased from './Purchased';
import OrderDetail from './OrderDetail';
const PurchasedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Purchased'}>
      <Stack.Screen name="Purchased" component={Purchased} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  )
}

export default PurchasedStack;