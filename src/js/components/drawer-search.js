window.openSearchDrawer = function () {
	const documentBody = document.querySelector('body');
	const mask = document.querySelector('.drawer-mask');
	if (documentBody) {
		mask.classList.add('low');
		window.setTimeout(function () {
			documentBody.classList.add('drawer-open');
			documentBody.classList.add('mask-visible');
			documentBody.classList.add('drawer-search-open');
			document.getElementById('drawer-search-input').focus();
			documentBody.classList.add('no-overflow');
		}, 250);
		window.setTimeout(function () {
			documentBody.classList.add('mask-visible');
		}, 500);
	}
};

const searchToggle = document.querySelector('.menu-tools__link--search a');
if (searchToggle)
	searchToggle.addEventListener('click', e => {
		e.preventDefault();
		window.closeAllDrawers();
		window.openSearchDrawer();
	});
