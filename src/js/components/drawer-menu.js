const toggleMenu = function () {
	const documentBody = document.querySelector('body');
	const menuDrawer = document.querySelector('.drawer-menu');
	if (documentBody && menuDrawer) {
		if (documentBody.classList.contains('drawer-open')) {
			window.closeAllDrawers();
		} else {
			documentBody.classList.add('drawer-open', 'drawer-menu-open', 'no-overflow');
			window.setTimeout(function () {
				documentBody.classList.add('mask-visible');
			}, 150);
		}
	}
};

const drawerMenuToggle = document.querySelector('.toggle-drawer-menu');
if (drawerMenuToggle)
	drawerMenuToggle.addEventListener('click', e => {
		e.preventDefault();
		toggleMenu();
	});
