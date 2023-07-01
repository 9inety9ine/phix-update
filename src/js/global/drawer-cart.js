window.updateCartDrawer = function () {
	const cartDrawerContent = document.querySelector('.drawer-cart__content');
	cartDrawerContent.classList.add('content-loading');
	fetch(window.Shopify.routes.root + 'cart')
		.then(function (response) {
			return response.text();
		})
		.then(function (html) {
			const cartDrawerContentElement = document.getElementById('cart-items');
			const cartDrawerTotal = document.getElementById('cart-totals');
			let cartItems = '';
			let cartTotal = '';
			if (html.indexOf('<!--[empty-cart]-->') > 0) {
				cartItems = html.split('<!--[empty-cart]-->').pop().split('<!--[/empty-cart]-->')[0];
				cartTotal = '';
			} else {
				cartItems = html.split('<!--[cart-items]-->').pop().split('<!--[/cart-items]-->')[0];
				cartTotal = html.split('<!--[cart-total]-->').pop().split('<!--[/cart-total]-->')[0];
			}
			cartDrawerContentElement.innerHTML = cartItems;
			cartDrawerTotal.innerHTML = cartTotal;
			//window.initCartDrawerRemove();
			window.initializeImageLoad();
			//window.countCartItems();
		})
		.finally(function () {
			cartDrawerContent.classList.remove('content-loading');
		})
		.catch(function (err) {
			console.error(err);
		});
};

window.openCartDrawer = function () {
	const documentBody = document.querySelector('body');
	const cartDrawer = document.querySelector('.drawer-cart');
	if (documentBody && cartDrawer) {
		if (documentBody.classList.contains('drawer-open')) {
			documentBody.classList.remove('drawer-open', 'drawer-cart-open', 'no-overflow');
			window.setTimeout(function () {
				documentBody.classList.remove('mask-visible');
			}, 150);
		} else {
			documentBody.classList.add('drawer-open', 'drawer-cart-open', 'no-overflow');
			window.setTimeout(function () {
				documentBody.classList.add('mask-visible');
			}, 150);
			window.updateCartDrawer();
		}
	}
};

const toggleCart = document.querySelector('.menu-tools__link--cart a');
if (toggleCart) {
	toggleCart.addEventListener('click', function (event) {
		event.preventDefault();
		const documentBody = document.querySelector('body');
		if (documentBody && documentBody.classList.contains('drawer-cart-open')) {
			window.closeAllDrawers();
			return;
		} else {
			window.closeAllDrawers();
			openCartDrawer();
		}
	});
}
