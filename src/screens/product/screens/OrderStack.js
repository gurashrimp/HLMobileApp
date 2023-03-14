
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
const Stack = createNativeStackNavigator();

import Ordering from './Ordering';
import OrderDetail from './OrderDetail';
const OrderStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Ordering'}>
      <Stack.Screen name="Ordering" component={Ordering} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  )
}

export default OrderStack;