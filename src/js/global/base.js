window.toggleDrawer = (drawer, level) => {
	const documentBody = document.querySelector('body');
	const mask = document.querySelector('.drawer-mask');
	if (documentBody.classList.contains('drawer-open')) {
		const bodyClasses = documentBody.className.split(' ');
		let searchOpen = false;
		if (documentBody.classList.contains('drawer-search-open')) searchOpen = true;
		bodyClasses.forEach(bodyClass => {
			if (bodyClass.match('drawer')) {
				if (bodyClass.match('drawer-mask-visible')) {
					window.setTimeout(function () {
						documentBody.classList.remove(bodyClass);
						mask.classList.remove('low');
					}, 100);
				} else {
					documentBody.classList.remove(bodyClass);
				}
			}
		});
		if (searchOpen === true && drawer !== false) {
			documentBody.classList.add('drawer-open', 'drawer-' + drawer + '-open', 'drawer-mask-visible');
			if (level === 'low') mask.classList.add('low');
			window.setTimeout(function () {
				documentBody.classList.add('drawer-mask-visible');
				if (drawer === 'cart') {
					window.updateCartDrawer();
				}
				if (drawer === 'search') {
					const searchInput = document.getElementById('drawer-search-input');
					searchInput.focus();
				}
			}, 100);
		}
	} else {
		documentBody.classList.add('drawer-open', 'drawer-' + drawer + '-open', 'drawer-mask-visible');
		if (level === 'low') mask.classList.add('low');
		window.setTimeout(function () {
			documentBody.classList.add('drawer-mask-visible');
			if (drawer === 'cart') {
				window.updateCartDrawer();
			}
			if (drawer === 'search') {
				const searchInput = document.getElementById('drawer-search-input');
				searchInput.focus();
			}
		}, 100);
	}
};

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

const footerTitles = document.querySelectorAll('.menu-footer__title');
if (footerTitles)
	for (let title of footerTitles)
		title.addEventListener('click', () => {
			if (window.innerWidth <= 768) {
				title.parentNode.classList.toggle('open');
			}
		});

const drawerLangSelect = document.querySelector('.drawer-lang-select');
if (drawerLangSelect)
	drawerLangSelect.addEventListener('click', e => {
		e.preventDefault();
		window.toggleDrawer(false, false);
		mdApp_openAndRefreshModal();
	});
