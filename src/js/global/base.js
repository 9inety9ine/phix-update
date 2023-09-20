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

window.addEventListener('DOMContentLoaded', () => {
	// count cart items
	window.countCartItems();
	// init footer links
	const footerTitles = document.querySelectorAll('.menu-footer__title');
	if (footerTitles)
		for (let title of footerTitles)
			title.addEventListener('click', () => {
				if (window.innerWidth <= 768) {
					title.parentNode.classList.toggle('open');
				}
			});
	// init drawer lang select
	const drawerLangSelect = document.querySelector('.drawer-lang-select');
	if (drawerLangSelect)
		drawerLangSelect.addEventListener('click', e => {
			e.preventDefault();
			window.toggleDrawer(false, false);
			mdApp_openAndRefreshModal();
		});
	// init drawer toggle
	const drawerToggles = document.querySelectorAll('.toggle-drawer');
	if (drawerToggles)
		for (let toggle of drawerToggles)
			toggle.addEventListener('click', e => {
				e.preventDefault();
				window.toggleDrawer(false, false);
				setTimeout(function () {
					const mobileMenuItems = document.querySelectorAll('.menu-mobile__item');
					if (mobileMenuItems) for (let item of mobileMenuItems) item.classList.remove('open');
				}, 500);
			});
	// init drawer mask
	const drawerMask = document.querySelector('.drawer-mask');
	if (drawerMask)
		drawerMask.addEventListener('click', e => {
			// console.log('clicked');
			e.preventDefault();
			window.toggleDrawer(false, false);
			setTimeout(function () {
				const mobileMenuItems = document.querySelectorAll('.menu-mobile__item');
				if (mobileMenuItems) for (let item of mobileMenuItems) item.classList.remove('open');
			}, 500);
		});
});
