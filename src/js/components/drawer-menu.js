const toggleMenu = function () {
	const documentBody = document.querySelector('body');
	const menuDrawer = document.querySelector('.drawer-menu');
	if (documentBody && menuDrawer) {
		if (documentBody.classList.contains('drawer-open')) {
			documentBody.classList.remove('drawer-open', 'drawer-menu-open', 'no-overflow');
			window.setTimeout(function () {
				documentBody.classList.remove('mask-visible');
			}, 150);
		} else {
			documentBody.classList.add('drawer-open', 'drawer-menu-open', 'no-overflow');
			window.setTimeout(function () {
				documentBody.classList.add('mask-visible');
			}, 150);
		}
	}
};

const drawerMenuToggles = document.querySelectorAll('.toggle-drawer-menu, .drawer-mask');
if (drawerMenuToggles)
	for (let toggle of drawerMenuToggles)
		toggle.addEventListener('click', e => {
			console.log('click');
			e.preventDefault();
			toggleMenu();
		});