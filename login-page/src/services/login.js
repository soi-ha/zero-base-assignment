import axios from './axios/axios';
import router from '@/router';
import store from '@/store';

export const loginUser = async (user) => {
	try {
		const { data } = await axios.post('/login', user);
		store.commit('setLogin', data.accessToken);
		router.push('/');
	} catch (error) {
		console.log(error);
	}
};
