import { refreshToken } from '../login';
import axios from './axios';
import store from '@/store';

const authAxios = axios.create();

// 요청 인터셉터 추가
authAxios.interceptors.request.use(
	function (config) {
		// 요청을 보내기 전에 수행할 일
		// 로그 찍기
		config.headers['access-token'] = store.state.accessToken;
		config.headers['refresh-token'] = store.state.refreshToken;
		return config;
	},
	function (error) {
		// 오류 요청을 보내기전 수행할 일
		// ...
		return Promise.reject(error);
	}
);

// 응답 인터셉터 추가
authAxios.interceptors.response.use(
	function (response) {
		// 응답 데이터를 가공
		// ...
		return response;
	},
	async function (error) {
		// 오류 응답을 처리
		// ...
		const errorAPI = error.config;
		console.log('인터셉터 오류');
		console.log(errorAPI.retry); // undefined
		if (error.response.status === 401 && errorAPI.retry === undefined) {
			errorAPI.retry = true;
			await refreshToken();
			return await authAxios(errorAPI);
		}
		return Promise.reject(error);
	}
);

export default authAxios;
