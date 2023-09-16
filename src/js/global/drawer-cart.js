window.updateCartDrawer = function () {
	const cartDrawerContent = document.querySelector('.drawer-cart__content');
	cartDrawerContent.classList.add('content-loading');
	const cartFooter = document.querySelector('.drawer-cart__footer');
	cartFooter.classList.add('hidden');
	const drawerExtras = document.querySelector('.drawer-cart-recommended');
	if (drawerExtras) drawerExtras.classList.add('hidden');
	let cartEmpty = false;
	fetch(window.Shopify.routes.root + 'cart')
		.then(function (response) {
			return response.text();
		})
		.then(function (html) {
			const cartDrawerContentElement = document.getElementById('cart-items');
			const cartDrawerTotal = document.getElementById('cart-totals');
			let cartItems = '';
			let cartTotal = '';
			if (html.indexOf('<!--[cart-empty]-->') > 0) {
				cartItems = html.split('<!--[cart-empty]-->').pop().split('<!--[/cart-empty]-->')[0];
				cartTotal = '';
				cartEmpty = true;
				drawerExtras.classList.add('hidden');
			} else {
				cartItems = html.split('<!--[cart-items]-->').pop().split('<!--[/cart-items]-->')[0];
				cartTotal = html.split('<!--[cart-total]-->').pop().split('<!--[/cart-total]-->')[0];
				cartFooter.classList.remove('hidden');
				cartEmpty = false;
			}
			cartDrawerContentElement.innerHTML = cartItems;
			cartDrawerTotal.innerHTML = cartTotal;
			if (cartEmpty === false) {
				window.getRelatedDrawerProducts();
			}
		})
		.finally(function () {
			cartDrawerContent.classList.remove('content-loading');
			window.initCartDrawerRemove();
			window.initializeImageLoad();
			window.countCartItems();
			window.initAddToWishlist();
		})
		.catch(function (err) {
			console.error(err);
		});
};

const toggleCart = document.querySelector('.menu-tools__link--cart a');
if (toggleCart) {
	toggleCart.addEventListener('click', function (event) {
		event.preventDefault();
		window.toggleDrawer('cart', false);
	});
}

window.initCartDrawerRemove = function () {
	let cartDrawerContent = document.getElementById('cart-items');
	if (cartDrawerContent) {
		let removeButtons = cartDrawerContent.querySelectorAll('.cart-remove');
		for (let i = 0; i < removeButtons.length; i++) {
			removeButtons[i].addEventListener('click', function (event) {
				event.preventDefault();
				let current_id = this.dataset.product;
				let current_val = 0;
				let data = { updates: {} };
				data.updates[current_id] = current_val;
				fetch(window.Shopify.routes.root + 'cart/update.js', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then(response => response.json())
					.then(function () {
						window.updateCartDrawer();
					})
					.catch(err => {
						console.log(err);
					});
			});
		}
	}
};

window.getRelatedDrawerProducts = function () {
	const documentBody = document.querySelector('body');
	const drawerRecommendedContainer = document.querySelector('.drawer-cart-recommended');
	if (!documentBody.classList.contains('drawer-cart-open')) window.toggleDrawer(false, false);
	fetch(window.Shopify.routes.root + 'cart.js')
		.then(response => {
			return response.json();
		})
		.then(cart => {
			var product_id = cart.items[0].product_id;
			fetch(window.Shopify.routes.root + 'recommendations/products?product_id=' + product_id + '&section_id=drawer-cart-recommended&intent=related')
				.then(response => response.text())
				.then(text => {
					const html = document.createElement('div');
					html.innerHTML = text;
					const recommendations = html.querySelector('.drawer-cart-recommended');
					if (recommendations && recommendations.innerHTML.trim().length) {
						drawerRecommendedContainer.innerHTML = recommendations.innerHTML;
					}
				});
		})
		.finally(function () {
			window.setTimeout(function () {
				window.cart_drawer_recommendations();
			}, 250);
			window.setTimeout(function () {
				drawerRecommendedContainer.classList.remove('hidden');
			}, 500);
		});
};

window.cart_drawer_recommendations = function () {
	let sliderFound = false;
	function detectSlider() {
		const drawerRecommended = document.querySelector('.drawer-cart-recommended');
		const drawerRecommendedContainer = document.querySelector('.swiper-recommended');
		if (drawerRecommendedContainer) {
			sliderFound = true;
			drawerRecommended.classList.add('active');
		}
	}
	detectSlider();
	function waitForFound() {
		if (sliderFound === false) {
			console.log('not found');
			setTimeout(function () {
				detectSlider();
			}, 100);
		} else {
			// console.log('found');
			window.setTimeout(function () {
				const swiper_cart = new Swiper('.swiper-recommended', {
					speed: 1000,
					spaceBetween: 6,
					loop: false,
					slidesPerView: 1.5,
				});
			}, 250);
		}
	}
	waitForFound();
};

window.initAddToWishlist = function () {
	const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
	if (addToWishlistButtons) {
		for (let button of addToWishlistButtons) {
			if (button.classList.contains('initialized')) continue;
			button.addEventListener('click', e => {
				e.preventDefault();
				if (button.classList.contains('active')) {
					const thisProduct = button.dataset.id;
					fetch('https://wishlist.hydratedelephant.com/wishlist', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json',
							'X-Customer-Security-Token': cake.customer_api_token,
						},
						body: JSON.stringify({
							customer_id: cake.customer_id,
							store_name: Shopify.shop.replace('.myshopify.com', ''),
							product_id: thisProduct,
						}),
					})
						.then(response => response.json())
						.then(data => {
							// console.log(data);
							if (data.action === 'added') {
								let current_id = button.dataset.product;
								let current_val = 0;
								let data = { updates: {} };
								data.updates[current_id] = current_val;
								fetch(window.Shopify.routes.root + 'cart/update.js', {
									method: 'POST',
									headers: {
										'Content-type': 'application/json',
									},
									body: JSON.stringify(data),
								})
									.then(response => response.json())
									.then(function () {
										window.updateCartDrawer();
									})
									.catch(err => {
										console.log(err);
									});
							} else {
								if (button.classList.contains('remove')) {
									//button.parentNode.parentNode.parentNode.style.display = 'none';
								}
							}
						});
				} else {
					// window.location = window.Shopify.routes.root + 'account/login/';
					const parent = button.parentNode;
					const message = parent.querySelector('.wishlist-message');
					message.classList.add('active');
					setTimeout(() => {
						message.classList.remove('active');
					}, 2500);
				}
			});
			button.classList.add('initialized');
		}
	}
};
window.initAddToWishlist();
