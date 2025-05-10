const fetchUser = () => new Promise((resolve) => setTimeout(() => resolve('홍길동'), 2000));

const main = async () => {
	const userName = await fetchUser();

	console.log(userName);
};

main();
