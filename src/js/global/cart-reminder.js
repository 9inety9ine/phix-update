window.setCookie = function (cname, cvalue, exdays) {
	let cookie = `${cname}=${cvalue};`;
	if (typeof exdays == 'number') {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
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

const productList = [];

const getProductCards = async () => {
	//console.log(productList);
	let productCards = '';
	for (let recent of productList) {
		// console.log(window.Shopify.routes.root + 'products/' + recent + '?view=product-card');
		let response = await fetch(window.Shopify.routes.root + 'products/' + recent + '?view=product-card');
		let product = await response.text();
		productCards += `${product}`;
	}
	return productCards;
};

window.showCartReminder = () => {
	const cartReminder = document.querySelector('.cart-reminder');
	if (cartReminder) {
		fetch(window.Shopify.routes.root + 'cart.js')
			.then(response => {
				return response.json();
			})
			.then(cart => {
				if (cart.item_count > 0) {
					for (let item of cart.items) productList.push(item.handle);
					const content = cartReminder.querySelector('.cart-reminder__content');
					content.classList.add('product-count-' + cart.item_count);
					getProductCards()
						.then(productCards => {
							const remindercontent = document.querySelector('.cart-reminder__content');
							remindercontent.innerHTML = productCards;
							cartReminder.classList.add('show');
						})
						.finally(() => {
							window.initializeImageLoad();
						});
				} else {
					console.log('cart empty');
				}
			});
	}
};

window.addEventListener('DOMContentLoaded', () => {
	console.log(window.getCookie('show_reminder'));
	const showReminder = window.getCookie('show_reminder');
	if (!showReminder || showReminder === 'yes' || showReminder === null) {
		window.showCartReminder();
	}
	window.setCookie('show_reminder', 'no', 1);
});

document.onkeydown = function (evt) {
	evt = evt || window.event;
	if (evt.keyCode == 27) {
		window.setCookie('show_reminder', 'yes', 1);
		console.log('cookie cleared');
	}
};

const reminderClose = document.querySelector('.cart-reminder__close');
if (reminderClose)
	reminderClose.addEventListener('click', () => {
		const reminderDrawer = document.querySelector('.cart-reminder');
		reminderDrawer.classList.remove('show');
		window.setCookie('show_reminder', 'no', 1);
	});
