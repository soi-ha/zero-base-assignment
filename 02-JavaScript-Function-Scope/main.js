function makeCounter() {
	let count = 0;

	function increase() {
		console.log(++count);
	}

	return increase;
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
