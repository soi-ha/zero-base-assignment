<template>
	<form class="login-form" @submit="clickLogin">
		<label>
			ID
			<v-input class="login-form__text" v-model="id" />
		</label>
		<label>
			Password
			<v-input class="login-form__text" type="password" v-model="password" />
		</label>
		<div class="social-login">
			<login-google />
			<login-naver />
			<login-kakao />
		</div>
		<v-button class="login-form__button" type="submit">로그인</v-button>
		<router-link to="/signIn">
			<v-button class="login-form__button" variant="outlined">회원가입</v-button>
		</router-link>
	</form>
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { loginUser } from '@/services/login';
import LoginGoogle from './LoginGoogle.vue';
import LoginNaver from './LoginNaver.vue';
import LoginKakao from './LoginKakao.vue';
import { ref } from 'vue';
// import { useRouter, useRoute } from 'vue-router';

export default {
	name: 'login-form',
	components: {
		VInput,
		VButton,
		LoginGoogle,
		LoginNaver,
		LoginKakao,
	},
	setup() {
		const id = ref('');
		const password = ref('');
		// const { proxy } = getCurrentInstance();

		const clickLogin = (event) => {
			const user = {
				id: id.value,
				password: password.value,
			};
			const result = loginUser(user);
			console.log(result);
			event.preventDefault();
		};

		return {
			id,
			password,
			clickLogin,
		};
	},
};
</script>

<style lang="scss" scoped>
.login-form {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16px;
	flex-flow: column;
	width: 100%;

	&__text,
	&__button,
	label,
	a {
		width: 100%;
	}
	.social-login {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}
}
</style>
