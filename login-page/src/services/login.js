import axios from './axios/axios';
import authAxios from './axios/authAxios';
import router from '@/router';
import store from '@/store';

export const loginUser = async (user) => {
	try {
		const { data } = await axios.post('/login', user);
		store.commit('setLogin', data);
		router.push('/');
	} catch (error) {
		console.log(error);
	}
};
export const refreshToken = async () => {
	try {
		const { data } = await authAxios.get('/refreshToken');
		console.log('refreshToken', data);
		store.commit('setAccessToken', data.accessToken);
	} catch (error) {
		console.log(error);
	}
};
