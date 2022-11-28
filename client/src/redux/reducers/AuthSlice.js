import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { API_URL } from "../../config/api/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      status: 'idle',
      currentUser: {},
      isLogin: false,
      error: '',
    },
    register: {
      status: 'idle',
      error: '',
    },
  },
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.login.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = 'succeeded'
        state.login.currentUser = action.payload;
        state.login.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.status = 'failed';
        state.login.error = action.error.message;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.register.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.status = 'failed';
        state.register.error = action.error.message;
      })
  }
});

export const loginUser = createAsyncThunk('auth/login', async (user) => {
  try {
    const res = await axios.post(API_URL + '/auth/login', user);
    await AsyncStorage.setItem('AccessToken', res.data.accessToken);
    await AsyncStorage.setItem('User', JSON.stringify(res.data.others));
    return res.data;
  } catch (error) {
    alert("Email hoặc mật khẩu sai!")
  }
});
export const registerUser = createAsyncThunk('auth/register', async (user) => {
  try {
    const res = await axios.post(API_URL + '/auth/register', user);
    return res.data;
  } catch (error) {
    alert("Tài khoản đã tồn tại!");
  }
})

export default authSlice.reducer;

