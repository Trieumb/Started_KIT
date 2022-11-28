import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/reducers/AuthSlice";
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import Fontisoicons from 'react-native-vector-icons/Fontisto';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { WINDOW_WITH } from "../../config/constants/Constants";
import Colors from "../../config/constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default Login = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  
  const loginHandle = async () => {
    const newUser = {
      email: emailLogin,
      password: passwordLogin,
    }
    dispatch(loginUser(newUser));
  }
  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.textWhite}>Wellcom to App</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.textTitle}>Đăng nhập tài khoản!</Text>
        <View style={styles.formInput}>
          <Fontisoicons name="email" size={16} style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize={false}
            value={emailLogin}
            onChangeText={text => setEmailLogin(text)}
          />
        </View>
        <View style={styles.formInput}>
          <AntdesignIcons name="lock" size={16} style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            autoCapitalize={false}
            secureTextEntry={passwordHidden ? false : true}
            value={passwordLogin}
            onChangeText={text => setPasswordLogin(text)}
          />
          <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
            <AntdesignIcons name="eyeo" size={16} style={[styles.iconInput, styles.iconEye]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonForgotPassword}>
          <Text style={styles.textForgotPassword}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        {emailLogin == '' || passwordLogin == '' ? (
          <TouchableOpacity
            disabled
            style={styles.buttonLogin}
            onPress={loginHandle}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonLogin} onPress={loginHandle}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
        <View style={styles.navigationSignUp}>
          <Text style={styles.navigationSignUpText}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.navigationSignUpText, styles.navigationSignUpButton]}>Đăng ký! </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textWhite: {
    color: Colors.white,
    fontSize: 30,
  },
  textTitle: {
    fontSize: 24,
    marginLeft: 30
  },
  textLogin: {
    color: Colors.white,
    fontSize: 16,
  },
  textForgotPassword: {
    right: 0, 
    position: 'absolute', 
    color: Colors.black,
  },
  formInput: {
    width: WINDOW_WITH - 60,
    height: 40,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    marginLeft: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  iconInput: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  iconEye: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  buttonForgotPassword: {
    height: 40,
    width: WINDOW_WITH - 60,
    marginLeft: 30,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    width: WINDOW_WITH - 60,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    marginLeft: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  navigationSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 30,
  },
  navigationSignUpText: {
    fontSize: 20,
    fontStyle: 'bold',
    color: 'black'
  },
  navigationSignUpButton: {
    color: Colors.primary,
    marginLeft: 10,
  },
}); 