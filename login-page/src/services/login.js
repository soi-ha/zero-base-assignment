import axios from './axios';

export const loginUser = async (user) => {
	try {
		const data = await axios.post('/login', user);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
