const siteHeader = document.getElementById('shopify-section-header');
const productSection = document.querySelector('.section-product');
const productWrapper = productSection.querySelector('.wrap');
const breadcrumbs = productWrapper.querySelector('.breadcrumbs');
const productDetails = document.querySelector('.section-product__container');

window.heightFromTop = function (width) {
	if (width >= 768) {
		let windowHeight = window.innerHeight;
		let productDetailsHeight = productDetails.offsetHeight;
		let headerHeight = siteHeader.offsetHeight;
		let breadcrumbsHeight = breadcrumbs.offsetHeight;
		let wrapperPadding = window.getComputedStyle(productWrapper, null).getPropertyValue('padding-top');
		let wrapperPaddingValue = Number(wrapperPadding.replace('px', ''));
		let combinedTopElementsTotal = headerHeight + breadcrumbsHeight + wrapperPaddingValue;
		let ViewableArea = windowHeight - combinedTopElementsTotal;
		if (ViewableArea > productDetailsHeight) {
			productDetails.style.top = combinedTopElementsTotal + 'px';
		} else {
			let difference = productDetailsHeight - ViewableArea;
			let positionResult = combinedTopElementsTotal - difference;
			productDetails.style.top = positionResult + 'px';
		}
		productDetails.style.position = 'sticky';
	} else {
		productDetails.style.position = 'relative';
		productDetails.style.top = 'auto';
	}
};

window.addEventListener('DOMContentLoaded', function () {
	window.heightFromTop(window.innerWidth);
	Fancybox.bind('[data-fancybox="gallery"]', {
		Thumbs: false,
		Toolbar: false,
	});
});
window.addEventListener('resize', function () {
	window.heightFromTop(window.innerWidth);
});
window.addEventListener('scroll', function () {
	window.heightFromTop(window.innerWidth);
});

const modalToggle = document.querySelector('.toggle-size-modal');
if (modalToggle)
	modalToggle.addEventListener('click', e => {
		e.preventDefault();
		window.toggleDrawer('guides', false);
	});

// const country_messages = document.querySelectorAll('.country-message');
// if (country_messages) {
// 	if (client_country !== undefined) {
// 		for (let message of country_messages) {
// 			let target = message.dataset.code;
// 			let condition = message.dataset.condition;
// 			if (target === client_country && condition === 'equals') message.classList.remove('hidden');
// 			if (target === client_country && condition === 'does_not_equal') message.classList.add('hidden');
// 			if (target !== client_country && condition === 'does_not_equal') message.classList.remove('hidden');
// 		}
// 	} else {
// 		for (let message of country_messages) message.classList.add('hidden');
// 	}
// }

// const continent_messages = document.querySelectorAll('.continent-message');
// if (continent_messages) {
// 	if (client_continent !== undefined) {
// 		for (let message of continent_messages) {
// 			let target = message.dataset.code;
// 			let condition = message.dataset.condition;
// 			if (target === client_continent && condition === 'equals') message.classList.remove('hidden');
// 			if (target === client_continent && condition === 'does_not_equal') message.classList.add('hidden');
// 			if (target !== client_continent && condition === 'does_not_equal') message.classList.remove('hidden');
// 		}
// 	} else {
// 		for (let message of continent_messages) message.classList.add('hidden');
// 	}
// }

const productMessages = document.querySelectorAll('.product-message-regional');
if (productMessages) {
	if (client_country !== undefined && client_continent !== undefined) {
		for (let message of productMessages) {
			const region = message.dataset.region;
			const code = message.dataset.code.replaceAll(' ', '').split(',');
			let match = false;
			if (region === 'country') {
				for (let i = 0; i < code.length; i++) {
					if (client_country === code[i]) {
						match = true;
						continue;
					}
				}
			}
			if (region === 'continent') {
				for (let i = 0; i < code.length; i++) {
					if (client_continent === code[i]) {
						match = true;
						continue;
					}
				}
			}
			if (match === false) message.remove();
		}
		for (let message of productMessages) message.classList.add('show');
	} else {
		for (let message of productMessages) message.remove();
	}
}

window.initProductAddToWishlist = function () {
	const addToWishlistButton = document.querySelector('.add-product-to-wishlist');
	if (addToWishlistButton) {
		addToWishlistButton.addEventListener('click', e => {
			e.preventDefault();
			const parent = addToWishlistButton.parentNode.parentNode.parentNode;
			const message = parent.querySelector('.wishlist-message');
			const added = parent.querySelector('.added-message');
			const removed = parent.querySelector('.remove-message');
			if (addToWishlistButton.classList.contains('active')) {
				const thisProduct = addToWishlistButton.dataset.id;
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
							addToWishlistButton.classList.add('added');
							added.classList.add('active');
							setTimeout(() => {
								added.classList.remove('active');
							}, 2500);
						} else {
							addToWishlistButton.classList.remove('added');
							removed.classList.add('active');
							setTimeout(() => {
								removed.classList.remove('active');
							}, 2500);
						}
					});
			} else {
				// window.location = window.Shopify.routes.root + 'account/login/';
				message.classList.add('active');
				setTimeout(() => {
					message.classList.remove('active');
				}, 2500);
			}
		});
	}
};
window.initProductAddToWishlist();
