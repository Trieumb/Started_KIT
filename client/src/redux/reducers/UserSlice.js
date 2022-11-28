import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_URL } from "../../config/api/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userToken = async () => {
  const dataToken = await AsyncStorage.getItem('AccessToken');
  return dataToken != null ? dataToken : null;
};
const userInfo = async () => { 
  const dataUser = await AsyncStorage.getItem('User');
  return dataUser != null ? dataUser : null;
};
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {
      allUsers: null,
      status: 'idle',
    },
    user: {
      userInfo: userInfo(),
      userToken: userToken(),
    },
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getAllUser.pending, (state, action) => {
        state.users.status = 'loading';
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users.status = 'succeeded'
        state.users.allUsers = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.users.status = 'failed';
        state.users.error = action.error.message;
      })
  }
});

export const getAllUser = createAsyncThunk('/user', async (accessToken) => {
  try {
    const res = await axios.get(API_URL + '/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateUser = createAsyncThunk('/user/update', async (user ,accessToken) => {
  try {
    const res = await axios.put(API_URL + '/user/update',user, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.data;
  } catch (error) {
    alert(error);
    console.log(error);
  }
});
export const deleteUser = createAsyncThunk('/user/delete', async (user, accessToken) => {
  try {
     const res = await axios.delete(API_URL + '/user/delete', user, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return res.data;
  } catch (error) {
    alert(error);
    console.log(error);
  }
});

export default userSlice.reducer;