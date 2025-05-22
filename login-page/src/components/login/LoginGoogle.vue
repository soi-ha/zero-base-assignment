<template>
	<img class="google-login" src="@/assets/imgs/google.png" alt="구글 로그인" @click="clickGoogleLogin" />
</template>

<script>
import { googleLogin } from '@/services/login';
import { getCurrentInstance } from 'vue';

export default {
	name: 'LoginGoogle',
	setup() {
		const { proxy } = getCurrentInstance();

		const clickGoogleLogin = async () => {
			const token = proxy.$cookies.get('googleLoginToken');
			await googleLogin(token);
			proxy.$router.push('/');
		};

		return {
			clickGoogleLogin,
		};
	},
};
</script>

<style lang="scss" scoped>
.google-login {
	width: 40px;
	cursor: pointer;
}
</style>
