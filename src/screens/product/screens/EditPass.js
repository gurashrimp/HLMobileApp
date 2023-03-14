import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../user/UserContext";
import Icon from 'react-native-vector-icons/FontAwesome5';
const EditPass = (props) => {
  const { navigation } = props;
  const { userID, onChangePass } = useContext(UserContext);

  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [hidePass3, setHidePass3] = useState(true);
  const [myIcon1, setMyIcon1] = useState('');
  const [myIcon2, setMyIcon2] = useState('');
  const [myIcon3, setMyIcon3] = useState('');

  useEffect(() => {
    if (!password) {
      setMyIcon1('');
    } else {
      hidePass1 == true ? setMyIcon1('eye') : setMyIcon1('eye-slash');
    }
    if (!newPass) {
      setMyIcon2('');
    } else {
      hidePass2 == true ? setMyIcon2('eye') : setMyIcon2('eye-slash');
    }

    if (!confirm) {
      setMyIcon3('');
    } else {
      hidePass3 == true ? setMyIcon3('eye') : setMyIcon3('eye-slash');
    }

  });

  const checkIcon1 = () => {
    if (myIcon1 != '') {
      if (myIcon1 == 'eye') {
        setHidePass1(false);
        setMyIcon1('eye-slash');
      } else {
        setHidePass1(true);
        setMyIcon1('eye');
      }
    }
  }

  const checkIcon2 = () => {
    if (myIcon2 != '') {
      if (myIcon2 == 'eye') {
        setHidePass2(false);
        setMyIcon2('eye-slash');
      } else {
        setHidePass2(true);
        setMyIcon2('eye');
      }
    }
  }

  const checkIcon3 = () => {
    if (myIcon3 != '') {
      if (myIcon3 == 'eye') {
        setHidePass3(false);
        setMyIcon3('eye-slash');
      } else {
        setHidePass3(true);
        setMyIcon3('eye');
      }
    }
  }

  async function ChangePass() {
    if (!password || !newPass || !confirm ||
      password.trim().length == 0 || newPass.trim().length == 0 || confirm.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập đầy đủ thông tin', ToastAndroid.BOTTOM);
      return;
    } else if (newPass != confirm) {
      ToastAndroid.show('Mật khẩu mới không trùng khớp', ToastAndroid.BOTTOM);
    } else if (newPass.length < 4) {
      ToastAndroid.show('Mật khẩu phải có ít nhất 4 ký tự', ToastAndroid.BOTTOM);
    } else {
      const res = await onChangePass(userID, password, newPass);
      if (res) {
        if (res.status == false) {
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
          navigation.goBack();
        }
      }
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.TitleView}>
        <View style={styles.Title}>
          <Image source={require("../../../assets/images/back.png")}></Image>
          <Text style={styles.TitleText}>Đổi mật khẩu</Text>
          <Image source={require("../../../assets/images/bacham.png")}></Image>
        </View>
      </View>
      <View style={styles.EditView}>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            secureTextEntry={hidePass1}
            placeholder='Mật khẩu hiện tại'
            onChangeText={setPassword} />
          <Icon
            style={styles.myIcon}
            name={myIcon1}
            color='grey'
            size={14} 
            onPress={() => checkIcon1()}
            />
        </View>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            secureTextEntry={hidePass2}
            placeholder='Mật khẩu mới' 
            onChangeText={setNewPass} />
          <Icon
            style={styles.myIcon}
            name={myIcon2}
            color='grey'
            size={14} 
            onPress={() => checkIcon2()}
            />
        </View>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={"#9098B1"}
            secureTextEntry={hidePass3}
            placeholder='Xác nhận mật khẩu mới' 
            onChangeText={setConfirm} />
          <Icon
            style={styles.myIcon}
            name={myIcon3}
            color='grey'
            size={14} 
            onPress={() => checkIcon3()}
            />
        </View>
        <TouchableOpacity style={styles.ButtonUpdate} onPress={() => ChangePass()}>
          <Text style={styles.TextUpdate}>Đồng ý</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditPass;
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
  myIcon: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
});
