const searchToggle = document.querySelector('.menu-tools__link--search a');
if (searchToggle)
	searchToggle.addEventListener('click', e => {
		e.preventDefault();
		const docbody = document.querySelector('body');
		if (docbody.classList.contains('drawer-search-open')) {
			window.toggleDrawer(false, false);
		} else {
			window.toggleDrawer('search', 'low');
		}
	});
