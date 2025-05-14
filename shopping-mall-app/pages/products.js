import '../cart/toggleCart.js';
import '../toggleSidebar.js';
import '../cart/setupCart.js';

import display from '../displayProducts.js';
import fetchProducts from '../fetchProducts.js';
import { setupStore, store } from '../store.js';
import { getElement } from '../utils.js';
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

const init = async () => {
	const loadingEl = getElement('.page-loading');

	const products = await fetchProducts();
	setupStore(products);

	display(store, getElement('.products-container'));

	setupSearch(store);
	setupCompanies(store);
	setupPrice(store);

	loadingEl.style.display = 'none';
};

init();
