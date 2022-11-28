import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import Colors from '../../config/constants/Colors';
import { WINDOW_WITH } from '../../config/constants/Constants';
import Fontisoicons from 'react-native-vector-icons/Fontisto';
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import { checkPasswordValidity } from '../../helper/CheckPassword';
import { useNavigation } from "@react-navigation/native";
import { registerUser } from '../../redux/reducers/AuthSlice';
import { useDispatch , useSelector } from 'react-redux';

const SignUp = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isRegistered = useSelector(state => state.auth.register?.isRegistered);
  console.log(isRegistered);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(false);

  const handleCheckEmail = (text) => {
    const re = /\S+@\S+\.\S+/;
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      return;
    } else {
      alert('Email không đúng định dạng!');
    }
  };
  const registerHandle = async () => {
    const user = {
      userName: userName,
      email: email,
      phone: phone,
      password: password,
    };
    try {
      handleCheckEmail(email);
      const checkPassword = checkPasswordValidity(password);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textWhite}>Wellcom to App</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.textTitle}>Đăng kí tài khoản!</Text>
        <View style={styles.formInput}>
          <AntdesignIcons name="user" size={16} style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            autoCapitalize={false}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
        </View>
        <View style={styles.formInput}>
          <Fontisoicons name="email" size={16} style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.formInput}>
          <AntdesignIcons name="phone" size={16} style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Số ĐT"
            keyboardType="numeric"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </View>
        <View style={styles.formInput}>
          <AntdesignIcons name="lock" size={16} style={styles.icon_Input} />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            autoCapitalize={false}
            secureTextEntry={passwordHidden ? false : true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
            <AntdesignIcons name="eyeo" size={16} style={[styles.icon_Input, styles.icon_eye]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonForgotPassword}>
          <Text style={styles.textRed}>Điều khoản dịch vụ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonLogin, styles.buttonSignUp]}
          onPress={registerHandle}>
          <Text style={styles.textSignUp}>Đăng kí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
  },
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
  textSignUp: {
    color: Colors.white,
    fontSize: 16,
  },
  formInput: {
    width: WINDOW_WITH - 60,
    height: 40,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginLeft: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  iconInput: {
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
    width: WINDOW_WITH - 60,
    marginLeft: 30,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRed: {
    right: 0,
    position: 'absolute',
    color: Colors.red,
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
  },
});