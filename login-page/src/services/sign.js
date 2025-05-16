import axios from './axios';

export const signInUser = async (data) => {
	try {
		const { id, password } = data;
		await axios.post('/signIn', { id, password });
	} catch (error) {
		console.log(error);
	}
};
