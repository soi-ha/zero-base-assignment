<template>
	<div class="home">
		홈 입니다! <br />
		로그인한 유저만 볼 수 있습니다.
		<v-button @click="clickInfo">유저 정보</v-button>
	</div>
</template>

<script>
import { getUserInfo } from '@/services/sign';
import VButton from '../components/common/VButton.vue';

export default {
	name: 'HomeView',
	components: { VButton },
	setup() {
		const clickInfo = () => {
			getUserInfo();
		};
		return {
			clickInfo,
		};
	},
	// created() {
	// 	console.log('HomeView');
	// },
	// methods: {
	// 	clickInfo() {
	// 		getUserInfo();
	// 	},
	// },
};
</script>
