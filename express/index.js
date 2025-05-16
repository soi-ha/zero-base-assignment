const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const privateKey = 'secret';

app.use(express.json());
app.use(cors());

const userInfo = [
	{
		id: '123',
		password: '123',
	},
];

app.post('/login', (req, res) => {
	// body id, password
	const { id, password } = req.body;
	const userIndex = userInfo.findIndex((item) => item.id === id);

	if (userIndex > -1) {
		// id 있음
		if (userInfo[userIndex].password === password) {
			//password 있음
			res.status(200).json({
				msg: '로그인 성공',
				accessToken: jwt.sign({ userId: id }, privateKey, { expiresIn: '10s' }),
			});
			return;
		}
	}
	res.status(500).send('로그인 실패');
});

app.post('/signIn', (req, res) => {
	// body id, password
	const { id, password } = req.body;
	console.log(id, password);

	if (userInfo.findIndex((item) => item.id === id) > -1) {
		res.status(500).send('회원가입 실패');
		return;
	}

	userInfo.push({ id, password });
	console.log('userInfo: ', userInfo);
	res.send('회원가입 성공');
});

app.get('/userInfo', (req, res) => {
	const accessToken = req.header('access-token');
	if (!accessToken) {
		return res.status(401).send('토큰이 제공되지 않았습니다.');
	}
	jwt.verify(accessToken, privateKey, (err, decoded) => {
		if (err) {
			if (err.name === 'TokenExpiredError') return res.status(401).send('토큰 유효기간 만료');
			res.status(500).send('error!!');
			return;
		}
		res.status(200).json({
			userInfo,
		});
	});
});

const port = 3000;
app.listen(port, () => console.log(`${port}서버 실행 성공`));
