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

const drawerMenuToggle = document.querySelector('.toggle-drawer-menu');
if (drawerMenuToggle)
	drawerMenuToggle.addEventListener('click', e => {
		window.toggleDrawer('menu', false);
	});

const swiper_drawer_menu = new Swiper('.swiper-drawer-menu', {
	speed: 1000,
	spaceBetween: 24,
	loop: true,
	slidesPerView: 'auto',
	init: false,
	autoplay: {
		delay: 1500,
		disableOnInteraction: false,
	},
});
swiper_drawer_menu.init();

const drawerMenu = document.querySelector('.swiper-drawer-menu');
drawerMenu.addEventListener('mouseover', () => {
	swiper_drawer_menu.autoplay.stop();
});
drawerMenu.addEventListener('mouseleave', () => {
	swiper_drawer_menu.autoplay.start();
});
