import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login, register,  getUser, checkOut,
   getAllOrders, getPendingOrders,getShippingOrders, getOneOrder, receiveOrder, cancelOrder, getSuccessOrders, getCancelOrders, 
   changeName,changePass } from './UserService'
import constants from "../../utils/constants";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState("");
  const onLogin = async (username, password) => {
    try {
      const res = await login(username, password);
      if (res.status == true && res.token) {
        await AsyncStorage.setItem(constants.STORAGE_KEY, res.token);
        setIsLogin(true);
        console.log('res', res)
        setUserID(res._id);
      }
      return { result: res.status, message: res.message };
    } catch (error) {
      console.log('onLogin error: ', error);
    }
    return false;
  }

  const onRegister = async (username, password, confirmPassword, name, email, phone, address) => {
    try {
      const res = await register(username, password, confirmPassword, name, email, phone, address);
      return { result: res.status, message: res.message };
    } catch (error) {
      console.log('onRegister error: ', error);
    }
    return false;
  }

  const onLogout = async () => {
    setIsLogin(false);
  }
  const onGetUser = async (id) => {
    try {
      const res = await getUser(id);
      return res;
    } catch (error) {
      console.log("onGetUser error: ", error);
    }
    return false;
  };

  const onCheckOut = async (id, body) => {
    try {
      const res = await checkOut(id, body);
      return res;
    } catch (error) {
      console.log("onCheckOut error: ", error);
    }
    return false;
  }

  const onGetAllOrders = async (id) => {
    try {
      const res = await getAllOrders(id);
      return res;
    } catch (error) {
      console.log("onGetAllOrders error: ", error);
    }
    return false;
  }

  const onGetPendingOrders = async (id) => {
    try {
      const res = await getPendingOrders(id);
      return res;
    } catch (error) {
      console.log("onGetPendingOrders error: ", error);
    }
    return false;
  }

  const onGetShippingOrders = async (id) => {
    try {
        const res = await getShippingOrders(id);
        return res;
      } catch (error) {
        console.log("onGetShippingOrders error: ", error);
      }
      return false;
  }

  const onGetOneOrder = async (id, ido) => {
    try {
        const res = await getOneOrder(id, ido);
        return res;
      } catch (error) {
        console.log("onGetOneOrder error: ", error);
      }
      return false;
  }
  const onCancelOrder = async (id, ido) => {
    try {
        const res = await cancelOrder(id, ido);
        return res;
      } catch (error) {
        console.log("onCancelOrder error: ", error);
      }
      return false;
  }
  const onReceiveOrder = async (id, ido) => {
    try {
        const res = await receiveOrder(id, ido);
        return res;
      } catch (error) {
        console.log("onReceiveOrder error: ", error);
      }
      return false;
  }

  const onGetSuccessOrders = async (id) => {
    try {
        const res = await getSuccessOrders(id);
        return res;
      } catch (error) {
        console.log("onGetSuccessOrders error: ", error);
      }
      return false;
  }

  const onGetCancelOrders = async (id) => {
    try {
        const res = await getCancelOrders(id);
        return res;
      } catch (error) {
        console.log("onGetCancelOrders error: ", error);
      }
      return false;
  }
  const onChangeName = async (id, name, phone, address, email) => {
    try {
      const res = await changeName(id, name, phone, address, email);
      return res;
    } catch (error) {
      console.log("onChangeName error: ", error);
    }
    return false;
  };

  const onChangePass = async (id, oldPass, newPass) => {
    try {
      const res = await changePass(id, oldPass, newPass);
      console.log("res context: ", res);
      return res;
    } catch (error) {
      console.log("onChangePass error: ", error);
    }
    return false;
  };


  return (
    <UserContext.Provider
      value={{
        onLogin, onRegister, onLogout, onGetUser,  isLogin,
        userID, onCheckOut, onGetAllOrders, onGetPendingOrders,onGetShippingOrders,
        onGetOneOrder,onCancelOrder,onReceiveOrder,onGetSuccessOrders,onGetCancelOrders,
        onChangeName,onChangePass
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider