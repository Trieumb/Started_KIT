import React, {Component, useState} from 'react';
import axios from 'axios';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';

import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';

const windowWidth = Dimensions.get ('window').width;
const windowHeight = Dimensions.get ('window').height;

export default (Login = ({navigation}) => {
  const [page, setPage] = useState (SIGN_IN);
  const [passwordHidden, setPasswordHidden] = useState (false);

  const [email, setEmail] = useState ('');
  const [phone, setPhone] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [isLoadingSignUp, setIsLoadingSignUp] = useState (false);
  const [isLoading, setIsLoading] = useState (false);

  const [emailLogin, setEmailLogin] =  useState ('');
  const [passwordLogin, setPasswordLogin] =  useState ('');

  // const [accessToken, setAccessToken] = useState();
  // const [userInfo, setUserInfo] = useState();
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //     androidClientId: "1091965022060-t5jfpjgodlic9dbsli0selevujt0ffq5.apps.googleusercontent.com"
  // });

  // React.useEffect( () => {
  //     if(response?.type === "success"){
  //       setAccessToken(response.authentication.accessToken);
  //     }
  // }),[response]

  // async function getUserData(){
  //   let userInfoResponse = await fetch ("http://192.168.1.8:5000/userinfo",{
  //       headers: { Authorization: `Bearer ${accessToken}`}
  //   })
  // }
  // event sign-up
  const signUpHandle = async event => {
    if (password !== confirmPassword) {
      alert ('Nhập lại mật khẩu!');
      return;
    }
    const URL = 'http://192.168.1.8:5000/sign-up';

    setIsLoadingSignUp(true);
    try {
      const response = await axios.post (URL, {
        email: email,
        phone: phone,
        password: password,
      });
      if (response.status === 201) {
        navigation.navigate ('Home');
        setIsLoadingSignUp (false);
        setEmail ('');
        setPhone ('');
        setPassword ('');
        setConfirmPassword ('');
      } else {
        throw new Error ('An error has occurred');
      }
    } catch (error) {
      alert (error);
      setIsLoadingSignUp (false);
    }
  };

  // event sign-in
  const signInHandle = async (event) => {
    const URL = 'http://192.168.1.8:5000/sign-in';
    setIsLoading (true);
    try {
      const response = await axios.post (URL, {
        email: emailLogin,
        password: passwordLogin,
      });
      if (response.status === 200) {
        navigation.navigate ('Home');
        setIsLoading (false);
        setEmailLogin ('');
        setPasswordLogin ('');
      } else {
        throw new Error ('An error has occurred');
      }
    } catch (error) {
      alert (error);
      setIsLoading (false);
    }
  };

  // login google

  const loginGoogleHandle =  async (event) => {
    // window.open('http://localhost:5000/auth/google', '_self');
    try {
      const response = await axios.get('http://192.168.1.8:5000/auth/google');
      console.log(response);
    } catch (error) {
      console.error(error);
    }   
  }

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '25%'}}>
        <BanerComponent page={page} setPage={setPage} />
      </View>
      <View style={{width: '100%', height: '50%', backgroundColor: '#F5F5F5'}}>
        {page === SIGN_IN
          ? <LoginComponent
              passwordHidden={passwordHidden}
              setPasswordHidden={setPasswordHidden}
              navigation={navigation}
              signInHandle={signInHandle}
              emailLogin={emailLogin}
              setEmailLogin={setEmailLogin}
              passwordLogin={passwordLogin}
              setPasswordLogin={setPasswordLogin}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          : null}
        {page === SIGN_UP
          ? <SignUpComponent
              passwordHidden={passwordHidden}
              setPasswordHidden={setPasswordHidden}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              signUpHandle={signUpHandle}
              isLoadingSignUp={isLoadingSignUp}
              setIsLoadingSignUp={setIsLoadingSignUp}
            />
          : null}
      </View>
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
        <SocialLoginComponent  loginGoogleHandle={loginGoogleHandle}/>
      </View>
    </View>
  );
});

// sign-up view
const SignUpComponent = ({
  passwordHidden,
  setPasswordHidden,
  signUpHandle,
  email,
  phone,
  password,
  confirmPassword,
  setEmail,
  setConfirmPassword,
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
      <Text style={{fontSize: 24, marginLeft: 30}}>Đăng kí tài khoản!</Text>
      <View style={styles.form_Input}>
        <Image
          source={require ('../images/icons8-mail-24.png')}
          resizeMode="stretch"
          style={styles.icon_Input}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          autoCapitalize={false}
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail (text)}
          editable={!isLoadingSignUp}
        />
      </View>
      <View style={styles.form_Input}>
        <Image
          source={require ('../images/pngtree-phone-icon-png-image_1757859.jpg')}
          resizeMode="stretch"
          style={styles.icon_Input}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập số ĐT"
          keyboardType="numeric"
          value={phone}
          onChangeText={text => setPhone (text)}
          editable={!isLoadingSignUp}
        />
      </View>

      <View style={styles.form_Input}>
        <Image
          source={require ('../images/001-padlock.png')}
          resizeMode="stretch"
          style={styles.icon_Input}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          autoCapitalize={false}
          secureTextEntry={passwordHidden ? false : true}
          value={password}
          onChangeText={text => setPassword (text)}
          editable={!isLoadingSignUp}
        />
        <TouchableOpacity onPress={() => setPasswordHidden (!passwordHidden)}>
          <Image
            source={require ('../images/eye.png')}
            resizeMode="stretch"
            style={[styles.icon_Input, styles.icon_eye]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.form_Input}>
        <Image
          source={require ('../images/001-padlock.png')}
          resizeMode="stretch"
          style={styles.icon_Input}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          autoCapitalize={false}
          secureTextEntry={passwordHidden ? false : true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword (text)}
          editable={!isLoadingSignUp}
        />
        <TouchableOpacity onPress={() => setPasswordHidden (!passwordHidden)}>
          <Image
            source={require ('../images/eye.png')}
            resizeMode="stretch"
            style={[styles.icon_Input, styles.icon_eye]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonForgotPassword}>
        <Text style={{right: 0, position: 'absolute', color: '#FF3333'}}>
          Điều khoản dịch vụ?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonLogin, styles.buttonSignUp]}
        onPress={signUpHandle}
      >
        <Text style={{color: 'white'}}>Đăng kí</Text>
      </TouchableOpacity>
    </View>
  );
};

// login view
const LoginComponent = ({
  passwordHidden,
  setPasswordHidden,
  signInHandle,
  emailLogin,
  setEmailLogin,
  passwordLogin,
  setPasswordLogin,
  isLoading,
  setIsLoading,
}) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Text style={{fontSize: 24, marginLeft: 30}}>Đăng nhập tài khoản!</Text>
      <View style={styles.form_Input}>
        <Image
          source={require ('../images/icons8-mail-24.png')}
          resizeMode="stretch"
          style={styles.icon_Input}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize={false}
          value={emailLogin}
          onChangeText={text => setEmailLogin (text)}
          editable={!isLoading}
        />
      </View>
      <View style={styles.form_Input}>
        <Image
          source={require ('../images/001-padlock.png')}
          resizeMode="stretch"
          style={styles.icon_Input}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          autoCapitalize={false}
          secureTextEntry={passwordHidden ? false : true}
          value={passwordLogin}
          onChangeText={text => setPasswordLogin (text)}
          editable={!isLoading}
        />
        <TouchableOpacity onPress={() => setPasswordHidden (!passwordHidden)}>
          <Image
            source={require ('../images/eye.png')}
            resizeMode="stretch"
            style={[styles.icon_Input, styles.icon_eye]}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonForgotPassword}>
        <Text style={{right: 0, position: 'absolute', color: '#707070'}}>
          Quên mật khẩu?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogin} onPress={signInHandle}>
        <Text style={{color: 'white'}}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

// banner view
const BanerComponent = ({page, setPage}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={{color: '#fff', fontSize: 30}}>Wellcom to App</Text>
      </View>
      <View style={styles.bottom_header}>
        <TouchableOpacity
          style={styles.button_SignIn}
          onPress={() => setPage (SIGN_IN)}
          disabled={page === SIGN_IN ? true : false}
        >
          <Text style={styles.text_header}>
            Đăng Nhập
          </Text>
          {page === SIGN_IN
            ? <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#339966',
                  position: 'absolute',
                  bottom: 0,
                }}
              />
            : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_Register}
          onPress={() => setPage (SIGN_UP)}
          disabled={page === SIGN_UP ? true : false}
        >
          <Text style={styles.text_header}>
            Đăng Kí
          </Text>
          {page === SIGN_UP
            ? <View
                style={{
                  height: 2,
                  width: '100%',
                  backgroundColor: '#339966',
                  position: 'absolute',
                  bottom: 0,
                }}
              />
            : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// social login view
const SocialLoginComponent = ({loginGoogleHandle}) => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={styles.seperate}>
        <View style={{width: '30%', height: 1, backgroundColor: '#707070'}} />
        <Text style={{padding: 10}}>Hoặc đăng nhập với</Text>
        <View style={{width: '30%', height: 1, backgroundColor: '#707070'}} />
      </View>
      <TouchableOpacity style={styles.button_Socail} onPress={loginGoogleHandle}>
        <Image
          style={styles.icon_Input}
          source={require ('../images/gg.png')}
          resizeMode="stretch"
        />
        <Text style={styles.text_Socail}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_Socail}>
        <Image
          style={styles.icon_Input}
          source={require ('../images/Facebook_Logo_(2019).png.webp')}
          resizeMode="stretch"
        />
        <Text style={styles.text_Socail}>Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

// styles
const styles = StyleSheet.create ({
  container: {
    width: '100%',
    height: '100%',
  },
  // banner
  banner: {
    flex: 1,
    width: '100%',
    height: '40%',
  },
  header: {
    backgroundColor: '#339966',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottom_header: {
    height: 50,
    flexDirection: 'row',
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
});
