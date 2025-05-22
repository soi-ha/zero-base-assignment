import Vue from 'vue';

import axios from './axios/axios';
import authAxios from './axios/authAxios';
import router from '@/router';
import store from '@/store';

export const loginUser = async (user) => {
	try {
		const { data } = await axios.post('/login', user);
		Vue.$cookies.set('accessToken', data.accessToken, '10m');
		Vue.$cookies.set('refreshToken', data.refreshToken, '20m');

		// store.commit('setLogin', data);
		router.push('/');
	} catch (error) {
		console.log(error);
	}
};

export const googleLogin = (idToken) => {
	socialLogin(idToken);
};

export const socialLogin = (token) => {
	store.commit('setLogin', { accessToken: token, refreshToken: '' });
};

export const getRefreshToken = async () => {
	try {
		const { data } = await authAxios.get('/refreshToken');
		Vue.$cookies.set('accessToken', data.accessToken, '10m');
		// store.commit('setAccessToken', data.accessToken);
	} catch (error) {
		console.log(error);
	}
};
