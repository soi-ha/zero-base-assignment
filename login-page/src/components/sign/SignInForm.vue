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
	</form>
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import { signInFirebawse, getUserInFirebase } from '@/services/sign';
import { reactive } from 'vue';

export default {
	name: 'SignInForm',
	components: {
		VInput,
		VButton,
	},
	setup() {
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
			signInFirebawse();
		};
		getUserInFirebase();

		return {
			user,
			checkPassword,
			clickSignIn,
		};
	},
	// data() {
	// 	return {
	// 		id: '',
	// 		password: '',
	// 		confirmPassword: '',
	// 		isError: false,
	// 	};
	// },
	// methods: {
	// 	checkPassword() {
	// 		console.log('checkPassword', this.password, this.confirmPassword);
	// 		this.isError = this.password !== this.confirmPassword;
	// 	},
	// 	clickSignIn(id, password, event) {
	// 		event.preventDefault();
	// 		if (this.isError) return;
	// 		console.log('사용자', id, password);

	// 		signInUser({ id, password });
	// 	},
	// },
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
