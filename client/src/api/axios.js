import axios from 'axios';

export const axiosInstance = axios.create({
	baseUrl: 'http://192.168.1.7:5000',
	responseType: 'json',
	withCredentials: true,
});
