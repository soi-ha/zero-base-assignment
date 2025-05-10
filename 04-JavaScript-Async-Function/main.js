const fetchUser = () => new Promise((resolve) => setTimeout(resolve, 2000, '홍길동'));

const main = async () => {
	const userName = await fetchUser();

	console.log(userName);
};

main();
