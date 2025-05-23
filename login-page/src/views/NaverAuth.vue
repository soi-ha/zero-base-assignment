<template>
	<div>Auth</div>
</template>

<script>
import { signInSocial } from '@/services/sign';
import { loginUser } from '@/services/login';
import { getCurrentInstance } from 'vue';

export default {
	name: 'naverAuth',
	setup() {
		const { proxy } = getCurrentInstance();
		const naverLogin = proxy.$store.state.naverInfo;

		if (proxy.$route.query.isLogin === 'true') {
			naverLogin.getLoginStatus(async (status) => {
				if (status) {
					console.log(naverLogin);
					const data = await loginUser({ id: naverLogin.user.id }, true);
					if (data.msg) return;
					if (data.response.status === 500) {
						proxy.$router.push('/signIn');
					}
				}
			});
		} else {
			naverLogin.getLoginStatus((status) => {
				if (status) {
					console.log(naverLogin.user); // id name email
					console.log('naver', naverLogin);
					const { id, name, email } = naverLogin.user;
					signInSocial(id, name, email);
					proxy.$router.push('/');
				}
			});
		}
	},
};
</script>
