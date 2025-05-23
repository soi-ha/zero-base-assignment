<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue';
import Vue from 'vue';
import naverLogin from './helper/naverLogin';

export default {
	name: 'App',
	setup() {
		const { proxy } = getCurrentInstance();
		function handleCredentialResponse(response) {
			const idToken = response.credential;
			console.log('idToken', idToken);
			Vue.$cookies.set('googleLoginToken', idToken, '10m');
		}

		onMounted(() => {
			const waitForGoogle = setInterval(() => {
				// google.accounts 객체가 완전히 로드된 걸 확인
				if (window.google && window.google.accounts && window.google.accounts.id) {
					clearInterval(waitForGoogle);
					initGoogle(); // 여기서만 initialize를 호출하도록!
				}
			}, 100);

			const initGoogle = () => {
				/* global google */
				google.accounts.id.initialize({
					client_id: '576431057219-bckqp8cg4iv4gvbu6pt28ngp1gj81454.apps.googleusercontent.com',
					callback: handleCredentialResponse,
				});
			};

			const naverInit = () => {
				const naver = naverLogin(false, false);
				proxy.$store.commit('setNaverInfo', naver);
			};
			naverInit();
		});
	},
};
</script>

<style lang="scss">
#app {
	width: 100%;
	height: 100%;
}
</style>
