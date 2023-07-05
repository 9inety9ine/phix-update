const togglecollection = document.querySelector('.toggle-collection-drawer');
if (togglecollection) {
	togglecollection.addEventListener('click', function (event) {
		event.preventDefault();
		toggleDrawer('collection', false);
	});
}
