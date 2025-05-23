export const getKakaoInfo = () => {
	return new Promise((resolve, reject) => {
		let name, id, email;

		async function getKakaoUserInfo() {
			try {
				const user = await window.Kakao.API.request({ url: '/v2/user/me' });
				const { properties, kakao_account } = user;
				name = properties.profile_nickname;
				id = user.id;
				email = kakao_account.email;
				console.log(user);
				resolve({ name, id, email });
			} catch (error) {
				console.log(error);
				reject(error);
			}
		}

		function loginWithKakao() {
			window.Kakao.Auth.authorize({
				redirectUri: 'http://localhost:8080/login', // 앱에 등록된 카카오 로그인에서 사용할 Redirect URI 입력
			});
			getKakaoUserInfo();
		}
		loginWithKakao();
	});
};
