console.log('🛠️ 서버 스크립트가 로드되었습니다');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('API 요청 성공');
});

const port = 3000;
app.listen(port, () => console.log(`${port}서버 실행 성공`));
