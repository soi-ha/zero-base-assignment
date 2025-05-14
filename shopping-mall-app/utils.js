const productsUrl = 'https://682190b3259dad2655af9bf4.mockapi.io/products';

const setStorageItem = (name, item) => {
	localStorage.setItem(name, JSON.stringify(item));
};

const formatPrice = (price) => {
	let formattedPrice = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format((price / 100).toFixed(2));
	return formattedPrice;
};

const getElement = (selection) => {
	const element = document.querySelector(selection);
	if (element) return element;
	throw new Error('해당 요소가 존재하지 않습니다.');
};

export { productsUrl, setStorageItem, formatPrice, getElement };
