const drawerMenuToggle = document.querySelector('.toggle-drawer-menu');
if (drawerMenuToggle)
	drawerMenuToggle.addEventListener('click', e => {
		toggleDrawer('menu', false);
	});

const swiper_drawer_menu = new Swiper('.swiper-drawer-menu', {
	speed: 750,
	spaceBetween: 24,
	loop: true,
	slidesPerView: 'auto',
	init: false,
	autoplay: {
		delay: 3000,
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
