const drawerMenuToggle = document.querySelector('.toggle-drawer-menu');
if (drawerMenuToggle)
	drawerMenuToggle.addEventListener('click', e => {
		toggleDrawer('menu', false);
	});

const swiper_drawer_menu = new Swiper('.swiper-drawer-menu', {
	speed: 1000,
	spaceBetween: 24,
	loop: false,
	slidesPerView: 'auto',
	init: false,
});
swiper_drawer_menu.init();
