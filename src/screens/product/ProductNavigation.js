import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./screens/HomeStack";
import ProductsStack from "./screens/ProductsStack";
import Cart from "./screens/Cart";
// import CartStack from "./screens/CartStack";
import AccountStack from "./screens/AccountStack";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProductNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F8774A",
      }}
      initialRouteName="Hometab"
    >
      <Tab.Screen
        name="Hometab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="ios-home"
              size={24}
              color={focused ? "#F8774A" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="list-alt"
              size={24}
              color={focused ? "#F8774A" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        // component={CartStack}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="ios-cart"
              size={24}
              color={focused ? "#F8774A" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={focused ? "#F8774A" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ProductNavigation;
