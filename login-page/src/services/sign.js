import axios from './axios/axios';
import authAxios from './axios/authAxios';
import router from '@/router';
import { getDatabase, ref, push, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { jwtDecode } from 'jwt-decode';

export const signInUser = async (data) => {
	try {
		const { id, password } = data;
		await axios.post('/signIn', { id, password });
		router.push('/login');
	} catch (error) {
		console.log(error);
	}
};

export const signInFirebawse = (id, password) => {
	const db = getDatabase();
	push(ref(db, 'users/'), {
		username: id,
		password,
	});
};

export const getUserInFirebase = (id = 'soha') => {
	const db = getDatabase();
	const userRef = ref(db, 'users/');
	const queryRef = query(userRef, orderByChild('username'), equalTo(id));

	onValue(queryRef, (snapshot) => {
		const data = snapshot.val();
		console.log('getUserInFirebase', data);
		// updateStarCount(postElement, data);
	});
};

export const getUserInfoList = async () => {
	try {
		const { data } = await authAxios.get('/userInfo');
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getUserInfo = async (id) => {
	try {
		const { data } = await authAxios.get(`/userInfo/${id}`);
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const getGoogleUser = async (idToken) => {
	try {
		const { sub, email, name } = jwtDecode(idToken);
		console.log(sub, email, name);

		await axios.post('/signIn', {
			id: sub,
			email: email,
			name: name,
			isSocial: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export const signInSocial = async (id, email, name) => {
	try {
		await axios.post('/signIn', {
			id,
			email,
			name,
			isSocial: true,
		});
	} catch (err) {
		console.log(err);
	}
};
