<template>
	<div id="naverIdLogin"></div>
</template>

<script>
import naverLogin from '@/helper/naverLogin';
import { onMounted, getCurrentInstance } from 'vue';

export default {
	name: 'LoginNaver',
	setup() {
		const { proxy } = getCurrentInstance();

		onMounted(() => {
			const naverInfo = proxy.$store.state.naverInfo;
			naverLogin(true, true);

			naverInfo.getLoginStatus((status) => {
				if (status) {
					const { accessToken } = naverInfo.accessToken;
					proxy.$store.commit('setAccessToken', accessToken);
				}
			});
		});
	},
};
</script>

<style lang="scss" scoped>
#naverIdLogin {
	width: 100%;
	height: 100%;
}
</style>
