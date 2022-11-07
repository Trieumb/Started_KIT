import React, { useState } from "react";
import { StatusBar } from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/requestApi";
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import Fontisoicons from 'react-native-vector-icons/Fontisto';
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

export default (Login = ({ navigation }) => {

  const dispatch = useDispatch();
  const [passwordHidden, setPasswordHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  // event sign-in
  const signInHandle = async () => {
    const newUser = {
      email: emailLogin,
      password: passwordLogin,
    }
    dispatch(loginUser(newUser));
  }
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
  }
 // login facebook
  const loginFacebookHandle = async () => {
    try {
      const response = await axios.get('http://192.168.1.9:5000/auth/facebook');
      if (response.status === 200) {
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor="#339966"/>
      <View style={{ width: '100%', height: '70%' }}>
        <LoginComponent
          navigation={navigation}
          signInHandle={signInHandle}
          passwordHidden={passwordHidden}
          setPasswordHidden={setPasswordHidden}
          emailLogin={emailLogin}
          setEmailLogin={setEmailLogin}
          passwordLogin={passwordLogin}
          setPasswordLogin={setPasswordLogin}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <SocialLoginComponent loginGoogleHandle={loginGoogleHandle}
        loginFacebookHandle={loginFacebookHandle} />
      </View>
    </View>
  );
});
// login view
const LoginComponent = ({
  navigation,
  passwordHidden,
  setPasswordHidden,
  signInHandle,
  emailLogin,
  setEmailLogin,
  passwordLogin,
  setPasswordLogin,
  isLoading,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
      }}
    >
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 30 }}>Wellcom to App</Text>
      </View>
      <View style={styles.body}>
        <Text style={{ fontSize: 24, marginLeft: 30,marginBottom:20}}>Đăng nhập tài khoản!</Text>
        <View style={styles.form_Input}>
        <Fontisoicons name="email" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize={false}
            value={emailLogin}
            onChangeText={text => setEmailLogin(text)}
            editable={!isLoading}
          />
        </View>
        <View style={styles.form_Input}>
        <AntdesignIcons name="lock" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            autoCapitalize={false}
            secureTextEntry={passwordHidden ? false : true}
            value={passwordLogin}
            onChangeText={text => setPasswordLogin(text)}
            editable={!isLoading}
          />
          <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
          <AntdesignIcons name="eyeo" size={16} style={[styles.icon_Input,styles.icon_eye]}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonForgotPassword}>
          <Text style={{ right: 0, position: 'absolute', color: '#707070' }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        {emailLogin == '' || passwordLogin == '' ? (
          <TouchableOpacity
            disabled
            style={styles.buttonLogin}
            onPress={signInHandle}>
            <Text style={{ color: 'white' }}>Đăng nhập</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonLogin} onPress={signInHandle}>
            <Text style={{ color: 'white' }}>Đăng nhập</Text>
          </TouchableOpacity>
        )}
         <View style={styles.navigationSignUp}>
          <Text style={styles.navigationSignUp_text}>Chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.navigationSignUp_text ,styles.navigationSignUp_button] }>Đăng ký! </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
// social login view
const SocialLoginComponent = ({ loginGoogleHandle, loginFacebookHandle }) => {
  return (
    <View style={{ width: '100%' }}>
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
      <TouchableOpacity style={styles.button_Socail} onPress={loginFacebookHandle}>
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
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  body: {
    flex: 1,
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
  // login
  form_Input: {
    width: windowWidth - 60,
    height: 40,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    marginLeft: 30,
    marginVertical:20,
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
    marginVertical:5,
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
    marginBottom: 20,
  },
  navigationSignUp: {
    flexDirection:'row',
    justifyContent:'center',
    marginLeft: 30,
  },
  navigationSignUp_text: {
    fontSize: 20,
    fontStyle:'bold',
    color: 'black'
  },
  navigationSignUp_button:{
    color:'#339966',
    marginLeft:10,
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
    marginTop: 15,
  },
  text_Socail: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
