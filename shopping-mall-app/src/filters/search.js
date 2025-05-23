import display from '../displayProducts.js';
import { getElement } from '../utils.js';

const setupSearch = (store) => {
	const form = getElement('.input-form');
	const nameInput = getElement('.search-input');
	form.addEventListener('keyup', () => {
		const value = nameInput.value;
		if (value) {
			const newStore = store.filter((product) => {
				let { name } = product;
				name = name.toLowerCase();
				if (name.startsWith(value)) {
					return product;
				}
			});

			display(newStore, getElement('.products-container'), true);

			if (newStore.length < 1) {
				const products = getElement('.products-container');
				products.innerHTML = `
          <h3 class="filter-error">
      찾고자 하는 상품이 없습니다.
          </h3>
      `;
			}
		} else {
			display(store, getElement('.products-container'), true);
		}
	});
};

export default setupSearch;
