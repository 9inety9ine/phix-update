const drawerMenuToggle = document.querySelector('.toggle-drawer-menu');
if (drawerMenuToggle)
	drawerMenuToggle.addEventListener('click', e => {
		toggleDrawer('menu', false);
	});
