import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../api/requestApi";
import Fontisoicons from 'react-native-vector-icons/Fontisto';
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default (Register = ({ navigation }) => {

  const dispatch = useDispatch();
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);

  const success = useSelector((state) => state.auth.register?.success);
  console.log(success);

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      return;
    } else {
      alert('Email không đúng định dạng!');
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Mật khẩu không chứa khoảng trắng';
    }
    const isValidLength = /^.{8,30}$/;
    if (!isValidLength.test(value)) {
      return 'Mật khẩu phải từ 8 kí tự!';
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Mật khẩu phải có một kí tự viết hoa!';
    }
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Mật khẩu có ít nhất một chữ số!';
    }
    return null;
  };
  // event sign-up
  const signUpHandle = async () => {
    const user = {
      userName: userName,
      email: email,
      phone: phone,
      password: password,
    };
    try {
      const checkPassword = checkPasswordValidity(password);
      handleCheckEmail(email);
      if (!checkPassword) {
        dispatch(registerUser(user));
        navigation.navigate('Login');
      } else {
        alert(checkPassword);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // login google

  const loginGoogleHandle = async () => {
    try {
      const response = await axios.get('http://192.168.1.9:5000/auth/google');
      if (response.status === 200) {
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error)
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '75%' }}>
        <SignUpComponent
          passwordHidden={passwordHidden}
          setPasswordHidden={setPasswordHidden}
          userName={userName}
          setUserName={setUserName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          password={password}
          setPassword={setPassword}
          signUpHandle={signUpHandle}
          isLoadingSignUp={isLoadingSignUp}
          setIsLoadingSignUp={setIsLoadingSignUp}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <SocialLoginComponent loginGoogleHandle={loginGoogleHandle} />
      </View>
    </View>
  );
});

// sign-up view
const SignUpComponent = ({
  passwordHidden,
  setPasswordHidden,
  signUpHandle,
  userName,
  email,
  phone,
  password,
  setEmail,
  setUserName,
  setPassword,
  setPhone,
  isLoadingSignUp,
  setIsLoadingSignUp,
}) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 30 }}>Wellcom to App</Text>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 24, marginLeft: 30 }}>Đăng kí tài khoản!</Text>
        <View style={styles.form_Input}>
          <AntdesignIcons name="user" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            autoCapitalize={false}
            value={userName}
            onChangeText={text => setUserName(text)}
            editable={!isLoadingSignUp}
          />
        </View>
        <View style={styles.form_Input}>
          <Fontisoicons name="email" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize={false}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            editable={!isLoadingSignUp}
          />
        </View>
        <View style={styles.form_Input}>
          <AntdesignIcons name="phone" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Số ĐT"
            keyboardType="numeric"
            value={phone}
            onChangeText={text => setPhone(text)}
            editable={!isLoadingSignUp}
          />
        </View>
        <View style={styles.form_Input}>
          <AntdesignIcons name="lock" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            autoCapitalize={false}
            secureTextEntry={passwordHidden ? false : true}
            value={password}
            onChangeText={text => setPassword(text)}
            editable={!isLoadingSignUp}
          />
          <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
           <AntdesignIcons name="eyeo" size={16} style={[styles.icon_Input,styles.icon_eye]}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonForgotPassword}>
          <Text style={{ right: 0, position: 'absolute', color: '#FF3333' }}>
            Điều khoản dịch vụ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonLogin, styles.buttonSignUp]}
          onPress={signUpHandle}
        >
          <Text style={{ color: 'white' }}>Đăng kí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// social login view
const SocialLoginComponent = ({ loginGoogleHandle }) => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={styles.seperate}>
        <View style={{ width: '30%', height: 1, backgroundColor: '#707070' }} />
        <Text style={{ padding: 10 }}>Hoặc đăng nhập với</Text>
        <View style={{ width: '30%', height: 1, backgroundColor: '#707070' }} />
      </View>
      <TouchableOpacity style={styles.button_Socail} onPress={loginGoogleHandle}>
        <Image
          style={styles.icon_Input}
          source={require('../images/gg.png')}
          resizeMode="stretch"
        />
        <Text style={styles.text_Socail}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_Socail}>
        <Image
          style={styles.icon_Input}
          source={require('../images/Facebook_Logo_(2019).png.webp')}
          resizeMode="stretch"
        />
        <Text style={styles.text_Socail}>Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: '#339966',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    marginBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  button_SignIn: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_Register: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_header: {
    color: '#339966',
  },
  body: {
    flex: 1
  },
  // login
  form_Input: {
    width: windowWidth - 60,
    height: 40,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    marginLeft: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  icon_Input: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  icon_eye: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  buttonForgotPassword: {
    height: 40,
    width: windowWidth - 60,
    marginLeft: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    width: windowWidth - 60,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#339966',
    marginLeft: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  //SocialLoginComponent
  seperate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - 80,
    height: 40,
    marginLeft: 40,
  },
  button_Socail: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: windowWidth - 60,
    height: 40,
    borderRadius: 5,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text_Socail: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  textFailed: {
    paddingLeft: 30,
    marginTop: 10,
    color: 'red',
  },
  buttonDisable: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 25,
  },
});
