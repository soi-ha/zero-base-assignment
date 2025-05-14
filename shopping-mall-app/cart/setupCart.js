import { findProduct } from '../store.js';
import { formatPrice, getElement, getStorageItem, setStorageItem } from '../utils.js';
import addToCartDOM from './addToCartDom.js';
import { openCart } from './toggleCart.js';

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

		addToCartDOM(product);
	} else {
		const amount = increaseAmount(id);
		const items = [...cartItemsEl.querySelectorAll('.cart-item-amount')];
		const itemEl = items.find((value) => value.dataset.id === id);
		itemEl.textContent = amount;
	}

	displayCartItemCount();

	displayCartTotal();

	setStorageItem('cart', cart);

	openCart();
};

function displayCartItemsDOM() {
	cart.forEach((cartItem) => {
		addToCartDOM(cartItem);
	});
}

function displayCartItemCount() {
	const amount = cart.reduce((acc, curr) => {
		return (acc += curr.amount);
	}, 0);
	cartItemCountEl.textContent = amount;
}

function displayCartTotal() {
	let total = cart.reduce((acc, curr) => {
		return (acc += curr.price * curr.amount);
	}, 0);

	cartTotalEl.textContent = `Total: ${formatPrice(total)}`;
}

function removeItem(id) {
	cart = cart.filter((cartItem) => cartItem.id !== id);
}

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

function decreaseAmount(id) {
	let newAmount;

	cart = cart.map((cartItem) => {
		if (cartItem.id === id) {
			newAmount = cartItem.amount - 1;
			cartItem = { ...cartItem, amount: newAmount };
		}
		return cartItem;
	});
	return newAmount;
}

function setupCartFunctionality() {
	cartItemsEl.addEventListener('click', (e) => {
		const element = e.target;
		const parent = e.target.parentElement;
		const id = e.target.dataset.id;
		const parentID = e.target.parentElement.dataset.id;

		// remove
		if (element.classList.contains('cart-item-remove-btn')) {
			removeItem(id);

			element.parentElement.parentElement.remove();
		}
		// increase
		if (parent.classList.contains('cart-item-increase-btn')) {
			const newAmount = increaseAmount(parentID);
			parent.nextElementSibling.textContent = newAmount;
		}
		// decrease
		if (parent.classList.contains('cart-item-decrease-btn')) {
			const newAmount = decreaseAmount(parentID);
			if (newAmount === 0) {
				removeItem(parentID);
				parent.parentElement.parentElement.remove();
			} else {
				parent.previousElementSibling.textContent = newAmount;
			}
		}

		displayCartItemCount();
		displayCartTotal();
		setStorageItem('cart', cart);
	});
}

const init = () => {
	displayCartItemCount();

	displayCartTotal();

	displayCartItemsDOM();

	setupCartFunctionality();
};

init();
