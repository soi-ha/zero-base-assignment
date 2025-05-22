<template>
	<form class="sign-in-form" @submit="clickSignIn(user.id, user.password, $event)">
		<label>
			ID
			<v-input class="sign-in-form__text" v-model="user.id" />
		</label>
		<label>
			Password
			<v-input class="sign-in-form__text" type="password" v-model="user.password" :isError="isError" />
		</label>
		<label>
			Confirm Password
			<v-input
				class="sign-in-form__text"
				type="password"
				v-model="user.confirmPassword"
				:isError="user.isError"
				error-msg="비밀번호가 다릅니다."
			/>
		</label>
		<v-button type="submit" class="sign-in-form__button" @click="checkPassword()">회원가입</v-button>
		<v-button class="sign-in-form__button" @click="clickGoogle">구글 회원가입</v-button>
	</form>
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { signInFirebawse, getUserInFirebase, getGoogleUser } from '@/services/sign';
import { reactive, getCurrentInstance } from 'vue';

export default {
	name: 'SignInForm',
	components: {
		VInput,
		VButton,
	},
	setup() {
		const { proxy } = getCurrentInstance();

		const user = reactive({
			id: '',
			password: '',
			confirmPassword: '',
			isError: false,
		});

		const checkPassword = () => {
			user.isError = user.password !== user.confirmPassword;
		};

		const clickSignIn = (id, password, event) => {
			event.preventDefault();
			if (user.isError) return;
			console.log('사용자:', id, password);
			// signInUser({ id, password });
			signInFirebawse(id, password);
		};

		const clickGoogle = async () => {
			const token = proxy.$cookies.get('googleLoginToken');
			if (!token) return;
			await getGoogleUser(token);
			proxy.$router.push('/login');
		};

		getUserInFirebase();

		return {
			user,
			checkPassword,
			clickSignIn,
			clickGoogle,
		};
	},
};
</script>

<style lang="scss" scoped>
.sign-in-form {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 16px;
	flex-flow: column;
	width: 100%;

	&__text,
	&__button,
	a,
	label {
		width: 100%;
	}
}
</style>
