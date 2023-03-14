import AppNavigation from "./src/screens/navigation/AppNavigation";
import React from "react";
import { Text } from "react-native";
import  UserContextProvider from "./src/screens/user/UserContext";
import  ProductContextProvider  from "./src/screens/product/ProductContext";

export default function App() {
  return (
    <UserContextProvider>
    <ProductContextProvider>
      <AppNavigation></AppNavigation>
    </ProductContextProvider>
  </UserContextProvider>
  );
}
