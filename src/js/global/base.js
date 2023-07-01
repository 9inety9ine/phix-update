window.closeAllDrawers = function () {
	const documentBody = document.querySelector('body');
	if (documentBody && documentBody.classList.contains('drawer-open')) {
		documentBody.classList.remove('drawer-cart-open');
		documentBody.classList.remove('drawer-search-open');
		documentBody.classList.remove('drawer-menu-open');
		documentBody.classList.remove('drawer-filters-open');
		documentBody.classList.remove('drawer-search-filters-open');
		documentBody.classList.remove('no-overflow');
		documentBody.classList.remove('drawer-open');
		window.setTimeout(function () {
			documentBody.classList.remove('mask-visible');
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
