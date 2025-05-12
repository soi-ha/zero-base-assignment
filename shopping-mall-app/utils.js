const productsUrl = 'https://682190b3259dad2655af9bf4.mockapi.io/products';

const setStorageItem = (name, item) => {
	localStorage.setItem(name, JSON.stringify(item));
};

export { productsUrl, setStorageItem };
