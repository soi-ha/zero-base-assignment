const naverLogin = (isLogin, useLoginButton) => {
	const callbackUrl = isLogin ? 'http://localhost:8080/naverAuth?isLogin=true' : 'http://localhost:8080/naverAuth';
	const loginButton = useLoginButton ? { type: 1, color: 'green', height: 40 } : undefined;

	const naver = new window.naver.LoginWithNaverId({
		clientId: 'fyotD0wVfLz0fmxNv1pJ',
		callbackUrl: callbackUrl,
		isPopup: false,
		loginButton: loginButton,
	});
	naver.init();

	return naver;
};

export default naverLogin;
