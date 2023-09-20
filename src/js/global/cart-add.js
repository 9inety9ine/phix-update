window.initAddToCart = function () {
	const productForms = document.querySelectorAll('.product-form');
	if (productForms)
		for (let i = 0; i < productForms.length; i++) {
			if (productForms[i].classList.contains('initialized')) continue;
			productForms[i].classList.add('initialized');
			let addToCartButtons = productForms[i].querySelectorAll('.button--add-to-cart');
			for (let button of addToCartButtons)
				button.addEventListener('click', e => {
					e.preventDefault();
					const currentURL = window.location.search;
					const urlParams = new URLSearchParams(currentURL);
					const selectedVariant = urlParams.get('variant');
					if (selectedVariant) {
						let formData = new FormData(productForms[i]);
						fetch(window.Shopify.routes.root + 'cart/add.js', {
							method: 'POST',
							body: formData,
						})
							.then(function (response) {
								return response.json();
							})
							.finally(function () {
								window.toggleDrawer('cart', false);
								window.setCookie('cart_reminder', 'active', 1);
							})
							.catch(function (error) {
								console.log(error);
							});
					} else {
						const variantwarning = document.querySelector('.variant-warning');
						variantwarning.classList.remove('hidden');
						setTimeout(function () {
							variantwarning.classList.add('hidden');
						}, 1500);
					}
				});
		}
};
window.addEventListener('DOMContentLoaded', window.initAddToCart);
