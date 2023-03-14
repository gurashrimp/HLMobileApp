
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
const Stack = createNativeStackNavigator();

import Account from "./Account";
import EditProfile from "./EditProfile";
import OrderStack from "./OrderStack";
import PurchasedStack from "./PurchasedStack";
import EditPass from './EditPass';

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditPass" component={EditPass} />
      <Stack.Screen name="OrderStack" component={OrderStack} />
      <Stack.Screen name="PurchasedStack" component={PurchasedStack} />

    </Stack.Navigator>
  )
}

export default AccountStack;