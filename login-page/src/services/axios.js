import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

// 요청 인터셉터 추가
axios.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		// 로그 찍기
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		// ...
		return Promise.reject(error);
	}
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
	function (response) {
		// 응답 데이터를 가공
		// ...
		return response;
	},
	function (error) {
		// 오류 응답을 처리
		// ...
		return Promise.reject(error);
	}
);

export default axios;
