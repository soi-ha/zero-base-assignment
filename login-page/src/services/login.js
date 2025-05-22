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

export const googleLogin = async () => {
	const googleAuth = await window.gapi.auth2.getAuthInstance();
	await googleAuth.signIn();
	const googleUser = await googleAuth.currentUser.get().getAuthResponse();
	const token = googleUser.id_token;
	socialLogin(token);
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
