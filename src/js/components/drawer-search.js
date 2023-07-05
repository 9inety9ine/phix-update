const searchToggle = document.querySelector('.menu-tools__link--search a');
if (searchToggle)
	searchToggle.addEventListener('click', e => {
		e.preventDefault();
		window.toggleDrawer('search', 'low');
	});
