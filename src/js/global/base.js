window.closeAllDrawers = function () {
	const documentBody = document.querySelector('body');
	const mask = document.querySelector('.drawer-mask');
	if (documentBody && documentBody.classList.contains('drawer-open')) {
		documentBody.classList.remove('drawer-cart-open');
		documentBody.classList.remove('drawer-search-open');
		documentBody.classList.remove('drawer-menu-open');
		documentBody.classList.remove('drawer-collection-open');
		documentBody.classList.remove('drawer-search-filters-open');
		documentBody.classList.remove('no-overflow');
		documentBody.classList.remove('drawer-open');
		window.setTimeout(function () {
			documentBody.classList.remove('mask-visible');
			mask.classList.remove('low');
		}, 250);
	}
};

const drawerMask = document.querySelector('.drawer-mask');
if (drawerMask)
	drawerMask.addEventListener('click', e => {
		console.log('click');
		e.preventDefault();
		window.closeAllDrawers();
	});

const drawerToggles = document.querySelectorAll('.toggle-drawer');
if (drawerToggles)
	for (let toggle of drawerToggles)
		toggle.addEventListener('click', e => {
			console.log('click');
			e.preventDefault();
			window.closeAllDrawers();
		});

window.countCartItems = function () {
	const cartCounter = document.getElementById('cart-counter');
	if (cartCounter) {
		fetch('/cart.js')
			.then(response => {
				return response.json();
			})
			.then(cart => {
				let cartItemCount = cart.item_count;
				const cartCounterDisplay = cartCounter.querySelector('span');
				if (cartItemCount >= 1) {
					cartCounterDisplay.classList.remove('hidden');
					cartCounterDisplay.textContent = cartItemCount;
				} else {
					cartCounterDisplay.classList.add('hidden');
					cartCounterDisplay.textContent = '';
				}
			});
	}
};
window.countCartItems();
