import axios from './axios/axios';
import authAxios from './axios/authAxios';
import router from '@/router';
import { getDatabase, ref, set, onValue } from 'firebase/database';

export const signInUser = async (data) => {
	try {
		const { id, password } = data;
		await axios.post('/signIn', { id, password });
		router.push('/login');
	} catch (error) {
		console.log(error);
	}
};

export const signInFirebawse = () => {
	const db = getDatabase();
	// push(ref(db, 'users/'), {
	// 	username: id,
	// 	password,
	// });
	set(ref(db, 'users/' + 1), {
		username: 'soha',
		email: '123',
	});
};

export const getUserInFirebase = () => {
	const db = getDatabase();
	const starCountRef = ref(db, 'users/');
	onValue(starCountRef, (snapshot) => {
		const data = snapshot.val();
		console.log('getUserInFirebase', data);
	});
	// const queryRef = query(userRef, orderByChild('username'), equalTo(id));

	// onValue(queryRef, (snapshot) => {
	//   const data = snapshot.val();
	//   console.log('getUserInFirebase', data);
	//   // updateStarCount(postElement, data);
	// });
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
