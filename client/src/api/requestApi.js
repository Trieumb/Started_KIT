import {
  loginFailed, loginStart, loginSuccess,
  registerStart, registerFailed, registerSuccess,
  logoutStart, logoutSussess, logoutFailed
} from '../redux/reducers/AuthSlice';
import { axiosInstance } from './axios';
import {
  getUserStart, getUserSuccess, getUserFailed,
  deleteUserFailed, deleteUserStart, deleteUserSuccess,
} from '../redux/reducers/UserSlice'

const URL = 'http://192.168.43.86:5000';

export const loginUser = (user) => {
  return async function (dispatch) {
    dispatch(loginStart());
    try {
      const res = await axiosInstance.post(URL + '/auth/login', user);
      dispatch(loginSuccess(res.data));
    } catch (error) {
      console.log(error)
      dispatch(loginFailed());
    }
  }
}
export const registerUser = (user) => {
  return async function (dispatch) {
    dispatch(registerStart());
    try {
      await axiosInstance.post(URL + '/auth/register', user);
      dispatch(registerSuccess());
    } catch (error) {
      console.log(error);
      dispatch(registerFailed());
    }
  }

}
export const logoutUser = async (accessToken, dispatch) => {
    dispatch(logoutStart());
    try {
        await axiosInstance.get(URL + '/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(logoutSussess());
    } catch (error) {
      console.log(error);
      dispatch(logoutFailed());
    }
  }


export const getAllUser = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axiosInstance.get(URL + '/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
    console.log(error)
  }
}
export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosInstance.delete(URL + '/user/' + id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(deleteUserFailed(error.response.data));
  }
}