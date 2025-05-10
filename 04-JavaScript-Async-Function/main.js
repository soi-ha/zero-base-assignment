const fetchUser = () => new Promise((resolve) => setTimeout(resolve, 2000, '홍길동'));

const main = async () => {
	try {
		const userName = await fetchUser();
		console.log(userName);
	} catch (err) {
		console.error('fetchUser 실패:', err);
	}
};

main();
