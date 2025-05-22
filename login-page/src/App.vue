<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
	setup() {
		const init = () => {
			window.gapi.load('auth2', function () {
				/* Ready. Make a call to gapi.auth2.init or some other API */
				console.log('auth2');
				window.gapi.auth2.init({
					client_id: '576431057219-bckqp8cg4iv4gvbu6pt28ngp1gj81454.apps.googleusercontent.com',
				});
			});
		};
		window.initGoogle = init();

		return {};
	},
};
</script>

<style lang="scss">
#app {
	width: 100%;
	height: 100%;
}
</style>
