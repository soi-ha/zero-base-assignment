import fetchProducts from './fetchProducts.js';
import { setupStore } from './store.js';

const init = async () => {
	const products = await fetchProducts();

	if (products) {
		setupStore(products);
	}

	const featured = products.filter((product) => product.featured === true);
};

window.addEventListener('DOMContentLoaded', init);
