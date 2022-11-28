import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser, logoutUser, updateUser } from "../../../redux/reducers/UserSlice";
import AntdesignIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../config/constants/Colors';

const Users = ({ navigation }) => {

  const [isModaVisible, setIsModaVisible] = useState(false);
  const [isDeleteModaVisible, setIsDeleteModaVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const userToken = useSelector((state) => state.users.user?.userToken);
  const data = useSelector((state) => state.users.users?.allUsers);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userToken) {
      dispatch(getAllUser((userToken?._j)));
      setFilterData(data);
      setMasterData(data);
    }
  }, [isModaVisible]);

  const OnPressUpdateHandler = (item) => {
    setIsModaVisible(true);
    setEmail(item.email);
  };
  const OnPressDeleteHandler = (item) => {
    setIsDeleteModaVisible(true);
    setEmail(item.email);
  };
  // handle function update user
  const updateUserHandler = async () => {
    try {
      let user = {
        email: email,
        userName: userName,
        phone: phone,
      };
      dispatch(updateUser(user, userToken?._j));
      setIsModaVisible(false);
      setEmail('');
      setUserName('');
      setPhone('');
    } catch (error) {
      alert.log(error);
    }
  };

  // handler function delete user
  const deleteUserHandler = async () => {
    try {
      const user = {
        email: email,
      };
      console.log(email);
      dispatch(deleteUser(user, userToken?._j));
      setIsDeleteModaVisible(false);
    } catch (error) {
      alert(error);
    }
  }

  // handler function search user
  const searchUserHandler = (text) => {
    if (text) {
      const newData = masterData.filter(
        (item) => {
          const itemData = item.email
            ? item.email.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilterData(newData);
      setSearchText(text);
    } else {
      setFilterData(masterData);
      setSearchText(text);
    }
  };

  const FlatListItem = ({ item, index }) => {
    return (
      <View style={styles.flatListContainer}>
        <Text style={styles.emailText}>{item.email}</Text>
        <Text style={styles.userText}>{item.userName}</Text>
        <Text style={styles.phoneText}>{item.phone}</Text>
        <Pressable style={styles.button} onPress={() => OnPressUpdateHandler(item)}>
          <Text>Sửa</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => OnPressDeleteHandler(item)}>
          <Text>Xóa</Text>
        </Pressable>
      </View>
    )
  };
  const HeaderFlatList = () => {
    return (
      <View style={styles.flatListTitle}>
        <Text style={styles.emailText}>Email</Text>
        <Text style={styles.userText}>Tên người dùng</Text>
        <Text style={styles.phoneText}>Số ĐT</Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.addUser}>
          <Text style={styles.title}>Quản lý tài khoản!</Text>
          <View style={styles.addUser}>
            <AntdesignIcons name="addusergroup" size={25} />
            <Pressable style={styles.buttonAddNewUser} onPress={() => navigation.navigate('AddUser')}>
              <Text style={styles.text}>Thêm mới</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.search}>
          <TextInput style={styles.input}
            placeholder="Nhập email"
            value={searchText}
            onChangeText={(text) => searchUserHandler(text)} />
          <Pressable style={[styles.button, styles.buttonSearch]}>
            <Text>Tìm kiếm</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <FlatList data={filterData}
          ListHeaderComponent={HeaderFlatList}
          keyExtractor={item => item.email}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />
          }}>
        </FlatList>
        <Modal
          animationType="fade"
          visible={isModaVisible}
          onRequestClose={() => setIsModaVisible(false)}>
          <View style={styles.modalHeader}>
            <Pressable style={styles.buttonBack} onPress={() => setIsModaVisible(!isModaVisible)}>
              <Ionicons name="chevron-back" size={20} style={styles.icon} />
              <Text style={styles.textModalHeader}>Thoát</Text>
            </Pressable>
          </View>
          <View style={styles.modalUpdateView}>
            <Text style={styles.title}>Nhập thông tin mới!</Text>
            <TextInput placeholder='Email'
              value={email}
              style={styles.inputModal}
              onChangeText={text => setEmail(text)}
            />
            <TextInput placeholder='Tên đăng nhập'
              value={userName}
              style={styles.inputModal}
              onChangeText={text => setUserName(text)}
              autoCapitalize={false} />
            <TextInput placeholder='Số ĐT'
              value={phone}
              keyboardType='numeric'
              style={styles.inputModal}
              onChangeText={text => setPhone(text)}
              autoCapitalize={false} />
            <Pressable style={styles.buttonModal} onPress={updateUserHandler}>
              <Text style={styles.textModal}>Cập nhật</Text>
            </Pressable>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          visible={isDeleteModaVisible}
          onRequestClose={() => setIsDeleteModaVisible(false)}>
          <View>
            <TextInput 
              placeholder='Email'
              value={email}
              style={styles.inputModal}
              onChangeText={text => setEmail(text)}
            />
            <Pressable onPress={deleteUserHandler}>
              <Text>Xóa</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default Users

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginVertical: 10,
  },
  flatListContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'space-around'
  },
  flatListTitle: {
    flexDirection: 'row',
    backgroundColor: '#ccd9c6',
    padding: 10,
  },
  emailText: {
    width: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  userText: {
    width: '20%',
  },
  phoneText: {
    width: '25%'
  },
  addUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 25,
    color: Colors.primary,
  },
  buttonAddNewUser: {
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
    padding: 2,
    alignItems: 'center',
    backgroundColor: Colors.gray,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: '10%',
    height: 28,
    marginLeft: 5,
    padding: 2,
    alignItems: 'center',
    backgroundColor: '#ccd9c6',
  },
  search: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonSearch: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '70%',
    height: 28,
    padding: 5,
    borderRadius: 5,
  },
  modalUpdateView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonModal: {
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    padding: 5,
    marginTop: 15,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputModal: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '80%',
    marginVertical: 15,
  },
  textModal: {
    color: Colors.white,
    fontSize: 18,

  },
  modalHeader: {
    height: '7%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.silver,
  },
  buttonBack: {
    flexDirection: 'row',
  },
  icon: {
    color: Colors.primary,
  },
  textModalHeader: {
    color: Colors.primary,
    marginLeft: 5
  },
})