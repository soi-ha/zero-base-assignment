<template>
	<img src="@/assets/imgs/kakao.jpeg" alt="카카오 로그인" @click="loginWithKakao" />
</template>

<script>
import { getCurrentInstance } from 'vue';
import { loginUser } from '@/services/login';

export default {
	name: 'LoginKakao',
	setup() {
		const { proxy } = getCurrentInstance();
		const loginWithKakao = () => {
			window.Kakao.Auth.authorize({
				redirectUri: 'http://localhost:8080/login', // 앱에 등록된 카카오 로그인에서 사용할 Redirect URI 입력
			});

			getKakaoUserInfo();
		};

		const getKakaoUserInfo = async () => {
			const user = await window.Kakao.API.request({ url: '/v2/user/me' });

			const data = await loginUser({ id: user.id }, true);
			if (data.msg) return;
			if (data.response.status === 500) {
				proxy.$router.push('/signIn');
			}
		};

		return {
			loginWithKakao,
		};
	},
};
</script>

<style scoped>
img {
	width: 40px;
	height: 40px;
	cursor: pointer;
}
</style>
