import { findProduct } from '../store.js';
import { getElement, getStorageItem } from '../utils.js';

const cartItemCountEl = getElement('.cart-item-count');
const cartItemsEl = getElement('.cart-items');
const cartTotalEl = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
	let item = cart.find((cartItem) => cartItem.id === id);

	if (!item) {
		let product = findProduct(id);

		product = { ...product, amount: 1 };

		cart = [...cart, product];
	} else {
		const amount = increaseAmount(id);
		const items = [...cartItemsEl.querySelectorAll('.cart-item-amount')];
		const itemEl = items.find((value) => value.dataset.id === id);
		itemEl.textContent = amount;
	}
};

function increaseAmount(id) {
	let newAmount;

	cart = cart.map((cartItem) => {
		if (cartItem.id === id) {
			newAmount = cartItem.amount + 1;
			cartItem = { ...cartItem, amount: newAmount };
		}
		return cartItem;
	});
	return newAmount;
}
