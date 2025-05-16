import axios from 'axios';

const userInfo = [
	{
		id: 'dinnerKang',
		password: '1234',
	},
];

export const loginUser = async (user) => {
	const findUser = userInfo.find((item) => item.id === user.id);
	console.log(findUser);

	if (findUser) {
		if (findUser.password === user.password) {
			return '로그인 성공';
		} else {
			return '비밀번호가 틀렸습니다.';
		}
	} else {
		return '로그인 실패';
	}
};

export const testAPI = async () => {
	const data = await axios.get('http://localhost:3000/');
	console.log(data);
};
