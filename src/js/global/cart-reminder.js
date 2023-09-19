window.setCookie = function (cname, cvalue, exdays) {
	let cookie = `${cname}=${cvalue};`;
	if (typeof exdays == 'number') {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 12 * 60 * 60 * 1000);
		cookie += `expires=${d.toUTCString()};`;
	}
	document.cookie = `${cookie}path=/`;
};

window.getCookie = function (cname) {
	let value = null;
	if (document.cookie.indexOf(cname) !== -1) {
		value = document.cookie.split(`${cname}=`).pop().split(';')[0];
	}
	return value;
};

const cookieStatus = window.getCookie('cart_reminder');

const productList = [];

const getProductCards = async () => {
	let productCards = '';
	for (let recent of productList) {
		let response = await fetch(window.Shopify.routes.root + 'products/' + recent + '?view=product-card');
		let product = await response.text();
		productCards += `${product}`;
	}
	return productCards;
};

window.showCartReminder = () => {
	const cartReminder = document.getElementById('cart-reminder');
	const cartReminderContent = document.getElementById('cart-reminder-content');
	if (cartReminder && cartReminderContent) {
		fetch(window.Shopify.routes.root + 'cart.js')
			.then(response => {
				return response.json();
			})
			.then(cart => {
				const cartItemCount = cart.item_count;
				if (cartItemCount > 0) {
					for (let item of cart.items) productList.push(item.handle);
					cartReminderContent.classList.add('product-count-' + cartItemCount);
					getProductCards()
						.then(productCards => {
							cartReminderContent.innerHTML = productCards;
							cartReminder.classList.add('show');
						})
						.finally(() => {
							window.initializeImageLoad();
							window.setCookie('cart_reminder', 'active', 1);
						});
				}
			});
	}
};

if (cookieStatus === null) {
	window.addEventListener('DOMContentLoaded', window.showCartReminder);
}

document.onkeydown = function (evt) {
	evt = evt || window.event;
	if (evt.keyCode == 27) {
		window.setCookie('cart_reminder', 'active', 0);
	}
};

const reminderClose = document.querySelector('.cart-reminder__close');
if (reminderClose)
	reminderClose.addEventListener('click', () => {
		const reminderDrawer = document.querySelector('.cart-reminder');
		reminderDrawer.classList.remove('show');
		window.setCookie('cart_reminder', 'active', 1);
	});
