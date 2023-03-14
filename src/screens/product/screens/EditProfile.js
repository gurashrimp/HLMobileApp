import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,ToastAndroid, Keyboard } from "react-native";
import React, { useState,useContext } from "react";
import { UserContext } from "../../user/UserContext";
const EditProfile = (props) => {
  const {navigation} = props;
  const { onChangeName, userID } = useContext(UserContext);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const changeFullName = async () => {
    if (!name || name.trim().length == 0) {
      ToastAndroid.show('Không được bỏ trống', ToastAndroid.BOTTOM);
      return;
    }
    if (!phone || phone.trim().length == 0) {
      ToastAndroid.show('Không được bỏ trống', ToastAndroid.BOTTOM);
      return;
    }
    if (!email || email.trim().length == 0) {
      ToastAndroid.show('Không được bỏ trống', ToastAndroid.BOTTOM);
      return;
    }
    if (!address || address.trim().length == 0) {
      ToastAndroid.show('Không được bỏ trống', ToastAndroid.BOTTOM);
      return;
    }
    const res = await onChangeName(userID, name, phone, address, email);
    if (res) {
      ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
      navigation.goBack();
    } else {
      ToastAndroid.show('Đổi tên người dùng thất bại', ToastAndroid.BOTTOM);
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.TitleView}>
        <View style={styles.Title}>
          <Image source={require("../../../assets/images/back.png")}></Image>
          <Text style={styles.TitleText}>Cập nhật thông tin</Text>
          <Image source={require("../../../assets/images/bacham.png")}></Image>
        </View>
      </View>
      <View style={styles.EditView}>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            placeholder="Name"
            onChangeText={setName}
          ></TextInput>
        </View>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            placeholder="Phone Number"
            onChangeText={setPhone}
          ></TextInput>
        </View>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            placeholder="Address"
            onChangeText={setAddress}
          ></TextInput>
        </View>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            placeholder="Email"
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <TouchableOpacity style={styles.ButtonUpdate} onPress = {()=>changeFullName()}>
          <Text style={styles.TextUpdate}>Đồng ý</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  TextUpdate: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  ButtonUpdate: {
    backgroundColor: "#FE5045",
    width: "100%",
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  TextInput: {
    marginHorizontal: 16,
  },
  TextInputView: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColors: "#B5B5B5",
    justifyContent: "center",
    marginTop: 16
  },
  EditView: {
    paddingHorizontal: 24,
  },
  TitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  Title: {
    marginTop: 70,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  TitleView: {
    height: 140,
    backgroundColor: "#FE5045",
    width: "100%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  Container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
