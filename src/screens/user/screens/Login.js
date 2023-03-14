import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useState } from 'react'
import { UserContext } from '../../user/UserContext';


const Login = (props) => {
  const { navigation } = props;
  const { onLogin } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {

    if (!username || !password || username.trim().length == 0 || password.trim().length == 0) {
      ToastAndroid.show('Bạn chưa nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    }
    const res = await onLogin(username, password);
    if (res.result != true) {
      // console.log('message when click login: ', res.message);
      ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
    } else {
      ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
    }
    return res.result;
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image
          source={require("../../../assets/images/logoApp.jpg")}
          style={styles.image}></Image>
      </View>
      <View style={styles.inputTextView}>
        <View>
          <TextInput
            style={styles.inputText}
            placeholderTextColor={"white"}
            placeholder="Name"
            value={username} onChangeText={setUsername}
          ></TextInput>
          <Image
            style={styles.imageIcon1}
            source={require("../../../assets/images/user.png")}
          ></Image>
        </View>

        <View>
          <TextInput
            style={styles.inputText}
            placeholderTextColor={"white"}
            placeholder="Password"
            secureTextEntry={true}
            value={password} onChangeText={setPassword}
          ></TextInput>
          <Image
            style={styles.imageIcon2}
            source={require("../../../assets/images/pass.png")}
          ></Image>
        </View>

        <TouchableOpacity onPress={login} style={styles.pressable}>
          <Text style={styles.pressableText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('FogotPassword')}
        style={styles.forgotView}
      >
        <Text style={styles.forgotText}>Forgot Password ?</Text>
      </TouchableOpacity>

      <View style={styles.loginIconView}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.iconLoginImage}
            resizeMode="cover"
            source={require("../../../assets/images/fb.png")}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={styles.iconLoginImage}
            resizeMode="cover"
            source={require("../../../assets/images/tw.png")}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={styles.iconLoginImage}
            resizeMode="cover"
            source={require("../../../assets/images/gg.png")}
          />
        </View>

      </View>

      <View style={styles.signupView}>
        <Text style={styles.textSignup}>Don't have an Account ? </Text>

        <Text onPress={() => navigation.navigate('Register')}
          style={styles.textSignup}>Register</Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({

  iconContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  loginIconView: {
    marginHorizontal: 90,
    flexDirection: "row",
    marginTop: 40,
    justifyContent: 'space-between'
  },
  logoView: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 97,
  },

  image: {
    width: 300,
    height: 300,
  },
  signInView: {
    width: "100%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon1: {
    width: 20,
    height: 27,
    position: "absolute",
    top: 30,
    left: 20,
  },

  imageIcon2: {
    width: 20,
    height: 29,
    position: "absolute",
    top: 30,
    left: 22,
  },
  siginText: {
    fontSize: 14,
    color: "#9098B1",
  },

  inputTextView: {
    padding: 30,
    marginTop: 30
  },

  inputText: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginTop: 20,
    paddingLeft: 60,
    borderRadius: 37,
    paddingHorizontal: 16
  },

  pressable: {
    width: "100%",
    height: 50,
    marginTop: 20,
    borderRadius: 37,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  pressableText: {
    fontWeight: "bold",
    color: "#FE5045",
  },


  imageLogin: {
    position: "absolute",
    top: 20,
    left: 22,
  },

  forgotView: {
    width: "100%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  forgotText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  signupView: {
    width: "100%",
    height: 30,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textSignup: {
    color: "#ffffff",
  },

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "#FE5045"
  }
});
