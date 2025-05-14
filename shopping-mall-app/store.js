import { setStorageItem } from './utils.js';

let store = getStorageItem('store');

const setupStore = (products) => {
	setStorageItem('store', products);
};

const findProduct = (id) => {
	const product = store.find((product) => product.id === id);
	return product;
};

export { setupStore, store, findProduct };
