<template>
	<div class="login-view">
		<img src="@/assets/imgs/wadiz.png" alt="로고" />
		<v-input v-model="user.id"></v-input>
		<v-input v-model="user.password"></v-input>
		<v-button>로그인</v-button>
		<v-button>회원가입</v-button>
	</div>
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

export default {
	name: 'login-view',
	components: {
		VInput,
		VButton,
	},
	data() {
		return {
			user: {
				id: '',
				password: '',
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.login-view {
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
}
</style>
